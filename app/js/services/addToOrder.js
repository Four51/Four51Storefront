four51.app.factory('AddToOrder', ['$resource', '$451', 'Security', 'User', 'Product', 'Order', '$location', function($resource, $451, Security, User, Product, Order, $location) {

    var selectedProducts = [];
    var _getProduct = function(data) {
        Product.get(data.Product.InteropID, function (p) {
            p.Quantity = data.Quantity;
            if(p.Quantity > 0){
                selectedProducts.push(p);
            }
        })
    };
    var _addToOrder = function(data) {
        var lineItems = [];
        angular.forEach(selectedProducts, function(p){
            var lineitem = {
                "Quantity": p.Quantity,
                "Product": p
            };
            lineItems.push(lineitem);
            var order = {};
            order.LineItems = [];
            angular.forEach(lineItems, function(li){
                order.LineItems.push(li);
            });
            Order.save(order,function(o){
                data.currentOrderID = o.ID;
                User.save(data, function(user){
                    selectedProducts = [];
                    $location.path('cart');
                })
            })
        });
    };
    return {
        getProduct: _getProduct,
        addToOrder: _addToOrder
    }
}]);