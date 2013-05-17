'use strict';

/* jasmine specs for modules go here */

xdescribe('App Module:', function(){
  var module;
  module = angular.module("451order");

  var $injector = angular.injector([ '451order' ]);
  var myService = $injector.get( 'myService' );
  expect( myService.one ).toEqual(1);

  xit('should be registered.', inject(function() {
    expect(module).not.toBe(null);
  }));
});

describe('451 Module:', function(){
    var module;
    module = angular.module("451order");

    it('should be a real object.', inject(function() {
        expect(module).not.toBe(null);
    }));
});

//'x'ed out until it works
xdescribe('Filters: html...', function(){

    var myHtmlFilter;
    myHtmlFilter = four51.app.filter("html");

    //var filterHtml = module.$filter('html');
  xit("should allow HTML to pass through and NOT be htmlencoded",
    inject(function(myHtmlFilter) {
        expect(myHtmlFilter("<html>")).toBe("<html>");

    })
  );
    //htmlfilter = new 451orders.filter(html);


});