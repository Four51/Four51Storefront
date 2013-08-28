'use strict';

four51.app.controller('UserEditCtrl', function ($scope, User) {
    $scope.save = function() {
        User.save($scope.user);
    };
});
