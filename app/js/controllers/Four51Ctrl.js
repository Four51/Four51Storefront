four51.app.controller('Four51Ctrl', function ($scope, $route, $451, SecurityService, UserService, CategoryService, SpendingAccountService) {
    $scope.scroll = 0;
    $scope.appname = $451.appname;
	$scope.Four51User = UserService;

	$scope.$on('event:auth-loginRequired', function() {	});

	$scope.$on("$routeChangeSuccess", function() {
		$scope.tree = CategoryService.tree();
        $scope.SpendingAccounts = SpendingAccountService.query();
        $scope.user = UserService.get();
	});
});

