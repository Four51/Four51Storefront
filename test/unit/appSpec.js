'use strict';

/* jasmine specs for modules go here */

describe('App Module:', function(){
  var module;
  module = angular.module("451orders");

  it('should be registered.', inject(function() {
    expect(module).not.toBe(null);
  }));
});

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