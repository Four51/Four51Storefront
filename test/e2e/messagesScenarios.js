'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */
//Messages test Scenarios

 */

var C_debug = true;

function e2eViewMessage(strMsgBox, intIndex, strMsgDate, strMsgFrom, strMsgSubject, blnReturn, rptRow){
    //navigate to a message in a list/repeater, click it, verify the header information is the same, navigate back(or not)

    //navigate to a message in a list/repeater, click it, verify the header information is the same, delete it


    var arrRptValue = e2eRepeaterRowValue(rptRow);

    console.dir(arrRptValue)

    //this Jquery select may need to be changed if the table structure/layout changes
    if(strMsgBox != ""){
        element('#451_list_msg:has(div:eq(1):contains("' + strMsgBox + '")):eq(' + intIndex + ') div:eq(3) a').click(); //click the message specified by the passed parameters
    }
    else {
        element('#451_list_msg:eq(' + intIndex + ') div:eq(3) a').click(); //click the message in the nth row
    }
    if(C_debug){pause();}

    console.dir(arrRptValue[1])
    console.dir(binding("message.DateSent"))

    //verify the message is there and fields are populated
    expect(arrRptValue[1]).toEqualFuture(binding("message.DateSent"));
    expect(strMsgSubject).toEqualFuture(binding("message.Subject"));
    expect(strMsgFrom).toEqualFuture(binding("message.FromName"));

    if(blnReturn){
        element('#451_btn_ok').click();
        if(C_debug){pause();}
    }
}

function e2eViewMessagea(strMsgBox, intIndex, strMsgDate, strMsgFrom, strMsgSubject, blnReturn){
    //navigate to a message in a list/repeater, click it, verify the header information is the same, navigate back(or not)
    console.log("viewmessage");
    //navigate to a message in a list/repeater, click it, verify the header information is the same, delete it

    //this Jquery select may need to be changed if the table structure/layout changes
    if(strMsgBox != ""){
        element('#451_list_msg:has(div:eq(1):contains("' + strMsgBox + '")):eq(' + intIndex + ') div:eq(3) a').click(); //click the message specified by the passed parameters
    }
    else {
        element('#451_list_msg:eq(' + intIndex + ') div:eq(3) a').click(); //click the message in the nth row
    }
    if(C_debug){pause();}


    //verify the message is there and fields are populated
    expect(strMsgDate).toEqualFuture(binding("message.DateSent"));
    expect(strMsgSubject).toEqualFuture(binding("message.Subject"));
    expect(strMsgFrom).toEqualFuture(binding("message.FromName"));

    if(blnReturn){
        element('#451_btn_ok').click();
        if(C_debug){pause();}
    }
}

function e2eReplyMessage(strJQSelect, strMsgSubject, strMsgBody, blnSubmit){
   //navigate to the specified message, and reply to it, specifying a subject and body, then clicking send

    element(strJQSelect).click(); //click the message specified by the passed JQselect

    element('#451_btn_reply').click();
    if(C_debug){pause();}

    input("message.Subject").enter(strMsgSubject);
    input("message.Body").enter(strMsgBody);

    if(blnSubmit){
        element('#451_btn_send').click();
    }
    if(C_debug){pause();}
}

function e2eDeleteMessageFromView(strJQSelect, strMsgSubject){
    //navigate to the specified message and delete it, use strMsgSubject to verify it's the right one

    element(strJQSelect + ":contains('" + strMsgSubject + "')").click(); //click the message specified by the passed JQselect

    element('#451_btn_del').click();
    //sure would be nice if we checked with user to confirm delete.  --TODO - this functionality will need to be tested once it's added
    //then laugh evilly as it gets beaten to death by little computer gnomes and tossed into an incinerator

    if(C_debug){pause();}
}

function e2eDeleteMessageFromList(strJQSelect, strWhichList, blnDeleteNow){
    //navigate to the specified message and delete it

    element(strJQSelect + ' input').click();

    if(strWhichList == "RECV" && blnDeleteNow){
        //check the message you want to delete's checkbox
        element("#451qa_btn_delmsg").click();
    }
    else if(strWhichList == "SENT" && blnDeleteNow){

        element("#451qa_btn_delmsg").click();
    }

    //sure would be nice if we checked with user to confirm delete.  --TODO - this functionality will need to be tested once it's added
    //then laugh evilly as it gets beaten to death by little computer gnomes and tossed into an incinerator

    if(C_debug){pause();}
}

