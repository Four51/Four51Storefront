/**
 * Created with JetBrains WebStorm.
 * User: rmelanson
 * Date: 5/28/13
 * Time: 8:27 AM
 * To change this template use File | Settings | File Templates.
 */
//this file should contain common shared functions for login/logout
function e2eLogin(strUsername, strPassword, blnDebug){

    it('should appear before the user performs valid login', function() {
        expect(element('#login_box').count()).toBe(1);
        //we found a login box.  is login_box the best way to check for it's existence?

    });

    it('should allow us to enter a user/pass', function(){
        //can we build an include file or link to some common function library to reuse this?
        //if we reuse this code, pass user/pass as an argument to the function

        //enter user & password
        input("user.Username").enter(strUsername);
        input("user.Password").enter(strPassword);
        if(blnDebug){
            alert("about to log in!");
        }

        //expect(input("user.Username").val().toBe(strUsername));
        element("#451_btn_login").click();

        it('should automatically redirect to /catalog when location hash/fragment is empty', function() {
            expect(browser().location().url()).toBe("/catalog");
        });

        if(blnDebug){
            alert("just logged in!");
            pause();
        }

    });

}

function e2eLogout(blnDebug){
    //now test for logout
    it('should allow us to logout the current user via the logout button', function(){

        if(blnDebug){
            alert("about to logout!");
        }

        //find the logout button and click it
        element("#451_btn_logout").click();

        if(blnDebug){
            alert("logged out!");
        }
    });
}
