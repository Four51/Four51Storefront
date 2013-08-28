four51.app.controller('Four51Ctrl', function ($scope, $route, $451, User, Order, Security, OrderConfig, CategoryService, SpendingAccountService) {
    $scope.scroll = 0;
    $scope.appname = $451.appname;
	$scope.Four51User = Security;

	$scope.$on('event:auth-loginRequired', function() {	});

    function init() {
        User.get(function(user) {
            $scope.user = user;
            if (user.CurrentOrderID) {
                Order.get(user.CurrentOrderID, function(ordr) {
                    $scope.currentOrder = ordr;
                    OrderConfig.costcenter(ordr, user);
                });
            }
        });
        CategoryService.tree(function(data) {
            $scope.tree = data;
        });
        SpendingAccountService.query(function(data) {
            $scope.SpendingAccounts = data;
        });
    }
    $scope.$on('event:auth-loginConfirmed', init);
	$scope.$on("$routeChangeSuccess", init);
});

