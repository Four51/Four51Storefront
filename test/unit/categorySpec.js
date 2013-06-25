'use strict';
//this file contains test specs for categoryCtrl.js and/or categoryService.js?

var jsonCategories = [{Name:'Variable Text1', Description:'1', InteropID:'VariableText1'},{Name:'Variable Text2', Description:'2', InteropID:'VariableText2'},{Name:'Variable Text3', Description:'3', InteropID:'VariableText3'}];
var C_debug = false;

//let's test that the Category Controller works
describe('$451 Category Controller:',function(){

    var $451, $rootScope, $routeParams, $scope, scope, $route, $location, $httpBackend, $http, ctrlCategory;
    beforeEach(module('451order'));

    beforeEach(inject(function($rootScope,$controller,_$httpBackend_,$http, _$routeParams_){

        //todo- instantiate user service and set up authentication for the category service?  or mock the user for the category service mock?
        //very convoluted here...


        scope = $rootScope.$new();
        $httpBackend = _$httpBackend_;
        $httpBackend.when("GET","/api/context.html/categories").respond(jsonCategories); //massive ugly hack warning!
        $httpBackend.when("GET","/api/russ/categories/:interopID").respond(jsonCategories); //massive ugly hack warning!

        $routeParams = _$routeParams_;
        $routeParams.categoryInteropID = "VariableText";

        ctrlCategory = $controller('CategoryCtrl', {
            $scope: scope,
            $http: $http
        });


    }));

    it('Should be a defined object', function(){
        expect(scope.currentCategory).toBe(jsonCategories);
        console.dir($routeParams.categoryInteropID)
        console.dir(scope);
    });


    xit('Should be a defined object', function(){
        inject(function(_$451_, _$rootScope_, _$httpBackend_, _$http_, $routeParams, $controller){
            $451 = _$451_;
            $rootScope = _$rootScope_
            $http = _$http_;

            scope = $rootScope.$new();
            $httpBackend = _$httpBackend_;
            $httpBackend.when("GET","/api/context.html/categories").respond(jsonCategories); //massive ugly hack warning!

            ctrlCategory = $controller("CategoryCtrl",{
                $scope: scope,
                $http : $http
            });

            expect(scope).toBeDefined();

            console.dir(ctrlCategory);

            //scope.$apply();
            console.dir(scope.currentCategory);

            //$httpBackend.request.
            //$httpBackend.flush();

            //expect(scope.tree.length).toBe(3);
            /*
             $controller('CategoryCtrl', {
             $scope: scope,
             $http: _$http_
             });
             */
        });

    });
/*

 four51.app.controller('CategoryCtrl', function ($routeParams, $scope, $451, CategoryService) {
 $scope.currentCategory = CategoryService.getOne($routeParams.categoryInteropID);
 $scope.categoryInteropID = $routeParams.categoryInteropID;
 });

 */

});