////////////////////////////////////////////////////

//TODO- test "compose" functionality, when it is added.

describe('Messages login', function() {
    it("should allow a user to login", function() {
        browser().navigateTo('../../app/');
    });

    e2eLogin("coreproduser","fails345", C_debug);

});

describe('Message View', function() {  //TODO - add delete from view for Received messages

    it('should return the value of the future',function(){
        browser().navigateTo('#/message');
        sleep(5)
        pause();

        console.dir(repeater('#451qa_msg_list').count())
        expect(repeater('#451qa_msg_list .451qa_msg_item').count()).toBeGreaterThan(0);
        var rptObj = repeater('.451qa_msg_item').row(0);

        var arrRowArray;

        console.dir(rptObj.execute(function(done){
        }));


        //expect(arrRowArray).toContain("Inbox");
        //console.dir(rptObj)
        //console.dir(arrRowArray)

        pause();

    });

    xit('should be displayed when we click a Received message', function() {
        browser().navigateTo('#/message');

        sleep(3);
        //check existence of messages, datawise
        expect(repeater('#451_list_msg').count()).toBeGreaterThan(0);

        var strDateSent = binding("message.DateSent");
        var strSubject = binding("message.Subject");
        var strSentFrom = binding("message.FromName");

        e2eViewMessage("Inbox",0,strDateSent,strSentFrom,strSubject,false);
        //that means, click the message in the 0th row that has "Inbox" in the first column

        expect(element('#451_btn_del').count()).toBeGreaterThan(0);
        expect(element('#451_btn_reply').count()).toBeGreaterThan(0);
        expect(element('#451_btn_ok').count()).toBeGreaterThan(0);
        if(C_debug){pause();}
        element('#451_btn_ok').click();

        //TODO- add a delete case from this view... but wait until we have a way of re-creating more Received messages
        //delete a Received message via the message view
        //verify that the message no longer shows up in the message list

    });

    it('should be displayed when we click a Sent message, but with no Reply button', function() {
        browser().navigateTo('#message');
        //check existence of messages, datawise

        var rptRowObject = repeater('#451_list_msg:has(div:eq(1):contains("SentBox"))').row(0);
        var rptCountObject = repeater('#451_list_msg:has(div:eq(1):contains("SentBox"))').count();
        rptCountObject.execute(function(){

        });
        expect(rptCountObject.value).toBe(1)

        var arrRptValue = e2eRepeaterRowValue(rptRowObject);
        //var arrRptValue = repeater('#451_list_msg:has(div:eq(1):contains("SentBox"))').row(0).execute(function(){})
        //console.dir(arrRptValue)

        //expect(arrRptValue[2]).toBe("f")
        //expect(repeater('#451_list_msg:has(div:eq(1):contains("SentBox"))').row(0).value[0]).toBe("SentBox")


        e2eViewMessage("SentBox",0,arrRptValue[1],arrRptValue[2],arrRptValue[3],false,rptRowObject);

        //expect(element('#451_btn_del').count()).toBe(1);
        //expect(element('#451_btn_reply:hidden').count()).toBe(1);
        //expect(element('#451_btn_ok').count()).toBe(1);
        if(C_debug){pause();}
        //element('#451_btn_ok').click();
    });

    it('should allow us to delete a Sent message', function() {
        browser().navigateTo('#/message');
        var intMsgListCountBefore = repeater('#451_list_msg:has(div:eq(1):contains("SentBox"))').count();
        var intMsgListCountAfter;

        sleep(3);
        //check existence of messages, datawise
        expect(repeater('#451_list_msg').count()).toBeGreaterThan(0); //gotta have a message to reply to

        e2eReplyMessage("#451_list_msg:first div:eq(3) a","Test Delete Sent-Reply Message","Please delete me!  I was born to be deleted!",true);

        //this Jquery select may need to be changed if the table structure/layout changes
        e2eDeleteMessageFromView('#451_list_msg:has(div:eq(1):contains("SentBox")):first div:eq(3) a',"Test Delete Sent-Reply Message");

        intMsgListCountAfter = repeater('#451_list_msg:has(div:eq(1):contains("SentBox"))').count(); //we created a message and deleted a message; the before and after counts should match

        expect(intMsgListCountAfter).toEqualFuture(intMsgListCountBefore);

        if(C_debug){pause();}

    });

});

