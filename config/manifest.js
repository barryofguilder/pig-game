'use strict';

module.exports = function(/* environment, appConfig */) {
  // See https://zonkyio.github.io/ember-web-app for a list of
  // supported properties

  return {
    name: 'Pig Game',
    short_name: 'Pig Game',
    description: 'A companion help to help play the dice game of "Pig".',
    start_url: '/pig-game',
    display: 'standalone',
    background_color: '#9F7AEA',
    theme_color: '#9F7AEA',
    icons: [],
    apple: {
      statusBarStyle: 'black-translucent',
    },
    ms: {
      tileColor: '#9F7AEA',
    },
  };
};
