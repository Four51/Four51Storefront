'use strict';

four51.app.controller('NavCtrl', function ($location, $scope, $451, User) {
    $scope.Logout = function(){
        User.logout();
        $location.path("/catalog");
    };

	$scope.refreshUser = function() {
		store.clear();
	}

    // http://stackoverflow.com/questions/12592472/how-to-highlight-a-current-menu-item-in-angularjs
    $scope.isActive = function(path) {
        var cur_path = $location.path().replace('/', '');
        var result = false;

        if (path instanceof Array) {
            angular.forEach(path, function(p) {
                if (p == cur_path && !result)
                    result = true;
            });
        }
        else {
            if (cur_path == path)
                result = true;
        }
        return result;
    };
});