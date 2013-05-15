'use strict';

four51.app.controller('CategoryCtrl', function ($routeParams,$rootScope, $scope, CategoryService) {
    $rootScope.$on('event:ClearCategory', function(event, e){
        $scope.currentCategory = null;
    });
    $rootScope.$on('event:ReloadCategory', function(event, e){
        load();
    });

    function load(){
        $scope.currentCategory = CategoryService.getOne($routeParams.categoryInteropID);
    }

    load();
});