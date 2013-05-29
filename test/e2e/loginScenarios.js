'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */
//login and logout test Scenarios

describe('SPA login', function() {

  beforeEach(function() {
    browser().navigateTo('../../app/index.html');
  });


  xit('should automatically redirect to /catalog when location hash/fragment is empty', function() {
    expect(browser().location().url()).toBe("/catalog");
  });


  describe('login_form', function() {

    e2eLogin("sesendpo","fails345", true);

  });

  describe('logout', function(){
    e2eLogout(true);
  });

});

//more login/logout test scenarios