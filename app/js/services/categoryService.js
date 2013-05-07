'use strict';
$451.app.factory('CategoryService', function($resource, $rootScope, ProductService){
    var catservice = $resource($451.apiURL('category/:interopID', {interopID: '@ID'}));
    var cats = null;

    $rootScope.$on('LogoutEvent', function(event, e){
        cats = null;
    });
    $rootScope.$on('event:auth-loginRequired', function(event, e){
        cats = null;
    });

    function populateCats(){
        if(!cats){
            cats = catservice.query();
            console.log('calling api for categories');
        }else{

        }
    };
    function findCat(parent, interopID){
        if(!interopID)
            return {SubCategories: cats};
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
            if(!cats){ //starting session here, so no cached cats
                populateCats();
            }else{

                var foundCat = findCat({SubCategories: cats}, interopID)

                if(!foundCat) //populateCats is probably not back yet
                {
                    console.log('not found');
                    foundCat = catservice.get({ interopID: interopID }, function(){
                        foundCat.Products = ProductService.search(foundCat.InteropID, '');
                    });
                }
                if(!foundCat.Products && foundCat.InteropID)
                {
                    foundCat.Products = ProductService.search(foundCat.InteropID, '');
                }
                return foundCat;
            }
        }
    }
});

