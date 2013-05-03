'use strict';

$451.app.factory('OrderStatsService', function($resource, $http) {
    // query is not necessary here. it's just an example of how to add other methods
    return $resource($451.apiURL('orderstats'),{},{ query: {method: 'GET', params: {}, isArray: true}});
});

$451.app.factory('CategoryService', function($resource, $rootScope){
    var catservice = $resource($451.apiURL('category'));
    var cats = null;

    $rootScope.$on('LogoutEvent', function(event, e){
        cats = null
        console.log('logout called - category service');
    });
    $rootScope.$on('LoginEvent', function(event, e){
        cats = null;
        console.log('login called - category service');
    })
    return {
        get: function(){
            if(!cats){
                cats = catservice.query();
                console.log('calling api for categories');
            }else{
                console.log('getting cached categories');
            }

            return cats;
        },
        listProducts: function(){
            //cats[i].products =
            //return api call
            //cache
        },
        clearCache: function(){
            debugger;
            cats = null;
        }
    }
});

$451.app.factory('ProductService', function($resource){
    var productAPI = $resource($451.apiURL('product'));

    var p = [{Name: 'product1', Description: 'product1 desc', InteropID: 'pinterop1'},{Name: 'product2', Description: 'product2 desc', InteropID: 'pinterop2'} ];

    return {
       get: function(categoryInteropID, searchTerm){
           return productAPI.query();
       },
        getOne: function(interopID){
            return p[0];
        }
   }
});

$451.app.factory('LoginService', function($resource){
    return $resource($451.apiURL('login'));
});
