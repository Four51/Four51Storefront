'use strict';

four51.app.controller('NavCtrl', function ($location, $scope, $451) {
    $scope.Logout = function(){
        $451.clear();
	    $location.path("/login");
    }
	$scope.template = { url: 'partials/nav.html'};
});

four51.app.controller('SideNavCtrl', function ($rootScope, $scope, CategoryService) {
	$scope.tree = CategoryService.tree();
});