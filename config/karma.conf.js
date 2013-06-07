basePath = '../';

files = [
	JASMINE,
	JASMINE_ADAPTER,
	'app/lib/angular/angular.1.1.5.js',
	'app/lib/angular/angular-*.min.js',
	'app/lib/angular/ui-date.js',
	'test/lib/angular/angular-mocks.js',
	'app/lib/angular/ui-bootstrap-0.2.0.js',
    'app/lib/angular/ui-validate.js',
	'app/js/app.js',
	'app/js/**/*.js',
	'test/unit/appSpec.js',
    'test/unit/451Spec.js'
];

autoWatch = true;

browsers = ['Chrome'];

junitReporter = {
	outputFile: 'test_out/unit.xml',
	suite: 'unit'
};
