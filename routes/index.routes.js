const express = require("express");
const router = express.Router();
const User = require("../models/Users.model");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index", { currentUser: req.session.currentUser });
});
router.post("/", (req, res, next) => {
  res.redirect(`/auth/${req.body.email}`);
});

router.get("/userProfile/:id", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate("announcements");
    const currentUser = req.session.currentUser;
    res.render("user-profile", { user, currentUser });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
