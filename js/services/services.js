'use strict';

$451.app.factory('OrderStatsService', function($resource, $http) {
    // query is not necessary here. it's just an example of how to add other methods
    return $resource($451.apiURL('orderstats'),{},{ query: {method: 'GET', params: {}, isArray: true}});
});
'use strict';

/* Services */
$451.app.factory('CategoryService', function($resource){

});

$451.app.factory('LoginService', function($resource){
    return $resource($451.apiURL('login'));
});