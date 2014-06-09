four51.app.factory('Product', ['$resource', '$451', 'Security', 'User', function($resource, $451, Security, User) {
	//var _cacheName = '451Cache.Product.' + $451.apiName;
	var variantCache = [], productCache = [], criteriaCache;
	function _then(fn, data, count) {
		if (angular.isFunction(fn))
			fn(data, count);
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

        if(product.StaticSpecGroups){
            product.StaticSpecLength = 0;
            product.StaticSpecGroups.EvenSpecGroups = [];
            product.StaticSpecGroups.OddSpecGroups = [];
            angular.forEach(product.StaticSpecGroups, function(g){
                var visible = false;
                for (var i in g.Specs) {
                    if (g.Specs[i].VisibleToCustomer) {
                        visible = true;
                    }
                }
                if (visible) {
                    product.StaticSpecGroups.EvenSpecGroups.length == product.StaticSpecGroups.OddSpecGroups.length ? product.StaticSpecGroups.EvenSpecGroups.push(g) : product.StaticSpecGroups.OddSpecGroups.push(g);
                    product.StaticSpecLength++;
                }
            });
        }

        // parse old tokens to retrieve their values
        angular.forEach(product.Specs, function(spec) {
            if (spec.DefaultValue && spec.DefaultValue == spec.Value) {
                var matches = spec.DefaultValue.match(/\[\[(.*?)\]\]/g);
                if (matches) {
                    User.get(function (user) {
                        angular.forEach(matches, function(token) {
                            var fix = token.replace(/\[/g, '').replace(/\]/g, '').replace(/\[/g, '');
                            var split = fix.split(".");
                            var temp = null, value;
                            for(var i = 0; i <= split.length - 1; i++) {
                                temp = temp ? temp[split[i]] : user[split[i]];
                            }
                            value = temp || lookupCustom(user, fix);
                            spec.Value = spec.Value.replace(token, value).substr(0, spec.MaxLength);
                            spec.DefaultValue = spec.DefaultValue.replace(token, value);
                        });
                    });
                }
            }
        });
		function lookupCustom(user, token) {
			var value = '';
			angular.forEach(user.CustomFields, function(f) {
				if (f.Name == token)
					value = f.Value;
			});
			return value;
		}
	}

     var _get = function(param, success, page, pagesize, searchTerm) {
	     page = page || 1;
	     pagesize = pagesize || 100;
	     if (!angular.isUndefined(searchTerm)) {
		     variantCache.splice(0, variantCache.length);
	     }
	     //var product = store.get(_cacheName + param);
	     //product ? (function() { _extend(product);	_then(success, product); })() :
		 var product = $resource($451.api('Products/:interopID'), { interopID: '@ID' }).get({ interopID: param, page: page || 1, pagesize: pagesize || 10, searchTerm: searchTerm }).$promise.then(function(product) {
			for (var i = 0; i <= product.VariantCount-1; i++) {
				if (typeof variantCache[i] == 'object') continue;
				variantCache[i] = product.Variants[i - (page - 1) * pagesize] || i;
			}
		    product.Variants = variantCache;

		    _extend(product);
			//store.set(_cacheName + product.InteropID, product);
			_then(success, product);
	     });
    }

    var _search = function(categoryInteropID, searchTerm, relatedProductsGroupID, success, page, pagesize) {
	    if(!categoryInteropID && !searchTerm && !relatedProductsGroupID){
			_then(success, null);
			return null;
		}

        var criteria = {
            'CategoryInteropID': categoryInteropID,
            'SearchTerms': searchTerm ? searchTerm : '',
			'RelatedProductGroupID': relatedProductsGroupID,
	        'Page': page || 1,
	        'PageSize': pagesize || 10
        };

	    if (criteriaCache != criteria)
		    productCache.splice(0, productCache.length);
	    criteriaCache = criteria;

	    //var cacheID = '451Cache.Products.' + criteria.CategoryInteropID + criteria.SearchTerms.replace(/ /g, "");
		//var products = store.get(cacheID);
	    //products ? _then(success, products) :
	    if (typeof productCache[(criteria.Page-1) * criteria.PageSize] == 'object' && typeof productCache[(criteria.Page * criteria.PageSize) - 1] == 'object') {
		    _then(success, productCache, productCache.length);
	    }
	    else {
		    $resource($451.api('Products')).get(criteria).$promise.then(function (products) {
			    angular.forEach(products.List, _extend);
			    for (var i = 0; i <= products.Count - 1; i++) {
				    if (typeof productCache[i] == 'object') continue;
				    productCache[i] = products.List[i - (((criteria.Page || 1) - 1) * (criteria.PageSize || 100))] || i;
			    }
			    _then(success, productCache, products.Count);
		    });
	    }
    }
	
	return {
        get: _get,
        search: _search
    }
}]);
