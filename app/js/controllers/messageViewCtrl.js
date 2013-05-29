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
	$scope.send = function(event) {
		MessageService.save($scope.message, function() {
			$location.path('/message');
		});
	}
	$scope.canReply = function() {
		return $scope.message.Box == 'Inbox';
	}
});