'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */
//login and logout test Scenarios

//handy stuff:
//console.dir(scope('[name="LoginForm"]','user'));

var C_debug = false;

describe('SPA login with valid user/pass', function() {
   it("should navigate to the index page to login", function() {
        browser().navigateTo('../../app/index.html');
    });

    e2eLogin("coreproduser","fails345", C_debug);

    e2eLogout(C_debug);

});

describe('SPA login without valid user/pass', function() {
    it("should navigate to the index page to login", function() {
        browser().navigateTo('../../app/index.html');
    });

    e2eLoginNoTest("failme","fails543", C_debug);

    it("should display a line saying cannot find user or password", function() {
        expect(element('p:contains("not found")').count()).toBe(1); //this won't work if the client changes the messages or we localize it.
        //this should be done by identifying a unique element ID... I think.
     });

});

describe('SPA attempt to view a product without authentication', function() {
    it("tries to go to the product page", function() {
        browser().navigateTo('../../app/index.html#/product/Static%20Prod');
    });

    it('but gets a login box instead', function() {
        expect(element('#login_box:visible').count()).toBe(1);
        //we found a login box.  is login_box the best way to check for it's existence?
    });

});

describe('SPA attempt to view a product WITH authentication', function() {
    it("tries to go to the product page", function() {
        browser().navigateTo('../../app/index.html#/product/Static%20Prod');
    });

    it('but gets a login box instead', function() {
        expect(element('#login_box:visible').count()).toBe(1);
        //we found a login box.  is login_box the best way to check for it's existence?
    });

    e2eLogin("coreproduser","fails345", C_debug);
    //so we login, and should be shown the product we requested
    it('should now show us the product page we requested and logged in for', function() {
        expect(browser().location().url()).toBe("/product/Static%20Prod");
    });

    it('should hide the login box', function(){
        //now let's check for that login box and make sure it DOESN'T show up
        expect(element('#login_box:visible').count()).toBe(0);
    });

    //cleanup time, let's logout
    e2eLogout(C_debug);
});