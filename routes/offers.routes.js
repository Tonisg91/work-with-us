const express = require("express");
const router = express.Router();
const { postEditOffer } = require('../controllers/offers.controller')

router.post("/edit/:offerId/:announceId", postEditOffer);

module.exports = router;