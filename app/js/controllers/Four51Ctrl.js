four51.app.controller('Four51Ctrl', ['$scope', '$route', '$location', '$451', 'User', 'Order', 'Security', 'OrderConfig', 'Category', 'AppConst',
function ($scope, $route, $location, $451, User, Order, Security, OrderConfig, Category, AppConst) {
    $scope.AppConst = AppConst;
	$scope.scroll = 0;
	$scope.isAnon = $451.isAnon; //need to know this before we have access to the user object
	$scope.Four51User = Security;
	if ($451.isAnon && !Security.isAuthenticated()){
		User.login(function() {
			$route.reload();
		});
	}

    // fix Bootstrap fixed-top and fixed-bottom from jumping around on mobile input when virtual keyboard appears
    if ( $(window).width() < 960 ) {
        $(document)
        .on('focus', ':input:not("button")', function(e) {
            $('.navbar-fixed-bottom, .headroom.navbar-fixed-top').css("position", "relative");
        })
        .on('blur', ':input', function(e) {
            $('.navbar-fixed-bottom, .headroom.navbar-fixed-top').css("position", "fixed");
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
			            OrderConfig.costcenter(ordr, user);
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

	function analytics(id) {
		if (id.length == 0) return;
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
			(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
			m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

		ga('create', id, 'four51.com');
		ga('require', 'ecommerce', 'ecommerce.js');
	}

	trackJs.configure({
		trackAjaxFail: false
	});

    $scope.errorSection = '';

    function cleanup() {
        Security.clear();
    }

    $scope.$on('event:auth-loginConfirmed', function(){
        $route.reload();
	    User.get(function(user) {
		    analytics(user.Company.GoogleAnalyticsCode);
	    });
	});
	$scope.$on("$routeChangeSuccess", init);
    $scope.$on('event:auth-loginRequired', cleanup);
}]);