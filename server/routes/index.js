const Router = require('express').Router();
const apiRoutes = require('./api');
Router.use("/api",apiRoutes)
Router.use("/api",(res,req,next)=>(
     new Error("Route not found")
))


module.exports = Router;