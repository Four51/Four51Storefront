four51.app.directive('lineitemgrid', function() {
    var obj = {
        restrict: 'E',
        templateUrl: 'partials/controls/lineItemGridView.html',
        controller: 'LineItemGridCtrl'
    };
    return obj;
});

four51.app.directive('paymentselector', function() {
   var obj = {
       restrict: 'E',
       templateUrl: 'partials/controls/paymentSelectionView.html',
       controller: function($scope) {
           $scope.setPaymentMethod = function(type) {
               $scope.currentOrder.PaymentMethod = type;
           }
       }
   }
   return obj;
});

four51.app.directive('shipperselector', function(Shipper) {
    var obj = {
        restrict: 'E',
        templateUrl: 'partials/controls/shipperSelectionView.html',
        link: function(scope, elem, attrs) {
            Shipper.query(function(shippers) {
                scope.Shippers = shippers;
            });
        },
        controller: function($scope, $rootScope) {
            $scope.setShipper = function(shipper) {
                $rootScope.$broadcast('event:shipperChange', shipper);
            }
        }
    };
    return obj;
});

