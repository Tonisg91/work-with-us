const express = require("express");
const router = express.Router();
const Announcements = require("../models/Announcement.model");

router.get("/announcements", async (req, res, next) => {
  const list = await Announcements.find();
  res.render("announcements/announcement-list", { list });
});

router.get("/announcement/:id", async (req, res, next) => {
  const announcement = await Announcements.findById(req.params.id);
  const announcer = req.session.currentUser._id;
  if (announcement.announcer == announcer) {
    res.render("announcements/announcement", { announcement, announcer });
  } else {
    res.render("announcements/announcement", { announcement });
  }
});

module.exports = router;
