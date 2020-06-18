const express = require("express");
const router = express.Router();

const { getAnnouncements, getOneAnnouncement, postMakeOffer, getDeclineOffer, getAcceptOffer, editAnnouncement, deleteAnnouncement } = require('../controllers/announcements.controller')

router
  .get("/announcements", getAnnouncements)
  .get("/announcement/:id", getOneAnnouncement)
  .post('/makeOffer/:announcementId', postMakeOffer)
  .get('/declineOffer/:announceId/:offerId', getDeclineOffer)
  .get('/acceptOffer/:announceId/:offerId/:professionalId', getAcceptOffer)
  .post('/edit/:announceId', editAnnouncement)
  .get('/delete/:announceId', deleteAnnouncement);

module.exports = router;
