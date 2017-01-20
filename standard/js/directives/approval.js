four51.app.directive('approval', function() {
	var obj = {
		restrict: 'E',
		templateUrl: 'partials/controls/approvalInput.html',
		controller: 'ApprovalInputCtrl'
	}
	return obj;
});
