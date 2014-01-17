four51.app.directive('tooltip', function() {
    var obj = {
        scope: {
            footnote: '='
        },
        restrict: 'E',
        template: '<i class="fa fa-info-circle text-primary pull-right" rel="tooltip"></i>',
        link: function(scope, element, attrs) {
            $('i', element).tooltip({
                title: scope.footnote,
                placement: 'right'
            });
        }
    }
    return obj;
});
