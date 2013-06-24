'use strict';

/* Directives */

four51.app.directive('authorization', function($route, $451) {
	var obj = {
		restrict: 'A',
		link: function(scope, elem, attrs) {

		}
	};
	return obj;
});

four51.app.directive('textuserfield', function($451) {
    var obj = {
        restrict: 'E',
        template: '<input placeholder="{{field.Label}}" ui-mask="{{field.MaskedInput}}" type="text" ng-required="{{field.IsRequired}}" ng-model="field.Value" />'
    }
    return obj;
});

four51.app.directive('selectionuserfield', function($451) {
    var obj = {
        restrict: 'E',
        template: '<label>{{field.Label}}</label>' +
            '<select ng-model="field.Value" ng-options="option.ID as option.Value for option in field.Options" ng-if="field.Options && !field.IsRadioButtons && field.DisplayToUser" />'
    }
    return obj;
});

four51.app.directive('radiobuttonuserfield', function($451) {
    var obj = {
        restrict: 'E',
        template: '<label>{{field.Label}}</label>' +
            '<span ng-repeat="option in field.Options">' +
            '<input type="radio" name="{{field.Name}}" ng-model="field.Value" value="{{option.ID}}" />' +
            '{{option.Value}}<br /></span>'
    }
    return obj;
});

four51.app.directive('addressinput', function($451, AddressService) {
    var obj = {
        restrict: 'E',
        templateUrl: 'partials/addressView.html',
        controller: 'AddressCtrl'
    }
    return obj;
});

four51.app.directive('quantityfield', function(){
    var obj = {
        scope: {
          ps : '=',
          v : '=',
          p : '='
        },
        restrict: 'E',
        template: '<select ng-if="ps.RestrictedQuantity" ng-model="quantity" ng-options="pb.Quantity for pb in ps.PriceBreaks" ui-validate="\'validQuantityAddToOrder($value.Quantity, v, p, ps)\'"></select>'+
            '<input ng-if="!ps.RestrictedQuantity" type="number" required name="qtyInput" ng-model="quantity" ui-validate="\'validQuantityAddToOrder($value, v, p, ps)\'">'+
            '<span ng-show="errorMessage">qty fail: {{errorMessage}}</span>',
        link: function(scope){
            scope.validQuantityAddToOrder = function(value, variant, product, priceSchedule){

                if(!product && !variant)
                    return true;

                if(!priceSchedule)
                    return true;

                var valid = true;

                if(priceSchedule.MinQuantity > value){
                    valid = false;
                    scope.errorMessage = "must be greater than " + priceSchedule.MinQuantity;
                }

                if(priceSchedule.MaxQuantity && priceSchedule.MaxQuantity < value){
                    scope.errorMessage = "must be less than " + priceSchedule.MaxQuantity;
                    valid = false;
                }
                var qtyAvail = variant || product;

                if(qtyAvail.QuantityAvailable && qtyAvail.QuantityAvailable < value && product.AllowExceedInventory == false){
                    scope.errorMessage = "not enough available inventory " +  qtyAvail.QuantityAvailable;
                    valid = false;
                }
                if(valid)
                    scope.errorMessage = null;
                    return valid;
            }

        }
    }
    return obj;
})