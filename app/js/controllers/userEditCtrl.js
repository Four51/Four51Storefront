'use strict';

four51.app.controller('UserEditCtrl', function ($scope, UserService) {
    $scope.user = UserService.get();
    console.info('user: ' + $scope.user);
    $scope.save = function() {
        UserService.save(this.user);
    };
});
