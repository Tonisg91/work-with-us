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
    const announcement = await Announcements.findById(req.params.id).populate([{ path: 'offers.offerId', model: 'Offer' }, { path: 'offers.offerId.professional', model: 'User' }]); //aqui no consigo hacer el segundo populate
    const user = req.session.currentUser;
    const announcer = req.session.currentUser._id;
    console.log(announcement);
    //const offerAccepted = await Announcements.findById(req.params.id, { offers: { accepted: true } }).populate('offers.professional');
    //console.log(offerAccepted);
    const isUserTheAnnouncer = announcement.announcer == announcer;
    if (isUserTheAnnouncer) {
      res.render("announcements/announce-user", {
        announcement,
        announcer,
        currentUser: user
      });
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
    await Announcements.findByIdAndUpdate(announcementId, { $push: { offers: { offerId: newOffer._id } } })
    res.redirect('/announcements');
  } catch (error) {
    next(error)
  }
}

const getDeclineOffer = async (req, res, next) => {
  try {
    const announcementId = req.params.announceId;
    const offerId = req.params.offerId;
    await Announcements.findByIdAndUpdate(announcementId, { $pull: { offers: { _id: offerId } } });
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
    await Announcements.findByIdAndUpdate(announcementId, { assigned: true, professional: professionalId })
    res.redirect(`/announcement/${announcementId}`)
  } catch (error) {
    next(error)
  }
}

module.exports = { getAnnouncements, getOneAnnouncement, postMakeOffer, getDeclineOffer, getAcceptOffer }