describe('Reply View', function() {

    it('should be displayed when we click a Received message and click Reply', function() {
        e2eReplyMessage("#451_list_msg tr:first td:eq(3) a", "replying to the message", "a quick brown dox fumped over the jazy log",false);
    });

    it('should display Cancel and Send buttons', function() {
        expect(element('#451_btn_cancel').count()).toBeGreaterThan(0);
        expect(element('#451_btn_send').count()).toBeGreaterThan(0);
    });

    it('should let us navigate back to the message list', function() {

        element('#451_btn_cancel').click(); //cancel because we're not sending a reply we're just testing the form

        //we SHOULD be checking that nothing's changed, but that's sort of invalid, theoretically the user should be sent back to the original message
        //unchanged, unfortunately there's a glitch that shows the message EDITED (not really changed but the control thinks it is). Bad Steve! No beer! ;)

        element('#451_btn_ok').click(); //let's go back to the message list now
    });

});

describe('MessageList: Received Messages', function() {

    var intReceivedMessagesBeforeDelete,intReceivedMessagesAfterDelete;
    it('should display a list of Received messages, if there are any', function() {

        browser().navigateTo('#/message');
        //check existence of messages, datawise
        expect(repeater('#451_list_msg tr').count()).toBeGreaterThan(0);

       //verify all 4 columns are populated.
        //verify a checkbox exists
        //verify a date is shown
            //verify the date is a date?
        //verify the subject exists
        //verify the from exists

        //console.dir(repeater('#451_list_msg_rcv tr').count());
        //console.dir(repeater('#451_list_msg_rcv tr').row(0));

        //experiment with looping through a future... not gonna work probably.
        /*
        for(var i = 1; i < 7 ; i++){
            console.log("in the loop");
            expect(element('#451_list_msg_rcv tr:nth-child('+ i +') td:has(input)').count()).toBeGreaterThan(0); //checking each row to see if it has an input checkbox in it
            element('#451_list_msg_rcv tr:nth-child('+ i +') td:has(input)').text("checked");
            console.log("HERE");
            //console.dir(element('#451_list_msg_rcv tr:nth-child(2) td:nth-child(1)').text());
            //console.dir(element('#451_list_msg_rcv tr:nth-child(2) td:nth-child(2)').text());
            //console.dir(element('#451_list_msg_rcv tr:nth-child(2) td:nth-child(3)').text());
            //console.dir(element('#451_list_msg_rcv tr:nth-child(2) td:nth-child(4)').text());
        }
        */
        sleep(5);
        expect(element('#451_list_msg tr:first td:has(input)').count()).toBe(1); //verify the checkbox exists in SOME element
        //TODO-make these tests actually check the text of the element
        expect(element('#451_list_msg tr:first td:eq(2):not(:empty)').count()).toBe(1); //verify the second column has some text in it
        expect(element('#451_list_msg tr:first td:eq(3):not(:empty)').count()).toBe(1); //verify the third column has some text in it
        expect(element('#451_list_msg tr:first td:eq(4):not(:empty)').count()).toBe(1); //verify the fourth column has some text in it

        if(C_debug){pause();}

    });

    it('should let us click the first message and display it', function(){

        var strDateSent = element("#451_list_msg tr:first td:eq(2)").text();
        var strSubject = element("#451_list_msg tr:first td:eq(3) a").text();
        var strSentFrom = element("#451_list_msg tr:first td:eq(4)").text();

        e2eViewMessage("",0,strDateSent,strSentFrom,strSubject,false);
        e2eViewMessage("#451_list_msg tr:first td:eq(3) a",strDateSent,strSentFrom,strSubject,false);

        expect(browser().location().url()).not().toBe("/message"); //it should have the message ID in it, not just /message

        if(C_debug){pause();}
    });

    it('should display user controls, [Delete, Reply, OK]', function(){
        //verify the controls on the page exist
        expect(element('#451_btn_del').count()).toBeGreaterThan(0);
        expect(element('#451_btn_reply').count()).toBeGreaterThan(0);
        expect(element('#451_btn_ok').count()).toBeGreaterThan(0);

        if(C_debug){pause();}
    });

    it('should let us click OK and return to the message list', function(){

        element('#451_btn_ok').click();
        expect(browser().location().url()).toBe("/message");

        if(C_debug){pause();}
    });

    it('should let us click the last message and display it', function(){

        //these Jquery selects may need to be changed if the table structure/layout changes
        var strDateSent = element("#451_list_msg tr:last td:eq(2)").text();
        var strSubject = element("#451_list_msg tr:last td:eq(3) a").text();
        var strSentFrom = element("#451_list_msg tr:last td:eq(4)").text();

        //this Jquery select may need to be changed if the table structure/layout changes
        e2eViewMessage("#451_list_msg tr:last td:eq(3) a",strDateSent,strSentFrom,strSubject,true);

        if(C_debug){pause();}
    });


});

