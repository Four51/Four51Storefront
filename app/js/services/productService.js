'use strict';
four51.app.factory('ProductService', function($resource, $451, $api){
    var resource = $resource($451.api('Products/:interopID'), {interopID: '@ID'});
	function calcTotal(lineItem){

		var ps = lineItem.PriceSchedule;
		var variant = lineItem.Variant;
		var product = lineItem.Product;
		console.log('calc total called');
		console.dir(lineItem);
		var unitPrice = 0;
		// AmountPerQuantity(fixed amount per unit)
		// AmountTotal (fixed amount per line)
		// Percentage (of line total)
		var fixedAddPerLine = 0;
		var percentagePerLine = 0;
		var amountPerQty = 0;
		var priceBreak;
		var otherValueMarkup = 0;
		//var specs = $scope.variant ? $scope.variant.Specs : [];

		var addToMarkups = function(spec){
			if(spec.AllowOtherValue && spec.OtherTextValue && spec.OtherValueMarkup > 0){
				otherValueMarkup += spec.OtherValueMarkup;
			}else if(spec.Options.length && spec.Value){

				var option = $451.filter(spec.Options, {Property: 'ID', Value: spec.Value})[0];
				if(!option)
					return;
				//console.dir({markuptype: spec.MarkupType, note: 'markup option', option: option})
				if(spec.MarkupType ==="AmountPerQuantity" )
					amountPerQty += option.PriceMarkup;
				if(spec.MarkupType ==="Percentage" )
					percentagePerLine += option.PriceMarkup;
				if(spec.MarkupType ==="AmountTotal")
					fixedAddPerLine += option.PriceMarkup;
			}
		};

		if(variant) angular.forEach(variant.Specs, addToMarkups );
		angular.forEach(product.Specs, addToMarkups );

		angular.forEach(ps.PriceBreaks, function(pb){

			if(lineItem.Quantity >= pb.Quantity)
				priceBreak = pb; //assumes they will be in order of smallest to largest
		});
		if(!priceBreak){
			console.log('no price break found');
			lineItem.LineTotal = 0;
			return;
		}
		var total = lineItem.Quantity * (priceBreak.Price + amountPerQty);
		total += lineItem.Quantity * priceBreak.Price * (percentagePerLine / 100);
		total += fixedAddPerLine + otherValueMarkup;

		var debugLineTotal = "line total debug:\rquantity:" + lineItem.Quantity +" & " +
			"amount added per quantity:" + amountPerQty + " & " +
			"fixed ammount per line added:" + fixedAddPerLine + " & " +
			"percentage added to qty*unitprice:" + percentagePerLine + " & " +
			"'other value' markup:" + otherValueMarkup + " & " +
			"unit price:" + priceBreak.Price;
		console.log(debugLineTotal);
		lineItem.LineTotal = total;
	}

	function modifyProductScope(scope){
		function variantHasPriceSchedule(product, scheduleType){
			if(!product.Variants)
				return false;
			for(var i = 0; i < product.Variants.length; i++){
				if(product.Variants[i][scheduleType])
					return true;
			}
			return false;
		}

		if(scope.LineItem.Variant){
			//scope.LineItem.Variant = variant;
			scope.LineItem.PriceSchedule = scope.LineItem.Variant.StandardPriceSchedule ? scope.LineItem.Variant.StandardPriceSchedule : scope.LineItem.Product.StandardPriceSchedule; //include user permissions to decide to show
			scope.StaticSpecGroups = scope.LineItem.Variant.StaticSpecGroups || scope.LineItem.Product.StaticSpecGroups;
		}else{
			scope.LineItem.PriceSchedule = variantHasPriceSchedule(scope.LineItem.Product, 'StandardPriceSchedule') ? null : scope.LineItem.Product.StandardPriceSchedule; //don't show price schedule if variant overrides parent PS
			scope.StaticSpecGroups = scope.LineItem.Product.StaticSpecGroups;
		}

		scope.inventoryDisplay = function(product, variant){
			if(product.IsVariantLevelInventory){
				return variant ? variant.QuantityAvailable : null;
			}else{
				return product.QuantityAvailable;
			}
		}

		scope.LineItem.Specs = [];
		angular.forEach(scope.LineItem.Product.Specs, function(item){
			if(item.CanSetForLineItem || item.DefinesVariant)
				scope.LineItem.Specs.push(item);
		});

		scope.allowAddToOrder = scope.LineItem.Variant || scope.LineItem.Product.Variants.length == 0;//this will include some order type and current order logic.
		//short view//scope.allowAddToOrder = scope.LineItem.Product.Variants.length == 0 && scope.lineItemSpecs.length == 0 && scope.LineItem.Product.Type != 'VariableText';
		//one view//ng-show="LineItem.Variant || LineItem.Product.Variants.length == 0"
	}

    return {
		setProductScope: function(scope){
			modifyProductScope(scope);
		},
        get: function(param, successCall){
            return $api.resource(resource)
                .options({ persists: false, key: 'Product.' + param.interopID})
                .get(param, successCall);
        },
        search: function(categoryInteropID, searchTerm, callback){
            if(!categoryInteropID && !searchTerm)
                return null;

            console.log('product query');
            return resource.query({'CategoryInteropID': categoryInteropID, 'SearchTerms': searchTerm ? searchTerm : ''}, callback);
        },
		calculateLineTotal: function(lineItem){
			return calcTotal(lineItem);
		}
    }
});

four51.app.factory('VariantService', function($resource, $451, $api){
	var resource = $resource($451.api('hiddenvariant'));
	return {
		search: function(productInteropID, specOptionIDs, callback){
			console.log('hiddenvariant query');
			return resource.get({'ProductInteropID': productInteropID, 'SpecOptionIDs': specOptionIDs}, callback);
		}
	}
});
