four51.app.controller('Four51Ctrl', function ($scope, $route, $routeParams, $location, $451, User, Order, Security, OrderConfig, Category, SpendingAccount, AppConst) {
    $scope.AppConst = AppConst;
	$scope.scroll = 0;
    //$scope.appname = $451.appname; not needed?
	$scope.isAnon = $451.isAnon; //need to know this before we have access to the user object
	$scope.Four51User = Security;
	if($451.isAnon && !Security.isAuthenticated()){
		User.login(function() {
			$route.reload();
		});
	}

    // fix Bootstrap fixed-top and fixed-bottom from jumping around on mobile input when virtual keyboard appears
    if ( $(window).width() < 960 ) {
        $(document)
        .on('focus', ':input:not("button")', function(e) {
            $('.view-footer.navbar-fixed-bottom, .headroom.navbar-fixed-top').addClass('ng-hide');
        })
        .on('blur', ':input', function(e) {
            $('.view-footer.navbar-fixed-bottom, .headroom.navbar-fixed-top').removeClass('ng-hide');
        });
    }

    function init() {
        if (Security.isAuthenticated()) {
            User.get(function(user) {
                $scope.user = user;

	            if (!$scope.user.TermsAccepted)
		            $location.path('conditions');

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
				$scope.$broadcast("treeComplete", data);
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
