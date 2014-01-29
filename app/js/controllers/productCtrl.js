four51.app.controller('ProductSearchCtrl', function($scope, Product, $routeParams, $location){

	if($routeParams.searchTerm){
		$scope.searchTerm = $routeParams.searchTerm;
		Product.search(null, $scope.searchTerm, null, function(products) {
			$scope.products = products;
		});
	}
	$scope.search = function(){
		$location.path('/search/' + $scope.searchTerm);
	}
})
four51.app.controller('LineItemEditCtrl', function ($routeParams, $scope, Product,ProductDisplayService, Order, $location) {
	$scope.LineItem = {};
	$scope.LineItem = $scope.currentOrder.LineItems[$routeParams.lineItemIndex];
	Product.get($scope.LineItem.Product.InteropID, function(product){
		$scope.LineItem.Product = product;
		ProductDisplayService.setProductViewScope($scope);
	});
	$scope.allowAddToOrder = true;
	$scope.addToOrderText = "Save Line Item";
	$scope.addToOrder = function(){
		if($scope.lineItemErrors && $scope.lineItemErrors.length){
			$scope.showAddToCartErrors = true;
			return;
		}
		Order.save($scope.currentOrder, function(o){
			$scope.currentOrder = o;
			$location.path('/cart');
		}, function(ex){
			alert('save line item error');//adding this until product error messaging is squared away
			console.log(ex);
		});
	}
});
four51.app.controller('relatedProductsCtrl', function($scope, Product){
	if($scope.relatedgroupid){
		Product.search(null, null, $scope.relatedgroupid, function(products) {
			$scope.relatedProducts = products;
		});
	}
});
four51.app.controller('shortProductViewCtrl', function ($routeParams, $scope, ProductDisplayService) {
	$scope.LineItem = {};
	$scope.LineItem.Product = $scope.p;
	ProductDisplayService.setNewLineItemScope($scope);
	ProductDisplayService.setProductViewScope($scope);
	$scope.allowAddToOrderInProductList = $scope.allowAddToOrder && $scope.LineItem.Specs.length == 0 && $scope.LineItem.Product.Type != 'VariableText';
});

four51.app.controller('ProductCtrl', function ($routeParams, $scope, Product, ProductDisplayService, Order, Variant, $451, $location, User) {
    $scope.selected = 1;
    $scope.LineItem = {};
	$scope.addToOrderText = "Add To Cart";
	$scope.loadingIndicator = true;

	$scope.calcVariantLineItems = function(i){
		$scope.variantLineItemsOrderTotal = 0;
		angular.forEach($scope.variantLineItems, function(item){
			$scope.variantLineItemsOrderTotal += item.LineTotal || 0;
		})
	};
	ProductDisplayService.getProductAndVariant($routeParams.productInteropID,$routeParams.variantInteropID, function(data){
		$scope.LineItem.Product = data.product;
		$scope.LineItem.Variant = data.variant;
		ProductDisplayService.setNewLineItemScope($scope);
		ProductDisplayService.setProductViewScope($scope);
		$scope.$broadcast('ProductGetComplete');
		$scope.loadingIndicator = false;
		$scope.setAddToOrderErrors();
	});

	$scope.addToOrder = function(){
		if($scope.lineItemErrors && $scope.lineItemErrors.length){
			$scope.showAddToCartErrors = true;
			return;
		}
		if(!$scope.currentOrder){
			$scope.currentOrder = {};
			$scope.currentOrder.LineItems = [];
		}
		if($scope.allowAddFromVariantList){
			angular.forEach($scope.variantLineItems, function(item){
				if(item.Quantity > 0){
					$scope.currentOrder.LineItems.push(item);
				}
			});
		}else{
			$scope.currentOrder.LineItems.push($scope.LineItem);
		}
		$scope.addToOrderIndicator = true;
		Order.save($scope.currentOrder,
			function(o){
				$scope.user.CurrentOrderID = o.ID;
				User.save($scope.user, function(){
					$scope.addToOrderIndicator = true;
					$location.path('/cart');
				});
			},
			function(ex) {
				$scope.addToOrderIndicator = false;
				$scope.addToOrderError = ex.Message;
				alert(ex.Message);//adding this until product error messaging is squared away
			}
		);
	}
});


