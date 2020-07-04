const User = require("../models/Users.model");
const Offer = require("../models/Offers.model");
const { capitalize } = require('../tools/stringFn');
const { getMyAccountResponse } = require('../tools/getErrorFn');

const bcryptjs = require("bcryptjs");

const saltRounds = 10;

const getMyAccount = async (req, res, next) => {
  try {
    const userId = req.session.currentUser._id;
    const user = User.findById(userId).populate('announcements').populate('workInProgress');
    req.session.current_url = '/myaccount'
    const offersByTheUser = Offer.find({ professional: userId, accepted: false }).populate('announcement');
    const [currentUser, offers] = await Promise.all([user, offersByTheUser]);
    const errorMessage = getMyAccountResponse(req.query.error);
    if (errorMessage) {
      res.status(400).render("user/my-account", {
        errorMessage,
        currentUser,
        offers
      });
    } else {
      res.render("user/my-account", { currentUser, offers });
    }
  } catch (error) {
    next(error);
  }
};

const editUser = async (req, res, next) => {
  try {
    const userId = req.session.currentUser._id;
    const { oldPwd, newPwd, name, email, city, state, lat, lng, description } = req.body;
    //Mapeo de errores cuando cambiamos password.
    if (newPwd && !oldPwd) {
      res.redirect("/myaccount?error=notOldPwd");
      return;
    } else if (oldPwd) {
      if (!newPwd) {
        res.redirect("/myaccount?error=notNewPwd");
        return;
      } else {
        const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        const validPwd = regex.test(newPwd);
        if (validPwd) {
          const user = await User.findById(userId);
          if (await bcryptjs.compare(oldPwd, user.passwordHash)) {
            const salt = await bcryptjs.genSalt(saltRounds);
            const hashedPassword = await bcryptjs.hash(newPwd, salt);
            // Update de todos los datos actuales en el formulario.
            const updatedUser = await User.findByIdAndUpdate(userId, {
              name,
              email,
              description,
              passwordHash: hashedPassword,
              'location.state': capitalize(state),
              'location.city': capitalize(city),
              'location.lat': lat,
              'location.lng': lng
            }, { new: true });
            req.session.currentUser = updatedUser;
          } else {
            res.redirect("/myaccount?error=oldPwdNok");
            return;
          }
        } else {
          res.redirect("/myaccount?error=newPwdNok");
          return;
        }
      }
    } else {
      // Update de datos sin password.
      const updatedUser = await User.findByIdAndUpdate(userId, {
        name,
        email,
        description,
        'location.state': capitalize(state),
        'location.city': capitalize(city),
        'location.lat': lat,
        'location.lng': lng
      }, { new: true });
      req.session.currentUser = updatedUser;
    }
    res.redirect("/myaccount");
  } catch (error) {
    next(error);
  }
};

module.exports = { getMyAccount, editUser };