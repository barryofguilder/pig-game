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

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};
