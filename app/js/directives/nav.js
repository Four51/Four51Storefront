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

//[back] button to help continue shopping without needing to force user to use [products] button http://stackoverflow.com/questions/14070285/how-to-implement-history-back-in-angular-js
four51.app.directive('backStep', function(){
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('click', function () {
                history.back();
                scope.$apply();
                })
        }
    }
});
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
