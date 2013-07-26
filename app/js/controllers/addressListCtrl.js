
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

    // my ng-grid first configuration
    var self = this;
    self.pluginOne = ngGridFlexibleHeightPlugin();
    $scope.gridOptions = {
        data: 'addresses',
        plugins: [ self.pluginOne ],
        columnDefs: [
            {field:'Selected', displayName:'Select', cellTemplate : 'partials/gridCheckbox.html'},
            {field:'AddressName', displayName:'Name', cellTemplate : '<a class="ngLink" ng-model="row.entity[col.field]" ng-href="#/address/{{address.ID}}">AddressName</a>'},
            {field:'City', displayName:'City'},
            {field:'State', displayName:'State'},
            {field:'IsShipping', displayName:'Shipping', cellTemplate: 'partials/gridCheckbox.html' },
            {field:'IsBilling', displayName:'Billing', cellTemplate : 'partials/gridCheckbox.html'}]
    };

});

four51.app.controller('AddressViewCtrl', function ($scope, $routeParams, AddressService) {
    $scope.address =  $routeParams.id ?
        $scope.address = AddressService.get({ id: $routeParams.id }) :
        $scope.address = {};
    $scope.return = '/addresses';
});






