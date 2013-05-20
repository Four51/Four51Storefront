'use strict';

/* jasmine specs for modules go here */

describe('451 Module:', function(){
  var module;
  module = angular.module("451order");

  it('should be registered.', inject(function() {
    expect(module).not.toBe(null);
  }));

});


//let's test that caching works.
    //test that we can instantiate a cache object                            --DONE
    //test that we can store a string and array in the cache                 --DONE
    //test that we can read that string back from the cache                  --DONE
    //test that we can clear the cache
    //test that the cache has been cleared
    //test that we can store the same simple string again in the cache
    //test that the browser can independently read the cache after being stored
    //test that the browser can independently clear the cache
    //test that we can store a JSON object in the cache
    //test that the JSON object is readable after storage
    //test that when we store something in the cache it doesn't hit the service again
describe('cache object:', function() {

    beforeEach(module('451order'));
    var $451;

    it('should be able to instantiate a cache object', inject(function(_$451_){
        $451 = _$451_;
        var cacheObject;
        expect($451).not.toBe(null);

        cacheObject = $451.cache("something","else");
        expect(cacheObject).not.toBe(null);
    }));

    it('should be able to store a string and array in the cache', inject(function(_$451_){
        $451 = _$451_;
        var cacheObject;
        expect($451).not.toBe(null);

        cacheObject = $451.cache("blah", "blah2");  //cache this string "blah2"
        console.dir(cacheObject);
        expect(cacheObject).toEqual("blah2");

        cacheObject = $451.cache("blah1",[0,1,2,3]); //cache this 4 element array
        console.dir(cacheObject);
        expect(cacheObject).toEqual([0,1,2,3]);

        expect($451.cache("blah")).toEqual("blah2");
        expect($451.cache("blah1")).toEqual([0,1,2,3]);

        $451.cache("blah","blah2",true);
        $451.cache("blah1",[0,1,2,3],true);
    }));

    it('should be able to read that string back from the cache', inject(function(_$451_){
        $451 = _$451_;
        var cacheObject;
        expect($451).not.toBe(null);

        cacheObject = $451.cache("blah");  //READ FROM CACHE this string "blah2"
        console.dir(cacheObject);
        expect(cacheObject).toEqual("blah2");

        cacheObject = $451.cache("blah1"); //READ FROM CACHE this 4 element array
        console.dir(cacheObject);
        expect(cacheObject).toEqual([0,1,2,3]);
    }));
})
;
