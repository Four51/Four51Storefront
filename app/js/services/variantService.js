four51.app.factory('Variant', ['$rootScope', '$resource', '$451', 'Security', 'Error', function($rootScope, $resource, $451, Security, Error) {
	function _then(fn, data) {
		if (angular.isFunction(fn))
			fn(data);
		if (data && data.IsMpowerVariant && Object.keys(data.Specs).length > 0)
			$rootScope.$broadcast('event:specFormReady', data);
	}

	function _extend(variant) {
		if(variant.PreviewUrl){
			variant.PreviewUrl = variant.PreviewUrl + '?r=' + Math.random();
		}
		angular.forEach(variant.Specs, function(spec) {
			if (spec.ControlType == 'File' && spec.File && spec.File.Url.indexOf('auth') == -1)
				spec.File.Url += "&auth=" + Security.auth();
		});
	}

	var _get = function(params, success, error) {
		$resource($451.api('variant')).get(params).$promise.then(
			function(variant) {
				_extend(variant);
				_then(success, variant);
			},
			function(ex) {
				if (error) error(ex);
			}
		);
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
				if (error) error(Error.format(ex));
			}
		);
	};

	return {
		get: _get,
		save: _save,
		delete: _delete
	}
}]);