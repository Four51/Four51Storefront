'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */
//login and logout test Scenarios


var C_debug = false;
//standard login/logout functionality
describe('SPA login with valid user/pass', function() {
   it("should navigate to the index page to login", function() {
       browser().navigateTo('../../app/index.html');
       expect(element('.alert-error').text()).toBe("");
    });

    e2eLogin("coreproduser","fails345", C_debug);

    it("should hide login form and show welcome message", function() {
        if(C_debug){pause();}
        expect(element('.alert-error').text()).toBe("");
        expect(element('#login_form:hidden').count()).toBe(1);
        expect(element('.brand-name:contains("Welcome"):visible').count()).toBe(1); //this actually only appears after you refresh, which seems counterintuitive. steve has said it's not even really a feature but debugging tool.  if so, this test case may be removed.
        if(C_debug){pause();}
    });

    e2eLogout(C_debug);

});

describe('SPA login without valid user/pass', function() {
    it("should navigate to the index page to login", function() {
        browser().navigateTo('../../app/index.html');
    });

    e2eLoginNoTest("failme","fails543", C_debug);

    it("should display a line saying cannot find user or password", function() {
        expect(element('.alert-error:visible').count()).toBe(1);
        expect(element('p:contains("not found")').count()).toBe(1); //this won't work if the client changes the messages or we localize it.
     });

});

describe('SPA logout', function() {
    e2eLoginNoTest("coreproduser","fails345", C_debug);

    it("should display welcome message before logout", function() {
        expect(element('.brand-name:contains("Welcome"):visible').count()).toBe(1); //this actually only appears after you refresh, which seems counterintuitive. steve has said it's not even really a feature but debugging tool.  if so, this test case may be removed.
        if(C_debug){pause();}
    });

    e2eLogout(C_debug);

    it("should display login form and hide welcome message", function() {
        if(C_debug){pause();}
        expect(element('.alert-error').text()).toBe("");
        expect(element('#login_form:visible').count()).toBe(1);
        expect(element('.brand-name:contains("Welcome"):hidden').count()).toBe(1); //this actually only appears after you refresh, which seems counterintuitive. steve has said it's not even really a feature but debugging tool.  if so, this test case may be removed.
        if(C_debug){pause();}
    });

    xit("should remove all data", function() {
        if(C_debug){pause();}
        //this is x'ed out because it appears there's no good way of accessing localStorage from TestRunner.
        expect(localStorage.getItem("User")).not.toBeDefined();

    });
});

//login to existing objects (product, message, order, category, etc

describe('SPA attempt to view a product without authentication', function() {
    it("tries to go to the product page", function() {
        browser().navigateTo('../../app/index.html#/product/Static%20Prod');
    });

    it('but gets a login form instead', function() {

        expect(element('#login_form:visible').count()).toBe(1);
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

//TODO - login to order
//TODO - login to category

//test some permissions
describe('SPA login of inactive user', function() {
    it("should navigate to the index page to login", function() {
        browser().navigateTo('../../app/index.html');
    });

    e2eLoginNoTest("coreprodautoinactiveuser","fails345", C_debug);

    it("should display a line saying cannot find user or password", function() {
        expect(element('p:contains("not found")').count()).toBe(1); //this won't work if the client changes the messages or we localize it.
    });

});

describe('SPA login of user that hasnt accepted terms/conditions yet', function() {
    it("should navigate to the index page to login", function() {
        browser().navigateTo('../../app/index.html');
    });

    e2eLoginNoTest("coreprodautonotermsuser","fails345", C_debug);

    it("should display the terms and conditions and allow the user to accept them, then set that flag on their account that they have", function() {
        expect(element('p:contains("terms and conditions")').count()).toBe(1); //this won't work if the client changes the messages or we localize it.
    });
    e2eLogout(C_debug);

});

describe('SPA login of punchout user', function() {
    it("should navigate to the index page to login", function() {
        browser().navigateTo('../../app/index.html');
    });

    e2eLoginNoTest("coreprodautopunchoutuser","fails345", C_debug);

    it("should not let them login and display an error about them being a Punchout user", function() {
        expect(element('p:contains("Punchout user")').count()).toBe(1); //this won't work if the client changes the messages or we localize it.
    });

});
