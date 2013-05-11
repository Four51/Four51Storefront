'use strict';

four51.app.controller('LoginCtrl', function LoginCtrl($rootScope, $scope, $http, LoginService) {
    $scope.Login = function() {
	    LoginService.login($scope.user);
    };
});
