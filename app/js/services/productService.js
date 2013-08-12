'use strict';
four51.app.factory('ProductService', function($resource, $451, $api, VariantService){
    var resource = $resource($451.api('Products/:interopID'), {interopID: '@ID'});
	return {
        get: function(param, successCall){
            return $api.resource(resource)
                .options({ persists: false, key: 'Product.' + param.interopID})
                .get(param, successCall);
        },
        search: function(categoryInteropID, searchTerm, callback){
            if(!categoryInteropID && !searchTerm)
                return null;
            return resource.query({'CategoryInteropID': categoryInteropID, 'SearchTerms': searchTerm ? searchTerm : ''}, callback);
        }
    }
});

four51.app.factory('VariantService', function($resource, $451, $api){
	var resource = $resource($451.api('variant'));
	return {
		get: function(params, callback){
			console.log('variant Search');
			return resource.get(params, callback);
		}
	}
});

four51.app.factory('ProductDisplayService', function($451, VariantService){
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
		//var otherValueMarkup = 0;
		//var specs = $scope.variant ? $scope.variant.Specs : [];

		var addToMarkups = function(spec){
			var otherMarkup;
			if(spec.AllowOtherValue && spec.OtherTextValue && spec.OtherValueMarkup > 0)
				otherMarkup = spec.OtherValueMarkup;

			if((spec.Options.length && spec.SelectedOptionID) || otherMarkup){

				var option = !spec.SelectedOptionID ? null : $451.filter(spec.Options, {Property: 'ID', Value: spec.SelectedOptionID})[0];
				if(!option && !otherMarkup)
					return;
				//console.dir({markuptype: spec.MarkupType, note: 'markup option', option: option})
				if(spec.MarkupType ==="AmountPerQuantity" )
					amountPerQty += otherMarkup || option.PriceMarkup;
				if(spec.MarkupType ==="Percentage" )
					percentagePerLine += otherMarkup || option.PriceMarkup;
				if(spec.MarkupType ==="AmountTotal")
					fixedAddPerLine += otherMarkup || option.PriceMarkup;
			}
		};

		if(variant) angular.forEach(variant.Specs, addToMarkups );
		angular.forEach(lineItem.Specs, addToMarkups );

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
		total += fixedAddPerLine; //+ otherValueMarkup;

		var debugLineTotal = "line total debug:\rquantity:" + lineItem.Quantity +" & " +
			"amount added per quantity:" + amountPerQty + " & " +
			"fixed ammount per line added:" + fixedAddPerLine + " & " +
			"percentage added to qty*unitprice:" + percentagePerLine + " & " + //"'other value' markup:" + otherValueMarkup + " & " +
			"unit price:" + priceBreak.Price;
		console.log(debugLineTotal);
		lineItem.LineTotal = total;
	}
	function productViewScope(scope){
		scope.specChanged = function(spec){
			console.log('spec changed called...');
			console.dir(spec)
			if(!spec){
				console.log('spec changed called, but no spec passed');
				return;
			}

			if(spec.DefinesVariant)
			{
				var specOptionIDs = [];
				var hasAllVarDefiningSpecs = true;
				$451.filter(scope.LineItem.Specs, {Property: 'DefinesVariant', Value:true}, function(item){
					if(!item.SelectedOptionID)
					{
						hasAllVarDefiningSpecs = false;
						return;
					}
					specOptionIDs.push(item.SelectedOptionID);
				})
				if(hasAllVarDefiningSpecs){
					//{'ProductInteropID': productInteropID, 'SpecOptionIDs': specOptionIDs}
					VariantService.get({'ProductInteropID': scope.LineItem.Product.InteropID, 'SpecOptionIDs': specOptionIDs}, function(data){
						if(!data.IsDefaultVariant)
							scope.LineItem.Variant = data;
						newLineItemScope(scope)
					});
				}
			}
			calcTotal(scope.LineItem);
		}
		scope.inventoryDisplay = function(product, variant){
			if(product.IsVariantLevelInventory){
				return variant ? variant.QuantityAvailable : null;
			}else{
				return product.QuantityAvailable;
			}
		}
		if(scope.LineItem.Variant){
			//scope.LineItem.Variant = variant;
			scope.StaticSpecGroups = scope.LineItem.Variant.StaticSpecGroups || scope.LineItem.Product.StaticSpecGroups;
		}else{
			scope.StaticSpecGroups = scope.LineItem.Product.StaticSpecGroups;
		}
	}
	function newLineItemScope(scope){
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
			scope.LineItem.PriceSchedule = scope.LineItem.Variant.StandardPriceSchedule ? scope.LineItem.Variant.StandardPriceSchedule : scope.LineItem.Product.StandardPriceSchedule; //include user permissions to decide to show
			//moved to productViewScope scope.StaticSpecGroups = scope.LineItem.Variant.StaticSpecGroups || scope.LineItem.Product.StaticSpecGroups;
		}else{
			scope.LineItem.PriceSchedule = variantHasPriceSchedule(scope.LineItem.Product, 'StandardPriceSchedule') ? null : scope.LineItem.Product.StandardPriceSchedule; //don't show price schedule if variant overrides parent PS
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

	function productViewName(p){
		p.ViewName = staticSpecSPAConfig(p, 'ViewName') || 'default';
	}
	function staticSpecSPAConfig(product, specName){
		if(!product.StaticSpecGroups)
			return null;
		if(!product.StaticSpecGroups.SPAProductConfig)
			return null;
		if(!product.StaticSpecGroups.SPAProductConfig.Specs[specName])
			return null;
		return product.StaticSpecGroups.SPAProductConfig.Specs[specName].Value || escapeNull;
	}

	return{
		setNewLineItemScope: function(scope){
			newLineItemScope(scope);
		},
		setProductViewScope: function(scope){
			productViewScope(scope);
			productViewName(scope.LineItem.Product);
		},
		setProductViewName: function(p){
			productViewName(p);
		},
		calculateLineTotal: function(lineItem){
			return calcTotal(lineItem);
		},
		getStaticSpecSPAConfig: function(product, specName){
			return staticSpecSPAConfig(product, specName);
		}
	}
});