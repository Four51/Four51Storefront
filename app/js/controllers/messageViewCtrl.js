four51.app.controller('MessageViewCtrl', function($scope, $location, $routeParams, Message) {
    Message.get($routeParams.id, function(msg) {
        $scope.message = msg;
        $scope.canReply = function() {
            return msg.Box == 'Inbox';
        }
    });

	$scope.delete = function(event) {
		event.preventDefault();
        Message.delete($scope.message, function() {
			$location.path("/message");
		});

	};
	$scope.ok = function() {
		$location.path('/message');
	}
	$scope.send = function(event) {
        Message.save($scope.message, function() {
			$location.path('/message');
		});
	}
});