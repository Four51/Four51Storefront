'use strict';

$451.app.factory('OrderStatsService', function($resource, $http) {
    // query is not necessary here. it's just an example of how to add other methods
    return $resource($451.apiURL('orderstats'),{},{ query: {method: 'GET', params: {}, isArray: true}});
});
'use strict';

$451.app.factory('CategoryService', function($resource){
    var catservice = $resource($451.apiURL('category'));
    return {
        get: function(){
            return catservice.query();
        }
    }

});

$451.app.factory('ProductService', function($resource){
    var p = [{name: 'product1', description: 'product1 desc'},{name: 'product1', description: 'product1 desc'} ];

    return {
       get: function(){
           return p;
       }
   }

});

$451.app.factory('LoginService', function($resource){
    return $resource($451.apiURL('login'));
});