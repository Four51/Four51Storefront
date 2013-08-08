'use strict';

four51.app.controller('LineItemGridCtrl', function ($scope, OrderService, UserService) {
    var hasSpecs = false;
    $scope.copyAddressToAll = function(order) {
        angular.forEach(order.LineItems, function(n,i) {
            n.DateNeeded = order.LineItems[0].DateNeeded;
        });
    };
    $scope.hasSpecsOnAnyLineItem = function(order) {
        if (hasSpecs) return true;
        angular.forEach(order.LineItems, function(item) {
            if (item.Specs) {
                hasSpecs = true;
            }
        });
        return hasSpecs;
    };
    $scope.removeSelected = function(order) {
        OrderService.save(order, function(data) {
            order = data;
            UserService.refresh();
        });
    };

    // ng grid implementation
    $scope.gridOptions = {
        data: 'order.LineItems',
        columnDefs: [
            { displayName: 'Remove', field: 'Selected', cellTemplate: 'partials\\controls\\ngGridCheckBox.html' },
            { displayName: 'ID', cellTemplate: "<a href='#/cart/{{row.rowIndex}}'>{{row.getProperty('ProductIDText')}}</a>"},
            { displayName: 'Product', field: 'Product.Name'},
            { displayName: 'Specifications', field: 'Specs', cellTemplate: 'partials\\controls\\ngGridList.html'},
            { displayName: 'Unit Price', field: 'UnitPrice', cellFilter: 'currency' },
            { displayName: 'Quantity', cellTemplate: "<div class='ngCellText colt{{$index}}'><quantityfield error='qtyError' lineitem='row.entity' />{{qtyError}}</div>"},
            { displayName: 'Total Quantity', cellTemplate: '<div class="ngCellText colt{{$index}}">{{row.getProperty("Product.QuantityMultiplier") * row.getProperty("Quantity")}}</div>' },
            { displayName: 'Price', field: 'LineTotal', cellFilter: 'currency' }
        ]
    }
});
