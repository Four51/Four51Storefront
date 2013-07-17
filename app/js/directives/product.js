'use strict';
four51.app.directive('shortproductview', function(){
	var obj = {
		restrict: "E",
		link: function(scope){

		},
		scope: {
			p: '='
		},
		templateUrl:'partials/shortProductView.html',
		controller: 'shortProductViewCtrl'
	};
	return obj;
});
four51.app.directive('vspecfield', function(){
	var template = '<select " ' +
		'ng-model="s.Value" '+
		'ng-options="option.ID as option.Value for option in s.Options" '+
		'ng-if="s.Options.length" '+
		'ng-required="s.Required" '+
		'ng-change="ddlChange(s)"></select>';

	template += '<span ng-show="s.AllowOtherValue" ng-click="otherVisible = !otherVisible">other...</span><input ng-change="otherChanged(s)" type=text ng-model="s.OtherTextValue" ng-show="otherVisible">';
	template += '<input ng-if="!s.Options.length" placeholder="{{s.DefaultValue}}" type=text ng-required="s.Required" ng-model="s.Value">';

	var obj = {
		restrict: "E",
		controller: function($scope){
			$scope.otherVisible = $scope.s.OtherTextValue;
		},
		link: function(scope){

			scope.otherChanged = function(spec){
				spec.Value = null;
				if(scope.changed)
					scope.changed(spec);
				console.log('other text changed');
			};
			scope.ddlChange = function(spec){
				scope.otherVisible = false;
				spec.OtherTextValue = null;
				if(scope.changed)
					scope.changed(spec);
			};
		},
		scope: {
			s: '=',
			changed: '='
		},
		template: template
	};
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

four51.app.directive('quantityfield', function($451, ProductService){

	var obj = {
        scope: {
            lineitem : '=',
			error: '='
        },
        restrict: 'E',
        template: '<select ng-change="qtyChanged(lineitem)" ng-if="lineitem.PriceSchedule.RestrictedQuantity" ng-model="lineitem.Quantity" ng-options="pb.Quantity as getRestrictedQtyText(pb, lineitem.Product.QuantityMultiplier) for pb in lineitem.PriceSchedule.PriceBreaks" ui-validate="\'validQuantityAddToOrder($value, lineitem)\'"></select>'+
            '<input  ng-change="qtyChanged(lineitem)" ng-if="!lineitem.PriceSchedule.RestrictedQuantity" type="number" required name="qtyInput" ng-model="lineitem.Quantity" ui-validate="\'validQuantityAddToOrder($value, lineitem)\'"/>',
        link: function(scope){
			scope.getRestrictedQtyText = function(priceBreak, qtyMultiplier){
				var qtyText = priceBreak.Quantity * qtyMultiplier;
				if(qtyMultiplier > 1)
					qtyText += ' (' + priceBreak.Quantity + 'x' + qtyMultiplier +')';
				return qtyText;
			};
			scope.qtyChanged = function(lineitem){
				ProductService.calculateLineTotal(lineitem);
			};
            scope.validQuantityAddToOrder = function(value, lineItem){
                // working around a bug. DO NOT COMMIT
                scope.value = true;
                return true;
				var variant = lineItem.Variant;
				var product = lineItem.Product;
				var priceSchedule = lineItem.PriceSchedule;

				if(value == null){
					console.log('validate called with undefined value')
					scope.error = null;
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

				if(product.IsVariantLevelInventory && !variant){
					console.log('variant not selected can\'t check qty available'); //in vboss the user may select the qty before the variant. we may have to change when this gets called so inventory available can be re validated if the variant is chnaged based on a selection spec. It's probably not a big deal since the api will check inventory available on adding to order.
				}
				else{
					var qtyAvail = product.IsVariantLevelInventory ? variant.QuantityAvailable : product.QuantityAvailable;
					if(qtyAvail < value && product.AllowExceedInventory == false){
						scope.error = "not enough available inventory " +  qtyAvail;
						scope.valid = false;
					}
				}
                if(scope.valid)
					scope.error = null;
				console.log("qty valid: " + scope.valid + " " + scope.error);
                return scope.valid;
            }

        }
    }
    return obj;
})