describe('MessageList: Sent Messages', function() {

    var intSentMessagesBeforeReply, intSentMessagesAfterReply;
    var intSentMessagesBeforeDelete, intSentMessagesAfterDelete
    var strMessageReplySubject = "Test Sent List Reply Subject";

    it('should let us display a message and reply to it', function(){
        intSentMessagesBeforeReply = repeater("#451_list_msg tr:has(td:eq(1):contains('SentBox'))").count();

        e2eReplyMessage("#451_list_msg tr:first td:eq(3) a",strMessageReplySubject,"no thanks, we don't like fish",false); //don't click submit
        element("#451_btn_cancel").click(); //back to message
        if(C_debug){pause();}

        expect(binding("message.Subject")).not().toBe(strMessageReplySubject);
        expect(binding("message.Body")).not().toBe(strMessageReplySubject);

        element("#451_btn_ok").click(); //back to message list
        e2eReplyMessage("#451_list_msg tr:first td:eq(3) a",strMessageReplySubject,"hello, thanks for all the fish",true); //submit this time
        //we should return to the list
        if(C_debug){pause();}

    });

    it('should display the newly created message in the Sent list', function(){
        browser().navigateTo('#/message');
        if(C_debug){pause();}
        intSentMessagesAfterReply = repeater("#451_list_msg tr:has(td:eq(1):contains('SentBox'))").count();
        expect(intSentMessagesAfterReply).toBeGreaterThanFuture(intSentMessagesBeforeReply);

        //we know there's now 1 more message in the list, let's make sure it's the one we put in there
        expect(element("#451_list_msg tr:has(td:eq(1):contains('SentBox')):first td:eq(3) a").text()).toBe(strMessageReplySubject);

        if(C_debug){pause();}

    });

    it('should let us click it and display the same text we just put into it', function(){
        //verify that the message contents match what we input into it
        browser().navigateTo('#/message');
        var strDateSent = element("#451_list_msg tr:has(td:eq(1):contains('SentBox')):first td:eq(2)").text();
        var strSubject = element("#451_list_msg tr:has(td:eq(1):contains('SentBox')):first td:eq(3)").text();
        var strSentFrom = element("#451_list_msg tr:has(td:eq(1):contains('SentBox')):first td:eq(4)").text();
        //this Jquery select may need to be changed if the table structure/layout changes

        e2eViewMessage("#451_list_msg tr:has(td:eq(1):contains('SentBox')):first td:eq(3) a",strDateSent,strSentFrom,strSubject,true);

        if(C_debug){pause();}
    });

    it('should let us delete the message we just created from the list via checkbox', function(){
        //delete the message by clicking the checkbox next to it and then clicking the delete button
        //then verify it's actually been removed properly
        intSentMessagesBeforeDelete = repeater("#451_list_msg tr").count();

        e2eDeleteMessageFromList('#451_list_msg tr:first td:has(input)', "SENT", true);

        intSentMessagesAfterDelete = repeater("#451_list_msg tr:has(td:eq(1):contains('SentBox'))").count();

        expect(intSentMessagesBeforeDelete).toBeGreaterThanFuture(intSentMessagesAfterDelete);

        if(C_debug){pause();}
    });

    it('should let us delete multiple messages at once', function(){
        //first let's setup 3 messages to delete
        e2eReplyMessage("#451_list_msg tr:first td:eq(3) a","MultiDeleteTest","hello, thanks for all the fish1",true);
        e2eReplyMessage("#451_list_msg tr:first td:eq(3) a","MultiDeleteTest","hello, thanks for all the fish2",true);
        e2eReplyMessage("#451_list_msg tr:first td:eq(3) a","MultiDeleteTest","hello, thanks for all the fish3",true);

        intSentMessagesBeforeDelete = repeater("#451_list_msg tr").count();

        if(C_debug){pause();}

        e2eDeleteMessageFromList('#451_list_msg tr:has(td:eq(1):contains("SentBox")):first td:has(input)', "SENT", false);
        if(C_debug){pause();}
        e2eDeleteMessageFromList('#451_list_msg tr:has(td:eq(1):contains("SentBox")):eq(2) td:has(input)', "SENT", false);
        if(C_debug){pause();}
        e2eDeleteMessageFromList('#451_list_msg tr:has(td:eq(1):contains("SentBox")):eq(3) td:has(input)', "SENT", true);

        if(C_debug){pause();}

        intSentMessagesAfterDelete = repeater("#451_list_msg tr:has(td:eq(1):contains('SentBox'))").count();
        expect(intSentMessagesBeforeDelete).toBeGreaterThanFuture(intSentMessagesAfterDelete);


        if(C_debug){pause();}
    });

    //TODO- when added, check column sorting functionality

    it('should let us delete ALL messages at once', function(){
        browser().navigateTo('#/message');

        var intReceivedMessagesBeforeDelete = repeater("#451_list_msg tr").count();

        if(C_debug){pause();}
        if(window.confirm("DESTRUCTIVE TEST - about to delete ALL messages!")){
            element("#451_chk_all").click(); //check the checkbox on the header to select all messages
            //check to ensure all RECEIVED messages are checked
            expect(element('#451_list_msg tr td input:checked').count()).toEqualFuture(repeater("#451_list_msg tr").count()); //verify all checkboxes are checked
            pause();
            if(C_debug){pause();}
            pause();
            element("#451qa_btn_delmsg").click();//click delete
            pause();
            //check to ensure all RECEIVED messages are deleted and gone

            var intReceivedMessagesAfterDelete = repeater("#451_list_msg tr").count();
            pause();
            expect(intReceivedMessagesAfterDelete).toBe(0);
            pause();
        }
        if(C_debug){pause();}
    });

    //TODO- delete message from Received list and verify it doesn't exist anymore
    //TODO- delete multiple messages from Received and verify they don't exist anymore
    //TODO- when added, check column sorting functionality

});

