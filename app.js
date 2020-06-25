require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const favicon = require("serve-favicon");
const hbs = require("hbs");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);
//DB CONFIGS
require("./configs/db.config");

//ROUTER
const index = require("./routes/index.routes");
const auth = require("./routes/auth.routes");
const user = require("./routes/user.routes");
const announcement = require("./routes/announcements.routes");
const reviews = require("./routes/review.routes");

const app = express();

//Session
const createSession = require("./configs/session.config");
createSession(app);

// Middleware Setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(
  require("node-sass-middleware")({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    sourceMap: true,
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

// default value for title local
app.locals.title = "Express - Generated with IronGenerator";

app.use("/", index);
app.use("/", auth);
app.use("/", user);
app.use("/", announcement);
app.use('/', reviews);

module.exports = app;
