const express = require("express");
const logRouter = express.Router();

const User = require("./../models/User");

const bcrypt = require("bcrypt");
const zxcvbn = require("zxcvbn");
const saltRounds = 10;

logRouter.post("/", (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then(user => {
      if (!user) {
        res.render("login", { errorMsg: "This email isn't registered!" });
        return;
      }

      const passwordDB = user.password;
      const correctPassword = bcrypt.compareSync(password, passwordDB);

      if (correctPassword) {
        req.session.currentUser = user;
        res.redirect("/homepage");
      } else {
        res.render("login", { errorMsg: "Wrong password, bitch!" });
      }
    })
    .catch(err => console.log("There was an error logging in,"(err)));
});

logRouter.get("/", (req, res) => {
  res.render("login");
});

module.exports = logRouter;
