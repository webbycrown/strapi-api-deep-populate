# Strapi API Deep Populate Plugin

A Strapi plugin that automatically populates images, relations, and nested components in your API responses based on configurable settings.

## Features

- **Auto-populate Images**: Automatically includes all media fields and single/multiple images in API responses
- **Auto-populate Relations**: Automatically populates linked entries and relational data fields
- **Auto-populate Components**: Ensures that nested components and dynamic zones are fully expanded in JSON output
- **Configurable Settings**: Control which content types should auto-populate which fields through an intuitive admin interface

## Installation

```bash
npm install @webby-crown/strapi-api-deep-populate
```

## Configuration

1. After installation, restart your Strapi application
2. Go to Settings > Strapi API Deep Populate in your Strapi admin panel
3. Configure which content types should auto-populate images, relations, and components

## Usage

Once configured, your API endpoints will automatically include populated data based on your settings. No changes to your frontend code are required!

## How it works

The plugin adds middleware to your Strapi API that automatically modifies queries to include population parameters based on your configuration. This ensures that:

- Images are fully populated with URLs and metadata
- Relations are populated with complete linked entry data
- Components are fully expanded with all nested data

## Development

```bash
# Clone the repository
git clone https://github.com/Webby-Crown/strapi-api-deep-populate.git

# Install dependencies
npm install

# Build the plugin
npm run build

# The dist folder will be auto-generated with compiled admin and server code
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details.

## Support

If you find this plugin helpful, please give it a ⭐ on GitHub!