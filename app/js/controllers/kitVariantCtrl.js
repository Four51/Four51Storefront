four51.app.controller('KitVariantCtrl', ['$scope', '$routeParams', '$route', '$location', '$451', 'Product', 'ProductDisplayService', 'Order', 'Variant', 'User',
function ($scope, $routeParams, $route, $location, $451, Product, ProductDisplayService, Order, Variant, User) {
    $scope.isEditforApproval = $routeParams.orderID && $scope.user.Permissions.contains('EditApprovalOrder');
    if ($scope.isEditforApproval) {
        Order.get($routeParams.orderID, function(order) {
            $scope.currentOrder = order;
        });
    }

    $scope.selected = 1;
    $scope.LineItem = {};
    $scope.kitID = $routeParams.id;
    $scope.kitIndex = $routeParams.lineitemid;
    $scope.kitProductInteropID = $routeParams.productInteropID;
    $scope.addToOrderText = "Add To List";
    $scope.loadingIndicator = true;
    $scope.loadingImage = true;
    $scope.searchTerm = null;
    $scope.settings = {
        currentPage: 1,
        pageSize: 10
    };

    $scope.calcVariantLineItems = function(i){
        $scope.variantLineItemsOrderTotal = 0;
        angular.forEach($scope.variantLineItems, function(item){
            $scope.variantLineItemsOrderTotal += item.LineTotal || 0;
        })
    };
    function setDefaultQty(lineitem) {
        if (lineitem.PriceSchedule && lineitem.PriceSchedule.DefaultQuantity != 0)
            $scope.LineItem.Quantity = lineitem.PriceSchedule.DefaultQuantity;
    }
    function init(searchTerm, callback) {
        ProductDisplayService.getProductAndVariant($routeParams.productInteropID, $routeParams.variantInteropID, function (data) {
            $scope.LineItem.Product = data.product;
            $scope.LineItem.Variant = data.variant;
            $scope.loadingIndicator = false;
            if (angular.isFunction(callback))
                callback();
        }, $scope.settings.currentPage, $scope.settings.pageSize, searchTerm);
    }
    $scope.$watch('settings.currentPage', function(n, o) {
        if (n != o || (n == 1 && o == 1))
            init($scope.searchTerm);
    });

    $scope.deleteVariant = function(v, redirect) {
        if (!v.IsMpowerVariant) return;
        // doing this because at times the variant is a large amount of data and not necessary to send all that.
        var d = {
            "ProductInteropID": $scope.LineItem.Product.InteropID,
            "InteropID": v.InteropID
        };
        Variant.delete(d,
            function() {
                redirect ? $location.path('/kit/' + $scope.kitID + '/' + $scope.kitIndex) : $route.reload();
            },
            function(ex) {
                if ($scope.lineItemErrors.indexOf(ex.Message) == -1) $scope.lineItemErrors.unshift(ex.Message);
                $scope.showAddToCartErrors = true;
            }
        );
    }

    $scope.addToOrder = function(){
        store.set("kitItem", $scope.LineItem.Product.InteropID);
        $location.path('/kit/' + $scope.kitID + '/' + $scope.kitIndex);
    };

    $scope.$on('event:imageLoaded', function(event, result) {
        $scope.loadingImage = false;
        $scope.$apply();
    });
}]);
