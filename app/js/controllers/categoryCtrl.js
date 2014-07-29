four51.app.controller('CategoryCtrl', ['$routeParams', '$sce', '$scope', '$451', 'Category', 'Product', 'Nav', 'AddToOrder', 'Order', '$route', 'User', '$location',
function ($routeParams, $sce, $scope, $451, Category, Product, Nav, AddToOrder, Order, $route, User, $location) {
	$scope.productLoadingIndicator = true;
	$scope.settings = {
		currentPage: 1,
		pageSize: 40
	};
	$scope.trusted = function(d){
		if(d) return $sce.trustAsHtml(d);
	}

	function _search() {
		$scope.searchLoading = true;
		Product.search($routeParams.categoryInteropID, null, null, function (products, count) {
			$scope.products = products;
			$scope.productCount = count;
			$scope.productLoadingIndicator = false;
			$scope.searchLoading = false;
		}, $scope.settings.currentPage, $scope.settings.pageSize);
	}

	$scope.$watch('settings.currentPage', function(n, o) {
		if (n != o || (n == 1 && o == 1))
			_search();
	});

	if ($routeParams.categoryInteropID) {
	    $scope.categoryLoadingIndicator = true;
        Category.get($routeParams.categoryInteropID, function(cat) {
            $scope.currentCategory = cat;
	        $scope.categoryLoadingIndicator = false;
        });
    }
	else if($scope.tree){
		$scope.currentCategory ={SubCategories:$scope.tree};
	}


	$scope.$on("treeComplete", function(data){
		if (!$routeParams.categoryInteropID) {
			$scope.currentCategory ={SubCategories:$scope.tree};
		}
	});

    // panel-nav
    $scope.navStatus = Nav.status;
    $scope.toggleNav = Nav.toggle;
	$scope.$watch('sort', function(s) {
		if (!s) return;
		(s.indexOf('Price') > -1) ?
			$scope.sorter = 'StandardPriceSchedule.PriceBreaks[0].Price' :
			$scope.sorter = s.replace(' DESC', "");
		$scope.direction = s.indexOf('DESC') > -1;
	});

    //Add to Order Product List Functionality
    $scope.currentOrder = {};
    $scope.quantityAdded = true;
    $scope.currentOrder.LineItems = [];
    $scope.lineItems = AddToOrder.plLineItems;
    $scope.Checkout = function() {
        $scope.$broadcast('checkout');
        $scope.$watch($scope.lineItems, function(){
            $scope.addToOrderError = false;
            $scope.quantityAdded = false;
            angular.forEach($scope.lineItems, function(li){
                if(li.qtyError != null){
                    $scope.addToOrderError = true;
                }
                if(li.Quantity != undefined && !$scope.addToOrderError){
                    $scope.quantityAdded = true;
                }
            });
            if($scope.addToOrderError){
                angular.forEach($scope.lineItems, function(li){
                    if(li.qtyError != null){
                        li.Quantity = null;
                        $scope.lineItems.splice(li);
                    }
                })
            }
            else if(!$scope.quantityAdded){
                angular.forEach($scope.lineItems, function(li){
                    if(li.Quantity == undefined){
                        $scope.lineItems.splice(li);
                    }
                })
            }
            else {
                if ($scope.lineItemErrors && $scope.lineItemErrors.length) {
                    $scope.showAddToCartErrors = true;
                    return;
                }
                angular.forEach($scope.lineItems, function (li) {
                    if (li.Quantity > 0) {
                        $scope.currentOrder.LineItems.push(li);
                    }
                });
                Order.save($scope.currentOrder,
                    function (o) {
                        $scope.user.CurrentOrderID = o.ID;
                        User.save($scope.user, function () {
                            $scope.addToOrderIndicator = true;
                            $location.path('/cart');
                        });
                    },
                    function (ex) {
                        $scope.addToOrderIndicator = false;
                        $scope.addToOrderError = ex.Message;
                        $route.reload();
                    }
                );
            }
        }, true);
    };
}]);