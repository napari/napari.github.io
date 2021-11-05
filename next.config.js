const { EnvironmentPlugin } = require('webpack');

module.exports = {
  webpack(config) {
    // Sets BABEL_ENV to `client` or `server` depending on the Next.js build.
    // This is required for the Material UI + babel import plugin to work.
    process.env.BABEL_ENV = config.name;

    config.plugins.push(
      new EnvironmentPlugin({
        // Environment variable for enabling plausible analytics. By default,
        // analytics are enabled for production and staging deployments, but can
        // be enabled manually for testing.
        PLAUSIBLE: 'false',

        // Base URL to use for preview links. By default, 'https://napari.org'
        // will be used, but this can be set during development to test the
        // preview links.
        PREVIEW_BASE_URL: 'https://napari.org',
      }),
    );

    return config;
  },
};
