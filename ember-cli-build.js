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
  });

  const { Webpack } = require('@embroider/webpack');
  return require('@embroider/compat').compatBuild(app, Webpack, {
    skipBabel: [
      {
        package: 'qunit',
      },
    ],
    packagerOptions: {
      webpackConfig: {
        module: {
          rules: [
            {
              test: /\.css$/i,
              use: [
                {
                  loader: 'postcss-loader',
                  options: {
                    postcssOptions: {
                      config: 'postcss.config.js',
                    },
                  },
                },
              ],
            },
          ],
        },
      },
    },
  });
};
