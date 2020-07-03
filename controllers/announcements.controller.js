const Announcements = require('../models/Announcement.model');
const Offers = require('../models/Offers.model');
const User = require('../models/Users.model');
const Chat = require('../models/Chat.model');
const { capitalize } = require('../tools/stringFn')

//Mostrar todos los anuncios
const getAnnouncements = async (req, res, next) => {
  try {
    const user = req.session.currentUser;
    req.session.current_url = '/announcements'
    let list;
    //Condición para que los anuncios publicados por el usuario no se muestren en pantalla
    if (user) {
      list = await Announcements.find({ assigned: false, announcer: { $ne: user._id } });
    } else {
      list = await Announcements.find({ assigned: false });
    }
    res.render("announcements/announcement-list", { list, currentUser: user });
  } catch (error) {
    next(error);
  }
}

//Mostrar un solo anuncio
const getOneAnnouncement = async (req, res, next) => {
  try {
    const announcement = await Announcements.findById(req.params.id).populate({ path: 'offers', populate: { path: 'professional', model: 'User' } });
    const user = req.session.currentUser;
    const backURL = req.session.current_url;
    console.log(backURL);
    if (!user) {
      res.redirect("/auth");
    } else {
      const offersByTheUser = await Offers.find({ professional: user._id, announcement: announcement._id });
      const chat = await Chat.findById(announcement.chat);
      //Definición de las condiciones de los diferentes casos: el anunciante es el currentUser (1) y el anuncio tiene una oferta aceptada (2)
      const isUserTheAnnouncer = announcement.announcer == user._id;
      const isUserTheProfessional = announcement.professional == user._id;
      const isAnnouncementAccepted = announcement.assigned == true;
      if (isUserTheAnnouncer) {
        if (isAnnouncementAccepted) {
          res.render("announcements/announce-accepted", {
            announcement,
            currentUser: user,
            isUserTheAnnouncer,
            chat,
            backURL
          })
        } else {
          res.render("announcements/announce-user", {
            announcement,
            currentUser: user,
            backURL
          });
        }
      } else {
        if (isAnnouncementAccepted && isUserTheProfessional) {
          res.render("announcements/announce-accepted", {
            announcement,
            currentUser: user,
            chat,
            backURL
          })
        } else {
          res.render("announcements/announcement-guestUser", {
            announcement,
            currentUser: user,
            offersByTheUser,
            backURL
          });
        }
      }
    }
  } catch (error) {
    next(error);
  }
}

//Guardar nueva oferta
const postMakeOffer = async (req, res, next) => {
  try {
    const announcementId = req.params.announcementId;
    const { professional, estimatedPrice, comments } = req.body;
    //Creación de la oferta a partir de su modelo
    const newOffer = await Offers.create({ professional, announcement: announcementId, estimatedPrice, comments })
    const newOfferId = newOffer._id;
    //Guardarla en el anuncio que ha sido ofertado
    await Announcements.findByIdAndUpdate(announcementId, { $push: { offers: newOfferId } })
    res.redirect('/announcements');
  } catch (error) {
    next(error)
  }
}

//Borrar oferta
const getDeleteOffer = async (req, res, next) => {
  try {
    const { announceId, offerId } = req.params
    //Borrar oferta en la BBDD
    const deleteOffer = Offers.findByIdAndDelete(offerId);
    //Borrar oferta dentro del anuncio
    const removeOfferInAnnounce = Announcements.findByIdAndUpdate(announceId, { $pullAll: { offers: [offerId] } });
    await Promise.all([deleteOffer, removeOfferInAnnounce]);
    res.redirect(`/announcement/${announceId}`);
  } catch (error) {
    next(error);
  }
}

//Controlador para aceptar una oferta
const getAcceptOffer = async (req, res, next) => {
  try {
    const { announceId, offerId, professionalId } = req.params;
    //Creación del chat
    const newChat = await Chat.create({ announcement: announceId });
    const chatId = newChat._id;
    //Promesas: editar oferta aceptada (1), asignar nuevos valores al anuncio (2) y guardar el anuncio como trabajo en progreso en el usuario (3)
    const offersAcceptedTrue = Offers.findByIdAndUpdate(offerId, { accepted: true });
    const announceAssignedTrue = Announcements.findByIdAndUpdate(announceId, { assigned: true, professional: professionalId, offerAccepted: offerId, chat: chatId });
    const professionalAssigned = User.findByIdAndUpdate(professionalId, { $push: { workInProgress: announceId } });
    await Promise.all([offersAcceptedTrue, announceAssignedTrue, professionalAssigned]);
    //Borrar el resto de las ofertas
    await Offers.deleteMany({ announcement: announceId, accepted: false });
    res.redirect(`/announcement/${announceId}`);
  } catch (error) {
    next(error);
  }
}

//Editar anuncio
const editAnnouncement = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    await Announcements.findByIdAndUpdate(req.params.announceId, { title, description });
    res.redirect(`/announcement/${req.params.announceId}`);
  } catch (error) {
    next(error)
  }
}

//Borrar anuncio
const deleteAnnouncement = async (req, res, next) => {
  try {
    await Announcements.findByIdAndDelete(req.params.announceId);
    res.redirect('/myaccount#my-announces');
  } catch (error) {
    next(error);
  }
}

//Mostrar formulario para crear una nueva oferta
const getAddAnnouncement = async (req, res, next) => {
  try {
    const userId = req.session.currentUser._id;
    const userData = await User.findById(userId);
    res.render("announcements/add-announcement", { currentUser: userData });
  } catch (error) {
    next(error);
  }
}

//Creación de una nueva oferta
const postAddAnnouncement = async (req, res, next) => {
  try {
    const announcer = req.session.currentUser._id;
    const { title, description, state, city, lat, lng } = req.body;
    const tags = [...req.body.tags.split(',').map(e => capitalize(e.trim()))]
    //Recoge todas las fotos subidas
    const photos = req.files.length ? Array.from(req.files).map(file => file.path) : undefined;
    //En caso de subir varias fotos, coger la primera como imagen para su card
    let photoCard = req.files.length ? photos[0] : undefined;
    const newAnnouncement = await Announcements.create({
      title,
      description,
      tags,
      photoCard,
      announcer,
      photos,
      'location.state': capitalize(state),
      'location.city': capitalize(city),
      'location.lat': lat,
      'location.lng': lng
    });
    const newAnnouncementId = newAnnouncement._id;
    //Guarda el anuncio en el perfil del usuario
    await User.findByIdAndUpdate(announcer, {
      $push: { announcements: newAnnouncementId },
    });
    res.redirect("/myaccount#my-announces");
  } catch (error) {
    next(error);
  }
}

//Finalizar trabajo
const getFinishWork = async (req, res, next) => {
  try {
    const { announceId, chatId } = req.params;
    //Promesas: actualizar propiedades del anuncio (1) y borrar el chat (2)
    const updateAnnouncementFinished = Announcements.findByIdAndUpdate(announceId, { finished: true, chat: null });
    const deleteChat = Chat.findByIdAndDelete(chatId);
    await Promise.all([updateAnnouncementFinished, deleteChat]);
    res.redirect('/myaccount#my-announces');
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAnnouncements,
  getOneAnnouncement,
  postMakeOffer,
  getAcceptOffer,
  editAnnouncement,
  deleteAnnouncement,
  getAddAnnouncement,
  postAddAnnouncement,
  getFinishWork,
  getDeleteOffer
};

