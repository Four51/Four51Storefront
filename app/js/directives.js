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

four51.app.directive('orderviewheader', function() {
    var obj = {
        restrict: 'E',
        templateUrl: 'partials/orderHeaderView.html'
    }
    return obj;
});

four51.app.directive('orderviewfooter', function() {
    var obj = {
        restrict: 'E',
        templateUrl: 'partials/orderFooterView.html'
    }
    return obj;
});

