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
    });

    function populateCats(){
        if(!cats){
            cats = catservice.query();
            console.log('calling api for categories');
        }else{
            console.log('getting cached categories');
        }
    };
    function findCat(parent, interopID){
        if(parent.InteropID === interopID)
            return parent;
        var foundCat;
        for(var i = 0; i < parent.SubCategories.length; i++){
            var child = parent.SubCategories[i];
            if(child.InteropID === interopID)
                return child;

            if(child.SubCategories){
                foundCat = findCat(child, interopID)
                if(foundCat)
                    return foundCat;
            }
        }
    }
    return {
        tree: function(){
            populateCats();
            return cats;
        },
        getOne: function(interopID){
            populateCats();
            if(!interopID)
                return {InteropID: 'toplevel cat', SubCategories: cats};

            console.log('finding one: ' + interopID)

            return findCat({InteropID: 'topcat', SubCategories: cats}, interopID)
            //return {InteropID: interopID, Products: [{Name:'product1', Description:'product 1 description', InteropID: 'p1'},{Name:'product2', Description:'product 2 description', InteropID:'p2'} ]}
            //cats[i].products =
            //return api call
            //cache
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