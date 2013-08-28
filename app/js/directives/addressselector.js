four51.app.directive('addressselector', function() {
    var obj = {
        scope: {
            model: '='
        },
        restrict: 'E',
        templateUrl: 'partials/controls/addressSelectorView.html',
        controller: function($scope, AddressList) {
            AddressList.query(function(list) {
                $scope.addresses = list;
            });
        }
    };
    return obj;
});