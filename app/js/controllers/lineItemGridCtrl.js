'use strict';

four51.app.controller('LineItemGridCtrl', function ($scope, Order, ProductService) {
    $scope.copyAddressToAll = function() {
        angular.forEach($scope.currentOrder.LineItems, function(n) {
            n.DateNeeded = $scope.currentOrder.LineItems[0].DateNeeded;
        });
    };

    $scope.removeSelected = function() {
        Order.save($scope.currentOrder, function(o) {
            $scope.currentOrder = o;
        });
    };

    // ng grid implementation
    $scope.gridOptions = {
        data: 'currentOrder.LineItems',
        columnDefs: [
            { displayName: 'Remove', field: 'Selected', cellTemplate: 'partials\\controls\\ngGridCheckBox.html' },
            { displayName: 'ID', cellTemplate: "<a href=\"#/cart/{{row.getProperty('Product.ViewName')}}/{{row.rowIndex}}\">{{row.getProperty('ProductIDText')}}</a>"},
            { displayName: 'Product', field: 'Product.Name'},
            { displayName: 'Specifications', field: 'Specs', cellTemplate: 'partials\\controls\\ngGridList.html'},
            { displayName: 'Unit Price', field: 'UnitPrice', cellFilter: 'currency' },
            { displayName: 'Quantity', cellTemplate: "<div class='ngCellText colt{{$index}}'><quantityfield error='qtyError' lineitem='row.entity' />{{qtyError}}</div>"},
            { displayName: 'Total Quantity', cellTemplate: '<div class="ngCellText colt{{$index}}">{{row.getProperty("Product.QuantityMultiplier") * row.getProperty("Quantity")}}</div>' },
            { displayName: 'Price', field: 'LineTotal', cellFilter: 'currency' }
        ]
    }
});
