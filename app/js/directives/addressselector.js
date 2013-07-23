four51.app.directive('addressselector', function() {
    var obj = {
        scope: {
            user: '=',
            model: '='
        },
        restrict: 'E',
        templateUrl: 'partials/controls/addressSelectorView.html',
        controller: function($scope, AddressListService) {
            $scope.addresses = AddressListService.query();
        },
        link: function(scope, element, attr) {

        }
    };
    return obj;
});