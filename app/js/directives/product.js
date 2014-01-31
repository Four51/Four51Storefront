'use strict';

four51.app.directive('shortproductview', function(){
	var obj = {
		restrict: "E",
		link: function(scope){

		},
		scope: {
			p: '=',
            user: '='
		},
		templateUrl:'partials/shortProductView.html',
		controller: 'shortProductViewCtrl'
	};

	return obj;
});
four51.app.directive('relatedproducts', function(){
	var obj = {
		scope: {relatedgroupid: '='},
		restrict: 'E',
		templateUrl: 'partials/relatedProductsView.html',
		controller: 'relatedProductsCtrl'};
	return obj;
});
four51.app.directive('pricescheduletable', function(){
    var obj = {
        scope: {
            ps : '=',
            p : '='
        },
        restrict: 'E',
        templateUrl: 'partials/priceScheduleView.html'
    }
    return obj;
})

four51.app.directive('staticspecstable', function(){
    var obj = {
        scope: {
			specgroups : '=',
	        length: '='
        },
        restrict: 'E',
        templateUrl: 'partials/controls/staticSpecs.html',
		controller: function($scope){
            //$scope.length = $scope.specgroups ? Object.keys($scope.specgroups).length : 0;
			$scope.hasvisiblechild = function(specs){
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
four51.app.directive('productnav', function($451, ProductDisplayService){
	var obj = {
		scope: {
			product: '=',
			variant: '=',
			editvariant: '='
		},
		restrict: 'E',
		templateUrl: 'partials/controls/productNav.html',
		controller: function($451, $scope){
			//if($scope.product)
			//	ProductDisplayService.setProductViewName($scope.product);
		}
	};
	return obj;
})
four51.app.directive('quantityfield', function($451, ProductDisplayService){

	var obj = {
        scope: {
            lineitem : '=',
			calculated: '=',
			required: '='
        },
        restrict: 'E',
        template: '<div class="view-form-icon">'+
            '<select class="form-control" ng-change="qtyChanged(lineitem)" ng-if="lineitem.PriceSchedule.RestrictedQuantity" ng-required="required" ng-model="lineitem.Quantity" ng-options="pb.Quantity as getRestrictedQtyText(pb, lineitem.Product.QuantityMultiplier) for pb in lineitem.PriceSchedule.PriceBreaks" ui-validate="\'validQuantityAddToOrder($value, lineitem)\'"><option value=""></option></select>'+
            '<input placeholder="0" class="form-control" ng-change="qtyChanged(lineitem)" ng-if="!lineitem.PriceSchedule.RestrictedQuantity" type="text" ng-required="required" name="qtyInput" ng-model="lineitem.Quantity" ui-validate="\'validQuantityAddToOrder($value, lineitem)\'"/>'+
            '<i class="fa fa-edit"></i>'+
            '</div>',
        link: function(scope){
			scope.getRestrictedQtyText = function(priceBreak, qtyMultiplier){
				var qtyText = priceBreak.Quantity * qtyMultiplier;
				if(qtyMultiplier > 1)
					qtyText += ' (' + priceBreak.Quantity + 'x' + qtyMultiplier +')';
				return qtyText;
			};
			scope.qtyChanged = function(lineitem){
				ProductDisplayService.calculateLineTotal(lineitem);
				if(scope.calculated)
					scope.calculated(lineitem);
			};
            scope.validQuantityAddToOrder = function(value, lineItem){

				var variant = lineItem.Variant;
				var product = lineItem.Product;
				var priceSchedule = lineItem.PriceSchedule;


				if(value == "" && !scope.required)
				{
					lineItem.qtyError = null;
					return scope.valid | true;
				}
				if(value == null){
					scope.lineitem.qtyError = null;
					return scope.valid | true;
				}

                if(!product && !variant)
					return scope.valid | true;

                if(!priceSchedule)
                    return scope.valid | true;

				scope.valid = true;

                if(priceSchedule.MinQuantity > value){
					scope.valid = false;
                    scope.lineitem.qtyError = "must be greater than " + priceSchedule.MinQuantity;
                }

                if(priceSchedule.MaxQuantity && priceSchedule.MaxQuantity < value){
					scope.lineitem.qtyError = "must be less than " + priceSchedule.MaxQuantity;
                    scope.valid = false;
                }

				if(product.IsVariantLevelInventory && !variant){
					//console.log('variant not selected can\'t check qty available'); //in vboss the user may select the qty before the variant. we may have to change when this gets called so inventory available can be re validated if the variant is chnaged based on a selection spec. It's probably not a big deal since the api will check inventory available on adding to order.
				}
				else{
					var qtyAvail = (product.IsVariantLevelInventory ? variant.QuantityAvailable : product.QuantityAvailable) + (lineItem.OriginalQuantity || 0);

					if(qtyAvail < value && product.AllowExceedInventory == false){
						scope.lineitem.qtyError = "not enough available inventory " +  qtyAvail;
						scope.valid = false;
					}
				}
                if(scope.valid)
					scope.lineitem.qtyError = null;

                return scope.valid;
            }

        }
    }
    return obj;
});

four51.app.directive("variantlist", function(){
	var obj = {
		restrict: 'E',
		templateUrl:'partials/controls/variantList.html',
		controller: function($scope){


		},
		link: function(scope){

		}
	};
	return obj;
});