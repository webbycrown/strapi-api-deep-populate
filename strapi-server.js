'use strict';

/**
 * Strapi plugin server entrypoint.
 * Strapi loads this file to register the plugin on the server side.
 *
 * For Strapi v5 with source available (GitHub install), prefer `server/src`
 * so that routes/controllers in that folder are picked up automatically.
 * Fallback to `dist/server` for prebuilt npm packages.
 */
let server;
try {
  server = require('./server/src');
} catch (e) {
  server = require('./dist/server');
}

module.exports = server.default || server;

