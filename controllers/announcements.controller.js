const Announcements = require('../models/Announcement.model')

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
    const announcement = await Announcements.findById(req.params.id).populate('offers.professional');
    const user = req.session.currentUser;
    const announcer = req.session.currentUser._id;
    const isUserTheAnnouncer = announcement.announcer == announcer;
    if (isUserTheAnnouncer) {
      res.render("announcements/announcement", {
        announcement,
        announcer,
        currentUser: user
      });
    } else {
      res.render("announcements/announcement", {
        announcement,
        currentUser: user,
      });
    }
  } catch (error) {
    next(error);
  }
}

const postMakeOffer = async (req, res, next) => {
  const announcementId = req.params.announcementId;
  const { professional, estimatedPrice, comments } = req.body;
  await Announcements.findByIdAndUpdate(announcementId, { $push: { offers: { professional, estimatedPrice, comments } } })
  res.redirect('/announcements');
}

const getDeclineOffer = async (req, res, next) => {
  const announcementId = req.params.announceId;
  const offerId = req.params.offerId;
  await Announcements.findByIdAndUpdate(announcementId, { $pull: { offers: { _id: offerId } } });
  res.redirect(`/announcement/${announcementId}`)
}

const getAcceptOffer = async (req, res, next) => {
  const announcementId = req.params.announceId;
  const offerId = req.params.offerId;
  const professionalId = req.params.professionalId;
  await Announcements.findByIdAndUpdate(announcementId, { 'assigned': true, 'professional': professionalId, 'accepted': true })
  res.redirect(`/announcement/${announcementId}`)
}

module.exports = { getAnnouncements, getOneAnnouncement, postMakeOffer, getDeclineOffer, getAcceptOffer }