# Strapi Hello Plugin

A simple Strapi plugin that displays "Hello Plugin" in the global settings.

## Installation

```bash
npm install strapi-plugin-hello
# or
yarn add strapi-plugin-hello
```

## Configuration

The plugin will automatically appear in your Strapi admin panel under the Settings section. No additional configuration is required.

## Development

To develop this plugin locally:

```bash
# Install dependencies
npm install

# Build the plugin
npm run build

# Watch for changes during development
npm run watch
```

## Building for Production

The plugin builds to a `dist` folder that contains:
- `dist/server/` - Server-side code
- `dist/admin/` - Admin panel code (compiled)

When publishing to npm, only the `dist` folder is included in the package.

## Publishing

1. Build the plugin: `npm run build`
2. Publish to npm: `npm publish`

## License

MIT
