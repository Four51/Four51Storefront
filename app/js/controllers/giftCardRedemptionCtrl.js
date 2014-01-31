four51.app.controller('GiftCardRedemptionCtrl', function($scope, GiftCard) {
	$scope.redeemGiftCard = function() {
		GiftCard.redeem(this.giftcard,
			function(card) {
				$scope.giftcard = card;
			},
			function(ex) {
				$scope.errorMessage = ex.Message;
			}
		);
	}
});
