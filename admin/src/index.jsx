const pluginId = "strapi-api-deep-populate";

export default {
  register(app) {
    // This injects the link into the EXISTING "global-settings" section
    app.addSettingsLinks("global", [
      {
        intlLabel: {
          id: `${pluginId}.settings`,
          defaultMessage: "Strapi API Deep Populate",
        },
        id: "settings",
        to: `/settings/${pluginId}`,
        Component: async () => {
          const component = await import("./pages/Settings");
          return component;
        },
      },
    ]);
  },
  bootstrap(app) {},
};
