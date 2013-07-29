
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
            add.Selected = !add.Selected;
        });
    }

    // ng-grid first configuration
    // There may be a way to configure ShowSelectionCheckbox: true, to bind but could not find a way. I added 'Selected' as a cellTemplate with a 'Toggle Selection' in addressList.html
    var gridCheckbox = '<div class="ngSelectionCell"><input tabindex="-1" class="ngSelectionCheckbox" type="checkbox" ng-model="row.entity[col.field]" /></div>';
    $scope.gridOptions = {
        data: 'addresses',
        showFilter: true,
        columnDefs: [
            {field:'Selected', displayName:'Select', cellTemplate : gridCheckbox},
            {field:'AddressName', displayName:'Name', cellTemplate : '<div class="ngSelectionCell"><a ng-href="#/address/{{address.ID}}">{{row.getProperty(col.field)}}</a></div>'},
            {field:'City', displayName:'City'},
            {field:'State', displayName:'State'},
            {field:'IsShipping', displayName:'Shipping', cellTemplate: gridCheckbox},
            {field:'IsBilling', displayName:'Billing', cellTemplate : gridCheckbox}]
    };

});

four51.app.controller('AddressViewCtrl', function ($scope, $routeParams, AddressService) {
    $scope.address =  $routeParams.id ?
        $scope.address = AddressService.get({ id: $routeParams.id }) :
        $scope.address = {};
    $scope.return = '/addresses';
});