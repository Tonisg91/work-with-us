const Announcements = require('../models/Announcement.model')

const getAnnouncements = async (req, res, next) => {
  try {
    const list = await Announcements.find();
    const user = req.session.currentUser;
    res.render("announcements/announcement-list", { list, currentUser: user });
  } catch (error) {
    next(error);
  }
}

const getOneAnnouncement = async (req, res, next) => {
  try {
    const announcement = await Announcements.findById(req.params.id);
    const user = req.session.currentUser;
    const announcer = req.session.currentUser._id;
    const isUserTheAnnouncer = announcement.announcer == announcer;
    if (isUserTheAnnouncer) {
      res.render("announcements/announcement", {
        announcement,
        announcer,
        currentUser: user,
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

module.exports = { getAnnouncements, getOneAnnouncement }