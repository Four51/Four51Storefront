'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */
//category navigation test Scenarios

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

////////////////////////////////////////////////////

describe('Category login', function() {
    it("should allow a user to login", function() {
        browser().navigateTo('../../app/index.html');
    });

    e2eLogin("sesendpo","fails345", C_debug);

});

describe('Category side link navigation', function() {

  it('should automatically redirect to /catalog when the location hash/fragment is empty', function() {
      expect(browser().location().url()).toBe("/catalog");
  });

  it('should render a navigation list on the side with one or more categories', function() {

      browser().navigateTo('#/catalog');
      if(C_debug){pause();}

      //check existence of categories, datawise
      expect(repeater('.nav-header').count()).toBeGreaterThan(0);

      //check existence of categories, displaywise
      expect(element('.nav-list a:first')).not().toBeNull(); //do we have a displayed top level category?

      //check the text of the A tag to make sure it matches the top level category name
      expect(element('.nav-list a:first').text()).toEqualFuture(binding('category.Name'));
      //check the href of the A tag to make sure it matches the top level category InteropID
      expect(element('.nav-list a:first').attr('href')).toContainFuture(scope('.nav-header', 'category.InteropID'));

      //okay, there is at least one category, continue

      if(C_debug){pause();}

  });

    it('should render any SUBcategories that exist under each top level category', function() {

        browser().navigateTo('#/catalog');
        if(C_debug){pause();}

        //check existence of categories, datawise
        expect(repeater('.nav-header').count()).toBeGreaterThan(0); //has top level nav

        expect(repeater('.nav-header li a').count()).toBeGreaterThan(0); //has subcategory items, not necessarily hierarchically correct

        expect(element('.nav-header li a:first').text()).toEqualFuture(scope('.nav-header li', 'category.Name'));

        //check the href of the A tag to make sure it matches the top level category InteropID
        expect(element('.nav-list a:first').attr('href')).toContainFuture(scope('.nav-header', 'category.InteropID'));

        //let's see what this has in it:
        if(C_debug){
            console.dir(repeater('.nav-header').row(0)); //this should be an array that has the first category and any subcategories
            console.dir(element('.nav-header li a:first').text()); //should be the first subcategory link
            console.dir(repeater('.nav-header').column(0)); //this includes all categories, top level and sub and sub-sub

            console.dir(repeater('.nav-header li').column('category.Name')); //this is an array of subcategories, although it also includes sub-subcategories

            console.dir(scope('.nav-header li', 'category.InteropID')); //first subcategory's interopid
        };

        if(C_debug){pause();}

    });

    it('should display the top level category we click', function() {

        element('.nav-list a:first').click();       //clicks first category nav link
        //now check that the displayed category matches the nav item we clicked
        expect(binding('currentCategory.Name')).toEqualFuture(scope('.nav-header', 'category.Name'));

        //for a given link, find the interopID of the category
        //the URL hash fragment should have the interopID in it
        expect(browser().window().hash()).toContainFuture(scope('.nav-header', 'category.InteropID'));

      if(C_debug){pause();}

    });

    it('should display the SUBcategory we clicked', function() {

        element('.nav-header li a:first').query(function (selectedElements, done) {

            element('.nav-header li a:first').click();       //clicks first category's subcategory nav link
            expect(binding('currentCategory.Name')).toEqual(selectedElements.text());
            done();
        });

        //for a given link, find the interopID of the SUBcategory
        //click that link
        //check that the URL fragment matches the interopID

        if(C_debug){pause();}

    });

    it('should display the 2nd top level category we clicked', function(){

        element('.nav-header:nth-child(2) a:first').query(function (selectedElements, done) {

            element('.nav-header:nth-child(2) a:first').click();       //clicks second category nav link
            expect(binding('currentCategory.Name')).toEqual(selectedElements.text());
            done();

        });
        if(C_debug){pause();}
    });

    it('should display the 3rd top level category we clicked', function(){

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

describe('Main content area category links', function() {

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

    xit('should TODO', function() {

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

        //----------------------------

        //let's check that the category view shows everything it's supposed to;

        //there's an LI repeater
    });
});

describe('logout/cleanup', function(){
    e2eLogout(C_debug);
});



