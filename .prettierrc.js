'use strict';

module.exports = {
  plugins: ['prettier-plugin-ember-template-tag'],
  printWidth: 100,
  overrides: [
    {
      files: '*.{js,ts,gjs,gts}',
      options: {
        singleQuote: true,
      },
    },
  ],
};
