four51.app.directive('addressselector', function(AddressList) {
    var obj = {
        scope: {
            selected: '=',
            add: '@',
            onchange: '@',
            required: '='
        },
        restrict: 'E',
        templateUrl: 'partials/controls/addressSelectorView.html',
        link: function(scope, elem, attrs) {
            AddressList.query(function(list) {
                scope.addresses = list;
            });
        },
        controller: function($scope, $rootScope) {
            $scope.changed = function() {
                $rootScope.$broadcast($scope.onchange, $scope.selected);
            }
        }
    };
    return obj;
});