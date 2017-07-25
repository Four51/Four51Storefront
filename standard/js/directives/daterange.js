four51.app.directive('daterange', function() {
	var obj = {
		scope: {
			options: '=ngOptions',
			fromdate: '=fromdate',
			todate: '=todate'
		},
		restrict: 'E',
		templateUrl: 'partials/controls/dateRange.html',
		controller: ['$scope', function($scope) {
			var logic = {
				'LastDay': function() {
					var date = new Date();
					var day = date.getDate();
					date.setDate(day - 1);
					$scope.fromdate = date;
					$scope.todate = date;
				},
				'LastWeek': function() {
					var date = new Date();
					var day = date.getDate();
					date.setDate(day - 7);
					$scope.fromdate = date;
					$scope.todate = new Date();
				},
				'LastMonth': function() {
					var date = new Date();
					var month = date.getMonth();
					date.setMonth(month - 1);
					$scope.fromdate = date;
					$scope.todate = new Date();
				},
				'LastThreeMonths': function() {
					var date = new Date();
					var month = date.getMonth();
					date.setMonth(month - 3);
					$scope.fromdate = date;
					$scope.todate = new Date();
				},
				'LastYear': function() {
					var date = new Date();
					var month = date.getMonth();
					date.setMonth(month - 12);
					$scope.fromdate = new Date(date);
					$scope.todate = new Date();
				}
			};

			$scope.changed = function() {
				logic[$scope.span]();
			}
		}]
	};

	return obj;
});