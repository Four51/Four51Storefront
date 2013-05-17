'use strict';

/* jasmine specs for modules go here */

describe('App Module:', function(){
  var module;
  module = angular.module("451order");

  it('should be registered.', inject(function() {
    expect(module).not.toBe(null);
  }));
});

describe('$451 Factory:',inject(function(){
	var $451;
	beforeEach(module('451order'));
	beforeEach(inject(function(_$451_) {
		$451 = _$451_;
	}));
	console.dir($451);
	it('Should return api url', function() {
		var url = $451.api('order');
		expect(url).toBe('/api/' + $451.appname + '/order');
	});
}));

//'x'ed out until it works
xdescribe('Filters: html...', function(){

    var myfilter; myfilter = $filter("html");

    var filterHtml = module.$filter('html');
  xit("should allow HTML to pass through and NOT be htmlencoded",
    inject(function(myfilter) {
        expect(myfilter("<html>")).toBe("<html>");

    })
  );
    //htmlfilter = new 451orders.filter(html);


});