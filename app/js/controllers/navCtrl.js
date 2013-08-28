'use strict';

four51.app.controller('NavCtrl', function ($location, $scope, $451, User) {
    $scope.Logout = function(){
        User.logout();
        $location.path("/catalog");
    };

	$scope.template = { url: 'partials/nav.html'};

    $scope.refresh = function(e) {
        e.preventDefault();
        $451.clear('user');
        User.get();
    };

});

four51.app.controller('SideNavCtrl', function ($scope) {

});