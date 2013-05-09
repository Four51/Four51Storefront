'use strict';

$451.app.controller('NavCtrl', function ($rootScope, $scope) {
	$scope.appname = $451.app.name;
    $scope.Logout = function(){
        $451.clear();
        $rootScope.$broadcast('event:Logout');
    }
	$scope.template = { url: 'partials/nav.html'};
});

$451.app.controller('SideNavCtrl', function ($rootScope, $scope, CategoryService) {
    $rootScope.$on('event:ClearCategory', function(){
        $scope.tree = null;
        console.log('clearing side nav ctrl categories')
    });
    $rootScope.$on('event:ReloadCategory', function(){
        load();
    });

    function load(){
        $scope.tree = CategoryService.tree();
    }
    load();
});