'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */
//Product list and view test Scenarios

//handy stuff:
//console.dir(scope('.nav-header', 'tree'));
//console.dir(scope('.nav-header', 'category'));
//console.dir(scope('.nav-header', 'category.Name'));
//console.dir(scope('.nav-header', 'category.InteropID'));
//console.dir(binding('currentCategory.Name'));
/*
 element('.nav-header li a:first').click(); //clicks first category's subcategory nav link
 element('.nav-header:nth-child(2) a:first').click(); //clicks second category nav link
 element('.nav-header:nth-child(3) a:first').click(); //clicks third category nav link
 */

var C_debug = false;

//move these functions into a shared library
angular.scenario.dsl('scope', function() {
    return function(selector, entry) {
        return this.addFutureAction('find scope variable for \'' + selector + '\'',
            function($window, $document, done) {
                var $ = $window.$; // jQuery inside the iframe
                var elem = $(selector);
                if (!elem.length) {
                    return done('No element matched \'' + selector + '\'.');
                }
                var entries = entry.split('.');
                var prop = elem.scope();
                for (var i in entries) {
                    prop = prop[entries[i]];
                }
                done(null, prop);
            });
    };
});
angular.scenario.matcher('toEqualFuture', function(future) {
    return this.actual === future.value;
});
function includes(array, obj) {
    return indexOf(array, obj) != -1;
}
function indexOf(array, obj) {
    if (array.indexOf) return array.indexOf(obj);

    for ( var i = 0; i < array.length; i++) {
        if (obj === array[i]) return i;
    }
    return -1;
}
angular.scenario.matcher('toContainFuture', function(future) {
    return includes(this.actual, future.value);
});
////////////////////////////////////////////////////

describe('Product login', function() {
    it("should allow a user to login", function() {
        browser().navigateTo('../../app/index.html');
    });

    e2eLogin("sesendpo","fails345", C_debug);

});

describe('ProductList: ', function() {

    it('should display some products after a category has been clicked', function() {

        browser().navigateTo('#/catalog');
        //check existence of categories, datawise
        expect(repeater('.nav-header').count()).toBeGreaterThan(0);

        if(C_debug){pause();}

        element('.nav-list a:first').click();       //clicks first category nav link
        //now check that the displayed category matches the nav item we clicked
        expect(binding('currentCategory.Name')).toEqualFuture(scope('.nav-header', 'category.Name'));

        if(C_debug){pause();}

        expect(repeater('#451_lbl_productlist').count()).toBeGreaterThan(0); //there should be at least one product

    });

    it('should let us click a product and display it', function() {

        expect(repeater('#451_lbl_productlist').count()).toBeGreaterThan(0); //there should be at least one product

        var strClickedProductName = element('#451_lbl_productlist:nth-child(2) a').text(); //in this case we'll click the second product because the first throws an error

        element('#451_lbl_productlist:nth-child(2) a').click();       //clicks SECOND product

        var strShowedProductName = binding('product.Name');

        console.dir(strClickedProductName);
        console.dir(strShowedProductName);

        expect(strClickedProductName).toContainFuture(strShowedProductName);

        //console.dir(repeater('#451_lbl_productlist').row(0));
        //console.dir(repeater('#451_lbl_productlist').column('p.Variants.length'));
        //console.dir(scope('#451_lbl_productlist', 'p.StandardPriceSchedule.Name'));
        //console.dir(scope('#451_lbl_productlist', 'p'));

        if(C_debug){pause();}
        //TODO:  add a ton of product scenarios once the product list view and product view are fleshed out.
    });

    xit('should display the 2nd top level category we clicked', function(){

        element('.nav-header:nth-child(2) a:first').query(function (selectedElements, done) {

            element('.nav-header:nth-child(2) a:first').click();       //clicks second category nav link
            expect(binding('currentCategory.Name')).toEqual(selectedElements.text());
            done();

        });
        if(C_debug){pause();}
    });

    xit('should display the 3rd top level category we clicked', function(){

        element('.nav-header:nth-child(3) a:first').query(function (selectedElements, done) {

            element('.nav-header:nth-child(3) a:first').click();       //clicks third category nav link
            expect(binding('currentCategory.Name')).toEqual(selectedElements.text());
            done();

        });

     if(C_debug){pause();}

      //for a given link, find the interopID of the category
      //click that link
      //check that the URL fragment matches the interopID
      //repeat for a subcategory

      //----------------------------

  });
});

