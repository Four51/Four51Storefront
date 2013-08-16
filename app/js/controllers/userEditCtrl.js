'use strict';

four51.app.controller('UserEditCtrl', function ($scope, UserService) {
    $scope.save = function() {
        UserService.save(this.user);
    };
});
