'use strict';

$451.app.controller('LoginCtrl', function LoginCtrl($scope, $http, LoginService) {
    $scope.Login = function() {
        debugger;
        LoginService.save($scope.user, function(response) {
            //console.dir(response);
        });
    };
});
