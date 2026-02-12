'use strict';

/**
 * Strapi plugin admin entrypoint.
 * Strapi loads this file to register the plugin in the Admin panel.
 */
// Prefer source code so Strapi v5's Vite bundler can compile it natively.
// Fallback to the pre-built dist bundle if admin/src is not present
// (e.g. when installed from a precompiled package).
let admin;
try {
  // Works when the repo (with admin/src) is installed from GitHub
  admin = require('./admin/src');
} catch (e) {
  // Fallback for environments that only have the Webpack bundle
  admin = require('./dist/admin');
}

// Webpack marks the plugin as the default export; fall back to CJS export.
module.exports = admin.default || admin;

