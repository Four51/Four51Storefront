four51.app.controller('GiftCardRedemptionCtrl', ['$scope', 'GiftCard', function($scope, GiftCard) {
	$scope.redeemGiftCard = function() {
		$scope.$parent.gcMessage = null;
		GiftCard.redeem(this.giftcard,
			function(card) {
				$scope.giftcard = card;
			},
			function(ex) {
				$scope.$parent.gcMessage = ex.Message;
			}
		);
	}
}]);
