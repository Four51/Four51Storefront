four51.app.directive('approval', function() {
	var obj = {
		restrict: 'E',
		scope: {
			order: "=order"
		},
		templateUrl: 'partials/controls/approvalInput.html',
		controller: 'ApprovalInputCtrl'
	}
	return obj;
});
