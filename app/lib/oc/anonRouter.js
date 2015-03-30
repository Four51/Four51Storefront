angular.module('OrderCloud-AnonRouter', []);

angular.module('OrderCloud-AnonRouter')

    .run(run)
    .constant('after', 'checkout')
    .constant('before', 'checkout')
    .factory('AnonRouter', AnonRouter)
;

run.$inject = ['$rootScope', '$location', 'User', 'before'];
function run($rootScope, $location, User, before) {
    $rootScope.$on('$locationChangeStart', function (event, newUrl, oldUrl) {
            var route = {
                'New': newUrl.split('/')[newUrl.split('/').length-1],
                'Old': oldUrl.split('/')[oldUrl.split('/').length-1]
            };
            if (route.New == before) {
                User.get(function(u) {
                    $location.path(u.Type == 'TempCustomer' ? 'admin' : route.New);
                });
            }
        }
    );
}

AnonRouter.$inject = ['$location', 'User', 'after'];
function AnonRouter($location, User, after) {
    var service = {
        route: _route
    };
    return service;

    function _route() {
        if (after == 'cart' || after == 'checkout') {
            User.get(function(u) {
                $location.path(u.CurrentOrderID ? after : 'catalog');
            });
        }
        else {
            $location.path(after);
        }
    }
}
