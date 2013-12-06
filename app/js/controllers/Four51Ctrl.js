four51.app.controller('Four51Ctrl', function ($scope, $route, $routeParams, $location, $451, User, Order, Security, OrderConfig, Category, SpendingAccount, fileReader) {
    $scope.scroll = 0;
    $scope.appname = $451.appname;
	$scope.isAnon = $451.isAnon; //need to know this before we have access to the user object
	$scope.Four51User = Security;
	if($451.isAnon && !Security.isAuthenticated()){
		User.login();
	}

    function init() {
        if (Security.isAuthenticated()) {
            User.get(function(user) {
                $scope.user = user;
                if (user.CurrentOrderID) {
                    Order.get(user.CurrentOrderID, function(ordr) {
                        $scope.currentOrder = ordr;
                        OrderConfig.costcenter(ordr, user).address(ordr, user).paymentMethod(ordr, user);
                    });
                }
                else
                    $scope.currentOrder = null;
            });
            Category.tree(function(data) {
		        $scope.tree = data;
	        });
        }
    }

    function cleanup() {
        Security.clear();
    }

    $scope.$on('event:auth-loginConfirmed', function(){
		$route.reload();
	});
	$scope.$on("$routeChangeSuccess", init);
    $scope.$on('event:auth-loginRequired', cleanup);

});