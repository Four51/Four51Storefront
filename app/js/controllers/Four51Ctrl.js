four51.app.controller('Four51Ctrl', function ($scope, $route, $451, CategoryService, LoginService) {
	$scope.appname = $451.appname;

	$scope.isAuthenticated = true;
	$scope.$on('event:auth-loginConfirmed', function(user) {
		$scope.isAuthenticated = true;
		$route.reload();
	});
	$scope.$on('event:auth-loginRequired', function() {
		$scope.isAuthenticated = false;
	});

	$scope.$on("$routeChangeSuccess", function() {
		$scope.tree = CategoryService.tree();
	});
	$scope.Login = function() {
		LoginService.login(this.user);
	};
});

