angular.module('OrderCloud-LargeAddressListSearch', []);

angular.module('OrderCloud-LargeAddressListSearch')
    .directive('largeshipaddresssearch', largeshipaddresssearch)
    .controller('LargeShipAddressSearchCtrl', LargeShipAddressSearchCtrl)
    .directive('largebilladdresssearch', largebilladdresssearch)
    .controller('LargeBillAddressSearchCtrl', LargeBillAddressSearchCtrl)
    .factory('LargeAddressList', LargeAddressList)
;

function largeshipaddresssearch() {
    var directive = {
        restrict: 'E',
        controller: 'LargeShipAddressSearchCtrl',
        template: template
    };
    return directive;

    function template() {
        return [
            '<style>',
            '.largeaddress .dropdown-menu  { background-color:#fff;}',
            '.largeaddress .dropdown-menu .active > a {background-color:#000 !important; color:#fff;}',
            '.count {float;left; color:#000; position:relative;left: 10px; margin:0; padding:0;}',
            '</style>',
            '<div class="row largeaddress view-form-icon">',
            '<div class="col-xs-12">',
            '<label class="required">{{("Shipping" | r) + " " + ("Address" | r) | xlat}}',
            '<span class="count" ng-show="showTip">( Start typing to find your address )</span>',
            '<span class="count" ng-show="showResult">No addresses found!</span>',
            '</label>',
            '<div class="form-group">',
            '<input class="form-control" type="text" ng-readonly="readonlyshipping" ng-model="ShipAddress" required ng-change="searchShipAddresses(ShipAddress)" typeahead-min-length="2" typeahead="address as (address.AddressName + \' \' + (address.FirstName || \'\') + \' \' + (address.LastName || \'\') + \' \' + (address.Street1 || \'\') + \' \' + (address.Street2 || \'\') + \' \' + (address.City || \'\') + \' \' + (address.State || \'\') + \' \' + (address.Zip || \'\')) for address in shipaddresses | filter:$viewValue | limitTo:10" />',
            '<i class="fa fa-map-marker"></i>',
            '</div>',
            '</div>',
            '</div>'
        ].join('');
    }
}

LargeShipAddressSearchCtrl.$inject = ['$scope', 'AddressList', 'LargeAddressList', 'Address'];
function LargeShipAddressSearchCtrl($scope, AddressList, LargeAddressList, Address) {

    AddressList.shipping(function(list) {
        $scope.shipaddresses = list;
        $scope.readonlyshipping = false;
        if($scope.shipaddresses.length == 1){
            $scope.ShipAddressID = list[0].ID;
            $scope.ShipAddress = list[0];
            $scope.readonlyshipping = true;
        }
        else{
            $scope.shipaddresses = [' '];
        }
    });

    $scope.shipAddressCount = null;
    $scope.showTip = true;
    $scope.showResult = false;
    $scope.shipaddressform = false;

    $scope.$watch('ShipAddress', function(newValue) {
        if (!newValue || !newValue.ID) {
            $scope.orderShipAddress = {};
            $scope.currentOrder.ShipAddressID = null;
            $scope.showTip = true;
            $scope.showResult = false;
        }
        else {
            $scope.orderShipAddress = newValue;
            $scope.currentOrder.ShipAddress = newValue;
            if ($scope.currentOrder) {
                $scope.currentOrder.ShipAddressID = newValue.ID;
                $scope.currentOrder.ShipFirstName = null;
                $scope.currentOrder.ShipLastName = null;
                angular.forEach($scope.currentOrder.LineItems, function (item) {
                    item.ShipFirstName = null;
                    item.ShipLastName = null;
                });
            }
            if (newValue) {
                if ($scope.user.Permissions.contains('EditShipToName') && !$scope.orderShipAddress.IsCustEditable) {
                    angular.forEach($scope.currentOrder.LineItems, function(item) {
                        item.ShipFirstName = $scope.orderShipAddress.FirstName;
                        item.ShipLastName = $scope.orderShipAddress.LastName;
                    });
                }
                $scope.setShipAddressAtOrderLevel();
            }
        }
        //account for New Address
        $scope.$on('event:AddressSaved', function(event, address) {
            if (address.IsShipping) {
                $scope.ShipAddress = address;
            }
        });

    });

    $scope.searchShipAddresses = function(searchTerm) {
        $scope.shipaddresses = [' ']; //this sets shipaddresses to something while we wait for the search so we don't have to modify existing ng-show/hide(s) for address form / ship method
        if (searchTerm && searchTerm.length > 2) {
            LargeAddressList.queryShipping(searchTerm, function(list, count) {
                $scope.shipaddresses = list;
                $scope.shipAddressCount = count; // we will use count to add a filter for the user
                if (count === 0) {
                    $scope.showTip = false;
                    $scope.showResult = true;
                }
                else {
                    $scope.showTip = true;
                    $scope.showResult = false;
                }
            });
        }
    };

    if ($scope.currentOrder.ShipAddressID) {
        Address.get($scope.currentOrder.ShipAddressID, function(add) {
            $scope.ShipAddress = add;
        });
    }
}

