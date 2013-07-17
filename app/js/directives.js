'use strict';

/* Directives */

four51.app.directive('authorization', function($route, $451) {
	var obj = {
		restrict: 'A'
	};
	return obj;
});

four51.app.directive('customtextfield', function($451) {
    var obj = {
        scope: {
            customfield : '='
        },
        restrict: 'E',
        template: '<input placeholder="{{customfield.Label}}" ui-mask="{{customfield.MaskedInput}}" type="text" ng-required="{{customfield.IsRequired}}" ng-model="customfield.Value" />{{customfield.Value}}'
    }
    return obj;
});

four51.app.directive('customselectionfield', function($451) {
    var obj = {
        scope: {
            customfield : '='
        },
        restrict: 'E',
        template: '<label>{{customfield.Label}}</label>' +
            '<select ng-init="init()" ng-change="changed()" ng-model="item" ng-options="option.Value for option in customfield.Options" ng-if="customfield.Options && !customfield.IsRadioButtons">' +
            '<option ng-if="!customfield.IsRequired" value="" /></select>' +
            '<input type="text" ng-change="otherChanged()" ng-model="other" ng-show="isOtherSelected" />',
        link: function(scope, element, attr) {
            scope.changed = function() {
                scope.customfield.Value = this.item.Value;
                scope.isOtherSelected = false;
                if (this.item.ID.indexOf('other') > -1) {
                    scope.isOtherSelected = true;
                    scope.customfield.Value = scope.other;
                }
            };
            scope.otherChanged = function() {
                scope.isOtherSelected = true;
                scope.customfield.Value = scope.other;
            };
            scope.item = {}, scope.other = ''; // initialize the item variable to avoid checking for null

            scope.init = function() {
                var id = scope.customfield.Value != null ? scope.customfield.Options[scope.customfield.Options.length-1].ID : scope.customfield.DefaultOptionID;
                var matched = false;
                angular.forEach(scope.customfield.Options, function(n,i) {
                    if (matched) return;
                    if (scope.customfield.Value == n.Value) {
                        id = n.ID;
                        matched = true;
                    }
                });
                this.item = $451.filter(scope.customfield.Options, { 'Property': 'ID', 'Value': id })[0];
                if (this.item.Value == 'Other') {
                    scope.other = scope.customfield.Value;
                    this.otherChanged();
                }
            };
        }
    }
    return obj;
});

four51.app.directive('customradiobuttonfield', function($451) {
    var obj = {
        scope: {
            customfield : '='
        },
        restrict: 'E',
        template: '<label>{{customfield.Label}}</label>' +
            '<span ng-repeat="option in customfield.Options">' +
            '<input type="radio" ng-checked="{{true}}" ng-change="changed()" name="{{customfield.Name}}" ng-model="$parent.item" ng-value="{{option}}" />{{option.Value}}<br />' +
            '</span>' +
            '<input type="text" ng-change="otherChanged()" ng-model="other" ng-show="isOtherSelected" /><br />',
        link: function(scope, element, attr) {
            scope.changed = function() {
                scope.customfield.Value = this.item.Value;
                scope.isOtherSelected = false;
                if (this.item.ID.indexOf('other') > -1) {
                    scope.isOtherSelected = true;
                    scope.customfield.Value = scope.other;
                }
            };
            scope.otherChanged = function() {
                scope.customfield.Value = scope.other;
                //scope.changed();
            };
            scope.item = {};
            //scope.init = function() {
                var id = scope.customfield.Value != null ? scope.customfield.Options[scope.customfield.Options.length-1].ID : scope.customfield.DefaultOptionID;
                var matched = false;
                angular.forEach(scope.customfield.Options, function(n,i) {
                    if (matched) return;
                    if (scope.customfield.Value == n.Value) {
                        id = n.ID;
                        matched = true;
                    }
                });
                scope.item = $451.filter(scope.customfield.Options, { 'Property': 'ID', 'Value': id })[0];
                console.debug(scope.item);
            //};
        }
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
        templateUrl: 'partials/controls/addressInputView.html',
        controller: 'AddressInputCtrl'
    }
    return obj;
});

four51.app.directive('spendingaccounts', function() {
    var obj = {
        scope: {
            accounts: '='
        },
        restrict: 'E',
        templateUrl: 'partials/controls/spendingAccountsView.html'
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