const User = require("../models/Users.model");
const Announcement = require("../models/Announcement.model");

const getMyAccount = async (req, res, next) => {
  try {
    const userId = req.session.currentUser._id;
    const user = await User.findById(userId).populate('announcements');
    res.render("user/my-account", { currentUser: user });
  } catch (error) {
    next(error);
  }
};

const editUser = async (req, res, next) => {
  try {
    const userId = req.session.currentUser._id;
    await User.findByIdAndUpdate(userId, req.body);
    res.redirect("/myaccount");
  } catch (error) {
    next(error);
  }
};

const getAddAnnouncement = async (req, res, next) => {
  try {
    const user = req.session.currentUser;
    res.render("user/add-announcement", { currentUser: user });
  } catch (error) {
    next(error);
  }
}

const postAddAnnouncement = async (req, res, next) => {
  try {
    const announcerId = req.session.currentUser._id;
    const { title, description, photos } = req.body;
    const newAnnouncement = await Announcement.create({
      title: title,
      description: description,
      photos: photos,
      announcer: announcerId,
    });
    const newAnnouncementId = newAnnouncement._id;
    await User.findByIdAndUpdate(announcerId, {
      $push: { announcements: newAnnouncementId },
    });
    res.redirect("/myAccount");
  } catch (error) {
    next(error);
  }
}

module.exports = { getMyAccount, editUser, getAddAnnouncement, postAddAnnouncement };