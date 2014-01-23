four51.app.directive('navigation', function() {
	var obj = {
		restrict: 'E',
		templateUrl: 'partials/controls/nav.html',
		controller: 'NavCtrl'
	}
	return obj;
});

four51.app.directive('accountnavigation', function() {
    var obj = {
        restrict: 'E',
        templateUrl: 'partials/controls/accountnav.html',
        controller: 'NavCtrl'
    }
    return obj;
});

// I created a custom ng-show for alerts to auto ng-hide itself using a modified version of http://stackoverflow.com/questions/20921622/running-code-after-an-angularjs-animation-has-completed
four51.app.directive('alertShow', function($animate) {
    return {
        scope: {
            'alertShow': '=',
            'afterShow': '&',
            'afterHide': '&'
        },
        link: function(scope, element) {
            scope.$watch('alertShow', function(show) {
                if (show) {
                    $animate.removeClass(element, 'ng-hide', scope.afterShow);
                    $animate.addClass(element, 'ng-hide', scope.afterHide);
                }

            });
        }
    }
})

// equal height directive, maybe we want bootstrap wells to all be same height- this works
//four51.app.directive('sizeColumn', function() {
//    return function(scope, element) {
//            scope.$watch('obj', function(){
//                var biggestHeight = -1;
//                $('.well').each(function(){
//                    if($(this).height() > biggestHeight){
//                        biggestHeight = $(this).height();
//                    }
//                });
//                element.css('height', element.height(biggestHeight));
//            });
//    };
//});
