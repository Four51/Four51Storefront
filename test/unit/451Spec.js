'use strict';
//this file contains test specs for 451.js
var jsonObject = {
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
        expect($451.api("message")).toBe('/api/' + four51.app.ApiAppName + "/message");
    });
});

describe('$451 Cache:', function() {
    var $451;
    beforeEach(module('451order'));
    beforeEach(inject(function(_$451_) {
        $451 = _$451_;
    }));
    //let's test that caching works.
        //TODO- test that when we store something in the cache it doesn't hit the service again?  this is a test for another area

    it('should be able to instantiate a cache object', function(){

        var cacheObject;
        var options = { persists: false};

        expect($451).not.toBeNull;

        cacheObject = $451.cache("something","else", options);
        expect(cacheObject).not.toBeNull;
        expect(cacheObject).toEqual("else");
    });
    it('should not persist a cache object if persists=false (part1)', function(){

        var cacheObject;
        var options = { persists: false};

        expect($451).not.toBeNull;

        cacheObject = $451.cache("something","else", options);
        expect(cacheObject).not.toBeNull;
        expect(cacheObject).toEqual("else");
        //in the next test it shouldn't exist
    });
    it('should not persist a cache object if persists=false (part2)', function(){
        expect($451).not.toBeNull;

        expect($451.cache("something")).toBeNull();
        expect($451.cache("something")).toEqual(null);

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

        expect($451.cache("json")).toEqual(jsonObject);

         //now persist it to set it up for the next test
        options = { persists: true};
        $451.cache("json", jsonObject, options);  //create a cache JSON object
    });
    it('should be able to read a JSON object from the cache', function(){

        var cacheObject;
        expect($451).not.toBe(null);

        cacheObject = $451.cache("json");  //try to read the JSON object from the cache

        expect($451.cache("json")).toEqual(jsonObject);
        $451.clear("json");

    });
    it('should be able to store cache objects for specific amounts of time, in milleseconds', function(){
        var cacheObject;
        var options = { persists: true, ttl: 5000}; //cache it to expire 5 seconds in the future

        expect($451).not.toBeNull;

        cacheObject = $451.cache("json", jsonObject,options);  //create a cache JSON object

        //we should store it in cache and it shouldn't expire yet
        expect($451.cache("json")).not.toBeNull();

        $451.clear("json");
    });
    it('should set an expiration for cached objects specifiable in milliseconds', function(){
        var cacheObject;
        var options = { persists: true, ttl: -1000}; //cache it to expire a second ago.  it shouldn't be readable.
        //the reason we test this with a negative TTL is because there's no way of delaying/waiting in javascript so we can't test it 1 sec in the future.

        expect($451).not.toBeNull;

        cacheObject = $451.cache("json", jsonObject,options);  //create a cache JSON object

        //we should store it in cache and it should expire immediately
        expect($451.cache("json")).toBeNull();

        $451.clear("json");
    });
    it('should not cache an object when persists=false even though TTL is set to a positive number (part1)', function(){

        var cacheObject;
        var options = { persists: false, ttl: 150000};
        expect($451).not.toBe(null);

        cacheObject = $451.cache("json", jsonObject,options);

        expect($451.cache("json")).toBe(jsonObject);
    });
    it('should not cache an object when persists=false even though TTL is set to a positive number (part2)', function(){

        expect($451).not.toBe(null);
        expect($451.cache("json")).toBeNull();

        $451.clear("json");
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
        var objOptions = {Property:'type', Value:'a'};

        var objFilteredJSONResult = $451.filter(objJSONmini,objOptions);
        expect(objFilteredJSONResult.length).toBe(2);
        expect(objFilteredJSONResult[1].status).toBe('2');
    });
});