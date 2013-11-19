four51.app.controller('Four51Ctrl', function ($scope, $route, $routeParams, $location, $451, User, Order, Security, OrderConfig, Category, SpendingAccount, fileReader) {
    $scope.scroll = 0;
    $scope.appname = $451.appname;
	$scope.isAnon = $451.isAnon; //need to know this before we have access to the user object
	$scope.Four51User = Security;
	if($451.isAnon && !Security.isAuthenticated()){
		User.login();
	}

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
    $scope.next = function(){
        $scope.movedToNext = true;
        $scope.movedToPrevious = false;
    }

    $scope.previous = function(){
        $scope.movedToPrevious = true;
        $scope.movedToNext = false;
    }


    function init() {
        if (Security.isAuthenticated()) {
            User.get(function(user) {
                $scope.user = user;
                if (user.CurrentOrderID) {
                    Order.get(user.CurrentOrderID, function(ordr) {
                        $scope.currentOrder = ordr;
                        OrderConfig.costcenter(ordr, user).address(ordr, user);
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