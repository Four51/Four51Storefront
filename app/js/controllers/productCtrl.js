var angScope;

four51.app.controller('ProductCtrl', ['$scope', '$routeParams', '$route', '$location', '$451', 'Product', 'ProductDisplayService', 'Order', 'Variant', 'User',
function ($scope, $routeParams, $route, $location, $451, Product, ProductDisplayService, Order, Variant, User) {
	angScope = $scope;

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
			$scope.$broadcast('ProductGetComplete');
			$scope.loadingIndicator = false;
			$scope.setAddToOrderErrors();
			if (angular.isFunction(callback)) {
				callback();
			}
			var ExternalID = $scope.LineItem.Product.ExternalID;
			$scope.covidSkus = false;
			$scope.blockAddToCart = false;
			for (var x in covidSkus) {
				if (covidSkus[x].sku == ExternalID) {
					// Item has a COVID SKU
					$scope.LineItem.covidSku = covidSkus[x];
					$scope.$watch('orderInitialized', function() {
						if ($scope.currentOrder && $scope.currentOrder.LineItems) {
							for (var i in $scope.currentOrder.LineItems) {
								if ($scope.currentOrder.LineItems[i].Product.ExternalID == ExternalID) {
									// This allocation is already in the user's cart, don't let them add again
									$scope.blockAddToCart = true;
								}
							}
						}
					});
				}
			}
			if (data.product.Type == 'Kit') {
				$scope.kitButtonText = 'Customize Kit';
			}
			$('#thumbContainerContainer').append('<div class="thumbContainer"><img class="product-thumb" data-src="https://www.four51.com/Themes/Custom/700dfe64-2fbd-4bca-9c5c-f423c74b2912/KAH_Docs/' + $scope.LineItem.Product.ExternalID + '_pvd_01_lrg.jpg" src="https://www.four51.com/Themes/Custom/700dfe64-2fbd-4bca-9c5c-f423c74b2912/KAH_Docs/' + $scope.LineItem.Product.ExternalID + '_pvd_01_sm.jpg" alt=""></div>');
			$('#thumbContainerContainer').append('<div class="thumbContainer"><img class="product-thumb" data-src="https://www.four51.com/Themes/Custom/700dfe64-2fbd-4bca-9c5c-f423c74b2912/KAH_Docs/' + $scope.LineItem.Product.ExternalID + '_pvd_02_lrg.jpg" src="https://www.four51.com/Themes/Custom/700dfe64-2fbd-4bca-9c5c-f423c74b2912/KAH_Docs/' + $scope.LineItem.Product.ExternalID + '_pvd_02_sm.jpg" alt=""></div>');

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
		if (typeof $scope.LineItem.covidSku !== 'undefined' && $scope.LineItem.covidSku && !$scope.isCovidSuperUser && true == false) {
			// COVID allocation item order flow
			if (!$scope.LineItem.facilityNumber) {
				$scope.addToOrderIndicator = false;
				alert('Please enter a facility number first');
				return;
			}
			// This is a COVID item, check allocation before allowing user to proceed
			$.ajax({
				url: 'https://apps.vividimpact.com/assets/kindredathome/getallowance_v6.php',
				type: 'get',
				success: function(facilities) {
					// Check quantity entered against allocation for facility. If needed, decrement or notify user.
					facilities = JSON.parse(facilities);
					var facility = false;
					for (var i in facilities) {
						if ($scope.LineItem.facilityNumber == facilities[i].facility_id) {
							facility = facilities[i];
						}
					}
					if (!facility) {
						$scope.addToOrderIndicator = false;
						alert('Facility not found, unable to proceed');
						return;
					}
					var availableQuantity = facility[$scope.LineItem.covidSku.type + '_allowance'] - facility[$scope.LineItem.covidSku.type + '_sold'];
					if (availableQuantity == 0) {
						$scope.addToOrderIndicator = false;
						alert('There are currently no more allocations available for this facility');
						return;
					}
					if ($scope.LineItem.Quantity > availableQuantity) {
						$scope.LineItem.Quantity = availableQuantity;
						alert('The available allocation quantity for this item is ' + availableQuantity + ', your order quantity has been updated accordingly');
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

				},
				error: function() {
					alert('Failed to connect to allocations server');
					location.reload();
				}
			});
		} else {
			// Typical order flow
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
		}
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
	$scope.$watch('userInitialized', function() {
		$scope.isCovidSuperUser = false;
		for (var i = 0; i < angUser.Groups.length; i++) {
			if (angUser.Groups[0].Name == '01_Covid_SuperUsers') {
				$scope.isCovidSuperUser = true;
			}
		}
	});
}]);
