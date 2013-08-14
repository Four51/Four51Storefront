four51.app.controller('Four51Ctrl', function ($scope, $route, $451, $location, CategoryService, UserService, SpendingAccountService) {
    $scope.scroll = 0;
    $scope.appname = $451.appname;
	$scope.Four51User = UserService;
    // http://stackoverflow.com/questions/12592472/how-to-highlight-a-current-menu-item-in-angularjs
    $scope.getClass = function(path) {
        var cur_path = $location.path().substr(0, path.length);
        if (cur_path == path) {
            if($location.path().substr(0).length > 1 && path.length == 1 )
                return "";
            else
                return "active";
        } else {
            return "";
        }
    };

	$scope.$on('event:auth-loginConfirmed', function() {
		UserService.isAuthenticated = true;
		$route.reload();
	});
	$scope.$on('event:auth-loginRequired', function() {
		UserService.isAuthenticated = false;
	});

	$scope.$on("$routeChangeSuccess", function() {
		$scope.tree = CategoryService.tree();
        $scope.SpendingAccounts = SpendingAccountService.query();
	});
});

