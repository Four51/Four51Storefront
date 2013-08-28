four51.app.controller('MessageListCtrl', function($scope, MessageList) {
	MessageList.query(function(list) {
        $scope.messages = list;
    });

	$scope.checkAll = function(event, type) {
		angular.forEach($scope.messages, function(msg) {
			if (msg.Box === type)
				msg.Selected = event.currentTarget.checked;
		});
	};

	$scope.deleteSelected = function(event) {
		event.preventDefault();
		MessageList.delete($scope.selectedMessages);
	};

    $scope.selectedMessages = [];

    $scope.gridOptions = {
        data: 'messages',
        showFilter: true,
        multiSelect: true,
        selectedItems: $scope.selectedMessages,
        showSelectionCheckbox: true,
        showGroupPanel: true,
        groups: [ 'Box' ],
        columnDefs: [
            { displayName: 'Status', field: 'Box'},
            { displayName: 'Date', field: 'DateSent', cellFilter: 'date: medium' },
            { displayName: 'Subject', field: 'Subject', cellTemplate: '<div class="ngSelectionCell"><a ng-href=#/message/{{row.getProperty("ID")}}>{{row.getProperty(col.field)}}</a></div>'},
            { displayName: 'From', field: 'FromName' }
        ]
    };
});

