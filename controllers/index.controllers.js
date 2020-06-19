const User = require("../models/Users.model");

const getIndex = (req, res, next) => {
  res.render("index", { currentUser: req.session.currentUser });
};

const postIndex = (req, res, next) => {
  res.redirect(`/auth/${req.body.email}`);
};

const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate("announcements");
    const currentUser = req.session.currentUser;
    res.render("user/user-profile", { user, currentUser });
  } catch (error) {
    next(error);
  }
};

module.exports = { getIndex, postIndex, getUserProfile };
