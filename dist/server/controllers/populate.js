"use strict";

module.exports = ({ strapi }) => ({
 

  async getSettings(ctx) {
    try {
      const store = strapi.store({ type: "plugin", name: "strapi-plugin-api-deep-populate" });
      const savedSettings = (await store.get({ key: "settings" })) || {};

      const contentTypes = strapi.contentTypes;
      const response = {};

      Object.keys(contentTypes).forEach((uid) => {
        if (uid.startsWith("api::")) {
          // Get the friendly name from the Content-Type info
          const displayName = contentTypes[uid].info.displayName;

          response[uid] = {
            // Keep existing settings if they exist, otherwise use defaults
            ...(savedSettings[uid] || {
              showImages: true,
              showRelations: false,
              showComponents: true,
            }),
            // Add the friendly name to the response
            displayName: displayName || uid,
          };
        }
      });

      ctx.body = response;
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async setSettings(ctx) {
    try {
      const store = strapi.store({ type: "plugin", name: "strapi-plugin-api-deep-populate" });

      // OPTIONAL: Clean the data before saving so you don't save 'displayName' in the DB
      const dataToSave = { ...ctx.request.body };
      Object.keys(dataToSave).forEach((key) => {
        delete dataToSave[key].displayName;
      });

      await store.set({ key: "settings", value: dataToSave });
      ctx.body = { ok: true };
    } catch (err) {
      ctx.throw(500, err);
    }
  },
});
