four51.app.factory('Security', ['$451', '$cookieStore', function($451, $cookieStore) {
    var _cookieName = 'user.' + $451.apiName;
    var logout = false;
    return {
        init: function(user, auth) {
            this.currentToken = auth;
            logout = false;
            $cookieStore.put(_cookieName, this.currentToken);
        },
        clear: function() {
            $cookieStore.remove(_cookieName);
        },
        auth: function() {
            var token = $cookieStore.get(_cookieName);
            if(token && token.Auth){
                var tokenString = angular.copy(token.Auth);
                token = null;
                token = tokenString;
            }
            return token ? token : null;
        },
        isAuthenticated: function() {
            if (!logout) this.currentToken = $cookieStore.get(_cookieName);
            return (!!this.currentToken);
        },
        logout: function() {
            logout = true;
            function delete_cookie( name ) {
                document.cookie = name + '=; path=/' + $451.apiName + '; expires=Thu, 01 Jan 1970 00:00:00 UTC';
                document.cookie = name + '=; path=/' + $451.apiName + '/; expires=Thu, 01 Jan 1970 00:00:00 UTC';
            }
            delete_cookie(_cookieName);
            delete this.currentToken;
        }
    }
}]);