four51.app.factory('ProductDisplayService', function($451, $sce, Variant, Product){
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
			if(spec.isOtherSelected && spec.OtherValueMarkup > 0)
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
				angular.forEach(scope.variantLineItems, function(item){
					if(item.Quantity > 0){
						haveQty = true;
					}
				});

				if(scope.LineItem.Product.Type == 'VariableText' && !Object.keys(scope.variantLineItems).length)
					newErrorList.push("Please create a variant.");
				else if(!haveQty) newErrorList.push("please select a quantity");
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
			console.log('spec changed');
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
						//alert(ex.data.Message);
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
			&& scope.LineItem.Product.Variants
			&& (scope.LineItem.Product.Variants.length > 0 || scope.LineItem.Product.Type == 'VariableText')

		if(scope.LineItem.Variant){
			scope.LineItem.PriceSchedule = scope.LineItem.Variant.StandardPriceSchedule ? scope.LineItem.Variant.StandardPriceSchedule : scope.LineItem.Product.StandardPriceSchedule; //include user permissions to decide to show
			//moved to productViewScope scope.StaticSpecGroups = scope.LineItem.Variant.StaticSpecGroups || scope.LineItem.Product.StaticSpecGroups;
		}else{
			scope.LineItem.PriceSchedule = variantHasPriceSchedule(scope.LineItem.Product, 'StandardPriceSchedule') ? null : scope.LineItem.Product.StandardPriceSchedule; //don't show price schedule if variant overrides parent PS
			if(scope.allowAddFromVariantList){
				var p = scope.LineItem.Product;
				scope.variantLineItems = {};
				angular.forEach(p.Variants, function(v){
					scope.variantLineItems[v.InteropID] = {PriceSchedule: v.StandardPriceSchedule || p.StandardPriceSchedule, Product: p, Variant: v, Specs: scope.LineItem.Specs};
				});
			}
		}

		scope.allowAddToOrder =  scope.allowAddFromVariantList || (scope.LineItem.Variant || scope.LineItem.Product.VariantCount == 0);//this will include some order type and current order logic.

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
	function _getProductAndVariant(productInteropID, variantInteropID, callback){
		Product.get(productInteropID, function(data){
			var p = data;
			if(variantInteropID){
				if(p.Type == 'VariableText'){
					Variant.get({VariantInteropID: variantInteropID, ProductInteropID: p.InteropID }, function(v) {
						callback({product: p, variant: v});
					});
				}else{
					var variant = $451.filter(data.Variants, {Property: 'InteropID', Value: variantInteropID})[0];
					callback({product: p, variant: variant});
				}
			}
			else
				callback({product:p});
		});
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
});

/* product matrix control
four51.app.controller('CustomProductCtrlMatrix', function($scope, $451, Variant, ProductDisplayService){
	//just a little experiment on extending the product view
	$scope.matrixLineTotal = 0;
	$scope.LineItems = {};
	$scope.LineKeys = [];
	$scope.lineChanged = function(){
		var addToOrderTotal = 0;
		angular.forEach($scope.LineKeys, function(key){
			if($scope.LineItems[key].Variant){
				ProductDisplayService.calculateLineTotal($scope.LineItems[key]);
				addToOrderTotal += $scope.LineItems[key].LineTotal;
			}
		$scope.matrixLineTotal = addToOrderTotal;

		});
	};

	$scope.addMatrixToOrder = function(){ };

	$scope.setFocusVariant = function(opt1, opt2){

		if($scope.LineItems[opt1.Value.toString() + opt2.Value.toString()].Variant){
			$scope.LineItem.Variant = $scope.LineItems[opt1.Value.toString() + opt2.Value.toString()].Variant;
			return;
		}

		Variant.get({'ProductInteropID': $scope.LineItem.Product.InteropID, 'SpecOptionIDs': [opt1.ID, opt2.ID]}, function(data){
			$scope.LineItem.Variant = data;
		});
	};
	$scope.$watch("LineItems", function(){
		$scope.lineChanged();
	}, true);

	$scope.$on('ProductGetComplete', function(){
		var specs = $451.filter($scope.LineItem.Product.Specs, {Property: 'DefinesVariant', Value: true});
		$scope.matrixSpec1 = specs[0];
		$scope.matrixSpec2 = specs[1];
		angular.forEach(specs[0].Options, function(option1){
			angular.forEach(specs[1].Options, function(option2){
				$scope.LineKeys.push(option1.Value.toString() + option2.Value.toString());
				$scope.LineItems[option1.Value.toString() + option2.Value.toString()] = {
					Product: $scope.LineItem.Product,
					PriceSchedule: $scope.LineItem.PriceSchedule,
				};
			});
		});
	});
});
*/

