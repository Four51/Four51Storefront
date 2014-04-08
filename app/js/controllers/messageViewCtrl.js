four51.app.controller('MessageViewCtrl', ['$scope', '$location', '$routeParams', 'Message',
function($scope, $location, $routeParams, Message) {

	if ($routeParams.id == 'new') {
		$scope.composing = true;
		$scope.message = {};
	}
	else {
		Message.get($routeParams.id, function (msg) {
			$scope.message = msg;
			$scope.canReply = function () {
				return msg.Box == 'Inbox';
			}
		});
	}
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
}]);