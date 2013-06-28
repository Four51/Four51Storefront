'use strict';
//this file contains test specs for addressCtrl.js
//it was decided to not bother testing the AddressService as it primarily uses the angular framework which is beyond the scope of this testing suite

var C_debug = false;
//let's test that the AddressList Controller  works
describe('$451 AddressList Controller :',function(){

    var jsonAddresses = [
        {"InteropID":"667 or Up and Bad 667","AddressName":"667 or Up and Bad 667","CompanyName":"CC Testing","Street1":"792 Maple","DistCompanyID":"4295x","Street2":"","City":"kjielkdk","State":"MN","Zip":"94303","Country":"US","Phone":"","CompanyID":"4300x","IsCustEditable":false,"FirstName":"CC","LastName":"Five","IsShipping":true,"IsBilling":true},
        {"InteropID":"2","AddressName":"667 or Up and Good","CompanyName":"CC Testing","Street1":"792 Maple","DistCompanyID":"4295x","Street2":"","City":"dkjs'ldkf","State":"MN","Zip":"00382","Country":"US","Phone":"","CompanyID":"4300x","IsCustEditable":false,"FirstName":"CC","LastName":"Six","IsShipping":true,"IsBilling":true}
    ];

    var scope, $httpBackend, ctrlAddress, $location;

    beforeEach(module('451order'));

    beforeEach(inject(function($rootScope,$controller,_$httpBackend_, _$location_){
        $location = _$location_;
        $httpBackend = _$httpBackend_;
        ctrlAddress = $controller;
        scope = $rootScope.$new();


        //ctrlAddress = $controller('AddressListCtrl', {
        //  $scope: scope
        //});

    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('Should be a defined object', function(){

        ctrlAddress('AddressListCtrl', {
            $scope: scope
        });

        expect(ctrlAddress).toBeDefined();

    });
    it('Should get data from the service and apply it to the scope (no address specified)', function(){

        $httpBackend.expectGET("/api/russ/address").respond(jsonAddresses);

        ctrlAddress('AddressListCtrl', {
            $scope: scope
        });

        expect(ctrlAddress).toBeDefined();

        scope.$apply(); //do the magic
        $httpBackend.flush();

        //expect(scope.addresses).toBe(jsonAddresses); //this won't work because of the way angular returns stuff versus the mocked version.  we can compare it at a lower level though.

        //let's just test that a few properties are applied and match
        expect(scope.addresses[0].AddressName).toBe(jsonAddresses[0].AddressName);
        expect(scope.addresses[1].Street2).toBe(jsonAddresses[1].Street2);
        expect(scope.addresses[0].IsBilling).toBe(jsonAddresses[0].IsBilling);
        expect(scope.addresses[1].IsShipping).toBe(jsonAddresses[1].IsShipping);
    });
    it('Should allow deletion)', function(){

        $httpBackend.expectGET("/api/russ/address").respond(jsonAddresses);

        ctrlAddress('AddressListCtrl', {
            $scope: scope
        });

        scope.$apply(); //do the magic

        console.dir(scope)
        expect(ctrlAddress).toBeDefined();

        $httpBackend.flush();

        scope.deleteSelected(); //we can't test whether a single element is deleted or not because the API call deletes the cache and re-gets them after deleting, so the scope is all gone
        expect(scope.addresses.length).toBe(0);

    })
    it('Should redirect on "addition")', function(){

        $httpBackend.expectGET("/api/russ/address").respond(jsonAddresses);

        ctrlAddress('AddressListCtrl', {
            $scope: scope
        });

        scope.$apply(); //do the magic

        console.dir(scope)
        expect(ctrlAddress).toBeDefined();

        $httpBackend.flush();
        console.dir($location.path());

        expect($location.path()).not.toBe("/address");
        scope.newAddress();
        expect($location.path()).toBe("/address");
    })
    it('Should set Selected=True via checkAll)', function(){

        $httpBackend.expectGET("/api/russ/address").respond(jsonAddresses);

        ctrlAddress('AddressListCtrl', {
            $scope: scope
        });

        scope.$apply(); //do the magic

        expect(ctrlAddress).toBeDefined();

        $httpBackend.flush();

        expect(scope.addresses[0].Selected).toBeUndefined(); //nothing should be selected
        expect(scope.addresses[1].Selected).toBeUndefined(); //nothing should be selected

        scope.checkAll(null);

        expect(scope.addresses[0].Selected).toBe(true); //every one should be selected
        expect(scope.addresses[1].Selected).toBe(true); //every one should be selected
    })
});

//let's test that the AddressView Controller  works
describe('$451 AddressView Controller :',function(){

    var jsonAddress = {"InteropID":"667","AddressName":"667 or Up and Bad 667","CompanyName":"CC Testing","Street1":"792 Maple","DistCompanyID":"4295x","Street2":"","City":"kjielkdk","State":"MN","Zip":"94303","Country":"US","Phone":"","CompanyID":"4300x","IsCustEditable":false,"FirstName":"CC","LastName":"Five","IsShipping":true,"IsBilling":true};
    var jsonAddresses = [
        {"InteropID":"667 or Up and Bad 667","AddressName":"667 or Up and Bad 667","CompanyName":"CC Testing","Street1":"792 Maple","DistCompanyID":"4295x","Street2":"","City":"kjielkdk","State":"MN","Zip":"94303","Country":"US","Phone":"","CompanyID":"4300x","IsCustEditable":false,"FirstName":"CC","LastName":"Five","IsShipping":true,"IsBilling":true},
        {"InteropID":"2","AddressName":"667 or Up and Good","CompanyName":"CC Testing","Street1":"792 Maple","DistCompanyID":"4295x","Street2":"","City":"dkjs'ldkf","State":"MN","Zip":"00382","Country":"US","Phone":"","CompanyID":"4300x","IsCustEditable":false,"FirstName":"CC","LastName":"Six","IsShipping":true,"IsBilling":true}
    ];

    var scope, $httpBackend, ctrlAddress, $location, $routeParams;

    beforeEach(module('451order'));

    beforeEach(inject(function($rootScope,$controller,_$httpBackend_, _$location_, _$routeParams_){
        $location = _$location_;
        $httpBackend = _$httpBackend_;
        ctrlAddress = $controller;
        scope = $rootScope.$new();
        $routeParams = _$routeParams_;

        //ctrlAddress = $controller('AddressViewCtrl', {
        //  $scope: scope
        //});

    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('Should be a defined object', function(){

        ctrlAddress('AddressViewCtrl', {
            $scope: scope
        });

        expect(ctrlAddress).toBeDefined();

    });
    //test controller with routeparam ID specified
    //test controller with routeparam ID empty
        //if empty, it should get some defaults populated
    //on save or delete, redirect to /addresses

    //check scope.countries property and scope.states property

    //country
    //hasStates
    //isPhoneRequired

    it('Should get data from the service and apply it to the scope (no address specified)', function(){
        $routeParams.id = jsonAddress.InteropID;
        console.dir($routeParams)
        //$httpBackend.expectGET("partials/category.html").respond("<empty/>");

        $httpBackend.expectGET("/api/russ/address/" + jsonAddress.InteropID).respond(jsonAddress);
        //$httpBackend.expectGET("/api/russ/addresses").respond(jsonAddresses);

        //problem here... spaces get URLencoded.. do we use a different address object or figure out how to get around this, cuz it's gonna happen again...??

        ctrlAddress('AddressViewCtrl', {
            $scope: scope
        });

        expect(ctrlAddress).toBeDefined();

        console.dir(scope)
        console.dir(scope.address)

        scope.$apply(); //do the magic
        $httpBackend.flush();


        //expect(scope.addresses).toBe(jsonAddresses); //this won't work because of the way angular returns stuff versus the mocked version.  we can compare it at a lower level though.

        /*
        //let's just test that a few properties are applied and match
        expect(scope.addresses[0].AddressName).toBe(jsonAddress[0].AddressName);
        expect(scope.addresses[1].Street2).toBe(jsonAddress[1].Street2);
        expect(scope.addresses[0].IsBilling).toBe(jsonAddress[0].IsBilling);
        expect(scope.addresses[1].IsShipping).toBe(jsonAddress[1].IsShipping);
        */
    });
    xit('Should allow deletion)', function(){

        $httpBackend.expectGET("/api/russ/address").respond(jsonAddress);

        ctrlAddress('AddressListCtrl', {
            $scope: scope
        });

        scope.$apply(); //do the magic

        console.dir(scope)
        expect(ctrlAddress).toBeDefined();

        $httpBackend.flush();

        scope.deleteSelected(); //we can't test whether a single element is deleted or not because the API call deletes the cache and re-gets them after deleting, so the scope is all gone
        expect(scope.addresses.length).toBe(0);

    })
    xit('Should redirect on "addition")', function(){

        $httpBackend.expectGET("/api/russ/address").respond(jsonAddress);

        ctrlAddress('AddressListCtrl', {
            $scope: scope
        });

        scope.$apply(); //do the magic

        console.dir(scope)
        expect(ctrlAddress).toBeDefined();

        $httpBackend.flush();
        console.dir($location.path());

        expect($location.path()).not.toBe("/address");
        scope.newAddress();
        expect($location.path()).toBe("/address");
    })
    xit('Should set Selected=True via checkAll)', function(){

        $httpBackend.expectGET("/api/russ/address").respond(jsonAddress);

        ctrlAddress('AddressListCtrl', {
            $scope: scope
        });

        scope.$apply(); //do the magic

        expect(ctrlAddress).toBeDefined();

        $httpBackend.flush();

        expect(scope.addresses[0].Selected).toBeUndefined(); //nothing should be selected
        expect(scope.addresses[1].Selected).toBeUndefined(); //nothing should be selected

        scope.checkAll(null);

        expect(scope.addresses[0].Selected).toBe(true); //every one should be selected
        expect(scope.addresses[1].Selected).toBe(true); //every one should be selected
    })
});

