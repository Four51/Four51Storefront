four51.app.directive('approvalrulelist', function() {
    var obj = {
        scope: {
            order: "="
        },
        restrict: 'E',
        templateUrl: 'partials/controls/approvalRuleSummary.html'
    };
    return obj;
});