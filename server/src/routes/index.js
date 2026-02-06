"use strict";

module.exports = {
  admin: {
    type: "admin",
    routes: [
      {
        method: "GET",
        path: "/settings",
        handler: "populate.getSettings",
        config: { auth: false },
      },
      {
        method: "PUT", // Change from POST to PUT
        path: "/settings",
        handler: "populate.setSettings",
        config: { auth: false },
      },
    ],
  },
};
