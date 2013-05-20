'use strict';

/* jasmine specs for modules go here */

//let's test that caching works.
    //test that we can instantiate a cache object
    //test that we can store a simple string in the cache
    //test that we can read that string back from the cache
    //test that we can clear the cache
    //test that the cache has been cleared
    //test that we can store the same simple string again in the cache
    //test that the browser can independently read the cache after being stored
    //test that the browser can independently clear the cache

describe('451 Module:', function(){
  var module;
  module = angular.module("451order");

  it('should be registered.', inject(function() {
    expect(module).not.toBe(null);
  }));

});

describe('cache object: instantiate', function() {

    beforeEach(function(){
        this.addMatchers({
            toEqualData: function(expected) {
                return angular.equals(this.actual, expected);
            }
        });
    });


    beforeEach(angular.module('451order'));


    it('should contain a $451 service', inject(function($api){
         expect($api).not.to.equal(null);
    }));

    xdescribe('PhoneListCtrl', function(){
        var scope, ctrl, $httpBackend, cache;

        beforeEach(inject(function(_$httpBackend_, $rootScope, $controller, $451) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('phones/phones.json').
                respond([{name: 'Nexus S'}, {name: 'Motorola DROID'}]);

            scope = $rootScope.$new();
            ctrl = $controller(PhoneListCtrl, {$scope: scope});
            cache = $451.cache("test", true)
        }));


        /*
        it('should create "phones" model with 2 phones fetched from xhr', function() {
            expect(scope.phones).toEqual([]);
            $httpBackend.flush();

            expect(scope.phones).toEqualData(
                [{name: 'Nexus S'}, {name: 'Motorola DROID'}]);
        }); */


        xit('should do something', function() {
            expect(cache).not.toBe(null);
        });
    });


   xdescribe('PhoneDetailCtrl', function(){
        var scope, $httpBackend, ctrl,
            xyzPhoneData = function() {
                return {
                    name: 'phone xyz',
                    images: ['image/url1.png', 'image/url2.png']
                }
            };


        beforeEach(inject(function(_$httpBackend_, $rootScope, $routeParams, $controller) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('phones/xyz.json').respond(xyzPhoneData());

            $routeParams.phoneId = 'xyz';
            scope = $rootScope.$new();
            ctrl = $controller(PhoneDetailCtrl, {$scope: scope});
        }));


        xit('should fetch phone detail', function() {
            expect(scope.phone).toEqualData({});
            $httpBackend.flush();

            expect(scope.phone).toEqualData(xyzPhoneData());
        });
    });
});


/*
describe('451 module cache object: instantiate',function(){
    var myCacheObject;

    beforeEach(module('$451.cache'));

   //    var module;
   // module = angular.module("451order");

    //$451.cache("blah");
    it('is an object',
        inject(function( $451.cache ){
        expect($451.cache("blah").not.toBe(""));
    }
    ));

})
*/