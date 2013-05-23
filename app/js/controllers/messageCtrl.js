four51.app.controller('MessageCtrl', function($scope, MessageService) {
	$scope.messages = MessageService.get();
});