function largebilladdresssearch() {
    var directive = {
        restrict: 'E',
        controller: 'LargeBillAddressSearchCtrl',
        template: template
    };
    return directive;

    function template () {
        return [
            '<style>',
            '.largeaddress .dropdown-menu  { background-color:#fff;}',
            '.largeaddress .dropdown-menu .active > a {background-color:#000 !important; color:#fff;}',
            '.count {float;left; color:#000; position:relative;left: 10px; margin:0; padding:0;}',
            '</style>',
            '<div class="row largeaddress view-form-icon" ng-show="!copyShipAddress">',
            '<div class="col-xs-12">',
            '<label class="required">{{("Billing" | r) + " " + ("Address" | r) | xlat}}',
            '<span class="count" ng-show="showBillTip">( Start typing to find your address )</span>',
            '<span class="count" ng-show="showBillResult">No addresses found!</span>',
            ' </label>',
            '<div class="form-group">',
            '<input class="form-control" type="text" ng-model="BillAddress" ng-readonly="readonlybilling" required ng-change="searchBillAddresses(BillAddress)" typeahead-min-length="3" typeahead="address as (address.AddressName + \' \' + (address.FirstName || \'\') + \' \' + (address.LastName || \'\') + \' \' + (address.Street1 || \'\') + \' \' + (address.Street2 || \'\') + \' \' + (address.City || \'\') + \' \' + (address.State || \'\') + \' \' + (address.Zip || \'\')) for address in billaddresses | filter:$viewValue | limitTo:10" />',
            '<i class="fa fa-map-marker"></i>',
            '</div>',
            '</div>',
            '</div>'
        ].join('');
    }
}

LargeBillAddressSearchCtrl.$inject = ['$scope', 'AddressList', 'LargeAddressList', 'Address'];
function LargeBillAddressSearchCtrl($scope, AddressList, LargeAddressList, Address) {

    AddressList.billing(function(list) {
        $scope.billaddresses = list;
        $scope.readonlybilling = false;
        if($scope.billaddresses.length == 1){
            $scope.BillAddressID = list[0].ID;
            $scope.BillAddress = list[0];
            $scope.readonlybilling = true;
        }
        else{
            $scope.billaddresses = [' '];
        }
    });

    $scope.billaddressform = false;
    $scope.billAddressCount = null;
    $scope.showBillTip = true;
    $scope.showBillResult = false;

    $scope.$watch('BillAddress', function(newValue) {

        if (!newValue || !newValue.ID) {
            $scope.BillAddressID = null;
            $scope.currentOrder.BillAddressID = null;
            $scope.showBillTip = true;
            $scope.showBillResult = false;
        }
        else {
            if ($scope.currentOrder) {
                $scope.currentOrder.BillAddress = newValue;
                $scope.currentOrder.BillAddressID = newValue.ID;
                $scope.BillAddressID = newValue.ID;
                $scope.BillAddress = newValue;
            }

        }
        //account for New Address
        $scope.$on('event:AddressSaved', function(event, address) {
            if (address.IsBilling) {
                $scope.BillAddress = address;
            }
        });
    });

    $scope.searchBillAddresses = function(searchTerm) {
        if (searchTerm && searchTerm.length > 2) {
            $scope.billaddresses = [' '];
            $scope.billAddressCount = null;
            LargeAddressList.queryBilling(searchTerm, function(list, count) {
                $scope.billaddresses = list;
                $scope.billAddressCount = count; // we will use count to add a filter for the user
                if (count === 0) {
                    $scope.showBillTip = false;
                    $scope.showBillResult = true;
                }
                else {
                    $scope.showBillTip = true;
                    $scope.showBillResult = false;
                }
            });
        }
    };

    if ($scope.currentOrder.BillAddressID) {
        Address.get($scope.currentOrder.BillAddressID, function(add) {
            $scope.BillAddress = add;
        });
    }

}

LargeAddressList.$inject = ['$resource', '$451'];
function LargeAddressList($resource, $451) {
    var service = {
        queryShipping: _queryShipping,
        queryBilling: _queryBilling
    };
    return service;

    function _queryShipping(searchTerm, success) {
        $resource($451.api('address/shipping')).get({ key: searchTerm, page: 1, pagesize: 100}).$promise.then(function (list) {
            success(list.List, list.Count);
        });
    }

    function _queryBilling(searchTerm, success) {
        $resource($451.api('address/billing')).get({ key: searchTerm, page: 1, pagesize: 100}).$promise.then(function (list) {
            success(list.List, list.Count);
        });
    }
}