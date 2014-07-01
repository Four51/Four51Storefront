four51.app.directive('customphonefield', function() {
    var obj = {
        scope: {
            spec1 : '=',
            spec2: '=',
            spec3: '=',
            label: '@label',
            mask: '@mask'
        },
        restrict: 'E',
        templateUrl: 'partials/controls/customPhoneField.html',
        controller: ['$scope', function($scope) {
            $scope.$watch('spec1', function(n,o) {
                if (n) $scope.phoneNumber = $scope.spec1.Value + $scope.spec2.Value + $scope.spec3.Value;
            });

            $scope.$watch('phoneNumber', function(value){
                if (value) {
                    $scope.spec1.Value = value.substring(0,3);
                    $scope.spec2.Value = value.substring(3,6);
                    $scope.spec3.Value = value.substring(6,10);
                }
                else if(value == ""){
                    $scope.spec1.Value = "";
                    $scope.spec2.Value = "";
                    $scope.spec3.Value = "";
                }
            });
        }]
    };

    return obj;
});
