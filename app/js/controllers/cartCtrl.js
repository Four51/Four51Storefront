var angScope;

four51.app.controller('CartViewCtrl', ['$scope', '$routeParams', '$location', '$451', 'Order', 'OrderConfig', 'User',
	function ($scope, $routeParams, $location, $451, Order, OrderConfig, User) {
		$scope.submitted = false;
		$scope.isEditforApproval = $routeParams.id != null && $scope.user.Permissions.contains('EditApprovalOrder');
		if ($scope.isEditforApproval) {
			Order.get($routeParams.id, function(order) {
				$scope.currentOrder = order;
				// add cost center if it doesn't exists for the approving user
				var exists = false;
				angular.forEach(order.LineItems, function(li) {
					angular.forEach($scope.user.CostCenters, function(cc) {
						if (exists) return;
						exists = cc == li.CostCenter;
					});
					if (!exists) {
						$scope.user.CostCenters.push({
							'Name': li.CostCenter
						});
					}
				});
			});
		}

		$scope.checkCostCenters = function() {
			var facilityNumber = '';
			var dept = '';
			var glCode = '';
			var CSglCode = '';
			for (var i in $scope.currentOrder.LineItems) {
				var item = $scope.currentOrder.LineItems[i];
				if (item.facilityNumber) {facilityNumber = item.facilityNumber + '_'}
				if (item.dept) {dept = item.dept + '_'}
				if (item.glCode) {glCode = item.glCode}
				if (item.CSglCode) {CSglCode = item.CSglCode}

				$scope.currentOrder.LineItems[i].CostCenter = facilityNumber + dept + glCode + CSglCode;
			}

			return true;
		}
		$scope.currentDate = new Date();
		$scope.errorMessage = null;
		$scope.continueShopping = function() {
			if (!$scope.cart.$invalid) {
				if (confirm('Do you want to save changes to your order before continuing?') == true)
					$scope.saveChanges(function() { $location.path('home') });
			}
			else
				$location.path('home');
		};

		$scope.cancelOrder = function() {
			if (confirm('Are you sure you wish to cancel your order?') == true) {
				$scope.displayLoadingIndicator = true;
				$scope.actionMessage = null;
				Order.delete($scope.currentOrder,
					function(){
						$scope.currentOrder = null;
						$scope.user.CurrentOrderID = null;
						User.save($scope.user, function(){
							$location.path('home');
						});
						$scope.displayLoadingIndicator = false;
						$scope.actionMessage = 'Your Changes Have Been Saved';
					},
					function(ex) {
						$scope.actionMessage = 'An error occurred: ' + ex.Message;
						$scope.displayLoadingIndicator = false;
					}
				);
			}
		};

		$scope.saveChanges = function(callback) {
			if (!$scope.checkCostCenters()) {
				return;
			}
			$scope.actionMessage = null;
			$scope.errorMessage = null;
			if ($scope.currentOrder.LineItems.length == $451.filter($scope.currentOrder.LineItems, {Property:'Selected', Value: true}).length) {
				$scope.cancelOrder();
			}
			else {
				$scope.displayLoadingIndicator = true;
				OrderConfig.address($scope.currentOrder, $scope.user);
				Order.save($scope.currentOrder,
					function(data) {
						$scope.displayLoadingIndicator = false;
						if (callback) callback();
						$scope.actionMessage = 'Your Changes Have Been Saved';
					},
					function(ex) {
						$scope.errorMessage = ex.Message;
						$scope.displayLoadingIndicator = false;
					}
				);
			}
		};

		$scope.removeItem = function(item) {
			if (confirm('Are you sure you wish to remove this item from your cart?') == true) {
				Order.deletelineitem($scope.currentOrder.ID, item.ID,
					function(order) {
						$scope.currentOrder = order;
						Order.clearshipping($scope.currentOrder);
						if (!order) {
							$scope.user.CurrentOrderID = null;
							User.save($scope.user, function(){
								$location.path('home');
							});
						}
						$scope.displayLoadingIndicator = false;
						$scope.actionMessage = 'Your Changes Have Been Saved';
					},
					function (ex) {
						$scope.errorMessage = ex.Message.replace(/\<<Approval Page>>/g, 'Approval Page');
						$scope.displayLoadingIndicator = false;
					}
				);
			}
		}

		$scope.checkOut = function() {
			$scope.submitted = true;
			if (!$scope.checkCostCenters()) {
				return;
			}
			$scope.displayLoadingIndicator = true;
			if (!$scope.isEditforApproval) {
				OrderConfig.address($scope.currentOrder, $scope.user);
			}
			Order.save($scope.currentOrder, function(data) {
					$scope.currentOrder = data;
					$location.path($scope.isEditforApproval ? 'checkout/' + $routeParams.id : 'checkout');
					$scope.displayLoadingIndicator = false;
				},
				function(ex) {
					$scope.errorMessage = ex.Message;
					$scope.displayLoadingIndicator = false;
				}
			);
		};

		$scope.$watch('currentOrder.LineItems', function(newval) {
			var newTotal = 0;
			if (!$scope.currentOrder) {
				return newTotal;
			}
			angular.forEach($scope.currentOrder.LineItems, function(item){
				if (!item.Product.SmallImageUrl){
					angular.forEach($scope.currentOrder.LineItems,function(li){
						if (item.Product.InteropID == li.Product.InteropID && (li.Product.SmallImageUrl)){
							item.Product.SmallImageUrl = li.Product.SmallImageUrl;
						}
					});
				}
				if (item.IsKitParent) {
					$scope.cart.$setValidity('kitValidation', !item.KitIsInvalid);
				}
				newTotal += item.LineTotal;
			});
			$scope.currentOrder.Subtotal = newTotal;
		}, true);

		$scope.copyAddressToAll = function() {
			// Noop
		};

		$scope.onPrint = function() {
			window.print();
		};

		$scope.cancelEdit = function() {
			$location.path('order');
		};

		$scope.downloadProof = function(item) {
			window.location = item.Variant.ProofUrl;
		};
		$scope.glCodeChanged = function(item) {
			if (item.glCode == 'Other') {
				item.showOther = true;
			} else {
				item.showOther = false;
			}
		}
		$scope.copyToAll = function(item) {
			for (var i in $scope.currentOrder.LineItems) {
				$scope.currentOrder.LineItems[i].facilityNumber = item.facilityNumber;
				$scope.currentOrder.LineItems[i].dept = item.dept;
				$scope.currentOrder.LineItems[i].glCode = item.glCode;
				$scope.currentOrder.LineItems[i].CSglCode = item.CSglCode;
				if (item.glCode == 'Other') {
					$scope.currentOrder.LineItems[i].showOther = true;
					$scope.currentOrder.LineItems[i].otherText = item.otherText;
				} else {
					$scope.currentOrder.LineItems[i].showOther = false;
					$scope.currentOrder.LineItems[i].otherText = null;
				}
			}
		}
		$scope.$watch('orderInitialized', function() {
			// Initiate Facility, Dept and GL Code data if it already exists:
			// for (var i in $scope.currentOrder.LineItems) {
			// 	$scope.currentOrder.LineItems[i].showOther = false;
			// 	if ($scope.currentOrder.LineItems[i].CostCenter !== 'undefined' && $scope.currentOrder.LineItems[i].CostCenter) {
			// 		var elements = $scope.currentOrder.LineItems[i].CostCenter.split('_');
			// 		$scope.currentOrder.LineItems[i].showOther = false;
			// 		$scope.currentOrder.LineItems[i].facilityNumber = elements[0];
			// 		$scope.currentOrder.LineItems[i].dept = elements[1];
			// 		$scope.currentOrder.LineItems[i].glCode = elements[2];
			// 		if ($scope.currentOrder.LineItems[i].CostCenter.indexOf('OTHER:') !== -1) {
			// 			$scope.currentOrder.LineItems[i].glCode = 'Other';
			// 			$scope.currentOrder.LineItems[i].showOther = true;
			// 			$scope.currentOrder.LineItems[i].otherText = $scope.currentOrder.LineItems[i].CostCenter.split('OTHER:')[1];
			// 		}
			// 	}
			// }

			// for (var i in $scope.currentOrder.LineItems) {
			// 	angular.forEach($scope.user.CustomFields, function(f) {
			// 		if (f.Name === 'LPSH_CostCode')
			// 			var code = f.Value;
			// 		if(code && Number(code)){
			// 			var facilityID = code.slice(0,4);
			// 			var deptID = code.slice(-3);
			// 		}
			// 		$scope.currentOrder.LineItems[i].facilityNumber = facilityID;
			// 		$scope.currentOrder.LineItems[i].dept = deptID;
			// 	});
			// }

			angular.forEach($scope.user.Groups, function(g) {
				if (g.Name.indexOf('Scion') !== -1)
					$scope.companyCode = 'SH';
				if (g.Name.indexOf('Lifepoint') !== -1)
					$scope.companyCode = 'LP';
			})

		});
		angScope = $scope;
	}]);
