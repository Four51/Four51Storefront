
four51.app.controller('AddressListCtrl', function ($scope, $location, $451, AddressListService) {
    $scope.addresses = AddressListService.query();
    $scope.deleteSelected = function() {
        $scope.addresses = AddressListService.delete(this.addresses);
    };

    $scope.newAddress = function() {
        $location.path('address');
    };
    $scope.checkAll = function(event) {
        angular.forEach($scope.addresses, function(add) {
            add.Selected = event.currentTarget.checked;
        });
    }

    // ng-grid first configuration
    // There may be a way to configure ShowSelectionCheckbox: true, to bind but could not find a way. I added 'Selected' as a cellTemplate with a 'Toggle Selection' in addressList.html
    $scope.gridOptions = {
        data: 'addresses',
        showFilter: true,
        columnDefs: [
            {field:'Selected', displayName:'Select', cellTemplate: 'partials\\controls\\ngGridCheckBox.html' },
            {field:'AddressName', displayName:'Name', cellTemplate : '<div class="ngSelectionCell"><a ng-href=#/address/{{row.getProperty("ID")}}>{{row.getProperty(col.field)}}</a></div>'},
            {field:'City', displayName:'City'},
            {field:'State', displayName:'State'},
            {field:'IsShipping', displayName:'Shipping', cellTemplate: 'partials\\controls\\ngGridCheckBox.html' },
            {field:'IsBilling', displayName:'Billing', cellTemplate : 'partials\\controls\\ngGridCheckBox.html' }]
    };
});

