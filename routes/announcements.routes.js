const express = require("express");
const router = express.Router();
const Announcements = require("../models/Announcement.model");
const { getAnnouncements, getOneAnnouncement } = require('../controllers/announcements.controller')

router
  .get("/announcements", getAnnouncements)
  .get("/announcement/:id", getOneAnnouncement);

module.exports = router;
