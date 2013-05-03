'use strict';

$451.app.controller('LoginCtrl', function LoginCtrl($rootScope, $scope, $http, LoginService) {
    $scope.Login = function() {
        LoginService.save($scope.user);
    };
});
