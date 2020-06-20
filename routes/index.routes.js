const express = require("express");
const router = express.Router();
const C = require('../controllers/index.controllers')


/* GET home page */
router
  .get("/", C.getIndex)
  .post("/", C.postIndex)
  .get("/userProfile/:id", C.getUserProfile)

module.exports = router;
