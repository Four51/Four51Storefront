four51.app.controller('Four51Ctrl', function ($scope, $routeParams, $location, $451, User, Order, Security, OrderConfig, Category, SpendingAccount, fileReader) {
    $scope.scroll = 0;
    $scope.appname = $451.appname;
	$scope.Four51User = Security;

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
                        OrderConfig.costcenter(ordr, user);
                    });
                }
                else
                    $scope.currentOrder = null;
            });
            Category.tree(function(data) {
                $scope.tree = data;
            });
            SpendingAccount.query(function(data) {
                $scope.SpendingAccounts = data;
            });
        }
    }

    function cleanup() {
        Security.clear();
    }

    $scope.$on('event:auth-loginConfirmed', init);
	$scope.$on("$routeChangeSuccess", init);
    $scope.$on('event:auth-loginRequired', cleanup);

});

