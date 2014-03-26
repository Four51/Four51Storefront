four51.app.factory('Coupon', ['$resource', '$451', 'Error', function($resource, $451, Error){
	function _then(fn, data) {
		if (angular.isFunction(fn))
			fn(data);
	}

	var _save = function(code, success, error) {
		return $resource($451.api('coupon')).save({ 'CouponCode': code}).$promise.then(
			function(c) {
				_then(success, c);
			},
			function(ex) {
				error(Error.format(ex));
			}
		);
	}

	var _delete = function(success) {
		return $resource($451.api('coupon')).delete().$promise.then(function() {
			_then(success);
		});
	}

	return {
		apply: _save,
		remove: _delete
	};
}]);