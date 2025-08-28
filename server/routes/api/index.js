const Router = require('express').Router();
const profile = require('./Profile.route');
Router.use("/profile",profile)

module.exports = Router;