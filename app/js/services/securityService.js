four51.app.factory('Security', ['$451', '$cookieStore', function ($451, $cookieStore) {
    var _cookieName = 'user.' + $451.apiName;
    var logout = false;

    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    return {
        init: function (user, auth) {
            logout = false;
            var string = _cookieName + " = " + auth + ";SameSite=None; Secure";
            document.cookie = string;
        },
        clear: function () {
            $cookieStore.remove(_cookieName);
        },
        auth: function () {
            var token = getCookie(_cookieName);
            if(token.indexOf('Auth') !== -1){
                var parsedToken = JSON.parse(token);
            }
            if (parsedToken && parsedToken.Auth) {
                var tokenString = angular.copy(parsedToken.Auth);
                token = null;
                token = tokenString;
            }
            return token ? token : null;
        },
        isAuthenticated: function () {
            if (!logout) this.currentToken = getCookie(_cookieName);
            return (!!this.currentToken);
        },
        logout: function () {
            logout = true;

            function delete_cookie(name) {
                document.cookie = name + '=; path=/' + $451.apiName + '; expires=Thu, 01 Jan 1970 00:00:00 UTC';
                document.cookie = name + '=; path=/' + $451.apiName + '/; expires=Thu, 01 Jan 1970 00:00:00 UTC';
            }
            delete_cookie(_cookieName);
            delete this.currentToken;
        }
    }
}]);
