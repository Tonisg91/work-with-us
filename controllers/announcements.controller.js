const Announcements = require('../models/Announcement.model')
const Offers = require('../models/Offers.model')
const User = require('../models/Users.model')


const getAnnouncements = async (req, res, next) => {
  try {
    const user = req.session.currentUser;
    const list = await Announcements.find({ assigned: false, announcer: { $ne: user._id } });
    res.render("announcements/announcement-list", { list, currentUser: user });
  } catch (error) {
    next(error);
  }
}

const getOneAnnouncement = async (req, res, next) => {
  try {
    const announcement = await Announcements.findById(req.params.id).populate({ path: 'offers', populate: { path: 'professional', model: 'User' } });
    const user = req.session.currentUser;
    if (!user) {
      res.redirect("/auth");
    } else {
      //Definición de las condiciones de los diferentes casos: el anunciante es el currentUser (1) y el anuncio tiene una oferta aceptada (2)
      const isUserTheAnnouncer = announcement.announcer == user._id;
      const isAnnouncementAccepted = announcement.assigned == true;
      if (isUserTheAnnouncer) {
        if (isAnnouncementAccepted) {
          res.render("announcements/announce-accepted", {
            announcement,
            currentUser: user
          })
        } else {
          res.render("announcements/announce-user", {
            announcement,
            currentUser: user
          });
        }
      } else {
        res.render("announcements/announcement-guestUser", {
          announcement,
          currentUser: user,// #my-works {
          //   display: grid;
          //   grid-template-columns: 50% 50%;
          //   gap: 10px;
          // }
        });
      }
    }
  } catch (error) {
    next(error);
  }
}

const postMakeOffer = async (req, res, next) => {
  try {
    const announcementId = req.params.announcementId;
    const { professional, estimatedPrice, comments } = req.body;
    const newOffer = await Offers.create({ professional, announcementId, estimatedPrice, comments })
    const newOfferId = newOffer._id;
    await Announcements.findByIdAndUpdate(announcementId, { $push: { offers: newOfferId } })
    res.redirect('/announcements');
  } catch (error) {
    next(error)
  }
}

const getDeclineOffer = async (req, res, next) => {
  try {
    const { announceId, offerId } = req.params
    //Promesas: borrar oferta del anuncio (1) y borrar oferta (2)
    const removeOfferAnnounce = Announcements.findByIdAndUpdate(announceId, { $pull: { offers: { _id: offerId } } });
    const removeOffer = Offers.findByIdAndDelete(offerId);
    await Promise.all([removeOfferAnnounce, removeOffer]);
    res.redirect(`/announcement/${announceId}`)
  } catch (error) {
    next(error)
  }
}

const getAcceptOffer = async (req, res, next) => {
  try {
    const { announceId, offerId, professionalId } = req.params;
    //Promesas: editar oferta aceptada (1) y asignar nuevos valores al anuncio (2)
    const offersAcceptedTrue = Offers.findByIdAndUpdate(offerId, { accepted: true });
    const announceAssignedTrue = Announcements.findByIdAndUpdate(announceId, { assigned: true, professional: professionalId, offerAccepted: offerId });
    const professionalAssigned = User.findByIdAndUpdate(professionalId, { $push: { workInProgress: announceId } });
    await Promise.all([offersAcceptedTrue, announceAssignedTrue, professionalAssigned]);
    res.redirect(`/announcement/${announceId}`);
  } catch (error) {
    next(error);
  }
}

const editAnnouncement = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    await Announcements.findByIdAndUpdate(req.params.announceId, { title, description });
    res.redirect(`/announcement/${req.params.announceId}`);
  } catch (error) {
    next(error)
  }
}

const deleteAnnouncement = async (req, res, next) => {
  try {
    await Announcements.findByIdAndDelete(req.params.announceId);
    res.redirect('/myaccount#my-announces');
  } catch (error) {
    next(error);
  }
}

const getAddAnnouncement = async (req, res, next) => {
  try {
    const user = req.session.currentUser;
    res.render("announcements/add-announcement", { currentUser: user });
  } catch (error) {
    next(error);
  }
}

const postAddAnnouncement = async (req, res, next) => {
  try {
    const announcer = req.session.currentUser._id;
    const { title, description } = req.body;
    let photos;
    req.file ? photos = req.file.path : photos = undefined;
    const newAnnouncement = await Announcements.create({
      title,
      description,
      photos,
      announcer,
    });
    const newAnnouncementId = newAnnouncement._id;
    await User.findByIdAndUpdate(announcer, {
      $push: { announcements: newAnnouncementId },
    });
    res.redirect("/myaccount#my-announces");
  } catch (error) {
    next(error);
  }
}

const getFinishWork = async (req, res, next) => {
  try {
    const { announceId } = req.params;
    await Announcements.findByIdAndUpdate(announceId, { finished: true });
    res.redirect('/myaccount#my-announces');
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAnnouncements,
  getOneAnnouncement,
  postMakeOffer,
  getDeclineOffer,
  getAcceptOffer,
  editAnnouncement,
  deleteAnnouncement,
  getAddAnnouncement,
  postAddAnnouncement,
  getFinishWork
};

