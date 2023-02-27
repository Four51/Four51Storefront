var angLocation;
var angScope;
var angCompile;

four51.app.controller('SpecFormCtrl', ['$451', '$scope', '$resource', '$compile', '$location', '$route', '$routeParams', '$window', 'ProductDisplayService', 'Variant', 'Kit', 'Order', 'User', '$timeout',
function ($451, $scope, $resource, $compile, $location, $route, $routeParams, $window, ProductDisplayService, Variant, Kit, Order, User, $timeout) {
	angLocation = $location;
	angScope = $scope;
	angCompile = $compile;

	if (typeof $routeParams.variantInteropID !== 'undefined' && $routeParams.variantInteropID !== 'new') {
		// User is editing an existing variant, likely for a kit item
		$scope.editingVariant = true;
	} else {
		$scope.editingVariant = false;
	}
	$scope.validateVariant = function() {
		if (!$scope.Variant) {
			return;
		}
		var newErrors = [];
		angular.forEach($scope.Variant.Specs, function(s) {
			if (s.Required && !s.Value) {
				newErrors.push(s.Label || s.Name + ' is a required field');
			}
		});
		$scope.variantErrors = newErrors;
	}
	$scope.variantErrors = [];
	$scope.PreviewVariant = {};
	var varID = $routeParams.variantInteropID == 'new' ? null :  $routeParams.variantInteropID;
	$scope.loadingImage = true;
	ProductDisplayService.getProductAndVariant($routeParams.productInteropID, varID, function(data){
		$scope.Product = data.product;
		if (varID) {
			$scope.Variant = data.variant;
		} else {
			$scope.Variant = {};
			$scope.Variant.ProductInteropID = $scope.Product.InteropID;
			$scope.Variant.Specs = {};
			angular.forEach($scope.Product.Specs, function(item){
				if(!item.CanSetForLineItem) {
					$scope.Variant.Specs[item.Name] = item;
				}
			});
		}
		drawCustomForm('textbased', $scope);
	});
	function saveVariant(variant, saveNew, hideErrorAlert /*for compatibility*/) {
		if ($scope.variantErrors.length) {
			$scope.showVariantErrors = true;
			if (!hideErrorAlert) {
				$window.alert('please fill in all required fields');
			}
			return;
		}
		if (saveNew) {
			$scope.Variant.InteropID = null;
		}
		Variant.save(variant, function(data) {
			$location.path('/product/' + $scope.Product.InteropID + '/'+ data.InteropID);
		});
	}
	$scope.applyVariantToKitLineItem = function(variant) {
		if ($scope.currentOrder.LineItems[$routeParams.cartLineItem].NextKitLineItem.Product.InteropID == $scope.Product.InteropID) {
			$scope.currentOrder.LineItems[$routeParams.cartLineItem].NextKitLineItem.Variant = variant;
		} else if ($scope.currentOrder.LineItems[$routeParams.cartLineItem].NextKitLineItem.NextKitLineItem.Product.InteropID == $scope.Product.InteropID) {
			$scope.currentOrder.LineItems[$routeParams.cartLineItem].NextKitLineItem.NextKitLineItem.Variant = variant;
		} else if ($scope.currentOrder.LineItems[$routeParams.cartLineItem].NextKitLineItem.NextKitLineItem.NextKitLineItem.Product.InteropID == $scope.Product.InteropID) {
			$scope.currentOrder.LineItems[$routeParams.cartLineItem].NextKitLineItem.NextKitLineItem.NextKitLineItem.Variant = variant;
		} else if ($scope.currentOrder.LineItems[$routeParams.cartLineItem].NextKitLineItem.NextKitLineItem.NextKitLineItem.NextKitLineItem.Product.InteropID == $scope.Product.InteropID) {
			$scope.currentOrder.LineItems[$routeParams.cartLineItem].NextKitLineItem.NextKitLineItem.NextKitLineItem.NextKitLineItem.Variant = variant;
		} else if ($scope.currentOrder.LineItems[$routeParams.cartLineItem].NextKitLineItem.NextKitLineItem.NextKitLineItem.NextKitLineItem.NextKitLineItem.Product.InteropID == $scope.Product.InteropID) {
			$scope.currentOrder.LineItems[$routeParams.cartLineItem].NextKitLineItem.NextKitLineItem.NextKitLineItem.NextKitLineItem.NextKitLineItem.Variant = variant;
		} else if ($scope.currentOrder.LineItems[$routeParams.cartLineItem].NextKitLineItem.NextKitLineItem.NextKitLineItem.NextKitLineItem.NextKitLineItem.NextKitLineItem.Product.InteropID == $scope.Product.InteropID) {
			$scope.currentOrder.LineItems[$routeParams.cartLineItem].NextKitLineItem.NextKitLineItem.NextKitLineItem.NextKitLineItem.NextKitLineItem.NextKitLineItem.Variant = variant;
		} else if ($scope.currentOrder.LineItems[$routeParams.cartLineItem].NextKitLineItem.NextKitLineItem.NextKitLineItem.NextKitLineItem.NextKitLineItem.NextKitLineItem.NextKitLineItem.Product.InteropID == $scope.Product.InteropID) {
			$scope.currentOrder.LineItems[$routeParams.cartLineItem].NextKitLineItem.NextKitLineItem.NextKitLineItem.NextKitLineItem.NextKitLineItem.NextKitLineItem.NextKitLineItem.Variant = variant;
		} else if ($scope.currentOrder.LineItems[$routeParams.cartLineItem].NextKitLineItem.NextKitLineItem.NextKitLineItem.NextKitLineItem.NextKitLineItem.NextKitLineItem.NextKitLineItem.NextKitLineItem.Product.InteropID == $scope.Product.InteropID) {
			$scope.currentOrder.LineItems[$routeParams.cartLineItem].NextKitLineItem.NextKitLineItem.NextKitLineItem.NextKitLineItem.NextKitLineItem.NextKitLineItem.NextKitLineItem.NextKitLineItem.Variant = variant;
		} else if ($scope.currentOrder.LineItems[$routeParams.cartLineItem].NextKitLineItem.NextKitLineItem.NextKitLineItem.NextKitLineItem.NextKitLineItem.NextKitLineItem.NextKitLineItem.NextKitLineItem.NextKitLineItem.Product.InteropID == $scope.Product.InteropID) {
			$scope.currentOrder.LineItems[$routeParams.cartLineItem].NextKitLineItem.NextKitLineItem.NextKitLineItem.NextKitLineItem.NextKitLineItem.NextKitLineItem.NextKitLineItem.NextKitLineItem.NextKitLineItem.Variant = variant;
		} else if ($scope.currentOrder.LineItems[$routeParams.cartLineItem].NextKitLineItem.NextKitLineItem.NextKitLineItem.NextKitLineItem.NextKitLineItem.NextKitLineItem.NextKitLineItem.NextKitLineItem.NextKitLineItem.NextKitLineItem.Product.InteropID == $scope.Product.InteropID) {
			$scope.currentOrder.LineItems[$routeParams.cartLineItem].NextKitLineItem.NextKitLineItem.NextKitLineItem.NextKitLineItem.NextKitLineItem.NextKitLineItem.NextKitLineItem.NextKitLineItem.NextKitLineItem.NextKitLineItem.Variant = variant;
		}
	}
	$scope.saveVariantEdit = function() {
		Variant.save($scope.Variant, function(variant) {
			$scope.applyVariantToKitLineItem(variant, false);
			Order.save($scope.currentOrder, function(order) {
				$location.path('/kit/' + $routeParams.kitInteropID + '/' + $routeParams.cartLineItem);
			});
		});
	}
	$scope.saveasnew = function(hideErrorAlert, previewvariant) {
		var curVariant = {};
		if (previewvariant) {
			curVariant = previewvariant.ExternalID ? previewvariant : $scope.Variant;
		} else {
			curVariant = $scope.Variant;
		}
		saveVariant(curVariant, true, hideErrorAlert);
	}
	$scope.uploadCustomPhoto = function(base64Image, filename, customFieldId, sourceType, sourceId, spec) {
		$resource($451.api('uploadfile')).save({ Data: base64Image, Name: filename, ID: customFieldId, SourceType: sourceType, SourceID: sourceId }).$promise.then(function(u) {
			$scope.Variant.Specs[spec].Value = u.ID;
			setTimeout(function() { angular.element('#previewBtn').triggerHandler("click"); }, 500);
		}).catch(function(ex) {

			var error = ex.data.Message;
			alert('File validation error: ' + ex.data.Message);
		});
	}
	$scope.uploadDirectMailAddresses = function(base64Image, filename, customFieldId, sourceType, sourceId, spec) {
		$resource($451.api('uploadfile')).save({ Data: base64Image, Name: filename, ID: customFieldId, SourceType: sourceType, SourceID: sourceId }).$promise.then(function(u) {
			$scope.Variant.Specs[spec].Value = u.ID;
		}).catch(function(ex) {
			var error = ex.data.Message;
			alert('File validation error: ' + ex.data.Message);
		});
	}
	$scope.$on('event:imageLoaded', function(event, result) {
		$scope.loadingImage = !result;
		$scope.$apply();
	});
}]);
