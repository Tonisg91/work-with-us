const express = require("express");
const router = express.Router();
const {
  getIndex,
  postIndex,
  getUserProfile,
} = require("../controllers/index.controllers");

/* GET home page */
router
  .get("/", getIndex)
  .post("/", postIndex)
  .get("/userProfile/:id", getUserProfile)

module.exports = router;
