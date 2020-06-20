const express = require("express");
const router = express.Router();

const { postAddReview, getAddReview } = require("../controllers/review.controllers");

router
  .get('/addreview/:professionalId', getAddReview)
  .post('/addreview/:professionalId', postAddReview)

module.exports = router;