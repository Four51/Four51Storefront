four51.app.factory('Security', function($451) {
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
            $451.cache('Security', this.currentUser, { ttl: 86400000, persists: true });
        },
        authHeader: function() {
            return this.currentUser ? this.currentUser.Auth : null;
        },
        isAuthenticated: function() {
            //TODO: this is temporary. I don't want to only rely on caching the user for authentication. It's in place now so we, developers, aren't required to log in when we refresh
            this.currentUser = $451.cache('Security');
            return !!this.currentUser;
        },
        logout: function() {
            delete this.currentUser;
        }
    }
});