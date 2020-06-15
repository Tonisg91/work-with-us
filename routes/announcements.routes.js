const express = require("express");
const router = express.Router();
const Announcements = require("../models/Announcement.model");

router.get("/announcements", async (req, res, next) => {
  const list = await Announcements.find();
  const user = req.session.currentUser;
  res.render("announcements/announcement-list", { list, currentUser: user });
});

router.get("/announcement/:id", async (req, res, next) => {
  const announcement = await Announcements.findById(req.params.id);
  const user = req.session.currentUser;
  const announcer = req.session.currentUser._id;
  if (announcement.announcer == announcer) {
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
});

module.exports = router;
