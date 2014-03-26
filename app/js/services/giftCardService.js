four51.app.factory('GiftCard', ['$resource', '$451', 'Error', function($resource, $451, Error) {
	function _then(fn, data) {
		if (angular.isFunction(fn))
			fn(data);
	}

	var _redeem = function(giftcard, success, error) {
		return $resource($451.api('giftcard')).save(giftcard).$promise.then(
			function(card) {
				_then(success, card);
			},
			function(ex) {
				error(Error.format(ex));
			}
		);
	}


	return {
		redeem: _redeem
	};
}]);