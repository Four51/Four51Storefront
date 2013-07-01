'use strict';
four51.app.directive('specfield', function($451, $compile) {

	function generateTemplate(){
		var template = '<input ng-if="!s.Options.length" placeholder="{{s.DefaultValue}}" type=text ng-required="s.Required" ng-model="s.Value">';
		template += '<select ng-model="s.Value" type="radio" ng-options="option.ID as option.Value for option in s.Options" ng-if="s.Options.length && !s.IsRadioButtons" ng-required="s.Required" />';
		template += '<span ng-show="s.Options.length && s.IsRadioButtons" ng-repeat="option in s.Options">' +
			'<input type="radio" name="{{s.Name}}" ng-required="s.Required" ng-model="s.Value"  />{{option.Value}}<br /></span>';
		return template
	}
	var obj = {
		restrict:"E",
		scope: {
			s : "="
		},
		link:function (scope, element, attrs) {
			element.append(generateTemplate());
			$compile(element.contents())(scope);
		}
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