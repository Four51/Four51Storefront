four51.app.controller('MessageListCtrl', function($scope, MessageList) {
	MessageList.query(function(list) {
        $scope.messages = list;
    });

	$scope.checkAll = function(event) {
		angular.forEach($scope.messages, function(msg) {
			msg.Selected = event.currentTarget.checked;
		});
	};

	$scope.deleteSelected = function(event) {
		event.preventDefault();
		MessageList.delete($scope.messages);
	};
});

