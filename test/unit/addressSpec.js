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

        $httpBackend.expectGET("/api/"+ four51.app.ApiAppName +"/address").respond(jsonAddresses);

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

        $httpBackend.expectGET("/api/"+ four51.app.ApiAppName +"/address").respond(jsonAddresses);

        ctrlAddress('AddressListCtrl', {
            $scope: scope
        });

        scope.$apply(); //do the magic
        //$httpBackend.flush();

        scope.deleteSelected(); //we can't test whether a single element is deleted or not because the API call deletes the cache and re-gets them after deleting, so the scope is all gone
        expect(scope.addresses.length).toBe(0);

        $httpBackend.expectDELETE("/api/russ/address").respond(jsonAddresses);

        scope.$apply(); //do the magic
        $httpBackend.flush();



    })
    it('Should redirect on "addition")', function(){

        $httpBackend.expectGET("/api/"+ four51.app.ApiAppName +"/address").respond(jsonAddresses);

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

        $httpBackend.expectGET("/api/"+ four51.app.ApiAppName +"/address").respond(jsonAddresses);

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

        $httpBackend.expectGET("/api/"+ four51.app.ApiAppName +"/address/" + jsonAddress.InteropID).respond(jsonAddress);
        //problem here... spaces get URLencoded.. do we use a different address object or figure out how to get around this, cuz it's gonna happen again...??

        //$httpBackend.expectGET("partials/categoryView.html").respond("<empty/>"); //no idea why this is happening, probably something is triggering a redirect
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

//let's test that the AddressInputCtrl Controller works
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
        $httpBackend.expectGET("/api/"+ four51.app.ApiAppName +"/address/" + jsonAddressNew.InteropID).respond(jsonAddressNew);
        //$httpBackend.expectGET("partials/categoryView.html").respond("<empty/>"); //no idea why this is happening, probably something is triggering a redirect
        //leaving it in because it should be investigated but it's not critical right now

        //update:  I think this is because the addressInputCtrl is instantiating the user service, but I'm not sure how to intercept it's API call
        //$httpBackend.expectGET("/api/"+ four51.app.ApiAppName +"/user").respond({}); this should* work but I think the request to the user API is getting redirected by the routing

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

    it('Should redirect to /addresses on save', function(){
        $routeParams.id = jsonAddressNew.InteropID;
        $httpBackend.expectGET("/api/"+ four51.app.ApiAppName +"/address/" + jsonAddressNew.InteropID).respond(jsonAddressNew);
        $httpBackend.expectPOST("/api/"+ four51.app.ApiAppName +"/address").respond({}); //not sure what we're doing here but we're calling a POST method to save the address
        $httpBackend.expectGET("partials/categoryView.html").respond("<empty/>"); //no idea why this is happening, probably something is triggering a redirect
        $httpBackend.expectGET("partials/addressListView.html").respond("<empty/>");

        ctrlAddress('AddressViewCtrl', { //this tries to get an address and loads it into the scope
            $scope: scope
        });
        ctrlAddressInput('AddressInputCtrl', { //now we've added some properties and methods
            $scope: scope
        });

        expect($location.path()).not.toBe(scope.return);
        scope.save();
        scope.$apply(); //do the magic
        $httpBackend.flush();

        expect($location.path()).toBe(scope.return);

        //clear the cache to avoid confusing shenanigans
        $451.clear("Address." + jsonAddressNew.InteropID)
    });

    it('Should redirect to /addresses on delete', function(){ //essentially the same as the last test, different method name
        $routeParams.id = jsonAddressNew.InteropID;
        $httpBackend.expectGET("/api/"+ four51.app.ApiAppName +"/address/" + jsonAddressNew.InteropID).respond(jsonAddressNew);
        $httpBackend.expectDELETE("/api/"+ four51.app.ApiAppName +"/address?Country=US&IsBilling=true&IsShipping=true").respond({}); //not sure what we're doing here but we're calling a POST method to delete the address
        $httpBackend.expectGET("partials/categoryView.html").respond("<empty/>"); //no idea why this is happening, probably something is triggering a redirect
        $httpBackend.expectGET("partials/addressListView.html").respond("<empty/>");

        ctrlAddress('AddressViewCtrl', { //this tries to get an address and loads it into the scope
            $scope: scope
        });
        ctrlAddressInput('AddressInputCtrl', { //now we've added some properties and methods
            $scope: scope
        });

        expect($location.path()).not.toBe(scope.return);
        scope.delete();

        scope.$apply(); //do the magic
        $httpBackend.flush();

        expect($location.path()).toBe(scope.return);

        //clear the cache to avoid confusing shenanigans
        $451.clear("Address." + jsonAddressNew.InteropID)
    });

    it('Should have a countries property that contains a list of countries', function(){ //essentially the same as the last test, different method name
        $routeParams.id = jsonAddressNew.InteropID;
        $httpBackend.expectGET("/api/"+ four51.app.ApiAppName +"/address/" + jsonAddressNew.InteropID).respond(jsonAddressNew);
        $httpBackend.expectGET("partials/categoryView.html").respond("<empty/>"); //no idea why this is happening, probably something is triggering a redirect

        ctrlAddress('AddressViewCtrl', { //this tries to get an address and loads it into the scope
            $scope: scope
        });
        ctrlAddressInput('AddressInputCtrl', { //now we've added some properties and methods
            $scope: scope
        });

        expect(scope.countries.length).toBeGreaterThan(200); //this is a safe test, it's 245 right now but that can easily change
        scope.$apply(); //do the magic
        $httpBackend.flush();

        //clear the cache to avoid confusing shenanigans
        $451.clear("Address." + jsonAddressNew.InteropID)
    });

    it('Should have a states property that contains a list of states', function(){ //essentially the same as the last test, different method name
        $routeParams.id = jsonAddressNew.InteropID;
        $httpBackend.expectGET("/api/"+ four51.app.ApiAppName +"/address/" + jsonAddressNew.InteropID).respond(jsonAddressNew);
        $httpBackend.expectGET("partials/categoryView.html").respond("<empty/>"); //no idea why this is happening, probably something is triggering a redirect

        ctrlAddress('AddressViewCtrl', { //this tries to get an address and loads it into the scope
            $scope: scope
        });
        ctrlAddressInput('AddressInputCtrl', { //now we've added some properties and methods
            $scope: scope
        });

        expect(scope.states.length).toBeGreaterThan(60); //this is a safe test, it's 67 right now but that can easily change
        scope.$apply(); //do the magic
        $httpBackend.flush();

        //clear the cache to avoid confusing shenanigans
        $451.clear("Address." + jsonAddressNew.InteropID)
    });

    it('Should have a country function that returns true/false depending if the address country matches', function(){ //essentially the same as the last test, different method name
        $routeParams.id = jsonAddressNew.InteropID;
        $httpBackend.expectGET("/api/"+ four51.app.ApiAppName +"/address/" + jsonAddressNew.InteropID).respond(jsonAddressNew);
        $httpBackend.expectGET("partials/categoryView.html").respond("<empty/>"); //no idea why this is happening, probably something is triggering a redirect

        ctrlAddress('AddressViewCtrl', { //this tries to get an address and loads it into the scope
            $scope: scope
        });
        ctrlAddressInput('AddressInputCtrl', { //now we've added some properties and methods
            $scope: scope
        });

        scope.$apply(); //do the magic
        $httpBackend.flush();

        var itemCountry = {};
        itemCountry.country = "CA"; //mocking an additional address for comparison

        var itemWrongCountry = {};
        itemWrongCountry.country = "CH"; //mocking an additional address for comparison


        expect(scope.country(itemCountry)).toBeTruthy();
        expect(scope.country(itemWrongCountry)).toBeFalsy();

        //clear the cache to avoid confusing shenanigans
        $451.clear("Address." + jsonAddressNew.InteropID)
    });

    it('Should have a hasStates function that returns true for the given country of CA', function(){ //essentially the same as the last test, different method name
        $routeParams.id = jsonAddressNew.InteropID;
        $httpBackend.expectGET("/api/"+ four51.app.ApiAppName +"/address/" + jsonAddressNew.InteropID).respond(jsonAddressNew);
        $httpBackend.expectGET("partials/categoryView.html").respond("<empty/>"); //no idea why this is happening, probably something is triggering a redirect

        ctrlAddress('AddressViewCtrl', { //this tries to get an address and loads it into the scope
            $scope: scope
        });
        ctrlAddressInput('AddressInputCtrl', { //now we've added some properties and methods
            $scope: scope
        });
        expect(scope.hasStates()).toBeTruthy(); //this address is in CA, which has states

        scope.$apply(); //do the magic
        $httpBackend.flush();

        //clear the cache to avoid confusing shenanigans
        $451.clear("Address." + jsonAddressNew.InteropID)
    });

    it('Should have a hasStates function that returns false for the given country of DE', function(){ //essentially the same as the last test, different method name
        $routeParams.id = jsonAddressNew.InteropID;
        $httpBackend.expectGET("/api/"+ four51.app.ApiAppName +"/address/" + jsonAddressNew.InteropID).respond(jsonAddressNew);
        $httpBackend.expectGET("partials/categoryView.html").respond("<empty/>"); //no idea why this is happening, probably something is triggering a redirect

        ctrlAddress('AddressViewCtrl', { //this tries to get an address and loads it into the scope
            $scope: scope
        });
        ctrlAddressInput('AddressInputCtrl', { //now we've added some properties and methods
            $scope: scope
        });
        scope.address.Country = "DE"; //modify test data inside the scope so we don't modify the JSON object and screw up future tests
        expect(scope.hasStates()).toBeFalsy(); //this address is in DE, which doesn't have states

        scope.$apply(); //do the magic
        $httpBackend.flush();

        //clear the cache to avoid confusing shenanigans
        $451.clear("Address." + jsonAddressNew.InteropID)
    });

    it('Should have a hasStates function that handles invalid data', function(){ //essentially the same as the last test, different method name
        $routeParams.id = jsonAddressNew.InteropID;
        $httpBackend.expectGET("/api/"+ four51.app.ApiAppName +"/address/" + jsonAddressNew.InteropID).respond(jsonAddressNew);
        $httpBackend.expectGET("partials/categoryView.html").respond("<empty/>"); //no idea why this is happening, probably something is triggering a redirect

        ctrlAddress('AddressViewCtrl', { //this tries to get an address and loads it into the scope
            $scope: scope
        });
        ctrlAddressInput('AddressInputCtrl', { //now we've added some properties and methods
            $scope: scope
        });
        scope.address.Country = null; //modify test data inside the scope so we don't modify the JSON object and screw up future tests
        expect(scope.hasStates()).toBeFalsy(); //this address is in DE, which doesn't have states

        scope.$apply(); //do the magic
        $httpBackend.flush();

        //clear the cache to avoid confusing shenanigans
        $451.clear("Address." + jsonAddressNew.InteropID)
    });

});

