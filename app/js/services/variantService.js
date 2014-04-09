four51.app.factory('Variant', ['$resource', '$451', 'Security', 'Error', function($resource, $451, Security, Error) {
	function _then(fn, data) {
		if (angular.isFunction(fn))
			fn(data);
	}

	function _extend(variant) {
		angular.forEach(variant.Specs, function(spec) {
			if (spec.ControlType == 'File' && spec.File && spec.File.Url.indexOf('auth') == -1)
				spec.File.Url += "&auth=" + Security.auth();
		});
	}

	var _get = function(params, success, error) {

		$resource($451.api('variant')).get(params).$promise.then(function(variant) {
			_extend(variant);
			_then(success, variant);
		},function(ex) {
			error(ex);
		});
	}
	var _save = function(variant, success) {
		return $resource($451.api('variant')).save(variant).$promise.then(function(v) {
			var queryParams = {ProductInteropID: v.ProductInteropID, VariantInteropID: v.InteropID};
			//store.remove(getCacheName(queryParams));
			_extend(v);
			//store.set(getCacheName(queryParams), v);
			_then(success, v);
		});
	}

	var _delete = function(variant, success, error) {
		$resource($451.api('variant')).delete(variant).$promise.then(
			function() {
				_then(success);
			},
			function(ex) {
				error(Error.format(ex));
			}
		);
	};

	return {
		get: _get,
		save: _save,
		delete: _delete
	}
}]);