'use strict';
/*
$451.app.factory('OrderService', function ($resource) {
    var orderapi = $resource($451.apiURL('order/:orderid'), { orderid: '@ID' }, {
        'save': { method: 'PUT' },
        'saveNew': { method: 'POST' }
    });

    var allOrders;

    return {
        getAllOrders: function () {
            if (!allOrders) {
                console.log('query from getall()');
                allOrders = orderapi.query();
            }

            return allOrders;
        },
        getOneOrder: function(id){
            //maybe check here to see if details are missing and then call orderservice.get({orderid: id})
            if (!allOrders) {
                console.log('getting one');
                return orderapi.get({ orderid: id });
            }
            else {
                for (var i = 0; i < allOrders.length; i++) {
                    if (allOrders[i].ID == id)
                        return allOrders[i];
                }
            }
        },
        save: function (order) {
            order.$save()
        },
        startNewOrder: function () {
            var o = new orderapi();
            o.POID = "new poID";
            o.LineItems = [];
            allOrders.push(o);
            o.$saveNew();
            return o;
        }
    }
});
    */