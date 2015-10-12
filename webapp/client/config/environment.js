/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'client',
    environment: environment,
    contentSecurityPolicy: { 'connect-src': "'self' wss://*.firebaseio.com" },
    firebase: 'https://autora.firebaseio.com/',
    s3Url: 'https://s3-us-west-2.amazonaws.com/autora/',
    filepickerKey: 'Aef4kE5lHRcGgWuoUQou9z',
    baseURL: '/',
    locationType: 'auto',
    googleFonts: [
      'Roboto:100,300,400,500,600,700'
    ],

    // Set or update content security policies
    contentSecurityPolicy: {
      'font-src': "'self' fonts.gstatic.com",
      'style-src': "'self' fonts.googleapis.com",
      'img-src': "'self' www.gravatar.com placeholdit.imgix.net *.placehold.it www.filepicker.io *.amazonaws.com",
      'default-src': 'none',
      'frame-src': '*'
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };
  ENV['exportApplicationGlobal'] = true;
  // ENV['simple-auth'] = {
  //     authorizer: 'simple-auth-authorizer:firebase'
  //   };
  ENV['simple-auth'] = {
  // store: 'simple-auth-session-store:local-storage',
  session: 'session:custom'
}

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.contentSecurityPolicy['script-src'] = "'self' 'unsafe-inline' *";
    ENV.contentSecurityPolicy['style-src'] = "'self' 'unsafe-inline' fonts.googleapis.com";
    ENV.contentSecurityPolicy['connect-src'] = "'self' *";
    ENV.firebase = 'https://autora-dev.firebaseio.com/';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
  }

  return ENV;
};
