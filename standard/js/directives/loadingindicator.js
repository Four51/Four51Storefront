four51.app.directive('loadingindicator', function () {
    return {
        restrict:'E',
        scope: { title: '@title' },
        templateUrl: 'partials/controls/loadingIndicator.html'
    };
});