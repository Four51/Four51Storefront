basePath = '../';

files = [
  JASMINE,
  JASMINE_ADAPTER,
  'app/lib/angular/angular.js',
  'app/lib/angular/angular.1.1.4.js',  //unsure if including both these is good or bad or what...
  'app/lib/angular/angular-*.js',  //I don't really like implicitly loading these scripts if unnecessary.  Should we explicitly load them? -RM
  'test/lib/angular/angular-mocks.js',
  'app/lib/angular/ui-bootstrap-0.2.0.js',
  'app/js/app.js',
  'app/js/451.js',
  'app/js/**/*.js',
  'test/unit/appSpec.js',,
  //'test/unit/451Spec.js'
];

autoWatch = true;

browsers = ['Chrome'];

junitReporter = {
  outputFile: 'test_out/unit.xml',
  suite: 'unit'
};
