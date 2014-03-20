'use strict';
/* these unit test specs test routing.js */

var C_debug = false;

function unitTestRoute(strHttpUrl, strHttpResponse,strLocationPath,strTemplateUrl,strControllerName){
    var $scope, $route, $location, $httpBackend;
    inject(function(_$route_, _$location_, _$rootScope_, _$httpBackend_){
        $route = _$route_;
        $location = _$location_;
        $scope = _$rootScope_;
        $httpBackend = _$httpBackend_;

        $httpBackend.when("GET",strHttpUrl).respond(strHttpResponse);

        expect($route.current).toBeUndefined();
        $location.path(strLocationPath);
        $scope.$digest();

        expect($route.current.templateUrl).toBe(strTemplateUrl);
        expect($route.current.controller).toBe(strControllerName);

        if(C_debug){
            console.dir($location)
            console.dir($route)
        }
    });
}

describe('$451 Routing:', function(){

    var $scope, $route, $location, $httpBackend;
    beforeEach(module('451order'));

    //test malformed URLs or URLs with missing components?

    it("should have a default route", function() {
        inject(function(_$route_, _$location_, _$rootScope_, _$httpBackend_){
            $route = _$route_;
            $location = _$location_;
            $scope = _$rootScope_;
            $httpBackend = _$httpBackend_;

            //here we go, this is the first mock in 451 history!  well, besides all the mocking that goes on within the dev team
            //basically we are overriding the HTTPBackend service to not have a hissy fit when this virtual browser tries to grab that partial file
            $httpBackend.when("GET",'partials/categoryView.html').respond('category');

            expect($route.current).toBeUndefined();

            //$location.path('/foo'); //not setting a valid path helps make sure the routing behaves correctly
            $scope.$digest();

            expect($location.path()).toBe('/catalog');
            expect($route.current).toBeDefined();

            //by default we should end up at the category display
            expect($route.current.templateUrl).toBe('partials/categoryView.html');
            expect($route.current.controller).toBe('CategoryCtrl');
        });

    });
    it("should redirect to catalog if URL/path is invalid", function() {
        inject(function(_$route_, _$location_, _$rootScope_, _$httpBackend_){
            $route = _$route_;
            $location = _$location_;
            $scope = _$rootScope_;
            $httpBackend = _$httpBackend_;

            //because we expect to be redirected to the category route, set up this mock
            $httpBackend.when("GET",'partials/categoryView.html').respond('category');

            expect($route.current).toBeUndefined();

            $location.path('/foo');
            $scope.$digest();
            expect($location.path()).toBe('/catalog'); //should have redirected

            expect($route.current).toBeDefined();

            //by default or in the case of an unrecognized URL/path, we should always end up at the category display
            expect($route.current.templateUrl).toBe('partials/categoryView.html');
            expect($route.current.controller).toBe('CategoryCtrl');
        });

    });
    it("should route listorders requests properly", function() {  //this function should be duplicated for each route
      //this could be replaced by a function call but I'll leave it around just for reference for now

        inject(function(_$route_, _$location_, _$rootScope_, _$httpBackend_){
          $route = _$route_;
          $location = _$location_;
          $scope = _$rootScope_;
          $httpBackend = _$httpBackend_;

          $httpBackend.when("GET",'partials/listOrders.html').respond('listOrders');

          expect($route.current).toBeUndefined();
          $location.path('/listOrders');
          $scope.$digest();

          expect($route.current.templateUrl).toBe('partials/listOrders.html');
          expect($route.current.controller).toBe('ListOrdersCtrl');
      });

    });
    it("should route orderdetails requests properly", function() {

        unitTestRoute('partials/orderDetails.html','orderDetails','/orderdetails/','partials/orderDetails.html','OrderDetailsCtrl')

    });
    it("should route catalog requests properly", function() {

        unitTestRoute('partials/categoryView.html','catalog','/catalog','partials/categoryView.html','CategoryCtrl')

    });
    it("should route catalog detail requests properly", function() {

        unitTestRoute('partials/categoryView.html','catalog','/catalog/:categoryInteropID','partials/categoryView.html','CategoryCtrl')

    });
    it("should route product detail requests properly", function() {

        unitTestRoute('partials/product.html','product','/product/:productInteropID','partials/product.html','ProductCtrl')

    });
    it("should route variant detail requests properly", function() {

        unitTestRoute('partials/product.html','v','/product/:productInteropID/:variantInteropID','partials/product.html','ProductCtrl')

    });
    it("should route order requests properly", function() {

        unitTestRoute('partials/orderSearchView.html','order','/order','partials/orderSearchView.html','OrderSearchCtrl')

    });
    it("should route order detail requests properly", function() {

        unitTestRoute('partials/Reporting/orderHistoryView.html','order','/order/:id','partials/Reporting/orderHistoryView.html','OrderViewCtrl')

    });
    it("should route favorite order requests properly", function() {

        unitTestRoute('partials/favoriteOrderListView.html','favoriteorders','/favoriteorders','partials/favoriteOrderListView.html','FavoriteOrderCtrl')

    });
    it("should route line item requests properly", function() {

        unitTestRoute('partials/Reporting/lineItemHistoryView.html','lineitem','/lineitem/:orderid/:lineitemid/','partials/Reporting/lineItemHistoryView.html','LineItemViewCtrl')

    });
    it("should route message list requests properly", function() {

        unitTestRoute('partials/messageListView.html','message','/message','partials/messageListView.html','MessageListCtrl')

    });
    it("should route message detail requests properly", function() {

        unitTestRoute('partials/messageView.html','message','/message/:id','partials/messageView.html','MessageViewCtrl')

    });
    it("should route admin requests properly", function() {

        unitTestRoute('partials/userView.html','admin','/admin','partials/userView.html','UserEditCtrl')

    });
    it("should route login requests properly", function() {

        unitTestRoute('partials/login.html','login','/login','partials/login.html','LoginCtrl')

    });
    it("should route cart requests properly", function() {

        unitTestRoute('partials/cartView.html','cart','/cart','partials/cartView.html','CartViewCtrl')

    });
    it("should route addressList requests properly", function() {

        unitTestRoute('partials/addressListView.html','addresses','/addresses','partials/addressListView.html','AddressListCtrl')

    });
    it("should route addressEditView requests properly", function() {

        unitTestRoute('partials/addressView.html','address','/address','partials/addressView.html','AddressViewCtrl')

    });
    it("should route addressEditView (with ID) requests properly", function() {

        unitTestRoute('partials/addressView.html','address','/address/:id','partials/addressView.html','AddressViewCtrl')

    });
});