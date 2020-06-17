const Announcements = require('../models/Announcement.model')
const Offers = require('../models/Offers.model')

const getAnnouncements = async (req, res, next) => {
  try {
    const list = await Announcements.find({ assigned: false });
    const user = req.session.currentUser;
    res.render("announcements/announcement-list", { list, currentUser: user });
  } catch (error) {
    next(error);
  }
}

const getOneAnnouncement = async (req, res, next) => {
  try {
    const announcement = await Announcements.findById(req.params.id).populate({path: 'offers', populate: {path: 'professional', model: 'User'}});
    const user = req.session.currentUser;
    const userId = req.session.currentUser._id;
    //Definición de las condiciones de los diferentes casos: el anunciante es el currentUser (1) y el anuncio tiene una oferta aceptada (2)
    const isUserTheAnnouncer = announcement.announcer == userId;
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
        currentUser: user,
      });
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
    const announcementId = req.params.announceId;
    const offerId = req.params.offerId;
    //Promesas: borrar oferta del anuncio (1) y borrar oferta (2)
    const Promise1 = Announcements.findByIdAndUpdate(announcementId, { $pull: { offers: { _id: offerId } } });
    const Promise2 = Offers.findByIdAndDelete(offerId);
    await Promise.all([Promise1, Promise2]);
    res.redirect(`/announcement/${announcementId}`)
  } catch (error) {
    next(error)
  }
}

const getAcceptOffer = async (req, res, next) => {
  try {
    const announcementId = req.params.announceId;
    const offerId = req.params.offerId;
    const professionalId = req.params.professionalId;
    //Promesass: editar
    const Promise1 = Offers.findByIdAndUpdate(offerId, {accepted: true});
    const Promise2 = Announcements.findByIdAndUpdate(announcementId, {assigned: true, professional: professionalId});
    await Promise.all([Promise1, Promise2]);
    res.redirect(`/announcement/${announcementId}`);
  } catch (error) {
    next(error)
  }
}

module.exports = { getAnnouncements, getOneAnnouncement, postMakeOffer, getDeclineOffer, getAcceptOffer }

