'use strict';
//this file contains test specs for addressCtrl.js
//it was decided to not bother testing the AddressService as it primarily uses the angular framework which is beyond the scope of this testing suite

var C_debug = false;
//let's test that the AddressList Controller works
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

        scope.deleteSelected(); //just emptying the cache for the next spec
    })
});

//let's test that the AddressView Controller works
describe('$451 AddressView Controller :',function(){

    var jsonAddress = {"InteropID":"667","AddressName":"667 or Up and Bad 667","CompanyName":"CC Testing","Street1":"792 Maple","DistCompanyID":"4295x","Street2":"","City":"kjielkdk","State":"MN","Zip":"94303","Country":"US","Phone":"","CompanyID":"4300x","IsCustEditable":false,"FirstName":"CC","LastName":"Five","IsShipping":true,"IsBilling":true};

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
    it('Should set the address property to an empty object if no ID specified', function(){

        expect(scope.address).toBeUndefined();

        ctrlAddress('AddressViewCtrl', {
            $scope: scope
        });

        expect(scope.address).toEqual({});
    });
    it('Should get data from the service and apply it to the scope when address specified', function(){
        $routeParams.id = jsonAddress.InteropID;

        $httpBackend.expectGET("/api/russ/address/" + jsonAddress.InteropID).respond(jsonAddress);
        //problem here... spaces get URLencoded.. do we use a different address object or figure out how to get around this, cuz it's gonna happen again...??

        //$httpBackend.expectGET("partials/category.html").respond("<empty/>"); //no idea why this is happening, probably something is triggering a redirect
        //leaving it in because it should be investigated but it's not critical right now

        ctrlAddress('AddressViewCtrl', {
            $scope: scope
        });

        expect(ctrlAddress).toBeDefined();

        scope.$apply(); //do the magic

        $httpBackend.flush();

        //expect(scope.address).toBe(jsonAddress); //this won't work because of the way angular returns stuff versus the mocked version.  we can compare it at a lower level though.

        //let's just test that a few properties are applied and match
        expect(scope.address.AddressName).toBe(jsonAddress.AddressName);
        expect(scope.address.Street2).toBe(jsonAddress.Street2);
        expect(scope.address.IsBilling).toBe(jsonAddress.IsBilling);
        expect(scope.address.IsShipping).toBe(jsonAddress.IsShipping);

        //console.dir(scope)
    });
});

