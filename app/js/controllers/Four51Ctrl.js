four51.app.controller('Four51Ctrl', function ($scope, $route, $451, SecurityService, UserService, CategoryService, SpendingAccountService) {
    $scope.scroll = 0;
    $scope.appname = $451.appname;
	$scope.Four51User = SecurityService;

	$scope.$on('event:auth-loginRequired', function() {	});

    $scope.$on('event:auth-loginConfirmed', function() {
        // a change
        $scope.user = UserService.get();
        $scope.tree = CategoryService.tree();
        $scope.SpendingAccounts = SpendingAccountService.query();
    });

	$scope.$on("$routeChangeSuccess", function() {
		$scope.tree = CategoryService.tree();
        $scope.SpendingAccounts = SpendingAccountService.query();
        $scope.user = UserService.get();
	});
});

