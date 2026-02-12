"use strict";

const routes = require("./routes");
const controllers = require("./controllers");
const middlewares = require("./middlewares");
const services = require("./services");

module.exports = () => ({
  register({ strapi }) {},
  bootstrap({ strapi }) {},
  routes,
  controllers,
  middlewares,
  services,
});
