const User = require("../models/Users.model");
const Offer = require("../models/Offers.model");

const getMyAccount = async (req, res, next) => {
  try {
    const userId = req.session.currentUser._id;
    const user = User.findById(userId).populate('announcements').populate('workInProgress');
    const offersByTheUser = Offer.find({professional: userId, accepted: false}).populate('announcement');
    const [currentUser, offers] = await Promise.all([user, offersByTheUser])
    res.render("user/my-account", { currentUser, offers });
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