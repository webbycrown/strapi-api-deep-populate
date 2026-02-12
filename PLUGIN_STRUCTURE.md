# Plugin Structure

This Strapi plugin is structured to be built and distributed via npm with only the `dist` folder.

## Structure

```
.
├── admin/
│   └── src/
│       ├── components/
│       │   ├── Initializer.js
│       │   └── PluginIcon.js
│       ├── pages/
│       │   └── Settings/
│       │       └── index.js
│       └── index.js
├── server/
│   └── src/
│       ├── config/
│       │   └── schema.json
│       └── index.js
├── scripts/
│   └── build.js
├── dist/ (generated on build)
│   ├── admin/
│   └── server/
├── package.json
├── README.md
└── .gitignore
```

## Build Process

1. Run `npm run build` to compile the plugin
2. The build script:
   - Cleans the `dist` folder
   - Copies server files to `dist/server`
   - Compiles admin React code to `dist/admin` using webpack
3. Only the `dist` folder is published to npm

## Installation in Strapi Project

Users install the plugin via:
```bash
npm install strapi-plugin-hello
```

The plugin will automatically:
- Register in Strapi's plugin system
- Appear in Global Settings
- Show "Hello Plugin" when opened

## Development

- `npm run build` - Build for production
- `npm run watch` - Watch mode for development
- `npm run develop` - Development mode with watch
