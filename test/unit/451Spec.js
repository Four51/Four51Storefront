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
    //test that we can clear the whole cache                                 --DONE
    //test that the whole cache has been cleared                             --DONE
    //test that a single cache element can be cleared                        --DONE
    //test that the single cache element has been cleared                    --DONE
    //test that we can store the same simple string again in the cache       --DONE
    //test that we can store a JSON object in the cache                      --DONE
    //test that the JSON object is readable after storage                    --DONE

    //test that persist cache elements still exist after cache has been cleared?      --these may have to be Scenarios not unit tests
    //test that the browser can independently read the cache after being stored?
    //test that the browser can independently clear the cache?
    //test that when we store something in the cache it doesn't hit the service again?  this is a test for another area

describe('cache object:', function() {

    beforeEach(module('451order'));
    var $451;

    var jsonObject;

//pardon me for butting in here
    jsonObject = {
        "additionalFeatures": "Accessibility features: tactile QWERTY keyboard, trackpad, three programmable keys, camera button",
        "android": {
            "os": "Android 2.2",
            "ui": "Android"
        },
        "availability": [
            "T-Mobile"
        ],
        "battery": {
            "standbyTime": "420 hours",
            "talkTime": "7 hours",
            "type": "Lithium Ion (Li-Ion) (1300 mAH)"
        },
        "camera": {
            "features": [
                "Flash",
                "Video"
            ],
            "primary": "5.0 megapixels"
        },
        "connectivity": {
            "bluetooth": "Bluetooth 2.1",
            "cell": "GSM: 850, 900, 1800, 1900  UMTS: Yes",
            "gps": true,
            "infrared": false,
            "wifi": "802.11 b/g/n"
        },
        "description": "The T-Mobile G1 was the world's first Android-powered phone. Launched nearly two years ago, it created an entirely new class of mobile phones and apps. Its successor, the T-Mobile G2 with Google, will continue the revolution.\n\nThe T-Mobile G2 will deliver tight integration with Google services and break new ground as the first smartphone designed to run at 4G speeds on our new HSPA+ network.",
        "display": {
            "screenResolution": "WVGA (800 x 480)",
            "screenSize": "3.7 inches",
            "touchScreen": true
        },
        "hardware": {
            "accelerometer": true,
            "audioJack": "3.5mm",
            "cpu": "800 MHz Qualcomm\u00ae Snapdragon\u2122 MSM7230",
            "fmRadio": false,
            "physicalKeyboard": true,
            "usb": "USB 2.0"
        },
        "id": "t-mobile-g2",
        "images": [
            "img/phones/t-mobile-g2.0.jpg",
            "img/phones/t-mobile-g2.1.jpg",
            "img/phones/t-mobile-g2.2.jpg"
        ],
        "name": "T-Mobile G2",
        "sizeAndWeight": {
            "dimensions": [
                "60.4 mm (w)",
                "119.0 mm (h)",
                "14.2 mm (d)"
            ],
            "weight": "180.0 grams"
        },
        "storage": {
            "flash": "4000MB",
            "ram": "512MB"
        }
    }
//okay done butting in

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
        expect(cacheObject).toEqual("blah2");

        cacheObject = $451.cache("blah1",[0,1,2,3]); //cache this 4 element array
        expect(cacheObject).toEqual([0,1,2,3]);

        expect($451.cache("blah")).toEqual("blah2");
        expect($451.cache("blah1")).toEqual([0,1,2,3]);

        //setting them persistently this time for the next test
        $451.cache("blah","blah2",true);
        $451.cache("blah1",[0,1,2,3],true);
    }));

    it('should be able to read that string back from the cache', inject(function(_$451_){
        $451 = _$451_;
        var cacheObject;
        expect($451).not.toBe(null);

        cacheObject = $451.cache("blah");  //READ FROM CACHE this string "blah2"
        expect(cacheObject).toEqual("blah2");

        cacheObject = $451.cache("blah1"); //READ FROM CACHE this 4 element array
        expect(cacheObject).toEqual([0,1,2,3]);
    }));

    it('should be able to clear the whole cache', inject(function(_$451_){
        $451 = _$451_;
        var cacheObject;
        expect($451).not.toBe(null);

        cacheObject = $451.cache("blah", "blah2");  //create a cache string
        cacheObject = $451.cache("blah1", [0,1,2,3]);  //create a cache array
        $451.clear();
        expect($451.cache("blah")).toEqual(null);
        expect($451.cache("blah1")).toEqual(null);

    }));

    it('should be able to clear a single cache element', inject(function(_$451_){
        $451 = _$451_;
        var cacheObject;
        expect($451).not.toBe(null);

        cacheObject = $451.cache("blah", "blah2");  //create a cache string that we'll clear
        cacheObject = $451.cache("blah1", [0,1,2,3]);  //create a cache array that we won't clear
        $451.clear("blah");
        expect($451.cache("blah")).toEqual(null);
        expect($451.cache("blah1")).toEqual([0,1,2,3]);

    }));


    it('should be able to reuse a cache element name', inject(function(_$451_){
        $451 = _$451_;
        var cacheObject;
        expect($451).not.toBe(null);

        cacheObject = $451.cache("blah", "blah2");  //create a cache string that we'll clear

        $451.clear("blah");
        expect($451.cache("blah")).toEqual(null);

        cacheObject = $451.cache("blah", "blah2");  //create a cache string using the name we just cleared
        expect($451.cache("blah")).toEqual("blah2");
        expect(cacheObject).toEqual("blah2");

    }));

    it('should be able to store a JSON object in the cache', inject(function(_$451_){
        $451 = _$451_;
        var cacheObject;
        expect($451).not.toBe(null);

        cacheObject = $451.cache("json", jsonObject);  //create a cache JSON object

        expect($451.cache("json")).not.toEqual(null);

         //now persist it to set it up for the next test
        $451.cache("json", jsonObject, true);  //create a cache JSON object
    }));

    it('should be able to read a JSON object from the cache', inject(function(_$451_){
        $451 = _$451_;
        var cacheObject;
        expect($451).not.toBe(null);

        cacheObject = $451.cache("json");  //try to read the JSON object from the cache

        expect($451.cache("json")).not.toEqual(null);
        $451.clear("json");

    }));

    xit('should persist PERSIST=TRUE cache elements after clear', inject(function(_$451_){         //DISABLED
        $451 = _$451_;
        var cacheObject;
        expect($451).not.toBe(null);

        cacheObject = $451.cache("blah", "blah2", true);  //create a cache string that we expect to persist

        //hmm.  how do we refresh the browser within a unit test?  this might have to be upgraded to a scenario.

        $451.clear("blah");
        expect($451.cache("blah")).toEqual("blah2");

        cacheObject = $451.cache("blah", "blah2");  //create a cache string using the name we just cleared
        expect($451.cache("blah")).toEqual("blah2");
        expect(cacheObject).toEqual("blah2");

    }));


})
;
