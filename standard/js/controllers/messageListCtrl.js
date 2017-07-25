four51.app.controller('MessageListCtrl', ['$scope', 'MessageList', function($scope, MessageList) {
	$scope.settings = {
		currentPage: 1,
		pageSize: 10
	};

	MessageList.clear();

	function GetList() {
		$scope.displayLoadingIndicator = true;
		MessageList.query($scope.settings.currentPage, $scope.settings.pageSize, function (list, count) {
			$scope.messages = list;
			$scope.settings.listCount = count;
			$scope.displayLoadingIndicator = false;
		});
	}

	$scope.checkAll = function(event) {
		angular.forEach($scope.messages, function(msg) {
			msg.Selected = event.currentTarget.checked;
		});
	};

	$scope.deleteSelected = function() {
		$scope.displayLoadingIndicator = true;
		MessageList.delete($scope.messages, function() {
			GetList();
		});
	};

	$scope.$watch('settings.currentPage', function(n,o) {
		GetList();
	});

	$scope.paged = function() {
		GetList();
	}
}]);