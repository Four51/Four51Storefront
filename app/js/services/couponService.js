four51.app.factory('Coupon', function($resource, $451){
	function _then(fn, data) {
		if (angular.isFunction(fn))
			fn(data);
	}

	var _save = function(code, success) {
		return $resource($451.api('coupon')).save({ 'CouponCode': code}).$promise.then(function(c) {
			_then(success, c);
		});
	}

	return {
		apply: _save
	};
});