four51.app.controller('OrderSearchCtrl', ['$scope', '$q', '$location', 'OrderSearchCriteria', 'OrderSearch',
	function ($scope,  $q, $location, OrderSearchCriteria, OrderSearch) {
		$scope.settings = {
			currentPage: 1,
			pageSize: 10
		};

		OrderSearchCriteria.query(function(data) {
			$scope.OrderSearchCriteria = data;
			$scope.hasStandardTypes = _hasType(data, 'Standard');
			$scope.hasReplenishmentTypes = _hasType(data, 'Replenishment');
			$scope.hasPriceRequestTypes = _hasType(data, 'PriceRequest');
		});

		$scope.$watch('settings.currentPage', function() {
			if(!$scope.sortOrder){
				Query($scope.currentCriteria);
			}
		});

		$scope.OrderSearch = function($event, criteria) {
			$event.preventDefault();
			$scope.currentCriteria = criteria;
			Query(criteria);
		};

		$scope.orderSort = function(value, $event, orderSearchStat) {
			var all = [], queue = [], count = 0, total = $scope.settings.listCount, page = 1;
			$scope.pagedIndicator = true;
			$event.preventDefault();

			if(value){
				if($scope.sortOrder){
					if(value == $scope.sortOrder){
						$scope.sortOrder = "-"+value;
					}
					else{
						$scope.sortOrder = value;
					}
				}
				else{
					$scope.sortOrder = value;
				}
			}

			while (count < total) {
				queue.push((function() {
					var d = $q.defer();
					OrderSearch.search(orderSearchStat, function (list, count) {
						angular.forEach(list,function(li){
							all.push(li);
						});
						d.resolve();
					}, 1, 100);
					return d.promise;
				})());
				count += 100;
				page += 1;
			}

			$q.all(queue).then(function() {
				$scope.orders = all;
				$scope.pagedIndicator = false;
			});

		};

		function _hasType(data, type) {
			var hasType = false;
			angular.forEach(data, function(o) {
				if (hasType || o.Type == type && o.Count > 0)
					hasType = true;
			});
			return hasType;
		}

		function Query(criteria) {
			if (!criteria) return;
			$scope.showNoResults = false;
			$scope.pagedIndicator = true;
			OrderSearch.search(criteria, function (list, count) {
				$scope.orders = list;
				$scope.settings.listCount = count;
				$scope.showNoResults = list.length == 0;
				$scope.pagedIndicator = false;
			}, $scope.settings.currentPage, $scope.settings.pageSize);
			$scope.orderSearchStat = criteria;
		}
	}]);