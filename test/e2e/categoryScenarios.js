'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */
//category navigation test Scenarios

describe('Category login', function() {

  beforeEach(function() {
    browser().navigateTo('../../app/index.html');
  });

  describe('login_form', function() {

    e2eLogin("sesendpo","fails345", false);

  });

  describe('category link navigation', function() {
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

          //let's test that subcategories under categories link to the same place they do when they are displayed in the content area

          //for a given link, find the interopID of the category

          //click that link

          //check that the URL fragment matches the interopID

          //repeat for a subcategory

          //----------------------------

          //now, let's find the categories in the main content area

          //for a given link, find the interopID of the category

          //click that link

          //check that the URL fragment matches the interopID

          //repeat for a subcategory


      });

  });

  describe('logout', function(){
    e2eLogout(false);
  });

});

