const express = require("express");
const routes = express.Router();

const accountRoutes = require("./account.js");
const avatarRoutes = require("./avatar.js")



routes.use(accountRoutes)
routes.use(avatarRoutes)


module.exports = routes;