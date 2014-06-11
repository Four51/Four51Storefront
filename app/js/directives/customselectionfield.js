four51.app.directive('customselectionfield', ['$451', function($451) {
	var obj = {
		scope: {
			customfield : '=',
			change: '=',
            hidesuffix: '@',
            hideprefix: '@'
		},
		restrict: 'E',
		transclude: true,
		templateUrl: 'partials/controls/customSelectionField.html',
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
}]);