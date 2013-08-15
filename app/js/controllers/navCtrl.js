'use strict';

four51.app.controller('NavCtrl', function ($location, $scope, $451, UserService, OrderService) {
    $scope.Logout = function(){
        UserService.logout();
        $location.path("/catalog");
    };

	$scope.template = { url: 'partials/nav.html'};

    $scope.refresh = function(e) {
        e.preventDefault();
        UserService.refresh();
    };

    $scope.user = UserService.get();
});

four51.app.controller('SideNavCtrl', function ($rootScope, $scope, UserService) {
	//$scope.tree = CategoryService.tree();
    $scope.user = UserService.get();
});