const User = require("../models/Users.model");

//Controlador para la ruta de la página principal
const getIndex = (req, res, next) => {
  res.render("index", { currentUser: req.session.currentUser });
};

//Envía el correo que escribas para crear una nueva cuenta y te redirige a la página de autentificación
const postIndex = (req, res, next) => {
  res.redirect(`/auth/${req.body.email}`);
};

//Página que muestra los detalles de un usuario junto con sus reseñas
const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate("announcements").populate('reviews');
    const currentUser = req.session.currentUser;
    res.render("user/user-profile", { user, currentUser });
  } catch (error) {
    next(error);
  }
};

module.exports = { getIndex, postIndex, getUserProfile };
