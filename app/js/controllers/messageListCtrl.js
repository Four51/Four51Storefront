four51.app.controller('MessageListCtrl', function($scope, MessageListService) {
	$scope.messages = MessageListService.query();

	$scope.checkAll = function(event, type) {
		angular.forEach($scope.messages, function(msg) {
			if (msg.Box === type)
				msg.Selected = event.currentTarget.checked;
		});
	}

	$scope.deleteSelected = function(event) {
		event.preventDefault();
		$scope.messages = MessageListService.delete(this.messages);
	}
});

