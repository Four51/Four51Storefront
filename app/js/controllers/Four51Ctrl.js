four51.app.controller('Four51Ctrl', function ($scope, $location, $route, $451, SecurityService, UserService, CategoryService, SpendingAccountService) {
    $scope.scroll = 0;
    $scope.appname = $451.appname;
	$scope.Four51User = SecurityService;

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
        $scope.user = UserService.get();
        $scope.tree = CategoryService.tree();
       // $scope.SpendingAccounts = SpendingAccountService.query();
    });

	$scope.$on("$routeChangeSuccess", function() {
		$scope.tree = CategoryService.tree();
        //$scope.SpendingAccounts = SpendingAccountService.query();
        $scope.user = UserService.get();
	});
});

