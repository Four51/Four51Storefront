
four51.app.controller('AddressListCtrl', function ($scope, $location, $451, AddressList) {
    AddressList.query(function(list) {
        $scope.addresses = list;
    });
    $scope.deleteSelected = function() {
        AddressList.delete(this.addresses);
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
    // There may be a way to configure ShowSelectionCheckbox: true, to bind but could not find a way. I added 'Selected' as a cellTemplate with a 'Toggle Selection' in addressListView.html
    $scope.gridOptions = {
        data: 'addresses',
        showFilter: true,
        columnDefs: [
            { displayName:'Select', field:'Selected', cellTemplate: 'partials\\controls\\ngGridCheckBox.html' },
            { displayName:'Name', field:'AddressName', cellTemplate : '<div class="ngSelectionCell"><a ng-href=#/address/{{row.getProperty("ID")}}>{{row.getProperty(col.field)}}</a></div>'},
            { displayName:'City', field:'City'},
            { displayName:'State', field:'State' },
            { displayName:'Shipping', field:'IsShipping', cellTemplate: 'partials\\controls\\ngGridCheckBox.html' },
            { displayName:'Billing', field:'IsBilling', cellTemplate : 'partials\\controls\\ngGridCheckBox.html' }]
    };
});

