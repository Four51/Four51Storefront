'use strict';

$451.app.controller('NavCtrl', function ($rootScope, $scope ) {
    console.log("loading top nav ctrl");
	$scope.appname = $451.app.name;
    $scope.Logout = function(){
        $451.clear();
        $rootScope.$broadcast('LogoutEvent');
    }
	$scope.template = { url: 'partials/nav.html'};
});