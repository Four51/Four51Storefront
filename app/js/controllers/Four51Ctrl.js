four51.app.controller('Four51Ctrl', function ($scope, $route, $451, CategoryService, UserService, SpendingAccountService) {
    $scope.scroll = 0;
    $scope.appname = $451.appname;
	$scope.Four51User = UserService;

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

