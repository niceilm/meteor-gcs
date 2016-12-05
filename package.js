Package.describe({
  name: 'flynn:gcs',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'wrapping google-cloud for google cloud storage(gcs)',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/niceilm/meteor-gcs',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Npm.depends({
  "google-cloud": "0.44.2",
  "multer": "1.2.0",
});


Package.onUse(function (api) {
  api.versionsFrom('1.4.2.3');
  api.use('ecmascript');
  api.mainModule('gcs.js', 'server');
});

Package.onTest(function (api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('flynn:gcs');
  api.mainModule('gcs-tests.js');
});