describe('$451 AddressInputCtrl Controller :',function(){

    var jsonAddress = {"InteropID":"667","AddressName":"667 or Up and Bad 667","CompanyName":"CC Testing","Street1":"792 Maple","DistCompanyID":"4295x","Street2":"","City":"kjielkdk","State":"MN","Zip":"94303","Country":"US","Phone":"","CompanyID":"4300x","IsCustEditable":false,"FirstName":"CC","LastName":"Five","IsShipping":true,"IsBilling":true};
    var jsonAddressNew = {"InteropID":"123","AddressName":"NewAddress","CompanyName":"CC Testing","Street1":"792 Maple","DistCompanyID":"4295x","Street2":"","City":"kjielkdk","State":"MN","Zip":"94303","Country":"CA","Phone":"","CompanyID":"4300x","IsCustEditable":false,"FirstName":"CC","LastName":"Five","IsShipping":false,"IsBilling":false};
    var jsonAddresses = [
        {"InteropID":"667 or Up and Bad 667","AddressName":"667 or Up and Bad 667","CompanyName":"CC Testing","Street1":"792 Maple","DistCompanyID":"4295x","Street2":"","City":"kjielkdk","State":"MN","Zip":"94303","Country":"US","Phone":"","CompanyID":"4300x","IsCustEditable":false,"FirstName":"CC","LastName":"Five","IsShipping":true,"IsBilling":true},
        {"InteropID":"2","AddressName":"667 or Up and Good","CompanyName":"CC Testing","Street1":"792 Maple","DistCompanyID":"4295x","Street2":"","City":"dkjs'ldkf","State":"MN","Zip":"00382","Country":"US","Phone":"","CompanyID":"4300x","IsCustEditable":false,"FirstName":"CC","LastName":"Six","IsShipping":true,"IsBilling":true}
    ];

    var scope, $451, $httpBackend, ctrlAddress, ctrlAddressInput, $location, $routeParams;

    beforeEach(module('451order'));

    beforeEach(inject(function(_$451_, $rootScope,$controller,_$httpBackend_, _$location_, _$routeParams_){
        $451 = _$451_;
        $location = _$location_;
        $httpBackend = _$httpBackend_;
        ctrlAddress = $controller;
        ctrlAddressInput = $controller;
        scope = $rootScope.$new();
        $routeParams = _$routeParams_;

        //ctrlAddress = $controller('AddressInputCtrl', {
        //  $scope: scope
        //});
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('Should be a defined object and setup defaults for new address object', function(){

        expect(scope.address).not.toBeDefined();

        ctrlAddress('AddressViewCtrl', { //this tries to get an address from routeparams (not set), fails, and creates an empty address object so INPUT can set defaults
            $scope: scope
        });

        expect(scope.address).toBeDefined();
        expect(scope.address.Country).toBeUndefined();

        ctrlAddressInput('AddressInputCtrl', { //we created an address object and return property in the view controller already, now we can set defaults
            $scope: scope
        });

        expect(scope.address.Country).toBe("US");
        expect(scope.address.IsBilling).toBe(true);
        expect(scope.address.IsShipping).toBe(true);
    });

    it('Should not override values to default for existing address object', function(){

        $routeParams.id = jsonAddressNew.InteropID;
        $httpBackend.expectGET("/api/russ/address/" + jsonAddressNew.InteropID).respond(jsonAddressNew);
        //$httpBackend.expectGET("partials/category.html").respond("<empty/>"); //no idea why this is happening, probably something is triggering a redirect
        //leaving it in because it should be investigated but it's not critical right now

        ctrlAddress('AddressViewCtrl', { //this tries to get an address and loads it into the scope
            $scope: scope
        });

        scope.$apply();
        $httpBackend.flush();

        ctrlAddressInput('AddressInputCtrl', {
            $scope: scope
        });

        expect(scope.address.Country).toBe("CA");
        expect(scope.address.IsBilling).toBe(false);
        expect(scope.address.IsShipping).toBe(false);

        $451.clear("Address." + jsonAddressNew.InteropID) //cleanup for the next test spec

    });

//check scope.countries property and scope.states property

//country
//hasStates
//isPhoneRequired

//let's test that the AddressInputCtrl works

    it('Should redirect to /addresses on save', function(){
        $routeParams.id = jsonAddressNew.InteropID;
        $httpBackend.expectGET("/api/russ/address/" + jsonAddressNew.InteropID).respond(jsonAddressNew);
        $httpBackend.expectPOST("/api/russ/address").respond({}); //not sure what we're doing here but we're calling a POST method to save the address
        $httpBackend.expectGET("partials/category.html").respond("<empty/>"); //no idea why this is happening, probably something is triggering a redirect
        $httpBackend.expectGET("partials/addressList.html").respond("<empty/>");

        ctrlAddress('AddressViewCtrl', { //this tries to get an address and loads it into the scope
            $scope: scope
        });
        ctrlAddressInput('AddressInputCtrl', { //now we've added some properties and methods
            $scope: scope
        });

        expect($location.path()).not.toBe("/addresses");
        scope.save();


        scope.$apply(); //do the magic
        $httpBackend.flush();

        expect($location.path()).toBe(scope.return);

        //clear the cache to avoid confusing shenanigans
        $451.clear("Address." + jsonAddressNew.InteropID)
    });
    it('Should redirect to /addresses on delete', function(){ //essentially the same as the last test, different method name
        $routeParams.id = jsonAddressNew.InteropID;
        $httpBackend.expectGET("/api/russ/address/" + jsonAddressNew.InteropID).respond(jsonAddressNew);
        $httpBackend.expectDELETE("/api/russ/address?Country=US&IsBilling=true&IsShipping=true").respond({}); //not sure what we're doing here but we're calling a POST method to delete the address
        $httpBackend.expectGET("partials/category.html").respond("<empty/>"); //no idea why this is happening, probably something is triggering a redirect
        $httpBackend.expectGET("partials/addressList.html").respond("<empty/>");

        ctrlAddress('AddressViewCtrl', { //this tries to get an address and loads it into the scope
            $scope: scope
        });
        ctrlAddressInput('AddressInputCtrl', { //now we've added some properties and methods
            $scope: scope
        });


        console.dir(scope)
        console.dir(scope.address)
        console.dir($location.path())


        expect($location.path()).not.toBe("/addresses");
        scope.delete();

        scope.$apply(); //do the magic
        $httpBackend.flush();

        expect($location.path()).toBe(scope.return);


        //clear the cache to avoid confusing shenanigans
        $451.clear("Address." + jsonAddressNew.InteropID)
    });

    xit('Should set Selected=True via checkAll)', function(){

        $httpBackend.expectGET("/api/russ/address").respond(jsonAddress);

        ctrlAddressInput('AddressInputCtrl', {
            $scope: scope
        });

        scope.$apply(); //do the magic

        expect(ctrlAddressInput).toBeDefined();

        $httpBackend.flush();

        expect(scope.addresses[0].Selected).toBeUndefined(); //nothing should be selected
        expect(scope.addresses[1].Selected).toBeUndefined(); //nothing should be selected

        scope.checkAll(null);

        expect(scope.addresses[0].Selected).toBe(true); //every one should be selected
        expect(scope.addresses[1].Selected).toBe(true); //every one should be selected
    })
});