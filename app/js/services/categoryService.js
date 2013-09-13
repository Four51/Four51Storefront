'use strict';
four51.app.factory('Category', function($resource, $cacheFactory, $451){
    var _get = function(interopID,success) {
        $resource($451.api('categories/:interopID', {interopID: '@ID'})).get({ 'interopID': interopID}).$promise.then(function(cat) {
            if (angular.isFunction(success))
                success(cat);
        });
    }

    var _query = function(success){
        var c = $cacheFactory;
        $resource($451.api('categories'), {}, { query: { method: 'GET', isArray: true, cache: true }}).query().$promise.then(function(data){
            if (angular.isFunction(success))
                success(data);
        });
    }

    return {
        tree: _query,
        get: _get
    }
});

