'use strict';

four51.app.controller('UserEditCtrl', function ($scope, UserService) {
    $scope.user = UserService.get();
    $scope.save = function() {
        UserService.save(this.user);
    };
});
