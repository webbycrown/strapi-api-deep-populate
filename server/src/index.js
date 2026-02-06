"use strict";

const register = require("./register");
const bootstrap = require("./bootstrap");
const config = require("./config");
const controllers = require("./controllers");
const routes = require("./routes");
const services = require("./services");
const middlewares = require("./middlewares");

// Strapi 5 expects an object (or a function returning an object)
// with these specific lifecycle hooks.
module.exports = {
  register({ strapi }) {
    // If you don't have logic here, leave it empty but keep the function
  },
  bootstrap({ strapi }) {
    // If you don't have logic here, leave it empty but keep the function
  },
  config,
  controllers,
  routes,
  services,
  middlewares, // Ensure this line exists!
};
