'use strict';

module.exports = {
  printWidth: 100,
  singleQuote: true,
  overrides: [
    {
      files: 'app/**/*.hbs',
      options: {
        singleQuote: false,
      },
    },
  ],
};
