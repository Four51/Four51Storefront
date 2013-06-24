'use strict';
//this file contains test specs for app.js

/* jasmine specs for modules go here */

//test that the app module can be instantiated
describe('App Module:', function(){
  var module;
  module = angular.module("451order");

  it('should be registered.', inject(function() {
    expect(module).toBeDefined;
  }));
});