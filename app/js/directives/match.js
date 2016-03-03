four51.app.directive('ngMatch', ['$parse', function($parse) {
	var obj = {
		restrict: 'A',
		require: '?ngModel',
		link: function(scope, elem, attrs, ctrl) {
			if (!ctrl) return;
			if (!attrs['ngMatch']) return;

			var firstPassword = $parse(attrs['ngMatch']);

			var validator = function (value) {
				var temp = firstPassword(scope),
					v = value === temp;
				ctrl.$setValidity('match', v);
				return value;
			}

			ctrl.$parsers.unshift(validator);
			ctrl.$formatters.push(validator);
			attrs.$observe('ngMatch', function () {
				validator(ctrl.$viewValue);
			});
		}
	};
	return obj;
}]);