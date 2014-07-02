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

           $scope.$watch('currentOrder.CreditCard.AccountNumber', function(ccnumber, o){
               //http://tamas.io/custom-angularjs-filter-to-determine-credit-card-type/
               var len = ccnumber.length;
               if(ccnumber && len >= 4){
                   var  cardType,
                       valid,
                       mul = 0,
                       prodArr = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 2, 4, 6, 8, 1, 3, 5, 7, 9]],
                       sum = 0;

                   while (len--) {
                       sum += prodArr[mul][parseInt(ccnumber.charAt(len), 10)];
                       mul ^= 1;
                   }

                   if (sum % 10 === 0 && sum > 0) {
                       valid = "valid"
                   } else {
                       valid = "not valid"
                   }
                   ccnumber = ccnumber.toString().replace(/\s+/g, '');

                   if(/^(34)|^(37)/.test(ccnumber)) {
                       cardType = "AmericanExpress";
                   }
                   if(/^30[0-5]/.test(ccnumber)) {
                       cardType = "DinersClub"; //Carte Blanche
                   }
                   if(/^(2014)|^(2149)/.test(ccnumber)) {
                       cardType = "DinersClub"; //enRoute
                   }
                   if(/^36/.test(ccnumber)) {
                       cardType = "DinersClub"; //International
                   }
                   if(/^(6011)|^(622(1(2[6-9]|[3-9][0-9])|[2-8][0-9]{2}|9([01][0-9]|2[0-5])))|^(64[4-9])|^65/.test(ccnumber)) {
                       cardType = "Discover";
                   }
                   if(/^35(2[89]|[3-8][0-9])/.test(ccnumber)) {
                       cardType = "JCB";
                   }
                   if(/^(6304)|^(6706)|^(6771)|^(6709)/.test(ccnumber)) {
                       cardType = "Laser"; //Laser
                   }
                   if(/^(5018)|^(5020)|^(5038)|^(5893)|^(6304)|^(6759)|^(6761)|^(6762)|^(6763)|^(0604)/.test(ccnumber)) {
                       cardType = "Switch"; //Maestro
                   }
                   if(/^5[1-5]/.test(ccnumber)) {
                       cardType = "MasterCard";
                   }
                   if (/^4/.test(ccnumber)) {
                       cardType = "Visa";
                   }
                   if (/^(4026)|^(417500)|^(4405)|^(4508)|^(4844)|^(4913)|^(4917)/.test(ccnumber)) {
                       cardType = "Electron"; //Visa Electron
                   }

                   if(cardType){
                       $scope.currentOrder.CreditCard.Type = cardType;
                       $scope.creditCardIconUrl = 'css/images/CreditCardIcons/' + cardType + '.png';
                   } else {
                       $scope.currentOrder.CreditCard.Type = null;
                       $scope.creditCardIconUrl = null;
                   }
               } else {
                   $scope.currentOrder.CreditCard.Type = null;
                   $scope.creditCardIconUrl = null;
               }
           });
	   }]
   };

   return obj;
});