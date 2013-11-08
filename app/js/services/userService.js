four51.app.factory('User', function($q, $rootScope, $resource, $451, Security) {
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

	    angular.forEach(u.CustomFields, function(f) {
			if (f.ControlType == 'File' && f.File && f.File.Url.indexOf('auth') == -1)
				f.File.Url += "&auth=" + Security.auth();
	    });

	    u.AvailableCreditCards.Count = Object.keys(u.AvailableCreditCards).length;
    }

	var _refresh = function() {
		store.remove('451Cache.User');
		_get();
	}

    var _get = function(success) {
        var user = store.get('451Cache.User');
	    user ? (function() { _extend(user); _then(success,user); })() :
            $resource($451.api('user')).get().$promise.then(function(u) {
                _extend(u);
                _then(success,u);
                store.set('451Cache.User', u);
            });
    }

    var _save = function(user, success) {
        $resource($451.api('user')).save(user).$promise.then(function(u) {
            _extend(u);
            _then(success,u);
            store.set('451Cache.User', u);
        });
    }

    var _login = function(credentials,success) {
	    store.clear();
        $resource($451.api('login')).get(credentials).$promise.then(function(u) {
            _then(success,u);
        });
    }

    var _logout = function() {
        store.clear();
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