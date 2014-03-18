basePath = '../';

files = [
	JASMINE,
	JASMINE_ADAPTER,
	'app/lib/angular/angular.1.1.5.js',
	'app/lib/angular/angular-*.min.js',
	'test/lib/angular/angular-mocks.js',
    'app/lib/angular/ui-validate.js',
    'app/lib/angular/ui-mask.js',
    'app/lib/jquery-2.0.0.js',
	'app/js/app.js',
	'app/js/**/*.js',

	'config/Four51APIAppName.js',
	'test/unit/appSpec.js',
    'test/unit/filtersSpec.js',
    'test/unit/451Spec.js',
    'test/unit/directivesSpec.js',
    'test/unit/routingSpec.js',
    'test/unit/categorySpec.js',
    'test/unit/addressSpec.js',
    'test/unit/messagesSpec.js',
    'test/unit/productSpec.js'

];

autoWatch = true;

browsers = ['Chrome'];

junitReporter = {
	outputFile: 'test_out/unit.xml',
	suite: 'unit'
};
