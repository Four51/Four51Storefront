four51.app.controller('MessageListCtrl', function($scope, MessageListService) {
	$scope.messages = MessageListService.query();

	$scope.checkAll = function(event, type) {
		angular.forEach($scope.messages, function(msg) {
			if (msg.Box === type)
				msg.Selected = event.toElement.checked;
		});
	}

	$scope.deleteSelected = function(event) {
		event.preventDefault();
		$scope.messages = MessageListService.delete($scope.messages);
	}
});

four51.app.controller('MessageViewCtrl', function($scope, $location, $routeParams, MessageService) {
	$scope.message = MessageService.get({ id: $routeParams.id });
	$scope.delete = function(event) {
		event.preventDefault();
		MessageService.delete($scope.message, function() {
			$location.path("/message");
		});

	};
	$scope.ok = function() {
		$location.path('/message');
	}
});