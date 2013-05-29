'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */
//product test Scenarios

describe('Product login', function() {

  beforeEach(function() {
    browser().navigateTo('../../app/index.html');
  });

  describe('login_form', function() {

    e2eLogin("sesendpo","fails345", false);

  });

  describe('product list view and detail view', function() {
      it('should automatically redirect to /catalog when the location hash/fragment is empty', function() {
          expect(browser().location().url()).toBe("/catalog");
      });

      it('should render a navigation bar on the side', function() {

          browser().navigateTo('#/catalog');
          pause();
          //check existence of categories
          expect(repeater('.nav-header').count()).toBeGreaterThan(0);
          //okay, there is at least one category, hooray

          pause();
          element('.nav-list a:first').click(); //clicks first category nav link
          element('.nav-header li a:first').click(); //clicks first category's subcategory nav link
          element('.nav-header:nth-child(2) a:first').click(); //clicks second category nav link
          element('.nav-header:nth-child(3) a:first').click(); //clicks third category nav link
          pause();

            //product testing

            //let's use the category navigation code above to click a side nav link, then find a main-content-area subcategory link
            //let's click that link, check that the interopID matches, and look at the product

            //what are the observable attributes and fields of the product, on the product listing view?

            //once we verify the visible properties of the product on the product listing view, let's pick one and click it.

            //what are the observable attributes and fields of the product, on the product detail view?

            //let's check the product object if we can, and verify that the fields match, one by one

            //let's check different types of products...
                      //product type 1
                      //product type 2
                      //etc...


      });

  });

  describe('logout', function(){
    e2eLogout(false);
  });

});

