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
        expect(element('#login_box:visible').count()).toBe(1);
        //we found a login box.  is login_box the best way to check for it's existence?

    });

    it('should allow us to enter a user/pass', function(){

        input("user.Username").enter(strUsername);
        input("user.Password").enter(strPassword);
        if(blnDebug){
            pause();
        }

        //expect(input("user.Username").val().toBe(strUsername));
        element("#451_btn_login").click();

        it('should automatically redirect to /catalog when location hash/fragment is empty', function() {
            expect(browser().location().url()).toBe("/catalog");
        });

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
        element("#451_btn_logout").click();

        if(blnDebug){
            pause();
        }
    });
}
