const express = require("express");
const router = express.Router();
const User = require("../models/Users.model");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index", { currentUser: req.session.currentUser });
});

router.get("/userProfile/:id", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.render("user-profile", user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
