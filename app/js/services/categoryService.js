'use strict';
four51.app.factory('Category', function($resource, $451, $angularCacheFactory){
    var cache = $angularCacheFactory.get('451Cache');

    function _then(fn, data) {
        if (angular.isFunction(fn))
            fn(data);
    }

    var _get = function(interopID, success) {
        if (cache.get('category' + interopID)) {
            var category = cache.get('category' + interopID);
            _then(success,category);
        }
        else {
            $resource($451.api('categories/:interopID', {interopID: '@ID'})).get({ 'interopID': interopID}).$promise.then(function(category) {
	            cache.put('category' + category.InteropID, category);
                _then(success, category);
            });
        }
    }

    var _query = function(success){
        if (cache.get('tree')) {
            var tree = cache.get('tree');
            _then(success,tree);
        }
        else {
            $resource($451.api('categories'), {}, { query: { method: 'GET', isArray: true }}).query().$promise.then(function(tree){
                cache.put('tree', tree);
               _then(success, tree);
            });
        }
    }

    return {
        tree: _query,
        get: _get
    }
});

