'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('451orders UI', function() {

  beforeEach(function() {
    browser().navigateTo('../../app/index.html');
  });


  it('should automatically redirect to /catalog when location hash/fragment is empty', function() {
    expect(browser().location().url()).toBe("/catalog");
  });


  describe('catalog', function() {

    beforeEach(function() {
      browser().navigateTo('#/catalog');
    });


    it('should render catalog when user navigates to catalog', function() {
      expect(element('[ng-view] span:first', 'label1').text()).
        toMatch("Products partial:");
    });

  });


  describe('orders', function() {

    beforeEach(function() {
      browser().navigateTo('#/orders');
    });


    it('should render a navigation bar on the side', function() {

    });

  });
});
