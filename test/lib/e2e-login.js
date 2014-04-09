/**
 * Created with JetBrains WebStorm.
 * User: rmelanson
 * Date: 5/28/13
 * Time: 8:27 AM
 * To change this template use File | Settings | File Templates.
 */
//this file should contain common shared functions for login/logout

//ngScenario for Test Runner doesn't like nested IT blocks, so DON'T DO IT, it will fail miserably and not tell you why.

function e2eLogin(strUsername, strPassword, blnDebug){

    it('should appear before the user performs valid login', function() {
        expect(element('#login_form:visible').count()).toBe(1);
        //we found a login box.  is login_box the best way to check for it's existence?

    });

    it('should allow us to enter a user/pass', function(){

        input("credentials.Username").enter(strUsername);
        input("credentials.Password").enter(strPassword);
        if(blnDebug){
            pause();
        }

        expect(input("credentials.Username").val()).toBe(strUsername);
        expect(input("credentials.Password").val()).toBe(strPassword);

        element("#451_btn_login").click();

        it('should automatically redirect to /catalog when location hash/fragment is empty', function() {
            expect(browser().location().url()).toBe("/catalog");
        });

        if(blnDebug){
            pause();
        }

    });

    it("should hide the login form once we've logged in", function() {
        expect(element('#login_form:visible').count()).toBe(0);
        //we found a login box.  is login_box the best way to check for it's existence?

    });

}

function e2eLoginNoTest(strUsername, strPassword, blnDebug){ //this version doesn't perform tests, just logs in

    it('should allow us to enter a user/pass', function(){

        input("credentials.Username").enter(strUsername);
        input("credentials.Password").enter(strPassword);
        if(blnDebug){
            pause();
        }
        element("#451_btn_login").click();

        if(blnDebug){
            pause();
        }
    });
}

function e2eLogout(blnDebug){
    //now test for logout
    it('should allow us to logout the current user via the logout button', function(){

        if(blnDebug){
            pause();
        }

        //find the logout button and click it
        element(".451_btn_logout").click();

        if(blnDebug){
            pause();
        }
    });
    it("should show the login form again since we've logged out", function() {
        sleep(1);
        expect(element('#login_form:visible').count()).toBe(1);
        //we found a login box.  is login_box the best way to check for it's existence?

    });
}

//specific login functions (login directly to product, message, order, category, whatever)
function e2eLoginProduct(strUsername, strPassword, blnDebug, strProductID){ //this version logs in and goes straight to a product view

    it('should display the requested product once authorization is granted', function(){

        browser().navigateTo('../../app/product/default/' + strProductID);

        input("credentials.Username").enter(strUsername);
        input("credentials.Password").enter(strPassword);
        if(blnDebug){
            pause();
        }
        element("#451_btn_login").click();

        if(blnDebug){
            pause();
        }

    });
}