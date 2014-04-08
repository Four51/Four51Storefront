four51.app.controller('MessageListCtrl', ['$scope', 'MessageList', function($scope, MessageList) {
	MessageList.query(function(list) {
        $scope.messages = list;
    });

	$scope.checkAll = function(event) {
		angular.forEach($scope.messages, function(msg) {
			msg.Selected = event.currentTarget.checked;
		});
	};

	$scope.deleteSelected = function() {
		$scope.displayLoadingIndicator = true;
		MessageList.delete($scope.messages, function() {
			MessageList.query(function(list) {
				$scope.messages = list;
				$scope.displayLoadingIndicator = false;
			});
		});
	};
	$scope.settings = {
		currentPage: 1,
		pageSize: 10
	};
}]);