describe('logout/cleanup', function(){

    //lets create 3 more messages so we have some in the list after having deleted them all.
    it("should let us re-add a few messages for next time", function() {
        e2eReplyMessage("#451_list_msg tr:first td:eq(3) a","MultiDeleteTest","hello, thanks for all the fish1",true);
        e2eReplyMessage("#451_list_msg tr:first td:eq(3) a","MultiDeleteTest","hello, thanks for all the fish2",true);
        e2eReplyMessage("#451_list_msg tr:first td:eq(3) a","MultiDeleteTest","hello, thanks for all the fish3",true);
    });

    e2eLogout(C_debug);
});

describe('Message without authentication', function() {
    it("should force a user to login", function() {
        browser().navigateTo('../../app/index.html#/message/38007023x');
        if(C_debug){pause();}
    });

    e2eLogin("coreproduser","fails345", C_debug);

    //do we get redirected back to the message?
    it("should then redirect us to the message itself", function() {
        expect(browser().location().url()).toBe("/message/38007023x");
        if(C_debug){pause();}
    });

    e2eLogout(false);
});

describe('Deleted Message without authentication', function() {
    it("should force a user to login", function() {
        browser().navigateTo('../../app/index.html#/message/39539271x'); //39539271x is a deleted message
        if(C_debug){pause();}
    });

    e2eLogin("coreproduser","fails345", C_debug);

    it("should display an error", function() {
        expect(element('#451_err').count()).toBeGreaterThan(0);
        if(C_debug){pause();}
    });

    e2eLogout(false);
});

describe('Invalid Message without authentication', function() {
    it("should force a user to login", function() {
        browser().navigateTo('../../app/index.html#/message/38007023a'); //38007023x is the valid one
        if(C_debug){pause();}
    });

    e2eLogin("coreproduser","fails345", C_debug);

    it("should display an error", function() {
        expect(element('#451_err').count()).toBeGreaterThan(0);
        if(C_debug){pause();}
    });

    e2eLogout(false);
});

//TODO:  verify a user without permissions can't see messages
//also that navigation is disabled/hidden for that user