var angScope;
four51.app.controller('ProductCtrl', ['$scope', '$routeParams', '$route', '$location', '$451', 'Product', 'ProductDisplayService', 'Order', 'Variant', 'User',
function ($scope, $routeParams, $route, $location, $451, Product, ProductDisplayService, Order, Variant, User) {
	$scope.gallery1 = false;
	$scope.gallery2 = false;
	$scope.isEditforApproval = $routeParams.orderID && $scope.user.Permissions.contains('EditApprovalOrder');
	if ($scope.isEditforApproval) {
		Order.get($routeParams.orderID, function(order) {
			$scope.currentOrder = order;
		});
	}

	$scope.selected = 1;
	$scope.LineItem = {};
	$scope.addToOrderText = "Add To Cart";
	$scope.loadingIndicator = true;
	$scope.loadingImage = true;
	$scope.searchTerm = null;
	$scope.settings = {
		currentPage: 1,
		pageSize: 10
	};

	$scope.calcVariantLineItems = function(i) {
		$scope.variantLineItemsOrderTotal = 0;
		angular.forEach($scope.variantLineItems, function(item) {
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
			$scope.LineItem.facilityNumber = null;
			ProductDisplayService.setNewLineItemScope($scope);
			ProductDisplayService.setProductViewScope($scope);
			setDefaultQty($scope.LineItem);
			$scope.setAddToOrderErrors();
			if (angular.isFunction(callback)) {
				callback();
			}
			var ExternalID = $scope.LineItem.Product.ExternalID;
			if (data.product.Type == 'Kit') {
				$scope.kitButtonText = 'Customize Kit';
			}
			$scope.galleryUrl1 = 'https://www.four51.com/Themes/Custom/700dfe64-2fbd-4bca-9c5c-f423c74b2912/KHC_Docs/' + $scope.LineItem.Product.ExternalID + '_pvd_01_lrg.jpg';
			$scope.galleryUrl2 = 'https://www.four51.com/Themes/Custom/700dfe64-2fbd-4bca-9c5c-f423c74b2912/KHC_Docs/' + $scope.LineItem.Product.ExternalID + '_pvd_02_lrg.jpg';

			//check if gallery image exist
			function checkIfImageExists(url, callback) {
				const img = new Image();
				img.src = url;

				if (img.complete) {
					callback(true);
				} else {
					img.onload = () => {
						callback(true);
					};

					img.onerror = () => {
						callback(false);
					};
				}
			}

			checkIfImageExists($scope.galleryUrl1, (exists) => {
				if (exists) {
					$scope.gallery1 = true;
					$scope.$apply();
					// $('#thumbContainerContainer').append('<div class="thumbTitle">Click to zoom</div><div class="thumbContainer"><img class="product-thumb cursorPointer" data-src="https://www.four51.com/Themes/Custom/700dfe64-2fbd-4bca-9c5c-f423c74b2912/KHC_Docs/' + $scope.LineItem.Product.ExternalID + '_pvd_01_lrg.jpg" src="img/gallery-1.jpg" alt=""></div>');
				} else {
					console.error('Image 1 does not exist.')
				}
			});

			checkIfImageExists($scope.galleryUrl2, (exists) => {
				if (exists) {
					$scope.gallery2 = true;
					$scope.$apply();
					// $('#thumbContainerContainer').append('<div class="thumbContainer"><img class="product-thumb cursorPointer" data-src="https://www.four51.com/Themes/Custom/700dfe64-2fbd-4bca-9c5c-f423c74b2912/KHC_Docs/' + $scope.LineItem.Product.ExternalID + '_pvd_02_lrg.jpg" src="img/gallery-2.jpg" alt=""></div>');
				} else {
					console.error('Image 2 does not exist.')
				}
			});
			$scope.$broadcast('ProductGetComplete');
			$scope.loadingIndicator = false;
		}, $scope.settings.currentPage, $scope.settings.pageSize, searchTerm);
	}

	$scope.$watch('settings.currentPage', function(n, o) {
		if (n != o || (n == 1 && o == 1))
			init($scope.searchTerm);
	});

	$scope.kitProceed = function() {
		if (!$scope.currentOrder) {
			$scope.currentOrder = {};
			$scope.currentOrder.LineItems = [];
		}
		$scope.currentOrder.LineItems.push($scope.LineItem);
		$scope.currentOrder.Type = $scope.LineItem.PriceSchedule.OrderType;
		$scope.addToOrderIndicator = true;
		Order.clearshipping($scope.currentOrder).
			save($scope.currentOrder,
				function(o) {
					$scope.user.CurrentOrderID = o.ID;
					User.save($scope.user, function() {
						$scope.addToOrderIndicator = true;
						$location.path('/kit/' + $scope.LineItem.Product.InteropID + '/' + ($scope.currentOrder.LineItems.length - 1))
					});
				},
				function(ex) {
					// Remove the last LineItem added to the cart.
					$scope.currentOrder.LineItems.pop();
					$scope.addToOrderIndicator = false;
					$scope.lineItemErrors.push(ex.Detail);
					$scope.showAddToCartErrors = true;
				}
		);
	}

	$scope.searchVariants = function(searchTerm) {
		$scope.searchTerm = searchTerm;
		$scope.settings.currentPage == 1 ?
			init(searchTerm) :
			$scope.settings.currentPage = 1;
	};

	$scope.deleteVariant = function(v, redirect) {
		if (!v.IsMpowerVariant) return;
		var d = {'ProductInteropID': $scope.LineItem.Product.InteropID, 'InteropID': v.InteropID};
		Variant.delete(d,
			function() {
				redirect ? $location.path('/product/' + $scope.LineItem.Product.InteropID) : $route.reload();
			},
			function(ex) {
				if ($scope.lineItemErrors.indexOf(ex.Message) == -1) {
					$scope.lineItemErrors.unshift(ex.Message);
				}
				$scope.showAddToCartErrors = true;
			}
		);
	}

	$scope.addToOrder = function() {
		$scope.addToOrderIndicator = true;
		if (typeof $scope.LineItem.facilityNumber !== 'undefined' && typeof $scope.LineItem.Specs.Bill_Facility_Number !== 'undefined') {
			$scope.LineItem.Specs.Bill_Facility_Number.Value = $scope.LineItem.facilityNumber;
		}
		if ($('#451qa_input_qty').val() == '') {
			return;
		}
		if ($scope.lineItemErrors && $scope.lineItemErrors.length) {
			$scope.showAddToCartErrors = true;
			return;
		}
		if (!$scope.currentOrder) {
			$scope.currentOrder = {};
			$scope.currentOrder.LineItems = [];
		}
		if (!$scope.currentOrder.LineItems) {
			$scope.currentOrder.LineItems = [];
		}
		if ($scope.allowAddFromVariantList) {
			angular.forEach($scope.variantLineItems, function(item) {
				if (item.Quantity > 0) {
					$scope.currentOrder.LineItems.push(item);
					$scope.currentOrder.Type = item.PriceSchedule.OrderType;
				}
			});
		} else {
			$scope.currentOrder.LineItems.push($scope.LineItem);
			$scope.currentOrder.Type = $scope.LineItem.PriceSchedule.OrderType;
		}

		Order.clearshipping($scope.currentOrder).
			save($scope.currentOrder,
				function(o) {
					$scope.user.CurrentOrderID = o.ID;
					User.save($scope.user, function() {
						$scope.addToOrderIndicator = true;
						$location.path('/cart' + ($scope.isEditforApproval ? '/' + o.ID : ''));
					});
				},
				function(ex) {
					// Remove the last LineItem added to the cart.
					$scope.currentOrder.LineItems.pop();
					$scope.addToOrderIndicator = false;
					$scope.lineItemErrors.push(ex.Detail);
					$scope.showAddToCartErrors = true;
				}
		);
	};

	$scope.downloadPdf = function() {
		if ($scope.LineItem.Product.Type == 'Static') {
			if (typeof $scope.LineItem.Product.StaticSpecGroups['Production Specs'].Specs.ArtworkUrl.Value === 'undefined') {
				alert('ArtworkUrl spec is missing, cannot proceed!');
			}
			_paq.push(['trackEvent', 'download', 'Download PDF', $scope.LineItem.Product.ExternalID]);
			document.location = $scope.LineItem.Product.StaticSpecGroups['Production Specs'].Specs.ArtworkUrl.Value;
		}
		if ($scope.LineItem.Product.Type == 'VariableText') {
			_paq.push(['trackEvent', 'download', 'Download PDF', $scope.LineItem.Product.ExternalID]);
			document.location = $scope.LineItem.Variant.ProductionURL;
		}
	}

	$scope.setOrderType = function(type) {
		$scope.loadingIndicator = true;
		$scope.currentOrder = { 'Type': type };
		init(null, function() {
			$scope.loadingIndicator = false;
		});
	};

	$scope.$on('event:imageLoaded', function(event, result) {
		$scope.loadingImage = false;
		$scope.$apply();
	});
	angScope = $scope;
}]);
