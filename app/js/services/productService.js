four51.app.factory('Product', ['$resource', '$451', 'Security', 'User', function($resource, $451, Security, User) {
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
							var fix = token.replace(/\[/g, '').replace(/\]/g, '');
							var value = user[fix.replace('UserName', 'Username')] || lookupCustom(user, fix);
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
        if(!categoryInteropID && !searchTerm && !relatedProductsGroupID){
			_then(success, null);
			return null;
		}

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
}]);
