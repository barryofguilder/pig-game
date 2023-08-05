'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const isProduction = EmberApp.env() === 'production';

const disabledAddons = [];
if (!isProduction && !process.env.ENABLE_SW) {
  // disable service workers by default for dev and testing
  disabledAddons.push('ember-service-worker');
}

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    addons: {
      exclude: disabledAddons,
    },

    'asset-cache': {
      include: ['assets/**/*'],
    },

    'ember-service-worker': {
      registrationStrategy: 'inline',
    },

    postcssOptions: {
      compile: {
        plugins: [
          require('postcss-import')({ path: ['node_modules'] }),
          require('tailwindcss')('app/tailwind.config.js'),
          require('autoprefixer'),
        ],
        cacheInclude: [/.*\.(css|hbs)$/, /.tailwind\.config\.js$/],
      },
    },
  });

  return app.toTree();
};
