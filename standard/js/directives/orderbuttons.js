four51.app.directive('orderbuttons', [function() {
    var obj = {
        restrict: 'E',
        template: '<ul ng-include="view"></ul>',
        link: function(scope, element, attrs) {
            attrs.$observe('continue', function(val) {
               scope.continue = val == 'true' ? true : false;
            });

            attrs.$observe('view', function(val) {
                if (val) {
                    var view;
                    switch (val) {
                        case 'cart':
                            view = 'cart'
                            break;
                        case 'checkout':
                            view = 'checkout';
                            break;
                        default:
                            break;
                    }
                    scope.view = 'partials/controls/' + (view == 'cart' ? 'cartButtons.html' : 'checkoutButtons.html');
                }
            });
        }
    };
    return obj;
}]);
