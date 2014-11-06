four51.app.factory('ProductDisplayService', ['$sce', '$451', 'Variant', 'Product', function($sce, $451, Variant, Product){
	function calcTotal(lineItem){

		var ps = lineItem.PriceSchedule;
		var variant = lineItem.Variant;
		var product = lineItem.Product;
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
			if( spec.AllowOtherValue &&
				spec.OtherValueMarkup > 0 &&
				(spec.isOtherSelected || (spec.Value && !spec.SelectedOptionID)))
				otherMarkup = spec.OtherValueMarkup;

			if((spec.Options && spec.SelectedOptionID) || otherMarkup){

				var option = !spec.SelectedOptionID ? null : $451.filter(spec.Options, {Property: 'ID', Value: spec.SelectedOptionID})[0];
				if(!option && !otherMarkup)
					return;
				if(spec.MarkupType ==="AmountPerQuantity" )
					amountPerQty += otherMarkup || option.Markup;
				if(spec.MarkupType ==="Percentage" )
					percentagePerLine += otherMarkup || option.Markup;
				if(spec.MarkupType ==="AmountTotal")
					fixedAddPerLine += otherMarkup || option.Markup;
			}
		};

		if(variant) angular.forEach(variant.Specs, addToMarkups );
		angular.forEach(lineItem.Specs, addToMarkups );

		angular.forEach(ps.PriceBreaks, function(pb){

			if(lineItem.Quantity >= pb.Quantity)
				priceBreak = pb; //assumes they will be in order of smallest to largest
		});
		if(!priceBreak){
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
		lineItem.LineTotal = total;
		lineItem.UnitPrice = priceBreak.Price;
	}
	function productViewScope(scope){
		scope.lineItemErrors = [];
		scope.$watch("LineItem", function(){
			scope.setAddToOrderErrors();
		}, true);
		scope.$watch("variantLineItems", function(){
			scope.setAddToOrderErrors();
		}, true);
		scope.setAddToOrderErrors = function(){
			//console.log("set add to order errors")
			var newErrorList = [];

			if(scope.allowAddFromVariantList){
				var haveQty = false;
				var haveQtyError = false;
				angular.forEach(scope.variantLineItems, function(item){
					if(item.Quantity > 0)
						haveQty = true;
					if(item.qtyError && !haveQtyError)
					{
						newErrorList.push(item.qtyError);
						haveQtyError = true;
					}
				});
				if(scope.LineItem.Product.Type == 'VariableText' && !Object.keys(scope.variantLineItems).length)
					newErrorList.push("Please create a variant.");
				else if(!haveQty && !haveQtyError)
					newErrorList.push("Please select a quantity");

			}else if(!scope.LineItem.Quantity && !scope.LineItem.qtyError)//if there's a qty error, just use that. in this case, there's no qty error because it hasn't been validated yet.
				newErrorList.push("Please select a quantity.");

			if(scope.LineItem.qtyError)
				newErrorList.push(scope.LineItem.qtyError);

			if(!scope.LineItem.Variant && scope.LineItem.Product.IsVBOSS){
				newErrorList.push("Please select an active product");
			}
			angular.forEach(scope.LineItem.Specs, function(s){
				if(s.Required && !s.Value)
					newErrorList.push(s.Name + " is a required field");
			});
			//if(scope.addToOrderForm && scope.addToOrderForm.$invalid){
			//	newErrorList.push("Please fill all required fields");
			//}
			scope.lineItemErrors = newErrorList;
		}

		scope.specChanged = function(spec){
			if(!spec){
				return;
			}
			if(scope.variantLineItems){
				angular.forEach(scope.variantLineItems, function(item){
					calcTotal(item);
				});
				scope.calcVariantLineItems();
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
					Variant.get({'ProductInteropID': scope.LineItem.Product.InteropID, 'SpecOptionIDs': specOptionIDs}, function(data){
						if(!data.IsDefaultVariant)
							scope.LineItem.Variant = data;
						newLineItemScope(scope);
					}, function(ex){
						scope.LineItem.Variant = null;
					});
				}
			}
			calcTotal(scope.LineItem);

		}
		scope.trustedDescription = function(p){
			if(p) return $sce.trustAsHtml(p.Description);
		}
		scope.inventoryDisplay = function(product, variant){
			var qa = product.IsVariantLevelInventory ? variant : product;
			if(qa)
				return qa.QuantityAvailable > 0 ? qa.QuantityAvailable : 0;
			else return null;
		}
		if(scope.LineItem.Variant){
			//scope.LineItem.Variant = variant;
			scope.StaticSpecGroups = scope.LineItem.Variant.StaticSpecGroups || scope.LineItem.Product.StaticSpecGroups;
		}else{
			scope.StaticSpecGroups = scope.LineItem.Product.StaticSpecGroups;
		}
		scope.getPdf = function(url){
			window.location.href = url;
		}

	}
	function newLineItemScope(scope){
		function variantHasPriceSchedule(product, scheduleType){
			if(!product.Variants)
				return false;
			for(var i = 0; i < product.Variants.length; i++){
				if(product.Variants[i] && product.Variants[i][scheduleType])
					return true;
			}
			return false;
		}

		var hasAddToOrderSpecs = false; //TODO:determine based on lineitem or product setup

		if(!scope.LineItem.Specs){//it's possible we're reloading this due to changing a variant and we don't want to leave the spec values behind
			scope.LineItem.Specs = {};
			angular.forEach(scope.LineItem.Product.Specs, function(item){
				if(item.CanSetForLineItem || item.DefinesVariant)
				{
					hasAddToOrderSpecs = true;
					scope.LineItem.Specs[item.Name] = item;// Object.create(item);
				}
			});
		}

		scope.allowAddFromVariantList =
			(scope.LineItem.Product.ShowSpecsWithVariantList || !hasAddToOrderSpecs)
				&& !scope.LineItem.Variant
				&& scope.LineItem.Product.Variants && scope.LineItem.Product.Variants.length > 0
				&& ((scope.LineItem.Product.Variants && scope.LineItem.Product.Variants.length > 0) || scope.LineItem.Product.Type == 'VariableText')

		function determinePriceSchedule() {
			// default to standard if no order type
			if (scope.currentOrder && scope.currentOrder.Type == 'Replenishment') {
				if (scope.LineItem.Variant && scope.LineItem.Variant.ReplenishmentPriceSchedule)
					return scope.LineItem.Variant.ReplenishmentPriceSchedule;
				return scope.LineItem.Product.ReplenishmentPriceSchedule;
			}
			else if (scope.currentOrder && scope.currentOrder.Type == 'Standard') {
				if (scope.LineItem.Variant && scope.LineItem.Variant.StandardPriceSchedule)
					return scope.LineItem.Variant.StandardPriceSchedule;
				return scope.LineItem.Product.StandardPriceSchedule;
			}
			else if (scope.LineItem.Product.Type == 'VariableText') {
				// the opposite of default ps is true for variable products
				return scope.LineItem.Product.ReplenishmentPriceSchedule || scope.LineItem.Product.StandardPriceSchedule;
			}
			else {
				if (scope.LineItem.Variant && !scope.LineItem.Product.IsVBOSS)
					return scope.LineItem.Variant.StandardPriceSchedule || scope.LineItem.Variant.ReplenishmentPriceSchedule;
				return scope.LineItem.Product.StandardPriceSchedule || scope.LineItem.Product.ReplenishmentPriceSchedule
			}

//			return (scope.currentOrder && scope.currentOrder.Type == 'Replenishment') ?
//				(scope.LineItem.Variant && scope.LineItem.Variant.ReplenishmentPriceSchedule) ? scope.LineItem.Variant.ReplenishmentPriceSchedule : scope.LineItem.Product.ReplenishmentPriceSchedule :
//				(scope.LineItem.Variant && scope.LineItem.Variant.StandardPriceSchedule) ? scope.LineItem.Variant.StandardPriceSchedule : scope.LineItem.Product.StandardPriceSchedule;
		}

		if(scope.LineItem.Variant){
			scope.LineItem.PriceSchedule = determinePriceSchedule(); //include user permissions to decide to show
			//moved to productViewScope scope.StaticSpecGroups = scope.LineItem.Variant.StaticSpecGroups || scope.LineItem.Product.StaticSpecGroups;
		}
		else if (!scope.LineItem.Product.IsVariantLevelInventory && (scope.currentOrder && scope.currentOrder.Type == 'Replenishment')) {
			scope.LineItem.PriceSchedule = scope.LineItem.Product.ReplenishmentPriceSchedule;
			scope.allowAddFromVariantList = false;
		}
		else{
			//don't show price schedule if variant overrides parent PS
			scope.LineItem.PriceSchedule = variantHasPriceSchedule(scope.LineItem.Product, scope.currentOrder ?  scope.currentOrder.Type + 'PriceSchedule' : 'StandardPriceSchedule') ?
				null :
				determinePriceSchedule();
			if(scope.allowAddFromVariantList){
				var p = scope.LineItem.Product;
				scope.variantLineItems = {};
				angular.forEach(p.Variants, function(v){
					if (!v) return;
					scope.variantLineItems[v.InteropID] = {
						PriceSchedule: (scope.currentOrder ? v[scope.currentOrder.Type + 'PriceSchedule'] : (v.StandardPriceSchedule || v.ReplenishmentPriceSchedule))
							|| (scope.currentOrder ? p[scope.currentOrder.Type + 'PriceSchedule'] : (v.StandardPriceSchedule || v.ReplenishmentPriceSchedule || scope.LineItem.PriceSchedule)),
						Product: p,
						Variant: v,
						Specs: scope.LineItem.Specs
					};
				});
			}
		}

		function allowAddToOrder() {
			return (scope.currentOrder ? canAddToOrderType(scope.currentOrder.Type) : true) &&
				   (scope.allowAddFromVariantList || (scope.LineItem.Variant || (scope.LineItem.Product.VariantCount == 0 && scope.LineItem.Product.Type != 'VariableText'))
			);
		}

		function canAddToOrderType(type) {
			// this is such an outlier that I'm not sure how to weave it into the checks.
			if ((scope.currentOrder && scope.currentOrder.Type == 'Replenishment') && type == 'Replenishment' && !scope.LineItem.Product.IsVariantLevelInventory && (scope.LineItem.PriceSchedule && scope.LineItem.PriceSchedule.OrderType == 'Replenishment')) {
				scope.allowAddToOrder = scope.user.Permissions.contains(type + 'Order'); // even have to reset this
				return true;
			}

			// mpower variants
			if (scope.variantLineItems && scope.LineItem.Product.Type == 'VariableText') {
				if (!scope.user.Permissions.contains(type + 'Order')) return false;
				if (scope.currentOrder && scope.currentOrder.ID && scope.currentOrder.Type != type) return false;
				return scope.LineItem.Product[type + 'PriceSchedule'] != null;
				//return scope.LineItem.PriceSchedule.OrderType == type && scope.user.Permissions.contains(type + 'Order');
			}

			return scope.user.Permissions.contains(type + 'Order')
				&& scope.variantLineItems ? scope.variantLineItems[scope.LineItem.Product.Variants[0].InteropID].Variant[type + 'PriceSchedule'] != null : scope.LineItem.Product[type + 'PriceSchedule'] != null
				&& (scope.currentOrder && scope.currentOrder.ID ? scope.currentOrder.Type == type : true)
				&& (scope.currentOrder && scope.currentOrder.ID ? (scope.variantLineItems ? scope.variantLineItems[scope.LineItem.Product.Variants[0].InteropID].PriceSchedule.OrderType : scope.LineItem.PriceSchedule.OrderType) == scope.currentOrder.Type : true);
		}

		function canCreateVariant() {
			if (scope.currentOrder && scope.currentOrder.Type == 'Replenishment')
				return false;
			if (scope.LineItem.Product.Type == 'VariableText') {
				return true;
			}
			return false;
		}
		scope.allowAddToOrder = allowAddToOrder();
		scope.canAddToStandardOrder = canAddToOrderType('Standard');
		scope.canAddToReplenishmentOrder = canAddToOrderType('Replenishment');
		scope.canCreateVariant = canCreateVariant();
		// the api has a property from the inventory settings on whether we display inventory. but, we also need to consider the current order type
		scope.LineItem.Product.DisplayInventory = scope.LineItem.Product.DisplayInventory && (!scope.currentOrder || (scope.currentOrder && scope.currentOrder.Type == 'Standard'));
		//short view//scope.allowAddToOrder = scope.LineItem.Product.Variants.length == 0 && scope.lineItemSpecs.length == 0 && scope.LineItem.Product.Type != 'VariableText';
		//one view//ng-show="LineItem.Variant || LineItem.Product.Variants.length == 0"
	}

	//function productViewName(p){
	//	p.ViewName = staticSpecSPAConfig(p, 'ViewName') || 'default';
	//}
	function staticSpecSPAConfig(product, specName){
		if(!product.StaticSpecGroups)
			return null;
		if(!product.StaticSpecGroups.SPAProductConfig)
			return null;
		if(!product.StaticSpecGroups.SPAProductConfig.Specs[specName])
			return null;
		return product.StaticSpecGroups.SPAProductConfig.Specs[specName].Value || escapeNull;
	}
	function _getProductAndVariant(productInteropID, variantInteropID, callback, page, pagesize, searchTerm){
		Product.get(productInteropID, function(data){
			var p = data;
			if(variantInteropID){
				if(p.Type == 'VariableText'){
					Variant.get({VariantInteropID: variantInteropID, ProductInteropID: p.InteropID }, function(v) {
						callback({product: p, variant: v});
					});
				}
				else{
					var variant = $451.filter(data.Variants, {Property: 'InteropID', Value: variantInteropID})[0];
					callback({product: p, variant: variant});
				}
			}
			else{
				if (p.Type == 'Static' && p.IsVBOSS) {
					var options = [];
					var hasAllDefinesAsVariant = true;
					angular.forEach(p.Specs, function(s) {
						if (s.DefinesVariant) {
							if(s.Value)
								options.push(s.SelectedOptionID);
							else
								hasAllDefinesAsVariant = false;
						}
					});
					if (options.length > 0 && hasAllDefinesAsVariant) {
						Variant.get({'ProductInteropID': p.InteropID, 'SpecOptionIDs': options},
							function(v) {
								callback({product: p, variant: v});
							},
							function(ex) {
								callback({product:p});
							}
						);
					}else
						callback({product:p});
				}
				else
					callback({product:p});
			}
		}, page, pagesize, searchTerm);
	};
	return{
		getProductAndVariant: _getProductAndVariant,
		setNewLineItemScope: function(scope){
			newLineItemScope(scope);
		},
		setProductViewScope: function(scope){
			productViewScope(scope);
			//productViewName(scope.LineItem.Product);
		},
		//setProductViewName: function(p){
		//	productViewName(p);
		//},
		calculateLineTotal: function(lineItem){
			return calcTotal(lineItem);
		},
		getStaticSpecSPAConfig: function(product, specName){
			return staticSpecSPAConfig(product, specName);
		}
	}
}]);