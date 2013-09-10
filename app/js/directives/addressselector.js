four51.app.directive('addressselector', function() {
    var obj = {
        scope: {
            selectedid: '='
        },
        restrict: 'E',
        templateUrl: 'partials/controls/addressSelectorView.html',
        link: function(scope, elem, attrs) {

        },
        controller: function($scope, $rootScope, AddressList) {
            AddressList.query(function(list) {
                $scope.addresses = list;
            });

            $scope.changed = function() {
                $rootScope.$broadcast('event:addressChange', $scope.selectedid);
            }
        }
    };
    return obj;
});