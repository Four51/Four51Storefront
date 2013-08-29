four51.app.factory('User', function($resource, $451, Security) {
    function _extend(u) {
        u.Permissions.contains = function(value) {
            return $451.contains(u.Permissions, value);
        };
    }

    var _get = function(success) {
        $resource($451.api('user')).get().$promise.then(function(u) {
            _extend(u);
            if (angular.isFunction(success))
                success(u);
        });
    }

    var _save = function(user, success) {
        $resource($451.api('user')).save(user).$promise.then(function(u) {
            _extend(u);
            if (angular.isFunction(success))
                success(u);
        });
    }

    var _login = function(credentials,success) {
        $resource($451.api('login')).get(credentials).$promise.then(function(u) {
            if (angular.isFunction(success))
                success(u);
        });
    }

    var _logout = function() {
        $451.clear(); //TODO: remove when live
        Security.logout();
    }

    return {
        get: _get,
        login: _login,
        save: _save,
        logout: _logout
    }
});
