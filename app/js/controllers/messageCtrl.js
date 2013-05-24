four51.app.controller('MessageCtrl', function($scope, MessageService) {
	$scope.messages = MessageService.get();
	$scope.selectAllInbox = false;
	$scope.checkAll = function(event, type) {
		angular.forEach($scope.messages, function(msg) {
			if (msg.Box === type)
				msg.Selected = event.toElement.checked;
		});
	}
	$scope.deleteSelected = function(event) {
		event.preventDefault();
		$scope.messages = MessageService.delete($scope.messages);
	}
});