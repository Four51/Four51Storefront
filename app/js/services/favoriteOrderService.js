four51.app.factory('FavoriteOrder', function($resource, $451) {

    var _query = function(success) {
        return $resource($451.api('favoriteorder')).query(function(fav) {
            if (angular.isFunction(success))
                success(fav);
        });
    }

    var _save = function(order,success) {
        $resource($451.api('favoriteorder')).save(order).$promise.then(function(fav) {
            if (angular.isFunction(success))
                success(fav);
        });
    }

    var _delete = function(orders,success) {
        angular.forEach(orders, function(order) {
            if (order.Selected)
                $resource($451.api('favoriteorder')).delete(order);
        });
        if (angular.isFunction(success))
            success();
    }

	return {
		query: _query,
		save: _save,
		delete: _delete
	}
});