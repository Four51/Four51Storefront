four51.app.directive('paymentselector', function() {
   var obj = {
       restrict: 'E',
       templateUrl: 'partials/controls/paymentSelection.html',
       controller: ['$scope', '$rootScope', 'SavedCreditCard', 'SpendingAccount', 'Order', function($scope, $rootScope, SavedCreditCard, SpendingAccount, Order) {
	       $scope.paymentSelection = {};
	       $scope.isSplitBilling = false;

	       SpendingAccount.query(function(data) {
		       $scope.SpendingAccounts = data;
		       if ($scope.currentOrder.BudgetAccountID)
		            budgetAccountCalculation($scope.currentOrder.BudgetAccountID);
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
				       $scope.currentOrder.currentBudgetAccount = null;
			       }
		       }
		       $scope.cart_billing.$setValidity('paymentMethod', validatePaymentMethod(event));
	       });

	       var budgetAccountCalculation = function(value) {
		       if (value && $scope.SpendingAccounts) {
			       angular.forEach($scope.SpendingAccounts, function(a) {
				       if (a.ID == value) {
					       $scope.currentBudgetAccount = a;
				       }
			       });
		       }
		       var valid = validatePaymentMethod('BudgetAccount');
		       $scope.remainingOrderTotal = Order.calculatediscount($scope.currentOrder, $scope.currentBudgetAccount);
		       $scope.cart_billing.$setValidity('paymentMethod', valid);
	       };

	       $scope.$watch('currentOrder.Total', function(total) {
		       if ($scope.currentOrder && $scope.currentOrder.BudgetAccountID)
			       budgetAccountCalculation($scope.currentOrder.BudgetAccountID);
	       });

	       $scope.$watch('currentOrder.BudgetAccountID', function(value) {
		       $scope.currentBudgetAccount = null;
		       if (!value) return;
		       budgetAccountCalculation(value);
	       });

	       function validatePaymentMethod(method) {
		       $scope.isSplitBilling = false;
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

	       var getCardByID = function(id) {
		       var selectedCard = null;
		       angular.forEach($scope.paymentSelection.SavedCards, function(card) {
			       if (card.ID == id)
				       selectedCard = card;
		       });
		       return selectedCard;
	       };

           $scope.setPaymentMethod = function(type) {
               $scope.currentOrder.PaymentMethod = type;
               $rootScope.$broadcast('event:paymentMethodChange', type);
           };

	       $scope.setBudgetAccount = function(count) {
		       $scope.setPaymentMethod('BudgetAccount');
		       if ($scope.currentOrder.BudgetAccountID || count > 1) return;
		       angular.forEach($scope.SpendingAccounts, function(a) {
			       if (a.AccountType.PurchaseCredit) {
				       $scope.currentOrder.BudgetAccountID = a.ID;
				       $scope.selectedBudgetAccount = a;
			       }
		       });
	       };

	       $rootScope.$on('event:SpendingAccountUpdate', function(event, accounts) {
		       if (!$scope.currentOrder) return;
		       if ($scope.currentOrder.PaymentMethod == 'BudgetAccount') {
			       angular.forEach(accounts, function(a) {
				       if ($scope.selectedBudgetAccount) return;
				       if ($scope.currentOrder.BudgetAccountID == null && a.AccountType.PurchaseCredit) {
							$scope.currentOrder.BudgetAccountID = a.ID;
							$scope.selectedBudgetAccount = a;
				       }
				       else if (a.AccountType.PurchaseCredit && a.ID == $scope.currentOrder.BudgetAccountID) {
					       $scope.selectedBudgetAccount = a;
				       }
			       });
		       }
	       });

	       $scope.deleteSavedCard = function(id) {
		       if (confirm('Are you sure you wish to delete this saved credit card? This cannot be undone') == true) {
			       var card = getCardByID(id);
			       SavedCreditCard.delete(card, function() {
				       SavedCreditCard.query(function(cards) {
					       $scope.currentOrder.CreditCardID = null;
					       $scope.paymentSelection.SavedCards = cards;
				       });
			       });
		       }
	       };
	       $scope.showDelete = function(id) {
		       if (id == null) return false;
		       var card = getCardByID(id);
		       return card.IsCustEditable;
	       };

	       SavedCreditCard.query(function(cards) {
		       $scope.paymentSelection.SavedCards = cards;
	       });
	   }]
   };

   return obj;
});