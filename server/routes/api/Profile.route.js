const Router = require('express').Router();
const createProfile = require('../../controller/createProfile');
const getProfile = require('../../controller/getProfile');
const deleteProfile = require('../../controller/deleteProfile');
Router.post("/createProfile",createProfile)
Router.get("/getProfile",getProfile)
Router.delete("/deleteProfile/:id",deleteProfile)

module.exports = Router;