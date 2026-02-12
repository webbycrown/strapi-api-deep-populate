# Strapi Deep API-Population Plugin

A lightweight, powerful Strapi 5 plugin that automatically handles deep population for Media fields, Relations, and Nested Components. No more manually adding `populate=*` or complex query strings to your API calls.

## 🎯 Plugin Goal

This plugin solves the "partial population" headache in Strapi by allowing you to define global or per-content-type rules for data fetching.

- **Deep Population**: Automatically populates nested components and dynamic zones.
- **Media & Relations**: Ensure images, videos, and relational data are always included in your API responses.
- **Admin Configuration**: Toggle population settings via a dedicated settings page in the Strapi Admin panel.
- **Zero Query Config**: Clean up your frontend code by removing massive `populate` objects from your fetch requests.

## 📦 Installation

### From NPM (Published Package)

```bash
npm install @webbycrown/strapi-api-deep-populate
```

### From GitHub (Development/Direct Install)

```bash
npm install https://github.com/Webby-Crown/strapi-api-deep-populate.git
```

### Enable in Strapi

Add the plugin to your `config/middleware.js`:

```javascript
  // ADD THIS LINE:
  "plugin::strapi-plugin-api-deep-populate.populate-middleware",
```

## ⚙️ Initial Setup

### 1. Configure Plugin Settings

Navigate to **Settings → Strapi API-Deep Population** in the Strapi admin panel. You'll find several configuration tabs:

#### **Configure Tab**

- **Enable Auto-Populate**: A master toggle to turn the deep population logic on or off globally without needing to restart your server.

## 📚 API Documentation

This plugin does not create new endpoints; instead, it automatically enhances your existing Strapi Content-Type APIs (e.g., /api/articles, /api/pages).

By default, Strapi REST APIs return a "shallow" response. With this plugin enabled, your existing endpoints will now automatically include:

- **Media Fields**: Full URLs and metadata for images, videos, and files.
- **Relations**: Linked data from other Content-Types .
- **Nested Components**: All data within simple components and repeatable components.
- **Dynamic Zones**: Every component within a Dynamic Zone is fully expanded.

## 🐛 Troubleshooting

### Plugin Not Showing

- Verify the location: Navigate to Settings and look under the Global Settings section in the left sidebar.
- Check config/middlewares.js: Ensure the plugin is enabled or not.
- Rebuild Admin: Run npm run build followed by npm run develop to recompile the admin panel with the new settings UI.

---

## 📜 Changelog

### [1.0.0] – Initial Stable Release

🎉 First production-ready release of Strapi API Deep Populate. This plugin provides an automated solution for handling complex data population, ensuring that your API responses include nested media, relations, and components by default.

✨ Added

#### Core Plugin

- Overwrites default Strapi REST API behavior to automatically populate Media fields, Relations, and Nested Components.
- Full population of components within Dynamic Zones without requiring manual populate query parameters.
- Global configuration to set the maximum recursion depth (defaulting to 3 levels) to prevent circular dependency overhead

## Author

**WebbyCrown**

- Email: info@webbycrown.com
- Website: https://webbycrown.com
