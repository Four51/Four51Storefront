four51.app.directive('customtextfield', function() {
    var obj = {
        scope: {
            customfield : '=',
            changed: '=',
            autotrim: '@',
            hidesuffix: '@',
            hideprefix: '@'
        },
        restrict: 'E',
        transclude: true,
        templateUrl: 'partials/controls/customTextField.html'
    }
    return obj;
});
