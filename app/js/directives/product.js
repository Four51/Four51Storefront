'use strict';
four51.app.directive('specfield', function($compile) {

	var template = '<input ng-if="!s.Options.length" placeholder="{{s.DefaultValue}}" type=text ng-required="s.Required" ng-model="s.Value">';
	template += '<select ng-change="specChanged(s)" ng-model="s.Value" type="radio" ng-options="option.ID as option.Value for option in s.Options" ng-if="s.Options.length && !s.IsRadioButtons" ng-required="s.Required" />';
	template += '<span ng-show="s.Options.length && s.IsRadioButtons" ng-repeat="option in s.Options">' +
		'<input type="radio" name="{{s.Name}}" ng-checked="\'False\'" ng-model="s.Value" />{{option.Value}}<br /></span>';

	var obj = {
		restrict:"E",
		template: template
	}
	return obj;
});

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

four51.app.directive('staticspecstable', function(){
    var obj = {
        scope: {
			specgroups : '='
        },
        restrict: 'E',
        templateUrl: 'partials/staticspecs.html',
		link: function(scope){
			scope.hasvisiblechild = function(specs){
				var hasChild = false;
				angular.forEach(specs, function(item){
					if(item.VisibleToCustomer)
						hasChild = true;
				})
				return hasChild;
			}
		}

    }
    return obj;
})

four51.app.directive('quantityfield', function(){

	var obj = {
        scope: {
            ps : '=',
            v : '=',
            p : '=',
			quantity : '=',
			error: '='
        },
        restrict: 'E',
        template: '<select ng-show="ps.RestrictedQuantity" ng-model="quantity" ng-options="pb.Quantity for pb in ps.PriceBreaks" ui-validate="\'validQuantityAddToOrder($value.Quantity, v, p, ps)\'"></select>'+
            '<input ng-show="!ps.RestrictedQuantity" type="number" required name="qtyInput" ng-model="quantity" ui-validate="\'validQuantityAddToOrder($value, v, p, ps)\'"/>'+
            'qty: {{quantity}} ',
        link: function(scope){
            scope.validQuantityAddToOrder = function(value, variant, product, priceSchedule){

				if(value == null){
					console.log('validate called with undefined value')
					return scope.valid | true;
				}

                if(!product && !variant)
					return scope.valid | true;


                if(!priceSchedule)
                    return scope.valid | true;

				scope.valid = true;
				console.log('validate qty: ' + value);
				console.dir(priceSchedule);
                if(priceSchedule.MinQuantity > value){
					scope.valid = false;
                    scope.error = "must be greater than " + priceSchedule.MinQuantity;
                }

                if(priceSchedule.MaxQuantity && priceSchedule.MaxQuantity < value){
					scope.error = "must be less than " + priceSchedule.MaxQuantity;
                    scope.valid = false;
                }
                var qtyAvail = variant || product;

                if(qtyAvail.QuantityAvailable && qtyAvail.QuantityAvailable < value && product.AllowExceedInventory == false){
					scope.error = "not enough available inventory " +  qtyAvail.QuantityAvailable;
					scope.valid = false;
                }
                if(scope.valid)
					scope.error = null;


				console.log("is valid: " + scope.valid);
                return scope.valid;
            }

        }
    }
    return obj;
})