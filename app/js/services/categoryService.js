'use strict';
four51.app.factory('Category', function($resource, $451){
    function _then(fn, data) {
        if (angular.isFunction(fn))
            fn(data);
    }

    var _get = function(interopID, success) {
		var category = store.get('451Cache.Category.' + interopID);
        category ? _then(success,category) :
            $resource($451.api('categories/:interopID', {interopID: '@ID'})).get({ 'interopID': interopID}).$promise.then(function(category) {
	            store.set('451Cache.Category.' + category.InteropID, category);
                _then(success, category);
            });
    }

    var _query = function(success){
		var tree = store.get('451Cache.Tree');
        tree ? _then(success,tree) :
            $resource($451.api('categories'), {}, { query: { method: 'GET', isArray: true }}).query().$promise.then(function(tree){
                store.set('451Cache.Tree', tree);
               _then(success, tree);
            });
    }

    return {
        tree: _query,
        get: _get
    }
});

