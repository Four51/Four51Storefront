four51.app.directive('orderbilling', ['SpendingAccount', 'Address', function(SpendingAccount, Address) {
	var obj = {
		restrict: 'AE',
		templateUrl: 'partials/controls/orderBilling.html',
		controller: ['$scope', function($scope) {
			SpendingAccount.query(function(data) {
				$scope.SpendingAccounts = data;
				budgetAccountCalculation($scope.currentOrder.BudgetAccountID);
			});

			$scope.$watch('currentOrder.BillAddressID', function(newValue) {
				if (newValue) {
					Address.get(newValue, function(add) {
						if ($scope.user.Permissions.contains('EditBillToName') && !add.IsCustEditable) {
							$scope.currentOrder.BillFirstName = add.FirstName;
							$scope.currentOrder.BillLastName = add.LastName;
						}
						$scope.BillAddress = add;
					});
				}
			});

			$scope.$on('event:AddressCancel', function(event) {
				$scope.billaddressform = false;
			});

			$scope.$watch('currentOrder.PaymentMethod', function(event) {
				if (event == 'BudgetAccount' && $scope.SpendingAccounts) {
					if ($scope.SpendingAccounts.length == 1)
						$scope.currentOrder.BudgetAccountID = $scope.SpendingAccounts[0].ID;
					else {
						var count = 0, account;
						angular.forEach($scope.SpendingAccounts, function(s) {
							if (s.AccountType.PurchaseCredit) {
								count += 1;
								account = s;
							}
						});
						if (count == 1 && account)
							$scope.currentOrder.BudgetAccountID = account.ID;
					}
				}
				else {
					if (!$scope.isSplitBilling && $scope.currentOrder) {
						$scope.currentOrder.BudgetAccountID = null;
						$scope.currentOrder.currentBudgetAccount = null;
					}
				}
				$scope.cart_billing.$setValidity('paymentMethod', validatePaymentMethod(event));
			});

			var budgetAccountCalculation = function(value) {
				if (value) {
					var valid = validatePaymentMethod('BudgetAccount');
					angular.forEach($scope.SpendingAccounts, function(a) {
						if (a.ID == value) {
							$scope.currentBudgetAccount = a;
						}
					});
					var discount = $scope.currentBudgetAccount.AccountType.MaxPercentageOfOrderTotal != 100 ?
						$scope.currentOrder.Total * ($scope.currentBudgetAccount.AccountType.MaxPercentageOfOrderTotal *.01) :
						$scope.currentBudgetAccount.Balance;
					$scope.remainingOrderTotal = $scope.currentOrder.Total - discount;
					$scope.cart_billing.$setValidity('paymentMethod', valid);
				}
			}

			$scope.$watch('currentOrder.Total', function(total) {
				if ($scope.currentOrder && $scope.currentOrder.BudgetAccountID)
					budgetAccountCalculation($scope.currentOrder.BudgetAccountID);
			});

			$scope.$watch('currentOrder.BudgetAccountID', function(value) {
				$scope.currentBudgetAccount = null;
				budgetAccountCalculation(value);
			});

			function validatePaymentMethod(method) {
				var validateAccount = function() {
					var account = null;
					angular.forEach($scope.SpendingAccounts, function(a) {
						if ($scope.currentOrder && a.ID == $scope.currentOrder.BudgetAccountID)
							account = a;
					});
					if (account) {
						$scope.isSplitBilling = false;
						if (account.AccountType.MaxPercentageOfOrderTotal != 100) {
							$scope.isSplitBilling = true;
							return false;
						}

						if (account.Balance < $scope.currentOrder.Total) {
							$scope.isSplitBilling = !account.AccountType.AllowExceed;
							return account.AccountType.AllowExceed;
						}
						else
							return true;
					}
					return false;
				}

				var valid = false;
				switch (method) {
					case 'Undetermined':
						valid = $scope.user.Permissions.contains('SubmitForApproval');
						break;
					case 'PurchaseOrder':
						valid = $scope.user.Permissions.contains('PayByPO');
						break;
					case 'BudgetAccount':
						valid = $scope.user.Permissions.contains('PayByBudgetAccount');
						valid = valid ? validateAccount() : valid;
						break;
					case 'CreditCard':
						valid = $scope.user.Permissions.contains('PayByCreditCard');
						break;
					default:
						return false;
				}
				return valid;
			}
		}]
	};
	return obj;
}]);

four51.app.directive('billingmessage', function() {
	var obj = {
		restrict: 'E',
		templateUrl: 'partials/messages/billing.html'
	};
	return obj;
});