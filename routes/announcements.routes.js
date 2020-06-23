const express = require("express");
const router = express.Router();
const fileUploader = require('../configs/cloudinary.config');

const {
  getAnnouncements,
  getOneAnnouncement,
  postMakeOffer,
  //getDeclineOffer,
  getAcceptOffer,
  editAnnouncement,
  deleteAnnouncement,
  getAddAnnouncement,
  postAddAnnouncement,
  getFinishWork,
  getDeleteOffer
} = require('../controllers/announcements.controller');

router
  .get("/announcements", getAnnouncements)
  .get("/announcement/:id", getOneAnnouncement)
  .get("/delete/:announceId", deleteAnnouncement)
  .get("/declineOffer/:announceId/:offerId", getDeleteOffer) //cambiada porque son la misma función
  .get("/acceptOffer/:announceId/:offerId/:professionalId", getAcceptOffer)
  .get("/addAnnouncement", getAddAnnouncement)
  .get("/finish/:announceId", getFinishWork)
  .get("/deleteOffer/:announceId/:offerId", getDeleteOffer)
  .post("/addAnnouncement", fileUploader.single("photos"), postAddAnnouncement)
  .post("/edit/:announceId", editAnnouncement)
  .post("/makeOffer/:announcementId", postMakeOffer);


module.exports = router;
