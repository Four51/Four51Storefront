'use strict';
//this file contains test specs for messageListCtrl.js and messageViewCtrl.js
//and maybe messageService.js and messageListService.js

var C_debug = false;
//let's test that the MessageList Controller works
describe('$451 MessageList Controller :',function(){

    var jsonMessageList = [
        {"ID":"39539254x","Box":"Inbox","DateSent":"2013-07-15T10:23:01.693","Subject":"MultiDeleteTest","ToName":"Core Prod User","FromName":"Core Prod User","Body":null,"Selected":false}
        ,{"ID":"39539253x","Box":"Inbox","DateSent":"2013-07-15T10:22:54.363","Subject":"MultiDeleteTest","ToName":"Core Prod User","FromName":"Core Prod User","Body":null,"Selected":false}
        ,{"ID":"39539252x","Box":"Inbox","DateSent":"2013-07-15T10:22:49.083","Subject":"MultiDeleteTest","ToName":"Core Prod User","FromName":"Core Prod User","Body":null,"Selected":false}
        ,{"ID":"39539251x","Box":"Inbox","DateSent":"2013-07-15T10:22:27.74","Subject":"Test Sent List Reply Subject","ToName":"Core Prod User","FromName":"Core Prod User","Body":null,"Selected":false}
        ,{"ID":"39539250x","Box":"Inbox","DateSent":"2013-07-15T10:21:22.817","Subject":"Test Delete Sent-Reply Message","ToName":"Core Prod User","FromName":"Core Prod User","Body":null,"Selected":false}
        ,{"ID":"39539241x","Box":"Inbox","DateSent":"2013-07-11T11:19:19.633","Subject":"Test Sent List Reply Subject","ToName":"Core Prod User","FromName":"Core Prod User","Body":null,"Selected":false}
        ,{"ID":"39539240x","Box":"Inbox","DateSent":"2013-07-11T11:16:24.043","Subject":"Test Delete Sent-Reply Message","ToName":"Core Prod User","FromName":"Core Prod User","Body":null,"Selected":false}
        ,{"ID":"39539239x","Box":"Inbox","DateSent":"2013-07-11T11:14:47.107","Subject":"RE: Test Message","ToName":"Core Prod User","FromName":"Core Prod User","Body":null,"Selected":false}
        ,{"ID":"39539239x","Box":"SentBox","DateSent":"2013-07-11T11:14:47.107","Subject":"RE: Test Message","ToName":"Core Prod User","FromName":"Core Prod User","Body":null,"Selected":false}
        ,{"ID":"39539238x","Box":"SentBox","DateSent":"2013-07-11T11:13:58.497","Subject":"Test Message","ToName":"Core Prod Admin","FromName":"Core Prod User","Body":null,"Selected":false}
    ];

    var scope, $httpBackend, ctrlMsgList, $location, event;

    beforeEach(module('451order'));

    beforeEach(inject(function($rootScope,$controller,_$httpBackend_, _$location_){
        $location = _$location_;
        $httpBackend = _$httpBackend_;
        ctrlMsgList = $controller;
        scope = $rootScope.$new();

    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('Should be a defined object', function(){

        ctrlMsgList('MessageListCtrl', {
            $scope: scope
        });

        expect(ctrlMsgList).toBeDefined();

    });
    it('Should get data from the service and apply it to the scope', function(){

        $httpBackend.expectGET("/api/"+ four51.app.ApiAppName +"/message").respond(jsonMessageList);

        ctrlMsgList('MessageListCtrl', {
            $scope: scope
        });

        expect(ctrlMsgList).toBeDefined();

        scope.$apply(); //do the magic
        $httpBackend.flush();

        expect(scope.messages.length).toBe(10);

        //let's just test that a few properties are applied and match
        expect(scope.messages[0].FromName).toBe(jsonMessageList[0].FromName);
        expect(scope.messages[1].Subject).toBe(jsonMessageList[1].Subject);
        expect(scope.messages[0].ToName).toBe(jsonMessageList[0].ToName);
        expect(scope.messages[1].Box).toBe(jsonMessageList[1].Box);

        console.dir(scope);
    });
    it('Should set all Selected properties to true when checkAll is called by the view(header checkbox) both Inbox and SentBox', function(){

        var event = {preventDefault: jasmine.createSpy()};

        $httpBackend.expectGET("/api/"+ four51.app.ApiAppName +"/message").respond(jsonMessageList);

        ctrlMsgList('MessageListCtrl', {
            $scope: scope
        });

        scope.$apply(); //do the magic
        $httpBackend.flush();

        expect(scope.messages.length).toBe(10);

        //in the JSON object above all the Selected props are False by default
        for(var i = 0; i < 10; i++){
            expect(scope.messages[i].Selected).toBeFalsy();
        }

        scope.checkAll(event,"SentBox"); //[8] and [9] will get switched by to True checkAll because it should only check SentBox messages

        for(var i = 0; i < 8; i++){
            expect(scope.messages[i].Selected).toBeFalsy();
        }
        expect(scope.messages[8].Selected).toBeTruthy();
        expect(scope.messages[9].Selected).toBeTruthy();


        scope.checkAll(event,"Inbox");

        for(var i = 0; i < 10; i++){
            expect(scope.messages[i].Selected).toBeTruthy(); //now they should ALL be truthy because last time we called checkAll it turned the SentBox items Selected=true;
        }

        scope.checkAll(event,"Inbox");

        for(var i = 0; i < 8; i++){
            expect(scope.messages[i].Selected).toBeFalsy(); //now they should all be Selected=False because we're effectively UNchecking them all
        }

        scope.messages[0].Selected = false;
        scope.messages[1].Selected = true;
        scope.messages[2].Selected = false;
        scope.messages[3].Selected = true;
        scope.messages[4].Selected = false;
        scope.messages[5].Selected = true;
        scope.messages[6].Selected = false;
        scope.messages[7].Selected = true;

        scope.checkAll(event,"Inbox");

        for(var i = 0; i < 8; i++){
            expect(scope.messages[i].Selected).toBeTruthy(); //all Selected=true again even though we monkeyed with some of them on the way
        }

        scope.checkAll(event,"SentBox");

        expect(scope.messages[8].Selected).toBeFalsy();
        expect(scope.messages[9].Selected).toBeFalsy();

    })
    it('Should delete via API when deleteSelected is called by the view(delete button)', function(){

        var event = {preventDefault: jasmine.createSpy()}; //we do this to mock the event passed to deleteSelected, it doesn't do anything but avoids the script breaking on preventDefault.

        $httpBackend.expectGET("/api/"+ four51.app.ApiAppName +"/message").respond(jsonMessageList);

        ctrlMsgList('MessageListCtrl', {
            $scope: scope
        });

        scope.$apply(); //do the magic
        $httpBackend.flush();

        expect(scope.messages.length).toBe(10);

        scope.messages[0].Selected = true;
        scope.messages[1].Selected = true;

        //deleteSelected() accepts a JQuery $event which we mockup with jasmine createSpy so it doesn't break
        scope.deleteSelected(event); //we can't test whether a single element is deleted or not because the API call deletes the cache and re-gets them after deleting.

        $httpBackend.expectDELETE("/api/russ/message?Body=null&Box=Inbox&DateSent=2013-07-15T10:23:01.693&FromName=Core+Prod+User&ID=39539254x&Selected=true&Subject=MultiDeleteTest&ToName=Core+Prod+User").respond();
        $httpBackend.expectDELETE("/api/russ/message?Body=null&Box=Inbox&DateSent=2013-07-15T10:22:54.363&FromName=Core+Prod+User&ID=39539253x&Selected=true&Subject=MultiDeleteTest&ToName=Core+Prod+User").respond();
        $httpBackend.expectGET("/api/russ/message").respond(jsonMessageList.slice(2));

        scope.$apply(); //do the magic
        $httpBackend.flush();

        expect(event.preventDefault).toHaveBeenCalled();
        expect(scope.messages.length).toBe(8);

    })
    it('Should delete ALL messages after checkAll (both in and sent)', function(){

        var event = {preventDefault: jasmine.createSpy()}; //we do this to mock the event passed to deleteSelected, it doesn't do anything but avoids the script breaking on preventDefault.

        $httpBackend.expectGET("/api/russ/message").respond(jsonMessageList);

        ctrlMsgList('MessageListCtrl', {
            $scope: scope
        });

        scope.$apply(); //do the magic
        $httpBackend.flush();

        expect(scope.messages.length).toBe(10);

        scope.checkAll(event,"Inbox");
        scope.checkAll(event,"SentBox");

        //deleteSelected() accepts a JQuery $event which we mockup with jasmine createSpy so it doesn't break
        scope.deleteSelected(event); //we can't test whether a single element is deleted or not because the API call deletes the cache and re-gets them after deleting.

        $httpBackend.expectDELETE("/api/russ/message?Body=null&Box=Inbox&DateSent=2013-07-15T10:23:01.693&FromName=Core+Prod+User&ID=39539254x&Selected=true&Subject=MultiDeleteTest&ToName=Core+Prod+User").respond();
        $httpBackend.expectDELETE("/api/russ/message?Body=null&Box=Inbox&DateSent=2013-07-15T10:22:54.363&FromName=Core+Prod+User&ID=39539253x&Selected=true&Subject=MultiDeleteTest&ToName=Core+Prod+User").respond();
        $httpBackend.expectDELETE("/api/russ/message?Body=null&Box=Inbox&DateSent=2013-07-15T10:22:49.083&FromName=Core+Prod+User&ID=39539252x&Selected=true&Subject=MultiDeleteTest&ToName=Core+Prod+User").respond();
        $httpBackend.expectDELETE("/api/russ/message?Body=null&Box=Inbox&DateSent=2013-07-15T10:22:27.74&FromName=Core+Prod+User&ID=39539251x&Selected=true&Subject=Test+Sent+List+Reply+Subject&ToName=Core+Prod+User").respond();
        $httpBackend.expectDELETE("/api/russ/message?Body=null&Box=Inbox&DateSent=2013-07-15T10:21:22.817&FromName=Core+Prod+User&ID=39539250x&Selected=true&Subject=Test+Delete+Sent-Reply+Message&ToName=Core+Prod+User").respond();
        $httpBackend.expectDELETE("/api/russ/message?Body=null&Box=Inbox&DateSent=2013-07-11T11:19:19.633&FromName=Core+Prod+User&ID=39539241x&Selected=true&Subject=Test+Sent+List+Reply+Subject&ToName=Core+Prod+User").respond();
        $httpBackend.expectDELETE("/api/russ/message?Body=null&Box=Inbox&DateSent=2013-07-11T11:16:24.043&FromName=Core+Prod+User&ID=39539240x&Selected=true&Subject=Test+Delete+Sent-Reply+Message&ToName=Core+Prod+User").respond();
        $httpBackend.expectDELETE("/api/russ/message?Body=null&Box=Inbox&DateSent=2013-07-11T11:14:47.107&FromName=Core+Prod+User&ID=39539239x&Selected=true&Subject=RE:+Test+Message&ToName=Core+Prod+User").respond();
        $httpBackend.expectDELETE("/api/russ/message?Body=null&Box=SentBox&DateSent=2013-07-11T11:14:47.107&FromName=Core+Prod+User&ID=39539239x&Selected=true&Subject=RE:+Test+Message&ToName=Core+Prod+User").respond();
        $httpBackend.expectDELETE("/api/russ/message?Body=null&Box=SentBox&DateSent=2013-07-11T11:13:58.497&FromName=Core+Prod+User&ID=39539238x&Selected=true&Subject=Test+Message&ToName=Core+Prod+Admin").respond();

        $httpBackend.expectGET("/api/russ/message").respond();

        scope.$apply(); //do the magic
        $httpBackend.flush();

        expect(event.preventDefault).toHaveBeenCalled();
        expect(scope.messages.length).toBe(0);

    })

 });

//let's test that the MessageView Controller works
describe('$451 MessageView Controller :',function(){

    var jsonMessage = {"ID":"39539271x","Box":"SentBox","DateSent":"2013-07-16T13:42:11.943","Subject":"RE: Test Compose Message","ToName":"Core Prod User","FromName":"Core Prod User","Body":"Reply to Test Compose Message","Selected":false}

    var $451, scope, $httpBackend, ctrlMessageView, $location, $routeParams;

    beforeEach(module('451order'));

    beforeEach(inject(function(_$451_,$rootScope,$controller,_$httpBackend_, _$location_, _$routeParams_){
        $451 = _$451_;
        $location = _$location_;
        $httpBackend = _$httpBackend_;
        ctrlMessageView = $controller;
        scope = $rootScope.$new();
        $routeParams = _$routeParams_;
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('Should be a defined object', function(){

        ctrlMessageView('MessageViewCtrl', {
            $scope: scope
        });

        expect(ctrlMessageView).toBeDefined();

    });
    it('Should get data from the service and apply it to the scope when message specified', function(){
        $routeParams.id = jsonMessage.ID;

        $httpBackend.expectGET("/api/"+ four51.app.ApiAppName +"/message/" + jsonMessage.ID).respond(jsonMessage);
        ctrlMessageView('MessageViewCtrl', {
            $scope: scope
        });

        expect(ctrlMessageView).toBeDefined();

        scope.$apply(); //do the magic
        $httpBackend.flush();

        //expect(scope.message).toBe(jsonMessage); //this won't work because of the way angular returns stuff versus the mocked version.  we can compare it at a lower level though.

        //let's just test that a few properties are applied and match
        expect(scope.message.ID).toBe(jsonMessage.ID);
        expect(scope.message.Subject).toBe(jsonMessage.Subject);
        expect(scope.message.ToName).toBe(jsonMessage.ToName);
        expect(scope.message.FromName).toBe(jsonMessage.FromName);

        $451.clear("Message." + jsonMessage.ID) //cleanup for the next test spec

    });
    it('Should add the canReply method to scope, which should check Box and return true/false', function(){
        $routeParams.id = jsonMessage.ID;

        $httpBackend.expectGET("/api/"+ four51.app.ApiAppName +"/message/" + jsonMessage.ID).respond(jsonMessage);
        ctrlMessageView('MessageViewCtrl', {
            $scope: scope
        });

        expect(ctrlMessageView).toBeDefined();

        scope.$apply(); //do the magic
        $httpBackend.flush();

        expect(scope.canReply()).toBeFalsy(); //by default this is a SentBox message
        scope.message.Box = "Inbox";
        expect(scope.canReply()).toBeTruthy(); //now it should return true

        $451.clear("Message." + jsonMessage.ID) //cleanup for the next test spec

    });
    it('Should add the ok method to scope, which should just redirect', function(){
        $routeParams.id = jsonMessage.ID;

        $httpBackend.expectGET("/api/"+ four51.app.ApiAppName +"/message/" + jsonMessage.ID).respond(jsonMessage);
        ctrlMessageView('MessageViewCtrl', {
            $scope: scope
        });

        scope.$apply(); //do the magic
        $httpBackend.flush();

        expect($location.path()).toBe("");
        scope.ok();
        expect($location.path()).toBe("/message");

        $451.clear("Message." + jsonMessage.ID) //cleanup for the next test spec

    });
    it('Should add the send method to scope, which should save via API and redirect', function(){
        $routeParams.id = jsonMessage.ID;

        $httpBackend.expectGET("/api/"+ four51.app.ApiAppName +"/message/" + jsonMessage.ID).respond(jsonMessage);
        ctrlMessageView('MessageViewCtrl', {
            $scope: scope
        });

        expect(scope.message.ID).toBeUndefined();

        scope.$apply(); //do the magic
        $httpBackend.flush();

        console.dir(scope)

        scope.send();

        $httpBackend.expectPOST("/api/"+ four51.app.ApiAppName +"/message").respond();
        scope.$apply();
        $httpBackend.flush();

        expect($location.path()).toBe("/message");
        expect(scope.message.ID).toBe(jsonMessage.ID);

        $451.clear("Message." + jsonMessage.ID); //cleanup for the next test spec
    });
    it('Should add the delete method to scope, which should delete via API and redirect', function(){
        var event = {preventDefault: jasmine.createSpy()}; //we do this to mock the event passed to delete, it doesn't do anything but avoids the script breaking on preventDefault.

        $routeParams.id = jsonMessage.ID;

        $httpBackend.expectGET("/api/"+ four51.app.ApiAppName +"/message/" + jsonMessage.ID).respond(jsonMessage);

        ctrlMessageView('MessageViewCtrl', {
            $scope: scope
        });

        expect(scope.message.ID).toBeUndefined();

        scope.$apply(); //do the magic, get the specified message and apply it to the scope
        $httpBackend.flush();

        expect(scope.message.ID).toBe(jsonMessage.ID);

        scope.delete(event);

        $httpBackend.expectDELETE("/api/"+ four51.app.ApiAppName +"/message?Body=Reply+to+Test+Compose+Message&Box=SentBox&DateSent=2013-07-16T13:42:11.943&FromName=Core+Prod+User&ID=39539271x&Selected=false&Subject=RE:+Test+Compose+Message&ToName=Core+Prod+User").respond();

        scope.$apply(); //do the magic, fire the delete event and let the service call the mocked API
        $httpBackend.flush();

        expect($location.path()).toBe("/message");
        expect(event.preventDefault).toHaveBeenCalled(); //verify delete was called
        expect(scope.message.ID).toBeUndefined();

        $451.clear("Message." + jsonMessage.ID); //cleanup for the next test spec
    });
});
