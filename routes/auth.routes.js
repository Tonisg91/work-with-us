const express = require("express");
const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const User = require("../models/Users.model");

const router = express.Router();

const saltRounds = 10;

router.get("/auth", (req, res, next) => {
  res.render("auth/auth");
});
router.get("/auth/:email", (req, res, next) => {
  res.render("auth/auth", { email: req.params.email });
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.render("auth/auth", {
        errorMessage: "Email y contraseña son obligatorios.",
      });
      return;
    }
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
});

router.post("/signup", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.render("auth/auth", {
        errorMessage: "Email y contraseña son obligatorios.",
      });
      return;
    }
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!regex.test(password)) {
      res.status(400).render("auth/auth", {
        errorMessage:
          "La contraseña debe tener al menos 6 caracteres, una letra mayúscula, otra minúscula y un número.",
      });
      return;
    }
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
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
