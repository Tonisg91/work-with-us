const User = require("../models/Users.model");

const getMyAccount = async (req, res, next) => {
  try {
    const userId = req.session.currentUser._id;
    const user = await User.findById(userId).populate('announcements').populate('workInProgress');
    res.render("user/my-account", { currentUser: user });
  } catch (error) {
    next(error);
  }
};

const editUser = async (req, res, next) => {
  try {
    const userId = req.session.currentUser._id;
    await User.findByIdAndUpdate(userId, req.body);
    res.redirect("/myaccount");
  } catch (error) {
    next(error);
  }
};



module.exports = { getMyAccount, editUser };