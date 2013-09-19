four51.app.factory('Security', function($451, $cookieStore) {
    return {
        init: function(user, auth) {
            this.currentUser = {
                Username: user.Username,
                InteropID: user.InteropID,
                FirstName: user.FirstName,
                LastName: user.LastName,
                Email: user.Email,
                Auth: auth
            };
            $cookieStore.put('User', this.currentUser);
        },
        auth: function() {
            var user = $cookieStore.get('User');
            return user ? user.Auth : null;
        },
        isAuthenticated: function() {
            this.currentUser =  $cookieStore.get('User');
            return !!this.currentUser;
        },
        logout: function() {
            delete this.currentUser;
        }
    }
});