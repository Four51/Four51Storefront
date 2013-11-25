four51.app.directive('customcontrols', function($451) {
	var obj = {

	}
	return obj;
});

four51.app.directive('customtextfield', function($451) {
    var obj = {
        scope: {
            customfield : '='
        },
        restrict: 'E',
        transclude: true,
        template: '<input placeholder="{{customfield.Label}}" ui-mask="{{customfield.MaskedInput}}" type="text" ng-required="{{customfield.IsRequired}}" ng-model="customfield.Value" />'
    }
    return obj;
});

//TODO: required on selection spec
four51.app.directive('customselectionfield', function($451) {
    var obj = {
        scope: {
            customfield : '='
        },
        restrict: 'E',
        transclude: true,
        template: '<label>{{customfield.Label}}</label>' +
            '<select ng-init="init()" ng-change="changed()" ng-model="item" ng-options="option.Value for option in customfield.Options" ng-if="customfield.Options && !customfield.IsRadioButtons">' +
            '<option ng-if="!customfield.IsRequired" value="" /></select>' +
            '<input type="text" ng-change="otherChanged()" ng-model="other" ng-show="isOtherSelected" />',
        link: function(scope, element, attr) {
            scope.changed = function() {
                scope.customfield.Value = this.item == null ? null : this.item.Value;
                scope.isOtherSelected = false;
                if (this.item != null && this.item.Value.indexOf('Other') > -1) {
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
                this.item = scope.customfield.Value != null ? $451.filter(scope.customfield.Options, { 'Property': 'ID', 'Value': id })[0] : null;
                if (this.item && this.item.Value == 'Other') {
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
        transclude: true,
        template: '<label>{{customfield.Label}}</label>' +
            '<span ng-repeat="option in customfield.Options">' +
            '<input type="radio" ng-change="changed()" name="{{customfield.Name}}" ng-model="$parent.item" ng-value="{{option}}" />{{option.Value}}<br />' +
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
            };
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
            scope.changed();

            scope.getVal = function() {
                return scope.item.Value;
            }
        }
    }
    return obj;
});