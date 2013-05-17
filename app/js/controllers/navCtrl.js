'use strict';

four51.app.controller('NavCtrl', function ($location, $scope, $451) {
	$scope.appname = $451.appname;
    $scope.Logout = function(){
        $451.clear();
	    $location.path("/login");
    }
	$scope.template = { url: 'partials/nav.html'};
});

four51.app.controller('SideNavCtrl', function ($rootScope, $scope, CategoryService) {
    console.log('load side nav');
    $rootScope.$on('event:auth-loginConfirmed', function(){
        $scope.tree = CategoryService.tree();
    });
    $scope.tree = CategoryService.tree();
});