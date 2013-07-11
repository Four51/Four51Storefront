'use strict';
//this file contains test specs for filters.js

//11 messages, 10 of Box: Inbox, 1 of Box: SentBox
var jsonArrMessages = [
    {"ID":"39539207x","Box":"SentBox","DateSent":"2013-06-24T14:37:41.813","Subject":"MultiDeleteTest","ToName":"SE Send","FromName":"SE Send","Body":"howdy","Selected":false},{"ID":"39539206x","Box":"Inbox","DateSent":"2013-06-24T14:37:35.5","Subject":"MultiDeleteTest","ToName":"SE Send","FromName":"SE Send","Body":null,"Selected":false},{"ID":"39539205x","Box":"Inbox","DateSent":"2013-06-24T14:37:30.237","Subject":"MultiDeleteTest","ToName":"SE Send","FromName":"SE Send","Body":null,"Selected":false},{"ID":"39539204x","Box":"Inbox","DateSent":"2013-06-24T14:36:56.593","Subject":"Test Sent List Reply Subject","ToName":"SE Send","FromName":"SE Send","Body":null,"Selected":false},{"ID":"39539203x","Box":"Inbox","DateSent":"2013-06-24T14:35:22.97","Subject":"Test Delete Sent-Reply Message","ToName":"SE Send","FromName":"SE Send","Body":null,"Selected":false},{"ID":"39539202x","Box":"Inbox","DateSent":"2013-06-24T14:24:02.923","Subject":"MultiDeleteTest","ToName":"SE Send","FromName":"SE Send","Body":null,"Selected":false},{"ID":"39539201x","Box":"Inbox","DateSent":"2013-06-24T14:24:02.14","Subject":"MultiDeleteTest","ToName":"SE Send","FromName":"SE Send","Body":null,"Selected":false},{"ID":"39539200x","Box":"Inbox","DateSent":"2013-06-24T14:24:01.5","Subject":"MultiDeleteTest","ToName":"SE Send","FromName":"SE Send","Body":null,"Selected":false},{"ID":"39539199x","Box":"Inbox","DateSent":"2013-06-24T14:23:59.69","Subject":"Test Sent List Reply Subject","ToName":"SE Send","FromName":"SE Send","Body":null,"Selected":false},{"ID":"39539198x","Box":"Inbox","DateSent":"2013-06-24T14:23:54.033","Subject":"Test Delete Sent-Reply Message","ToName":"SE Send","FromName":"SE Send","Body":null,"Selected":false},{"ID":"39539197x","Box":"Inbox","DateSent":"2013-06-20T09:17:53.927","Subject":"MultiDeleteTest","ToName":"SE Send","FromName":"SE Send","Body":null,"Selected":false}
];
//5 orderstats, 1 NonStandard, 4 Standard
var jsonArrOrderStats = [
    {"Type":"NonStandard","Status":"AwaitingApproval","Direction":"Outgoing","Count":0,"OrderID":null,"ShippingAddress":null,"DateRangeFrom":"0001-01-01T00:00:00","DateRangeTo":"0001-01-01T00:00:00","LastN":0},{"Type":"Standard","Status":"Declined","Direction":"Outgoing","Count":0,"OrderID":null,"ShippingAddress":null,"DateRangeFrom":"0001-01-01T00:00:00","DateRangeTo":"0001-01-01T00:00:00","LastN":0},{"Type":"Standard","Status":"Open","Direction":"Outgoing","Count":21,"OrderID":null,"ShippingAddress":null,"DateRangeFrom":"0001-01-01T00:00:00","DateRangeTo":"0001-01-01T00:00:00","LastN":0},{"Type":"Standard","Status":"Completed","Direction":"Outgoing","Count":3,"OrderID":null,"ShippingAddress":null,"DateRangeFrom":"0001-01-01T00:00:00","DateRangeTo":"0001-01-01T00:00:00","LastN":0},{"Type":"Standard","Status":"Canceled","Direction":"Outgoing","Count":0,"OrderID":null,"ShippingAddress":null,"DateRangeFrom":"0001-01-01T00:00:00","DateRangeTo":"0001-01-01T00:00:00","LastN":0}
]
describe('$451 Filter: onproperty', function() {  //all we will test here is that it applies defaults; the filter function is tested elsewhere (451spec.js)
    var $451, onproperty;
    beforeEach(module('451order'));
    beforeEach(inject(function(_$451_, $filter) {
        $451 = _$451_;
        onproperty = $filter('onproperty');
    }));
    it('Should be able to be instantiated', function() {
        expect(onproperty).not.toBeNull();
    });
    it('Should return an object of type array', function() {
        var objOptions={};
        var objFilteredJSONResult = onproperty({},objOptions);
        expect(objFilteredJSONResult instanceof Array)
    });
    it('Should return filtered JSON object array on a default filter for Message (Box)', function() {
        var options, objResultFromOnProperty;
        options = {Model: "Message", Value:'Inbox'} //Property: Box is assumed when Model: Message
        objResultFromOnProperty = onproperty(jsonArrMessages,options);
        expect(objResultFromOnProperty.length).toBe(10);
    });
    it('Should return filtered JSON object array on a default filter for Message (Box), opposite case', function() {
        var options, objResultFromOnProperty;
        options = {Model: "Message", Value:'SentBox'} //Property: Box is assumed when Model: Message
        objResultFromOnProperty = onproperty(jsonArrMessages,options);
        expect(objResultFromOnProperty.length).toBe(1);
    });
    it('Should return filtered JSON object array that matches $451.filter function', function() {
        var options, objResultFromOnProperty, objResultFrom451Filter;
        options = {Model: "Message", Value:'Inbox'} //Property: Box is assumed when Model: Message
        objResultFromOnProperty = onproperty(jsonArrMessages,options);

        //compare the two methods

        var objOptions = {Property: "Box", Value:'Inbox'};
        objResultFrom451Filter = $451.filter(jsonArrMessages,objOptions);
        expect(objResultFrom451Filter.length).toBe(10);
        expect(objResultFrom451Filter[0].ID).toBe('39539206x');

        expect(objResultFromOnProperty).toEqual(objResultFrom451Filter);
    });
    it('Should return filtered JSON object array on a default filter for OrderStats (Type)', function() {
        var options, objResultFromOnProperty;
        options = {Model: "OrderStats", Value:'Standard'} //Property: Type is assumed when Model: OrderStats
        objResultFromOnProperty = onproperty(jsonArrOrderStats,options);
        expect(objResultFromOnProperty.length).toBe(4);
    });
    it('Should return filtered JSON object array on a default filter for OrderStats (Type), opposite case', function() {
        var options, objResultFromOnProperty;
        options = {Model: "OrderStats", Value:'NonStandard'} //Property: Type is assumed when Model: OrderStats
        objResultFromOnProperty = onproperty(jsonArrOrderStats,options);
        expect(objResultFromOnProperty.length).toBe(1);
    });
    it('Should return filtered JSON object array that matches $451.filter function', function() {
        var options, objResultFromOnProperty, objResultFrom451Filter;
        options = {Model: "OrderStats", Value:'Standard'} //Property: Type is assumed when Model: OrderStats
        objResultFromOnProperty = onproperty(jsonArrOrderStats,options);

        //compare the two methods

        var objOptions = {Property: "Type", Value:'Standard'};
        objResultFrom451Filter = $451.filter(jsonArrOrderStats,objOptions);
        expect(objResultFrom451Filter.length).toBe(4);
        expect(objResultFrom451Filter[0].Type).toBe('Standard');

        expect(objResultFromOnProperty).toEqual(objResultFrom451Filter);
    });

});