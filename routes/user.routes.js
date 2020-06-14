const express = require("express");
const User = require("../models/Users.model");
const router = express.Router();

router.get("/myaccount", (req, res, next) => {
  const user = req.session.currentUser;
  res.render("user/my-account", { user });
});

router.post("/editUser", async (req, res, next) => {
  const userId = req.session.currentUser._id;
  console.log(req.body);
  await User.findByIdAndUpdate(userId, req.body);
  res.redirect("/myaccount");
});

module.exports = router;
