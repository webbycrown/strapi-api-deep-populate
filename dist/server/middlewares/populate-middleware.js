"use strict";

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    console.log("Middleware called");
    // 1. Updated check: Allow both GET and POST methods for API requests
    const allowedMethods = ["GET", "POST"];

    if (!allowedMethods.includes(ctx.method) || !ctx.path.startsWith("/api/")) {
      return await next();
    }

    const pathParts = ctx.path.split("/");
    const slug = pathParts[2];

    // 2. Find the content type UID
    const contentType = Object.values(strapi.contentTypes).find(
      (ct) => ct.info.singularName === slug || ct.info.pluralName === slug,
    );

    if (contentType) {
      const uid = contentType.uid;

      // 3. Get all settings from the Plugin Store
      const store = strapi.store({
        type: "plugin",
        name: "strapi-plugin-api-deep-populate",
      });
      const savedSettings = await store.get({ key: "settings" });

      // 4. Extract settings specific to THIS UID
      const apiSettings = savedSettings?.[uid] || {
        showImages: true,
        showRelations: false,
        showComponents: true,
      };

      console.log(
        `Applying population for ${ctx.method} request on ${uid}:`,
        apiSettings,
      );

      // 5. Call the service with the UID-specific toggles
      const dynamicPopulate = strapi
        .plugin("strapi-plugin-api-deep-populate")
        .service("populate")
        .getPopulateStructure(
          uid,
          apiSettings.showImages,
          apiSettings.showRelations,
          apiSettings.showComponents,
        );

      if (dynamicPopulate) {
        // For POST requests, Strapi usually looks for 'populate' in the body or query
        // We set it in ctx.query to ensure the underlying controller sees it.
        ctx.query.populate = dynamicPopulate;
      }
    }

    await next();
  };
};
