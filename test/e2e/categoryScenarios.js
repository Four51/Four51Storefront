'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */
//category navigation test Scenarios

//handy stuff:
//console.dir(scope('.nav-header', 'tree'));
//console.dir(scope('.nav-header', 'category'));
//console.dir(scope('.nav-header', 'category.Name'));
//console.dir(scope('.nav-header', 'category.InteropID'));

//console.dir(binding('currentCategory.Name'));

var C_debug = true;

//move this function into a shared library
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

      //iterate through the repeater and check that the category binding (tree?) match the links that are generated?

      if(C_debug){

          for (var i = 0; i < repeater('.nav-header').count(), i++;)
          {
             console.dir(repeater('.nav-header').row(i));
              alert("test" & i);
          }


          pause();
      }

  });

    it('should display the top level category we clicked', function() {

        //for a given link, find the interopID of the category

        //click that link

        //check that the URL fragment matches the interopID

        //repeat for a subcategory

        element('.nav-list a:first').query(function (selectedElements, done) {

            element('.nav-list a:first').click();       //clicks first category nav link


            if(C_debug){
                console.dir(repeater('.nav-header').count());
                for (var i = 0; i < repeater('.nav-header').count(), i++;)
                {
                    console.dir(repeater('.nav-header').row(i));
                }
                var strCategoryName = scope('.nav-header', 'category.Name');
                //expect(element('.nav-list a:first').text()).toEqual(scope('.nav-header', 'category.Name'));
                //expect(scope('.nav-header', 'category.Name')).toEqualFuture(binding('currentCategory.Name'));
                expect(scope('.nav-header', 'category.Name')).toEqualFuture(binding('currentCategory.Name'));
                //expect(binding('currentCategory.Name')).toEqual(scope('.nav-header', 'category.Name'));

                console.dir(binding('category.Name'));
                console.dir(scope('.nav-header', 'category'));

                console.dir(binding('currentCategory.Name'));
                //console.dir(binding('currentCategory.InteropID'));

                pause();
            }

            // The "selectedElements.text()" is getting this string "<a ..> HERE </a>"
            // from the link.
            //
            // (NOTE: This is a JQuery ".text()", NOT an Angular one!)
            expect(binding('currentCategory.Name')).toEqual(selectedElements.text());  //check that the currentCategory.Name binding is the one we clicked

            done();
        });

        element('.nav-list a:first').query(function (selectedElements, done) {

          element('.nav-list a:first').click();       //clicks first category nav link


            if(C_debug){
                console.dir(repeater('.nav-header').count());
                for (var i = 0; i < repeater('.nav-header').count(), i++;)
                {
                    console.dir(repeater('.nav-header').row(i));
                }



                console.dir(binding('category.Name'));
                console.dir(scope('.nav-header', 'category'));

                console.dir(binding('currentCategory.Name'));
                //console.dir(binding('currentCategory.InteropID'));

                pause();
            }

          // The "selectedElements.text()" is getting this string "<a ..> HERE </a>"
          // from the link.
          //
          // (NOTE: This is a JQuery ".text()", NOT an Angular one!)
          expect(binding('currentCategory.Name')).toEqual(selectedElements.text());  //check that the currentCategory.Name binding is the one we clicked

          done();
      });
      if(C_debug){pause();}

    });

    it('should display the SUBcategory we clicked', function() {

        element('.nav-header li a:first').query(function (selectedElements, done) {

            element('.nav-header li a:first').click();       //clicks first category's subcategory nav link
            expect(binding('currentCategory.Name')).toEqual(selectedElements.text());
            done();
        });
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

describe('main content area category links', function() {

    it('should render the categories in the main content area', function() {

        browser().navigateTo('#/catalog');
        if(C_debug){pause();}

        //check existence of categories
        expect(repeater('.nav-header').count()).toBeGreaterThan(0);
        //okay, there is at least one category, hooray

        if(C_debug){pause();}
        element('.nav-list a:first').click(); //clicks first category nav link

        /*
        element('.nav-header li a:first').click(); //clicks first category's subcategory nav link
        element('.nav-header:nth-child(2) a:first').click(); //clicks second category nav link
        element('.nav-header:nth-child(3) a:first').click(); //clicks third category nav link
        */
        if(C_debug){pause();}

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



