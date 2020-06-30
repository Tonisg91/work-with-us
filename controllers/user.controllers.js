const User = require("../models/Users.model");
const Offer = require("../models/Offers.model");
const { capitalize } = require('../tools/stringFn')

const getMyAccount = async (req, res, next) => {
  try {
    const userId = req.session.currentUser._id;
    const user = User.findById(userId).populate('announcements').populate('workInProgress');
    req.session.current_url = '/myaccount'
    const offersByTheUser = Offer.find({ professional: userId, accepted: false }).populate('announcement');
    const [currentUser, offers] = await Promise.all([user, offersByTheUser])
    res.render("user/my-account", { currentUser, offers });
  } catch (error) {
    next(error);
  }
};

const editUser = async (req, res, next) => {
  try {
    const userId = req.session.currentUser._id;
    const { name, email, city, state, lat, lng, description } = req.body
    const updatedUser = await User.findByIdAndUpdate(userId, {
      name,
      email,
      description,
      'location.state': capitalize(state),
      'location.city': capitalize(city),
      'location.lat': lat,
      'location.lng': lng
    });
    req.session.currentUser = updatedUser
    res.redirect("/myaccount");
  } catch (error) {
    next(error);
  }
};

module.exports = { getMyAccount, editUser };