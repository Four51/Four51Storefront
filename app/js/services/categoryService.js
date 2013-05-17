'use strict';
four51.app.factory('CategoryService', function($resource, $rootScope, $451, ProductService){
    var catservice = $resource($451.api('categories/:interopID', {interopID: '@ID'}));
    var cats = null;


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
            //if(!cats){
                console.log('category query');
                return catservice.query(function(data){
                    cats = data;
                });
            //}else
            //    return cats;
        },
        getOne: function(interopID){

            var foundCat;
            if(cats)
                foundCat = findCat({SubCategories: cats}, interopID);

            if(foundCat)
                return foundCat;
            else{
                if(interopID){
                    console.log('category get');
                    return catservice.get({ interopID: interopID } );
                }
                else{
                    catservice.query(function(data){
                        cats = data;
                        //reloadCat();

                    })
                }
            }
        }
    }
});

