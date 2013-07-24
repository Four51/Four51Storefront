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

describe('SPA logout', function() {
    e2eLoginNoTest("coreproduser","fails345", C_debug);

    it("should display welcome message before logout", function() {
        expect(element('#451_topnav a:contains("Welcome"):visible').count()).toBe(1);
        if(C_debug){pause();}
    });

    e2eLogout(C_debug);

    it("should display login form and hide welcome message", function() {
        if(C_debug){pause();}
        expect(element('#login_form:visible').count()).toBe(1);
        expect(element('#451_topnav a:contains("Welcome"):hidden').count()).toBe(1);
        if(C_debug){pause();}
    });

    xit("should remove all data", function() {
        if(C_debug){pause();}
        //this is x'ed out because it appears there's no good way of accessing localStorage from TestRunner.
        expect(localStorage.getItem("User")).not.toBeDefined();

    });
});

describe('SPA attempt to view a product without authentication', function() {
    it("tries to go to the product page", function() {
        browser().navigateTo('../../app/index.html#/product/Static%20Prod');
    });

    it('but gets a login form instead', function() {
        expect(element('#login_form:visible').count()).toBe(1);
        //we found a login box.  is login_box the best way to check for it's existence?
    });

});

describe('SPA attempt to view a product WITH authentication', function() {
    it("tries to go to the product page", function() {
        browser().navigateTo('../../app/index.html#/product/Static%20Prod');
    });

    it('but gets a login form instead', function() {
        expect(element('#login_form:visible').count()).toBe(1);
        //we found a login box.  is login_box the best way to check for it's existence?
    });

    e2eLogin("coreproduser","fails345", C_debug);
    //so we login, and should be shown the product we requested
    it('should now show us the product page we requested and logged in for', function() {
        expect(browser().location().url()).toBe("/product/Static%20Prod");
    });

    it('should hide the login form', function(){
        //now let's check for that login box and make sure it DOESN'T show up
        expect(element('#login_form:visible').count()).toBe(0);
    });

    //cleanup time, let's logout
    e2eLogout(C_debug);
});