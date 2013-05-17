basePath = '../';

files = [
	JASMINE,
	JASMINE_ADAPTER,
	'app/lib/angular/angular.1.1.4.js',
	'app/lib/angular/angular-*.min.js',
	'test/lib/angular/angular-mocks.js',
	'app/lib/angular/ui-bootstrap-0.2.0.js',
	'app/js/app.js',
	'app/js/**/*.js',
	'test/unit/appSpec.js'
];

autoWatch = true;

browsers = ['Chrome'];

junitReporter = {
	outputFile: 'test_out/unit.xml',
	suite: 'unit'
};
