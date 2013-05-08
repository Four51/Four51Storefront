'use strict';

$451.app.controller('NavCtrl', function ($rootScope, $scope) {
	$scope.appname = $451.app.name;
    $scope.Logout = function(){
        $451.clear();
        $rootScope.$broadcast('LogoutEvent');
    }
	$scope.template = { url: 'partials/nav.html'};
});

$451.app.controller('SideNavCtrl', function ($rootScope, $scope, CategoryService) {
    $scope.tree = CategoryService.tree();

    $rootScope.$on('event:CurrentCategoryChanged', function(event, e){
        $scope.currentCategory = e;
    });
});