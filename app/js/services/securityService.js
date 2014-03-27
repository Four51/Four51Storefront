four51.app.factory('Security', ['$451', '$cookieStore', function($451, $cookieStore) {
	var _cookieName = 'user.' + $451.apiName;
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
            this.currentUser =  $cookieStore.get(_cookieName);
            return !!this.currentUser;
        },
        logout: function() {
            $cookieStore.remove(_cookieName);
            delete this.currentUser;
        }
    }
}]);