four51.app.directive('paymentselector', function() {
   var obj = {
       restrict: 'E',
	   priority: 99,
       templateUrl: 'partials/controls/paymentSelection.html',
       controller: ['$scope', '$rootScope', 'SavedCreditCard', function($scope, $rootScope, SavedCreditCard) {
	       $scope.paymentSelection = {};
	       $scope.isSplitBilling = false;

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