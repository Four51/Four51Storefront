four51.app.factory('User', function($q, $rootScope, $resource, $451, $angularCacheFactory, Security) {
    var cache = $angularCacheFactory.get('451Cache');

    function _then(fn, data) {
        if (angular.isFunction(fn))
            fn(data);
    }

    function _extend(u) {
        u.Permissions.contains = function(value) {
            return $451.contains(u.Permissions, value);
        };
        if ($451.contains(u.Permissions, ['PayByVisa', 'PayByMasterCard', 'PayByAmex', 'PayByDiscover', 'PayByDinersClub', 'PayByJCB', 'PayByDelta', 'PayBySwitch', 'PayBySolo', 'PayByElectron', 'PayByLaser']))
            u.Permissions.push('PayByCreditCard');
    }

	var _refresh = function() {
		cache.remove('user');
		_get();
	}

    var _get = function(success) {
        if (cache.get('user')) {
            var user = cache.get('user');
	        _extend(user);
            _then(success,user);
        }
        else {
            return $resource($451.api('user')).get().$promise.then(function(u) {
                _extend(u);
                _then(success,u);
                cache.put('user', u);
                $rootScope.$broadcast('api:userGetComplete');
            });
        }
    }

    var _save = function(user, success) {
        $resource($451.api('user')).save(user).$promise.then(function(u) {
            _extend(u);
            _then(success,u);
            cache.put('user', u);
        });
    }

    var _login = function(credentials,success) {
        cache.removeAll();
        $resource($451.api('login')).get(credentials).$promise.then(function(u) {
            _then(success,u);
        });
    }

    var _logout = function() {
        cache.removeAll();
        Security.logout();
    }

    return {
        get: _get,
        login: _login,
        save: _save,
        logout: _logout,
	    refresh: _refresh
    }
});