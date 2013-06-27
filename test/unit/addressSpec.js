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

    var scope, $httpBackend, ctrlAddress;

    beforeEach(module('451order'));

    beforeEach(inject(function($rootScope,$controller,_$httpBackend_){
        $httpBackend = _$httpBackend_;
        ctrlAddress = $controller;
        scope = $rootScope.$new();


        //ctrlAddress = $controller('AddressListCtrl', {
          //  $scope: scope
        //});

    }));

    afterEach(function() {
        //$httpBackend.verifyNoOutstandingExpectation();
        //$httpBackend.verifyNoOutstandingRequest();
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

        console.dir(scope);
        console.dir(ctrlAddress);

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

        expect(ctrlAddress).toBeDefined();

        //scope.$apply(); //do the magic

        scope.addresses[0].Selected = true;

        scope.deleteSelected();
        console.log("why didn't work")
        scope.checkAll;
        scope.$apply();

        //$httpBackend.flush();

        console.dir(scope);
        console.dir(ctrlAddress);

        //expect(scope.addresses).toBe(jsonAddresses); //this won't work because of the way angular returns stuff versus the mocked version.  we can compare it at a lower level though.

        //let's just test that a few properties are applied and match
        expect(scope.addresses[0].AddressName).toBe(jsonAddresses[0].AddressName);
        expect(scope.addresses[1].Street2).toBe(jsonAddresses[1].Street2);
        expect(scope.addresses[0].IsBilling).toBe(jsonAddresses[0].IsBilling);
        expect(scope.addresses[1].IsShipping).toBe(jsonAddresses[1].IsShipping);
    })
});

