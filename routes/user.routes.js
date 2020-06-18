const express = require("express");
const router = express.Router();

const { getMyAccount, editUser, getAddAnnouncement, postAddAnnouncement } = require('../controllers/user.controllers')

router
  .get("/myaccount", getMyAccount)
  .post("/editUser", editUser)
  .get("/addAnnouncement", getAddAnnouncement)
  .post("/addAnnouncement", postAddAnnouncement);

module.exports = router;