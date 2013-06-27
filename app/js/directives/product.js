'use strict';
four51.app.directive('pricescheduletable', function(){
    var obj = {
        scope: {
            ps : '=',
            p : '='
        },
        restrict: 'E',
        templateUrl: 'partials/priceSchedule.html'
    }
    return obj;
})


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