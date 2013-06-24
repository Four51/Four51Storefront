'use strict';
//this file contains test specs for 451.js

var jsonObject;
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
};
var objJSONmini = [
    { type: 'a', status: '1', kiddo: {chews: "gum", wears:"spats", hates:"homework"} },
    { type: 'a', status: '2' },
    { type: 'y', status: '26', kiddo: {chews: "tinfoil", wears:"tinfoil", hates:"tinfoil"} },
    { type: 'z', status: '26' }
];

describe('$451 API:',function(){
    var $451;
    beforeEach(module('451order'));
    beforeEach(inject(function(_$451_) {
        $451 = _$451_;
    }));
    it('Should return api url', function() {
        var url = $451.api('order'); //won't work right now because api gets it from the window.location.etc
        console.log($451.appname);
        expect(url).toBe('/api/' + $451.appname + '/order');
    });
});
describe('$451 Cache:', function() {
    var $451;
    beforeEach(module('451order'));
    beforeEach(inject(function(_$451_) {
        $451 = _$451_;
    }));
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

    it('should be able to instantiate a cache object', function(){

        var cacheObject;
        var options = { persists: false};

        expect($451).not.toBe(null);

        cacheObject = $451.cache("something","else", options);
        expect(cacheObject).not.toBe(null);
    });

    it('should be able to store a string and array in the cache', function(){
        var cacheObject;
        var options = { persists: false};

        expect($451).not.toBe(null);

        cacheObject = $451.cache("blah", "blah2",options);  //cache this string "blah2"
        expect(cacheObject).toEqual("blah2");

        cacheObject = $451.cache("blah1",[0,1,2,3],options); //cache this 4 element array
        expect(cacheObject).toEqual([0,1,2,3]);

        expect($451.cache("blah")).toEqual("blah2");
        expect($451.cache("blah1")).toEqual([0,1,2,3]);

        //setting them persistently this time for the next test
        options = { persists: true};
        $451.cache("blah","blah2",options);
        $451.cache("blah1",[0,1,2,3],options);
    });

    it('should be able to read that string and array back from the cache', function(){

        var cacheObject;
        expect($451).not.toBe(null);

        cacheObject = $451.cache("blah");  //READ FROM CACHE this string "blah2"
        expect(cacheObject).toEqual("blah2");

        cacheObject = $451.cache("blah1"); //READ FROM CACHE this 4 element array
        expect(cacheObject).toEqual([0,1,2,3]);
    });

    it('should be able to clear the whole cache', function(){

        var cacheObject;
        var options = { persists: false};
        expect($451).not.toBe(null);

        cacheObject = $451.cache("blah", "blah2",options);  //create a cache string
        cacheObject = $451.cache("blah1", [0,1,2,3],options);  //create a cache array
        $451.clear();
        expect($451.cache("blah")).toEqual(null);
        expect($451.cache("blah1")).toEqual(null);

    });

    it('should be able to clear a single cache element', function(){

        var cacheObject;
        var options = { persists: false};
        expect($451).not.toBe(null);

        cacheObject = $451.cache("blah", "blah2",options);  //create a cache string that we'll clear
        cacheObject = $451.cache("blah1", [0,1,2,3],options);  //create a cache array that we won't clear
        $451.clear("blah");
        expect($451.cache("blah")).toEqual(null);
        expect($451.cache("blah1")).toEqual([0,1,2,3]);

    });


    it('should be able to reuse a cache element name', function(){

        var cacheObject;
        var options = { persists: false};
        expect($451).not.toBe(null);

        cacheObject = $451.cache("blah", "blah2",options);  //create a cache string that we'll clear

        $451.clear("blah");
        expect($451.cache("blah")).toEqual(null);

        cacheObject = $451.cache("blah", "blah2",options);  //create a cache string using the name we just cleared
        expect($451.cache("blah")).toEqual("blah2");
        expect(cacheObject).toEqual("blah2");

    });

    it('should be able to store a JSON object in the cache', function(){

        var cacheObject;
        var options = { persists: false};
        expect($451).not.toBe(null);

        cacheObject = $451.cache("json", jsonObject,options);  //create a cache JSON object

        expect($451.cache("json")).not.toEqual(null);

         //now persist it to set it up for the next test
        options = { persists: true};
        $451.cache("json", jsonObject, options);  //create a cache JSON object
    });

    it('should be able to read a JSON object from the cache', function(){

        var cacheObject;
        expect($451).not.toBe(null);

        cacheObject = $451.cache("json");  //try to read the JSON object from the cache

        expect($451.cache("json")).not.toEqual(null);
        $451.clear("json");

    });

    xit('should persist PERSIST=TRUE cache elements after clear', function(){         //DISABLED
        var cacheObject;
        var options = { persists: true};
        expect($451).not.toBe(null);

        cacheObject = $451.cache("blah", "blah2", options);  //create a cache string that we expect to persist

        //hmm.  how do we refresh the browser within a unit test?  this might have to be upgraded to a scenario.

        $451.clear("blah");
        expect($451.cache("blah")).toEqual("blah2");

        cacheObject = $451.cache("blah", "blah2");  //create a cache string using the name we just cleared
        expect($451.cache("blah")).toEqual("blah2");
        expect(cacheObject).toEqual("blah2");

    });


});
describe('$451 Filter:', function() {
    var $451;
    beforeEach(module('451order'));
    beforeEach(inject(function(_$451_) {
        $451 = _$451_;
    }));
    it('Should return an object of type array', function() {
        var objOptions={};
        var objFilteredJSONResult = $451.filter({},objOptions);
        expect(objFilteredJSONResult instanceof Array)
    });
    it('Should return filtered JSON object array on a simple filter', function() {
        var objOptions;

        objOptions = {Property:'type', Value:'a'};
        var objFilteredJSONResult = $451.filter(objJSONmini,objOptions);
        expect(objFilteredJSONResult.length).toBe(2);
        expect(objFilteredJSONResult[1].status).toBe('2');
    });
    it('Should return filtered JSON object array on a complex filter', function() {

        var objOptions;
        objOptions = {Property:'kiddo.chews', Value:'gum'};
        var objFilteredJSONResult = $451.filter(jsonObject,objOptions);
        expect(objFilteredJSONResult.length).toBe(1);
        expect(objFilteredJSONResult[1].status).toBe('1');
        console.dir(objFilteredJSONResult);
        console.dir(jsonObject);
    });
});