const express = require("express");
const Router = express.Router();
const catchAsync = require("../utils/catchAsync");
const users = require("../controllers/users");
const passport = require("passport");

Router.route("/register")
  .get(users.renderRegister)
  .post(catchAsync(users.register));

Router.route("/login")
  .get(users.renderLogin)
  .post(passport.authenticate("local", { failureFlash: true, failureRedirect: "/login",}), users.login);

Router.get("/logout", users.logout);

module.exports = Router;
