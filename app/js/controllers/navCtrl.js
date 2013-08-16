'use strict';

four51.app.controller('NavCtrl', function ($location, $scope, $451, UserService) {
    $scope.Logout = function(){
        UserService.logout();
        $location.path("/catalog");
    };

	$scope.template = { url: 'partials/nav.html'};

    $scope.refresh = function(e) {
        e.preventDefault();
        UserService.refresh();
    };

});

four51.app.controller('SideNavCtrl', function ($rootScope, $scope) {
	//$scope.tree = CategoryService.tree();
});