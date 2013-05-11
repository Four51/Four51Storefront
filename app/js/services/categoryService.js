'use strict';
four51.app.factory('CategoryService', function($resource, $rootScope, $451, ProductService){
    var catservice = $resource($451.api('category/:interopID', {interopID: '@ID'}));
    var cats = null;
    function clearCache(){
        $rootScope.$broadcast('event:ClearCategory');
        cats = null;
    }
    function reloadCat(){
        $rootScope.$broadcast('event:ReloadCategory');
    }
    $rootScope.$on('event:Logout', function(event, e){
        clearCache();
    });
    $rootScope.$on('event:auth-loginRequired', function(event, e){
        clearCache();
    });
    $rootScope.$on('event:auth-loginConfirmed', function(event, e){
        cats = null;
        reloadCat();
    });


    function findCat(parent, interopID){
        if(!interopID)
            return {SubCategories: cats, InteropID: null};
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
            if(!cats){
                return catservice.query(function(data){
                    cats = data;
                });
            }else
                return cats;
        },
        getOne: function(interopID){

            var foundCat;
            if(cats)
                foundCat = findCat({SubCategories: cats}, interopID);

            if(foundCat)
                return foundCat;
            else{
                console.log('one category not found. Calling api');
                if(interopID)
                    return catservice.get({ interopID: interopID } );
                else{
                    catservice.query(function(data){
                        cats = data;
                        reloadCat();

                    })
                }
            }
        }
    }
});

