four51.app.directive('customtextfield', function($451) {
    var obj = {
        scope: {
            customfield : '='
        },
        restrict: 'E',
        transclude: true,
        template: '<label>{{customfield.Label}}</label><input class="form-control" ng-if="customfield.Lines <= 1" placeholder="{{customfield.Label}}" size="{{customfield.Width * .13}}" max="{{customfield.MaxLength}}" ui-mask="{{customfield.MaskedInput}}" type="text" ng-required="{{customfield.Required}}" ng-model="customfield.Value"></input>' +
	        '<textarea class="form-control" ng-if="customfield.Lines > 1" cols="{{customfield.Width * .13}} rows={{customfield.Lines}}" ng-maxlength="{{customfield.MaxLength}}" ng-required="{{customfield.Required}}" ng-model="customfield.Value"></textarea>'
    }
    return obj;
});

//TODO: required on selection spec
four51.app.directive('customselectionfield', function($451) {
    var obj = {
        scope: {
            customfield : '=',
	        change: '='
        },
        restrict: 'E',
        transclude: true,
        template: '<label>{{customfield.Label}}</label>' +
            '<select class="form-control" ng-init="init()" ng-required="customfield.Required" ng-change="changed()" ng-model="item" ng-options="option.Value for option in customfield.Options" ng-if="customfield.Options">' +
            '<option ng-if="!customfield.Required" value="" /></select>' +
            '<input class="form-control" type="text" ng-change="otherChanged()" ng-model="other" ng-show="customfield.isOtherSelected" ng-required="customfield.Required && customfield.isOtherSelected" />',
        link: function(scope, element, attr) {
            scope.changed = function() {
	            //reset values
	            scope.customfield.isOtherSelected = false;
	            angular.forEach(scope.customfield.Options, function(opt) {
		            opt.Selected = false;
	            });
	            // end reset
	            scope.customfield.Value = this.item == null ? null : this.item.Value;
	            scope.customfield.SelectedOptionID = this.item == null ? null : this.item.ID;
	            if (this.item != null) this.item.Selected = true;

                if (this.item != null && this.item.Value.indexOf('Other') > -1) {
                    scope.customfield.isOtherSelected = true;
	                this.item.Selected = true;
	                scope.customfield.SelectedOptionID = this.item.ID;
                    scope.customfield.Value = scope.other;
                }
	            if (scope.change)
		            scope.change(scope.customfield);
            };
            scope.otherChanged = function() {
                scope.customfield.isOtherSelected = true;
                scope.customfield.Value = scope.other;
	            if (scope.change)
		            scope.change(scope.customfield);
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
                    if  (scope.customfield.Value == null) {
                        id = scope.customfield.DefaultOptionID;
                        if (id != null) scope.customfield.Value = $451.filter(scope.customfield.Options, { 'Property': 'ID', 'Value': id })[0].Value;
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
