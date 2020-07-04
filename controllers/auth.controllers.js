const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const User = require("../models/Users.model");

const saltRounds = 10;

//Renderiza la página de autentificación
const getAuth = (req, res, next) => {
  res.render("auth/auth")
}

//Renderiza la página de autentificación predefiniendo el correo introducido en la página principal
const getAuthEmail = (req, res, next) => {
  res.render("auth/auth", { email: req.params.email });
}

//Controlador función login
const postLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //Condición 1: los 2 campos del login están completos
    const hasAllFields = !email || !password;
    if (hasAllFields) {
      res.render("auth/auth", {
        errorMessage: "Email y contraseña son obligatorios.",
      });
      return;
    }
    //Condición 2: el usuario existe en la base de datos con ese correo
    const user = await User.findOne({ email });
    if (!user) {
      res.render("auth/auth", {
        errorMessage: "El usuario no existe. Inténtelo con otro email.",
      });
      return;
    } else if (await bcryptjs.compare(password, user.passwordHash)) {
      req.session.currentUser = user;
      res.redirect("/myaccount");
    } else {
      res.render("auth/auth", { errorMessage: "La contraseña no es válida." });
    }
  } catch (error) {
    next(error);
  }
}

//Controlador función registro
const postSignup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //Condición 1: todos los campos completos
    const hasAllFields = !email || !password;
    if (hasAllFields) {
      res.render("auth/auth", {
        errorMessage: "Email y contraseña son obligatorios.",
      });
      return;
    }
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    //Condición 2: la contraseña cumple con los requisitos de seguridad
    const validPwd = !regex.test(password);
    if (validPwd) {
      res.status(400).render("auth/auth", {
        errorMessage:
          "La contraseña debe tener al menos 6 caracteres, una letra mayúscula, otra minúscula y un número.",
      });
      return;
    }
    //Encriptación de la contraseñauma vez validada
    const salt = await bcryptjs.genSalt(saltRounds);
    const hashedPassword = await bcryptjs.hash(password, salt);
    //Creacion del usuario con exito.
    const user = await User.create({
      email: email,
      passwordHash: hashedPassword,
    });
    console.log("Usuario creado con exito.");
    //Session
    req.session.currentUser = user;
    res.redirect("/myaccount");
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(400).render("auth/auth", { errorMessage: error.message });
    } else if (error.code === 11000) {
      res.status(400).render("auth/auth", {
        errorMessage: "Username o correo ya existen...",
      });
    } else {
      next(error);
    }
  }
}

//Cierre de sesión
const getLogout = (req, res) => {
  req.session.destroy();
  res.redirect("/");
}

module.exports = { getAuth, getAuthEmail, postLogin, postSignup, getLogout }