'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */
//login and logout test Scenarios


var C_debug = false;
//standard login/logout functionality
describe('SPA login with valid user/pass', function() {
   it("should navigate to the index page to login", function() {
       browser().navigateTo('../../app/');
       expect(element('#451qa_msg_login').text()).toBe("");
    });

    e2eLogin("coreproduser","fails345", C_debug);

    it("should hide login form", function() {
        if(C_debug){pause();}
        expect(element('#451qa_msg_login').text()).toBe("");
        expect(element('#login_form:hidden').count()).toBe(1);
        if(C_debug){pause();}
    });

    e2eLogout(C_debug);

});

describe('SPA login without valid username', function() {
    it("should navigate to the index page to login", function() {
        browser().navigateTo('../../app/');
    });

    e2eLoginNoTest("failme","fails543", C_debug);

    it("should display a line saying cannot find user or password", function() {
        expect(element('#451qa_msg_login').text()).toBe("User name and password not found."); //this won't work if the client changes the messages or we localize it.
     });

});

describe('SPA login without valid password', function() {
    it("should navigate to the index page to login", function() {
        browser().navigateTo('../../app/');
    });

    e2eLoginNoTest("coreproduser","fails543", C_debug);

    it("should display a line saying cannot find user or password", function() {
        expect(element('#451qa_msg_login').text()).toBe("User name and password not found."); //this won't work if the client changes the messages or we localize it.
    });

});

describe('SPA login without user or pass', function() {
    it("should navigate to the index page to login", function() {
        browser().navigateTo('../../app/');
    });

    e2eLoginNoTest("","", C_debug);

    it("should display a line saying cannot find user or password", function() {
        expect(element('#451qa_msg_login').text()).toBe("User name and password not found."); //this won't work if the client changes the messages or we localize it.
    });

});

//TODO - login/fail 6 times to lockout user
//TODO - password change - success
//TODO - password change - fail due to mistyping
//TODO - password change - fail due to complexity restrictions

describe('SPA logout', function() {
    e2eLoginNoTest("coreproduser","fails345", C_debug);

    e2eLogout(C_debug);

    it("should display login form", function() {
        if(C_debug){pause();}
        expect(element('#451qa_msg_login').text()).toBe("");
        expect(element('#login_form:visible').count()).toBe(1);

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
        browser().navigateTo('../../app/product/default/Static%20Prod');
    });

    it('but gets a login form instead', function() {

        expect(element('#login_form:visible').count()).toBe(1);
    });

});

describe('SPA attempt to view a product WITH authentication', function() {
    it("tries to go to the product page", function() {
        browser().navigateTo('../../app/product/default/Static%20Prod');
    });

    it('but gets a login form instead', function() {
        expect(element('#login_form:visible').count()).toBe(1);
        //we found a login box.  is login_box the best way to check for it's existence?
    });

    e2eLogin("coreproduser","fails345", C_debug);
    //so we login, and should be shown the product we requested
    it('should now show us the product page we requested and logged in for', function() {
        expect(browser().location().url()).toBe("/product/default/Static%20Prod");
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
        browser().navigateTo('../../app/');
    });

    e2eLoginNoTest("coreprodautoinactiveuser","fails345", C_debug);

    it("should display a line saying cannot find user or password", function() {
        expect(element('#451qa_msg_login').text()).toBe("User name and password not found."); //this won't work if the client changes the messages or we localize it.
    });

});

describe('SPA login of user that hasnt accepted terms/conditions yet', function() {
    it("should navigate to the index page to login", function() {
        browser().navigateTo('../../app/');
    });

    e2eLoginNoTest("coreprodautonotermsuser","fails345", C_debug);

    it("should display the terms and conditions and allow the user to accept them, then set that flag on their account that they have", function() {

        expect(browser().location().url()).toBe("/conditions");

        //expect(element('p:contains("terms and conditions")').count()).toBe(1); //this won't work if the client changes the messages or we localize it.
    });

    it("should prevent them from moving away from the conditions page until they accept them", function() {
        browser().navigateTo('../../app/product/default/pstest1');
        expect(browser().location().url()).toBe("/conditions");

        browser().navigateTo('../../app/catalog/varspecprods');
        expect(browser().location().url()).toBe("/conditions");

        browser().navigateTo('../../app/admin');
        expect(browser().location().url()).toBe("/conditions");

        browser().navigateTo('../../app/favoriteorders');
        expect(browser().location().url()).toBe("/conditions");

        browser().navigateTo('../../app/order');
        expect(browser().location().url()).toBe("/conditions");

        browser().navigateTo('../../app/message');
        expect(browser().location().url()).toBe("/conditions");
    });

    it("should allow them to accept terms & conditions [DESTRUCTIVE TEST]", function() {

        if(C_debug){
            alert("This is a destructive test and will no longer work afterwards unless you reset the terms & conditions bit for this buyer user. Stop script now if you do not wish to continue.");
            pause();
        }

        element("#451qa_btn_terms_accept").click();
        expect(browser().location().url()).toBe("/catalog");

        browser().navigateTo('../../app/product/default/pstest1');
        expect(browser().location().url()).toBe("/product/default/pstest1");

    });

    e2eLogout(C_debug);

    e2eLoginNoTest("coreprodautonotermsuser","fails345", C_debug);

    it("should now log them in and navigate where they want to go without accepting terms conditions again", function() {

        browser().navigateTo('../../app/');

        expect(browser().location().url()).toBe("/catalog");

        browser().navigateTo('../../app/product/default/pstest1');
        expect(browser().location().url()).toBe("/product/default/pstest1");

    });

    e2eLogout(C_debug);

});

describe('SPA login of punchout user', function() {
    it("should navigate to the index page to login", function() {
        browser().navigateTo('../../app/');
    });

    e2eLoginNoTest("coreprodautopunchoutuser","fails345", C_debug);

    it("should not let them login and display an error about them being a Punchout user", function() {
        expect(element('#451qa_msg_login:contains("Punchout user")').count()).toBe(1); //this won't work if the client changes the messages or we localize it.
    });

});
