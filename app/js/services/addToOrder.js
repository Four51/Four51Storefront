four51.app.factory('AddToOrder', ['$resource', '$451', 'Security', function($resource, $451, Security) {
    var plLineItems = [];
    var _addToOrder = function(lineItem) {
        plLineItems.push(lineItem);
    };
    var _clearLineItems = function() {
        angular.forEach(plLineItems, function (li) {
            if (li.Quantity != undefined) {
                li.Quantity = null;
            }
        });
    };
    var _removeLineItems = function(item){
        angular.forEach(plLineItems, function(li){
            if(item.Product.ExternalID == li.Product.ExternalID && li.Quantity != undefined){
                li.Quantity = null;
            }
        });
    };
    return {
        addToOrder: _addToOrder,
        clearLineItems: _clearLineItems,
        removeLineItems: _removeLineItems,
        plLineItems: plLineItems
    }
}]);