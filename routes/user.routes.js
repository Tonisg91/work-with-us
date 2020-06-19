const express = require("express");
const router = express.Router();

const { getMyAccount, editUser } = require('../controllers/user.controllers')

router
  .get("/myaccount", getMyAccount)
  .post("/editUser", editUser)


module.exports = router;