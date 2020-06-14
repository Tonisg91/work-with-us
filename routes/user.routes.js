const express = require("express");
const router = express.Router();

/* GET My account */
router.get("/myaccount", (req, res, next) => {
  res.render("user/my-account", { currentUser: req.session.currentUser });
});

module.exports = router;
