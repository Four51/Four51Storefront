'use strict';

/* Directives */

four51.app.directive('authorization', function() {
	var obj = {
		restrict: 'A'
	};
	return obj;
});

four51.app.directive('categorytree', function() {
    var obj = {
        restrict: 'E',
        replace: true,
        scope: {
            tree: '='
        },
        templateUrl: 'partials/categoryTree.html'
    };
    return obj;
});

four51.app.directive('node', function($compile) {
    var obj = {
        restrict: 'E',
        replace: true,
        scope: {
            node: '='
        },
        template: '<li><a ng-href="#/catalog/{{node.InteropID}}">{{node.Name}}</a></li>',
        link: function(scope, element) {
            if (angular.isArray(scope.node.SubCategories)) {
                element.append("<categorytree tree='node.SubCategories' />");
                $compile(element.contents())(scope);
            }
        }
    };
    return obj;
});

four51.app.directive('addressinput', function() {
    var obj = {
        restrict: 'E',
        scope: {
            address : '=',
            return: '=',
            user: '='
        },
        templateUrl: 'partials/controls/addressInputView.html',
        controller: 'AddressInputCtrl'
    }
    return obj;
});

four51.app.directive('spendingaccounts', function() {
    var obj = {
        restrict: 'E',
        templateUrl: 'partials/controls/spendingAccountsView.html'
    }
    return obj;
});

four51.app.directive('orderhistoryheader', function() {
    var obj = {
        restrict: 'E',
        scope: {
            order: '='
        },
        templateUrl: 'partials/reporting/orderHistoryHeaderView.html'
    }
    return obj;
});

four51.app.directive('orderhistoryfooter', function() {
    var obj = {
        restrict: 'E',
        scope: {
            order: '='
        },
        templateUrl: 'partials/reporting/orderHistoryFooterView.html'
    }
    return obj;
});

four51.app.directive('lineitemhistorygrid', function() {
    var obj = {
        restrict: 'E',
        scope: {
            order: '='
        },
        templateUrl: 'partials/reporting/lineItemHistoryGridView.html'
    }
    return obj;
});

four51.app.directive('panel', function () {
    return {
        restrict:'E',
        transclude:true,
        scope:{ title:'@title' },
        template:'<li class="nav-header visible-phone visible-tablet animated fadeIn">' +
            '<a ng-href=#/catalog ng-transclude></a>' +
            '</li>',
        replace:true
    };
});

// http://stackoverflow.com/questions/13549216/changing-css-on-scrolling-angular-style
four51.app.directive('scrollPosition', function($window) {
    return function(scope, element, attrs) {
        var windowEl = angular.element($window);
        console.debug(windowEl);
        windowEl.on('scroll', function() {
            scope.$apply(function() {
                scope[attrs.scrollPosition] = windowEl.scrollTop();
            });
        });
    };
});