xdescribe('Main content area category links', function() {

    it('should NOT display any categories by default', function() {

        browser().navigateTo('#/catalog'); //start fresh on the catalog view
        if(C_debug){pause();}

        //check existence of categories, datawise
        expect(repeater('.nav-header').count()).toBeGreaterThan(0); //there should be categories always, even if not displayed

        //before we click anything, sub category view should not be displayed
        expect(element('451_lbl_curcat')).not().toBeDefined();

        if(C_debug){pause();}
    });

    it('should display the current category in the main area when clicked via side nav', function() {

        browser().navigateTo('#/catalog'); //start fresh on the catalog view
        if(C_debug){pause();}

        //check existence of categories, datawise
        expect(repeater('.nav-header').count()).toBeGreaterThan(0);

        element('.nav-list a:first').query(function (selectedElements, done) {

            element('.nav-list a:first').click();       //clicks first category nav link on side nav
            expect(binding('currentCategory.Name')).toEqual(selectedElements.text());
            expect(element('#451_lbl_curcat').text()).toContain(selectedElements.text());
            done();
        });
    });

    it('should display the current SUBcategory in the main area when clicked via side nav', function() {

        browser().navigateTo('#/catalog'); //start fresh on the catalog view
        if(C_debug){pause();}

        //check existence of categories, datawise
        expect(repeater('.nav-header').count()).toBeGreaterThan(0);

        //might need to add some code here to search for a category that even HAS a SUBcategory...TODO

        expect(repeater('.nav-header li a').count()).toBeGreaterThan(0); //has subcategory items, not necessarily hierarchically correct

        element('.nav-header li a:first').query(function (selectedElements, done) {

            element('.nav-header li a:first').click();       //clicks first category's subcategory nav link
            expect(binding('currentCategory.Name')).toEqual(selectedElements.text());
            expect(element('#451_lbl_curcat').text()).toContain(selectedElements.text());
            done();
        });

        if(C_debug){pause();}
    });


    it('should display the current SUBcategory in the main area when clicked via MAIN area', function() {

        browser().navigateTo('#/catalog'); //start fresh on the catalog view

        //check existence of categories, datawise
        expect(repeater('.nav-header').count()).toBeGreaterThan(0);
        element('.nav-list a:first').click();       //clicks first category nav link on side nav so we can display a subcategory on the main area

        //might need to add some code here to search for a category that even HAS a SUBcategory...TODO

        expect(repeater('#451_lbl_subcatlist ul li a').count()).toBeGreaterThan(0); //has subcategory items, not necessarily hierarchically correct

        element('#451_lbl_subcatlist ul li a:first').query(function (selectedElements, done) {

            var strClickedSubCat = element('#451_lbl_subcatlist ul li a:first').text();

            element('#451_lbl_subcatlist ul li a:first').click();       //clicks first category's subcategory nav link

            expect(element('#451_lbl_curcat').text()).toContainFuture(binding('currentCategory.Name'));
            expect(strClickedSubCat).toContainFuture(binding('currentCategory.Name'));
            done();
        });

        if(C_debug){pause();}

    });

    it('should display the current SUB-SUBcategory in the main area when a SUB-category is clicked via MAIN area', function() {

        browser().navigateTo('#/catalog'); //start fresh on the catalog view

        //check existence of categories, datawise
        expect(repeater('.nav-header').count()).toBeGreaterThan(0);

        //console.dir(element('.nav-header ul li ul li a:first').text()); //this is a sub-sub category
        //var strCurrentSubSubCategory = element('.nav-header ul li ul li a:first').text()

        element('.nav-header ul li:has(ul li) a:first').click();       //clicks the first SUB category it finds (that has a subsub), so we can check the SUB SUB Category is displayed
        //console.dir(element('.nav-header ul li:has(ul li) a:first').text());

        expect(repeater('#451_lbl_subcatlist ul li a').count()).toBeGreaterThan(0); //has subcategory items, not necessarily hierarchically correct

        element('#451_lbl_subcatlist ul li a:first').query(function (selectedElements, done) {

            var strClickedSubCat = element('#451_lbl_subcatlist ul li a:first').text();

            element('#451_lbl_subcatlist ul li a:first').click();       //clicks first category's subcategory nav link

            expect(element('#451_lbl_curcat').text()).toContainFuture(binding('currentCategory.Name'));
            expect(strClickedSubCat).toContainFuture(binding('currentCategory.Name'));
            console.dir(element('#451_lbl_subcatlist ul li a:first').text()); //this is a sub-sub category

            done();
        });

        if(C_debug){pause();}

    });

});

describe('logout/cleanup', function(){
    e2eLogout(C_debug);
});



