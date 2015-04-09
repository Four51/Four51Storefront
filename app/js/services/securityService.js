four51.app.factory('Security', ['$451', '$cookieStore', function($451, $cookieStore) {
    var _cookieName = 'user.' + $451.apiName;
    var logout = false;
    return {
        init: function(user, auth) {
            this.currentUser = {
                SiteID: user.SiteID,
                Username: user.Username,
                InteropID: user.InteropID,
                FirstName: user.FirstName,
                LastName: user.LastName,
                Email: user.Email,
                Auth: auth
            };
            logout = false;
            $cookieStore.put(_cookieName, this.currentUser);
        },
        clear: function() {
            $cookieStore.remove(_cookieName);
        },
        auth: function() {
            var user = $cookieStore.get(_cookieName);
            return user ? user.Auth : null;
        },
        isAuthenticated: function() {
            if (!logout) this.currentUser = $cookieStore.get(_cookieName);
            return (!!this.currentUser);
        },
        logout: function() {
            logout = true;
            function delete_cookie( name ) {
                document.cookie = name + '=; path=/' + $451.apiName + '; expires=Thu, 01 Jan 1970 00:00:00 UTC';
                document.cookie = name + '=; path=/' + $451.apiName + '/; expires=Thu, 01 Jan 1970 00:00:00 UTC';
            }
            delete_cookie(_cookieName);
            delete this.currentUser;
        }
    }
}]);