//it appears to be impossible to test isPhoneRequired because there's no way to mock the user permissions collection.  some other day.
xdescribe('$451 AddressInputCtrl Controller : isPhoneRequired (requires user service)',function(){

    var jsonAddressNew = {"InteropID":"123","AddressName":"NewAddress","CompanyName":"CC Testing","Street1":"792 Maple","DistCompanyID":"4295x","Street2":"","City":"kjielkdk","State":"MN","Zip":"94303","Country":"CA","Phone":"","CompanyID":"4300x","IsCustEditable":false,"FirstName":"CC","LastName":"Five","IsShipping":false,"IsBilling":false};
    var jsonUser = {"Username":"sesendpo","InteropID":"sesendpo","Password":null,"ConfirmPassword":null,"FirstName":"SE","LastName":"Send","Email":"qa@four51.com","Phone":"","Active":true,"CompanyID":"4300x","Company":{"Name":"International","POIDMask":"","SiteText":{"CostCenter":"Department","VariantID":"","NoVariantsAvailable":"<H2>No items currently available for order.</H2>","AvailableQuantity":"asdfawer","PasswordSecurityGuidelines":"OMG"},"TaxMethod":"WebService"},"TermsAccepted":null,"LastLogon":null,"PartyID":"53340x","CurrentOrderID":"17288173x","PasswordExprirationDate":null,"IsPasswordSecure":false,"Culture":{"Name":"en-US","CurrencyCode":"USD","DefaultCountry":"US"},"CultureUIOverride":null,"CultureUI":"en-US","TimeZoneIndex":20,"TimeZone":{"Name":"Central Standard Time","DisplayName":"(GMT-06:00) Central Time (US & Canada)","Index":20,"StandardName":"Central Standard Time","DaylightName":"Central Daylight Time","Bias":-360,"StandardBias":-360,"DaylightBias":-300},"CultureInfo":"en-US","Type":"Customer","CustomFields":[{"DefaultValue":"11","Lines":1,"Width":80,"MaxLength":100,"MaskedInput":"","ControlType":"Text","ListOrder":1,"Name":"11","Label":"11","IsRequired":false,"DisplayToUser":false,"Value":"113"},{"IsRadioButtons":false,"AllowOtherValue":false,"DefaultOptionID":null,"Options":[{"ID":"226x","Value":"123","InteropID":"","Selected":false},{"ID":"227x","Value":"124","InteropID":"","Selected":false}],"ControlType":"Selection","ListOrder":2,"Name":"12","Label":"12","IsRequired":false,"DisplayToUser":false,"Value":null},{"DefaultValue":"","Lines":1,"Width":80,"MaxLength":100,"MaskedInput":"","ControlType":"Text","ListOrder":5,"Name":"Title","Label":"Title","IsRequired":false,"DisplayToUser":true,"Value":"Hello"}],"Permissions":["CostCenterPerLine","SendOrderNotificationToOthers","ViewMessaging","ViewQuickOrderEntry","CreateBillToAddress","CreateShipToAddress","PayByVisa","PayByAmex","PayByDiscover","PayByMasterCard","PayByDinersClub","PayByJCB","PayByBudgetAccount","AllowSaveCreditCard","PayBySwitch","PayByDelta","PayBySolo","PayByElectron","PayByLaser","EditBillToName","EditShipToName","ViewFilePrint","BuyerSuperuserCatalog","BuyerSuperuserUsers","BuyerSuperuserCreditCard","StandardOrder","PayByPO","Comments","ViewSelfAdmin","ViewNonCustomizableSpecs","AllowAutoGenPOID","AllowSaveCreditCard","ShipToMultipleAddresses","SendOrderNotificationToOthers","DateNeededOptional","ViewNonCustomizableSpecs","ViewContactUs","ViewQuickOrderEntry","ViewPromotions"],"CostCenters":["CostCenter191","HR","Marketing","MIS","Sales"]}

    var scope, $451, $httpBackend, ctrlAddress, ctrlAddressInput, ctrl451, $location, $routeParams, svcUser;

    beforeEach(module('451order'));

    beforeEach(inject(function(_$451_, $rootScope,$controller,_$httpBackend_, _$location_, _$routeParams_, UserService){
        $451 = _$451_;
        $location = _$location_;
        $httpBackend = _$httpBackend_;
        ctrlAddress = $controller;
        ctrlAddressInput = $controller;
        scope = $rootScope.$new();
        $routeParams = _$routeParams_;
        svcUser = UserService;
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('Should have a isPhoneRequired function that determines if the user is required to supply a phone number', function(){ //essentially the same as the last test, different method name
        $routeParams.id = jsonAddressNew.InteropID;


        $httpBackend.expectGET("/api/"+ four51.app.ApiAppName +"/address/" + jsonAddressNew.InteropID).respond(jsonAddressNew);
        $httpBackend.expectGET("/api/"+ four51.app.ApiAppName +"/user?Password=fails345&Username=sesendpo").respond(jsonUser); //intercept the API call to the service and slip in a mocked user object
        $httpBackend.expectGET("/api/"+ four51.app.ApiAppName +"/user?Password=fails345&Username=sesendpo").respond(jsonUser); //intercept the API call to the service and slip in a mocked user object
        $httpBackend.expectGET("partials/categoryView.html").respond("<empty/>"); //no idea why this is happening, probably something is triggering a redirect

        var objUserLogin = {Username:"sesendpo",Password:"fails345"};

        scope.Four51User = jsonUser;

        ctrlAddress('AddressViewCtrl', { //this tries to get an address and loads it into the scope
            $scope: scope
        });
        ctrlAddressInput('AddressInputCtrl', { //now we've added some properties and methods
            $scope: scope
        });

        console.dir(svcUser.login(objUserLogin));


        scope.$apply(); //do the magic
        $httpBackend.flush();



        expect(scope.isPhoneRequired()).toBeTruthy();

        //clear the cache to avoid confusing shenanigans
        $451.clear("Address." + jsonAddressNew.InteropID)
        //$451.clear("User");
    });
});