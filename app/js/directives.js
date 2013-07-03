'use strict';

/* Directives */

four51.app.directive('authorization', function($route, $451) {
	var obj = {
		restrict: 'A',
		link: function(scope, elem, attrs) {

		}
	};
	return obj;
});

four51.app.directive('textuserfield', function($451) {
    var obj = {
        restrict: 'E',
        template: '<input placeholder="{{field.Label}}" ui-mask="{{field.MaskedInput}}" type="text" ng-required="{{field.IsRequired}}" ng-model="field.Value" />'
    }
    return obj;
});

four51.app.directive('selectionuserfield', function($451) {
    var obj = {
        restrict: 'E',
        template: '<label>{{field.Label}}</label>' +
            '<select ng-model="field.Value" ng-options="option.ID as option.Value for option in field.Options" ng-if="field.Options && !field.IsRadioButtons && field.DisplayToUser" />'
    }
    return obj;
});

four51.app.directive('radiobuttonuserfield', function($451) {
    var obj = {
        restrict: 'E',
        template: '<label>{{field.Label}}</label>' +
            '<span ng-repeat="option in field.Options">' +
            '<input type="radio" name="{{field.Name}}" ng-model="field.Value" value="{{option.ID}}" />' +
            '{{option.Value}}<br /></span>'
    }
    return obj;
});

four51.app.directive('addressinput', function() {
    var obj = {
        restrict: 'E',
        scope: {
            address : '=',
            return: '='
        },
        templateUrl: 'partials/addressInputView.html',
        controller: 'AddressInputCtrl'
    }
    return obj;
});

four51.app.directive('spendingaccounts', function(SpendingAccountService) {
    var obj = {
        scope: {
            accounts: '='
        },
        restrict: 'E',
        templateUrl: 'partials/spendingAccountsView.html'
    }
    return obj;
});

four51.app.directive('orderhistoryheader', function() {
    var obj = {
        restrict: 'E',
        templateUrl: 'partials/reporting/orderHistoryHeaderView.html'
    }
    return obj;
});

four51.app.directive('orderhistoryfooter', function() {
    var obj = {
        restrict: 'E',
        templateUrl: 'partials/reporting/orderHistoryFooterView.html'
    }
    return obj;
});

four51.app.directive('lineitemhistorygrid', function() {
    var obj = {
        restrict: 'E',
        templateUrl: 'partials/reporting/lineItemHistoryGridView.html'
    }
    return obj;
});

four51.app.directive('lineitemgrid', function() {
    var obj = {
        scope: {
            order: '=',
            user: '='
        },
        restrict: 'E',
        templateUrl: 'partials/lineItemGridView.html',
        controller: 'LineItemGridCtrl'
    }
    return obj;
});
