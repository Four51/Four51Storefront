four51.app.controller('ProductCtrl', ['$scope', '$routeParams', '$route', '$location', '$451', 'Product', 'ProductDisplayService', 'Order', 'Variant', 'User',
function ($scope, $routeParams, $route, $location, $451, Product, ProductDisplayService, Order, Variant, User) {
    $scope.selected = 1;
    $scope.LineItem = {};
	$scope.addToOrderText = "Add To Cart";
	$scope.loadingIndicator = true;
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
		$scope.LineItem.Quantity = lineitem.Product.StandardPriceSchedule.DefaultQuantity > 0 ? lineitem.Product.StandardPriceSchedule.DefaultQuantity : null;
	}
	function init(searchTerm) {
		ProductDisplayService.getProductAndVariant($routeParams.productInteropID, $routeParams.variantInteropID, function (data) {
			$scope.LineItem.Product = data.product;
			$scope.LineItem.Variant = data.variant;
			setDefaultQty($scope.LineItem);
			ProductDisplayService.setNewLineItemScope($scope);
			ProductDisplayService.setProductViewScope($scope);
			$scope.$broadcast('ProductGetComplete');
			$scope.loadingIndicator = false;
			$scope.setAddToOrderErrors();
		}, $scope.settings.currentPage, $scope.settings.pageSize, searchTerm);
	}
	$scope.$watch('settings.currentPage', function(n, o) {
		if (n != o || (n == 1 && o == 1))
			init($scope.searchTerm);
	});

	$scope.searchVariants = function(searchTerm) {
		$scope.searchTerm = searchTerm;
		$scope.settings.currentPage == 1 ?
			init(searchTerm) :
			$scope.settings.currentPage = 1;
	};

	$scope.deleteVariant = function(v, redirect) {
		if (!v.IsMpowerVariant) return;
		// doing this because at times the variant is a large amount of data and not necessary to send all that.
		var d = {
			"ProductInteropID": $scope.LineItem.Product.InteropID,
			"InteropID": v.InteropID
		};
		Variant.delete(d,
			function() {
				redirect ? $location.path('/product/' + $scope.LineItem.Product.InteropID) : init();
			},
			function(ex) {
				$scope.lineItemErrors.push(ex.Message);
				$scope.showAddToCartErrors = true;
				console.log($scope.lineItemErrors);
			}
		);
	}

	$scope.addToOrder = function(){
		if($scope.lineItemErrors && $scope.lineItemErrors.length){
			$scope.showAddToCartErrors = true;
			return;
		}
		if(!$scope.currentOrder){
			$scope.currentOrder = {};
			$scope.currentOrder.LineItems = [];
		}
		if($scope.allowAddFromVariantList){
			angular.forEach($scope.variantLineItems, function(item){
				if(item.Quantity > 0){
					$scope.currentOrder.LineItems.push(item);
				}
			});
		}else{
			$scope.currentOrder.LineItems.push($scope.LineItem);
		}
		$scope.addToOrderIndicator = true;
		Order.save($scope.currentOrder,
			function(o){
				$scope.user.CurrentOrderID = o.ID;
				User.save($scope.user, function(){
					$scope.addToOrderIndicator = true;
					$location.path('/cart');
				});
			},
			function(ex) {
				$scope.addToOrderIndicator = false;
				$scope.addToOrderError = ex.Message;
				$route.reload();
			}
		);
	}
}]);

/* product matrix control
four51.app.controller('CustomProductCtrlMatrix', function($scope, $451, Variant, ProductDisplayService){
	//just a little experiment on extending the product view
	$scope.matrixLineTotal = 0;
	$scope.LineItems = {};
	$scope.LineKeys = [];
	$scope.lineChanged = function(){
		var addToOrderTotal = 0;
		angular.forEach($scope.LineKeys, function(key){
			if($scope.LineItems[key].Variant){
				ProductDisplayService.calculateLineTotal($scope.LineItems[key]);
				addToOrderTotal += $scope.LineItems[key].LineTotal;
			}
		$scope.matrixLineTotal = addToOrderTotal;

		});
	};

	$scope.addMatrixToOrder = function(){ };

	$scope.setFocusVariant = function(opt1, opt2){

		if($scope.LineItems[opt1.Value.toString() + opt2.Value.toString()].Variant){
			$scope.LineItem.Variant = $scope.LineItems[opt1.Value.toString() + opt2.Value.toString()].Variant;
			return;
		}

		Variant.get({'ProductInteropID': $scope.LineItem.Product.InteropID, 'SpecOptionIDs': [opt1.ID, opt2.ID]}, function(data){
			$scope.LineItem.Variant = data;
		});
	};
	$scope.$watch("LineItems", function(){
		$scope.lineChanged();
	}, true);

	$scope.$on('ProductGetComplete', function(){
		var specs = $451.filter($scope.LineItem.Product.Specs, {Property: 'DefinesVariant', Value: true});
		$scope.matrixSpec1 = specs[0];
		$scope.matrixSpec2 = specs[1];
		angular.forEach(specs[0].Options, function(option1){
			angular.forEach(specs[1].Options, function(option2){
				$scope.LineKeys.push(option1.Value.toString() + option2.Value.toString());
				$scope.LineItems[option1.Value.toString() + option2.Value.toString()] = {
					Product: $scope.LineItem.Product,
					PriceSchedule: $scope.LineItem.PriceSchedule,
				};
			});
		});
	});
});
*/

