const User = require("../models/Users.model");
const Offer = require("../models/Offers.model");
const bcryptjs = require("bcryptjs");

const saltRounds = 10;

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
    const {currentUser} = req.session;
    const userId = req.session.currentUser._id;
    const {oldPwd, newPwd} = req.body;
    if (newPwd && !oldPwd) {
      res.status(400).render("user/my-account", {
        errorMessage:
          "Si introduces una nueva contraseña, debes introducir tu anterior contraseña para modificarla",
          currentUser
      });
      return;
    } else if (oldPwd) {
      if (!newPwd) {
        res.status(400).render("user/my-account", {
          errorMessage:
            "Debes introducir una nueva contraseña.",
            currentUser
        });
        return;
      } else {
        const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        const validPwd = regex.test(newPwd);
        if (validPwd) {
          const user = await User.findById(userId);
          if (await bcryptjs.compare(oldPwd, user.passwordHash)) {
            const salt = await bcryptjs.genSalt(saltRounds);
            const hashedPassword = await bcryptjs.hash(newPwd, salt);
            req.body.passwordHash = hashedPassword;
          } else {
            res.status(400).render("user/my-account", {
              errorMessage:
                "La contraseña introducida no coincide, inténtalo de nuevo",
                currentUser
            });
            return;
          }    
        } else {
          res.status(400).render("user/my-account", {
            errorMessage:
              "La nueva contraseña debe tener al menos 6 caracteres, una letra mayúscula, otra minúscula y un número.",
              currentUser
          });
          return;
        }      
      }
    }
    await User.findByIdAndUpdate(userId, req.body);
    res.redirect("/myaccount");
  } catch (error) {
    next(error);
  }
};

module.exports = { getMyAccount, editUser };