four51.app.factory('AddToOrder', ['$resource', '$451', 'Security', function($resource, $451, Security) {
    var plLineItems = [];
    var _addToOrder = function(lineItem) {
        plLineItems.push(lineItem);
    };
    var _returnLineItem = function(){
        return plLineItems;
    };
    return {
        addToOrder: _addToOrder,
        returnLineItem: _returnLineItem
    }
}]);