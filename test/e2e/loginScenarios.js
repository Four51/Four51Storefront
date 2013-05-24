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


    it('should appear before the user performs valid login', function() {
        expect(element('#login_box').count()).toBe(1);
        //we found a login box.  is login_box the best way to check for it's existence?

    });

      it('should allow us to enter a user/pass', function(){
      //can we build an include file or link to some common function library to reuse this?
      //if we reuse this code, pass user/pass as an argument to the function

      //enter user & password
      input("user.Username").enter("sesendpo");
      input("user.Password").enter("fails345");

      //alert("about to log in!");

      //expect(input("user.Username").val().toBe("sesendpo"));
      element("#451_btn_login").click();

          it('should automatically redirect to /catalog when location hash/fragment is empty', function() {
              expect(browser().location().url()).toBe("/catalog");
          });

      //alert("just loggeded in!");

      });

      //now test for logout
      xit('should allow us to logout the current user via the logout button', function(){
         //find the logout button and click it
          //alert("about to logout!");
          element("#451_btn_logout").click();
          //alert("logged out!");

      });


  });

});

describe('Categories:', function() {

    beforeEach(function() {
        browser().navigateTo('#/catalog');
    });

    it('should render a navigation bar on the side', function() {
        //check existence of categories
        expect(repeater('.nav-header').count()).toBeGreaterThan(0);
        //okay, there is at least one category, hooray

        pause();
        element('.nav-list a:first').click(); //clicks first category nav link
        pause();
        element('.nav-header li a:first').click(); //clicks first category's subcategory nav link
        pause();
        element('.nav-header:nth-child(2) a:first').click(); //clicks second category nav link
        pause();
        element('.nav-header:nth-child(3) a:first').click(); //clicks third category nav link
        pause();

        //let's test that subcategories under categories link to the same place they do when they are displayed in the content area


    });

});


describe('orders', function() {

    beforeEach(function() {
      browser().navigateTo('#/orders');
    });

      it('should display order search fields', function() {
         //check existence of order search fields
      });

      it('should display order lists', function() {
          //check existence of various order list controls
      });

});
