'use strict';
four51.app.factory('Product', function($resource, $451, Security){
	//var _cacheName = '451Cache.Product.' + $451.apiName;
	function _then(fn, data) {
		if (angular.isFunction(fn))
			fn(data);
	}

	function _extend(product) {
		product.ViewName = product.ViewName || 'default';
		angular.forEach(product.Specs, function(spec) {
			if (spec.ControlType == 'File' && spec.File && spec.File.Url.indexOf('auth') == -1)
				spec.File.Url += "&auth=" + Security.auth();
		});

		angular.forEach(product.StaticSpecGroups, function(group) {
			angular.forEach(group.Specs, function(spec) {
				if (spec.FileURL && spec.FileURL.indexOf('auth') == -1)
					spec.FileURL += "&auth=" + Security.auth();
			});
		});

		product.StaticSpecLength = product.StaticSpecGroups ? Object.keys(product.StaticSpecGroups).length : 0;
	}

     var _get = function(param, success) {
	     //var product = store.get(_cacheName + param);
	     //product ? (function() { _extend(product);	_then(success, product); })() :
		 var product = $resource($451.api('Products/:interopID'), { interopID: '@ID' }).get({ interopID: param }).$promise.then(function(product) {
				_extend(product);
				//store.set(_cacheName + product.InteropID, product);
				_then(success, product);
	         });
    }

    var _search = function(categoryInteropID, searchTerm, relatedProductsGroupID, success) {
        if(!categoryInteropID && !searchTerm && !relatedProductsGroupID) return null;

        var criteria = {
            'CategoryInteropID': categoryInteropID,
            'SearchTerms': searchTerm ? searchTerm : '',
			'RelatedProductGroupID': relatedProductsGroupID
        };
	    //var cacheID = '451Cache.Products.' + criteria.CategoryInteropID + criteria.SearchTerms.replace(/ /g, "");
		//var products = store.get(cacheID);
	    //products ? _then(success, products) :
	    var products = $resource($451.api('Products')).query(criteria).$promise.then(function(products) {
		        //store.set(cacheID, products);
	            angular.forEach(products, _extend);
				_then(success, products);
	        });
    }
	
	return {
        get: _get,
        search: _search
    }
});

four51.app.factory('Variant', function($resource, $451, Security){
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

	function getCacheName(params){
		var query = params.VariantInteropID ? params.VariantInteropID : params.SpecOptionIDs.join();
		return '451Cache.' + $451.apiName + '.Variants.' + params.ProductInteropID + query;
	}
    var _get = function(params, success, error) {

		var variant = store.get(getCacheName(params));
		variant ? (function() { _extend(variant);	_then(success, variant); })() :
	        $resource($451.api('variant')).get(params).$promise.then(function(variant) {
		        _extend(variant);
		        store.set(getCacheName(params), variant);
	            _then(success, variant);
	        },function(ex) {
				error(ex);
			});
    }
	var _save = function(variant, success) {
		return $resource($451.api('variant')).save(variant).$promise.then(function(v) {
			var queryParams = {ProductInteropID: v.ProductInteropID, VariantInteropID: v.InteropID};
			store.remove(getCacheName(queryParams));
			_extend(v);
			store.set(getCacheName(queryParams), v);
			_then(success, v);
		});
	}
	return {
		get: _get,
		save: _save
	}
});
