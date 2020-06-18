const express = require("express");
const router = express.Router();
const { getAuth, getAuthEmail, postLogin, postSignup, getLogout } = require('../controllers/auth.controllers')

router
  .get("/auth", getAuth)
  .get("/auth/:email", getAuthEmail)
  .get("/logout", getLogout)
  .post("/login", postLogin)
  .post("/signup", postSignup)

module.exports = router;
