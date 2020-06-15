const express = require("express");
const User = require("../models/Users.model");
const Announcement = require("../models/Announcement.model");
const router = express.Router();

router.get("/myaccount", async (req, res, next) => {
  const userId = req.session.currentUser._id;
  const user = await User.findById(userId);
  res.render("user/my-account", { currentUser: user });
});

router.post("/editUser", async (req, res, next) => {
  const userId = req.session.currentUser._id;
  await User.findByIdAndUpdate(userId, req.body);
  res.redirect("/myaccount");
});

//ADD ANNOUNCEMENT
router.get("/addAnnouncement", async (req, res, next) => {
  const user = req.session.currentUser;
  res.render("user/add-announcement", { currentUser: user });
});

router.post("/addAnnouncement", async (req, res, next) => {
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
});

module.exports = router;
