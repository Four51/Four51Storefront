angular.module('OrderCloud-SpecFormPreview', []);
angular.module('OrderCloud-SpecFormPreview').directive('specformpreview', specformpreview).controller('SpecFormPreviewCtrl', SpecFormPreviewCtrl);

var currentPreview = false;
var previewHasRun = false;

// function renderError() {
// 	$('#customFormContent').html('<h1>An error has occured while rendering this product. Please contact Vivid Impact at orders@vividimpact.com</h1><h3 style="text-align: center">PRODUCT: ' + angScope.Product.Name + '</h3><h3 style="text-align: center">ID: ' + angScope.Product.ExternalID + '</h3>');
// }

function specformpreview() {
	var directive = {
		restrict: 'E',
		scope:{
			variant:'=',
			product:'=',
			previewvariant:'='
		},
		template: template,
		controller: SpecFormPreviewCtrl
	};
	return directive;
	function template() {
		return [
			'<style>',
				'.view-error-message ul.alert-warning li {float: left;}',
				'.btn-sfp{float:none !important;}',
				'.panel-sfp{background-color: #c0c0c0;padding: 20px;}',
			'</style>',
			'<div class="panel panel-default panel-sfp">',
				'<loadingindicator ng-show="loadingImage" />',
				'<figure>',
					'<img onerror="renderError()" style="cursor: pointer" id="451_img_prod_lg" class="product-image-large img-responsive" ng-src="{{previewvariant.PreviewUrl || variant.PreviewUrl || product.LargeImageUrl}}" imageonload/>',
				'</figure>',
				'<div class="empty" ng-hide="previewvariant.PreviewUrl || variant.PreviewUrl || product.LargeImageUrl">',
					'<span class="fa empty"><i class="fa fa-camera"></i></span>',
				'</div>',
			'</div>',
		'<div class="text-center">',
		'Click the image to view a full-size preview<br><br>',
			'</div>',
			'<div class="text-center">',
				'<span class="btn-group">',
					'<button style="box-shadow: 0px 0px 9px 0px #00ac00;" id="previewBtn" class="btn btn-default btn-sfp" ng-click="previewOnly(variant,true)">Preview first to proceed</button>',
				'</span>',
			'</div>',
			'<div class="text-center" style="margin-top: 15px">',
				'<button style="display: none" id="proceedToCheckout" class="btn btn-lg btn-success" type="button"><i class="fa fa-shopping-cart" style="border: none!important"></i> Proceed to Next Step</button>',
			'</div>',
			'<div class="view-error-message" ng-show="showVariantErrors">',
				'<ul class="alert-warning">',
					'<li class="text-center">',
						'<span class="badge">',
							'<i class="fa fa-exclamation-circle fa-inverse"></i>',
							'{{variantErrors.length}}',
						'</span>',
					'</li>',
					'<li class="text-center">',
						'<ul ng-class="{\'one\': errorSection == \'open\', \'two\': errorSection == \'\' }">',
							'<li class="alert-warning" ng-repeat="e in variantErrors">{{e | xlat}}</li>',
						'</ul>',
					'</li>',
					'<li class="text-center">',
						'<a ng-show="variantErrors.length > 1">',
							'<i class="fa fa-caret-down" ng-click="errorSection = \'open\'" ng-hide="errorSection == \'open\'"></i>',
							'<i class="fa fa-caret-up" ng-click="errorSection = \'\'" ng-show="errorSection == \'open\'"></i>',
						'</a>',
					'</li>',
				'</ul>',
			'</div>',
			'<div style="width: 100%; height: 55px; margin-top: 30px;" id="thumbContainerContainer"></div>',
			'<div style="margin-top: 15px" id="productInfoSection"><h1 style="margin-top: 0px; text-align: left;">{{product.Name}}</h1><h3 style="margin-top: 0px; text-align: left; font-size: 15px;">{{product.ExternalID}}</h3><h4 ng-bind-html="product.Description"></h4></div>',
		].join('');
	}
}

SpecFormPreviewCtrl.$inject = ['$scope', 'Variant'];
function SpecFormPreviewCtrl($scope, Variant) {
	currentPreview = false;
	$scope.loadingImage = false;
	var previewVariant = function(variant, saveNew, hideErrorAlert) {
		$('#previewBtn, #secondaryPreviewBtn, #proceedToCheckout').prop('disabled', true);
		$('#previewBtn, #secondaryPreviewBtn').text('Preview Proof').css('box-shadow', 'none');
		currentPreview = false;
		$scope.loadingImage = true;
		if ($scope.$parent.variantErrors.length) {
			$scope.showVariantErrors = true;
			$scope.loadingImage = false;
			if(!hideErrorAlert){
				$window.alert("please fill in all required fields"); //the default spec form should be made to deal with showing $scope.variantErrors, but it's likely existing spec forms may not deal with $scope.variantErrors
			}
			return;
		}
		if (saveNew) {
			$scope.Variant.InteropID = null;
		}
		Variant.save(variant, function(data){
			previewHasRun = true;
			$scope.previewvariant = data;
		});
		angScope.currentPreview = variant.ProofUrl;
	}
	$scope.$on('event:imageLoaded', function(event, result) {
		if (previewHasRun) {
			$('#previewBtn, #secondaryPreviewBtn, #proceedToCheckout').prop('disabled', false);
			$('#proceedToCheckout').show();
		}
		$scope.loadingImage = false;
		$scope.$apply();
	});
	$scope.previewOnly = function(variant, hideErrorWindowAlert) {
		if (hasLogoSelection && !$('#logo').val()) {
			$('#previewBtn, #secondaryPreviewBtn, #proceedToCheckout').prop('disabled', false);
			alert('You must choose a facility / division logo before proceeding.');
			return;
		}
		$scope.showVariantErrors = false;
		$scope.$parent.variantErrors = [];
		$scope.$parent.validateVariant();
		$scope.variantErrors = $scope.$parent.variantErrors;
		if ($scope.$parent.variantErrors.length) {
			$scope.showVariantErrors = true;
			return;
		}
		previewVariant(variant, false, hideErrorWindowAlert, []);
	}
	$('#thumbContainerContainer').append('<div class="thumbContainer"><img class="product-thumb" data-src="https://www.four51.com/Themes/Custom/700dfe64-2fbd-4bca-9c5c-f423c74b2912/KAH_Docs/' + $scope.product.ExternalID + '_pvd_01_lrg.jpg" src="https://www.four51.com/Themes/Custom/700dfe64-2fbd-4bca-9c5c-f423c74b2912/KAH_Docs/' + $scope.product.ExternalID + '_pvd_01_sm.jpg" alt=""></div>');
	$('#thumbContainerContainer').append('<div class="thumbContainer"><img class="product-thumb" data-src="https://www.four51.com/Themes/Custom/700dfe64-2fbd-4bca-9c5c-f423c74b2912/KAH_Docs/' + $scope.product.ExternalID + '_pvd_02_lrg.jpg" src="https://www.four51.com/Themes/Custom/700dfe64-2fbd-4bca-9c5c-f423c74b2912/KAH_Docs/' + $scope.product.ExternalID + '_pvd_02_sm.jpg" alt=""></div>');
}
$(document).off('click', '.product-thumb');
$(document).on('click', '.product-thumb', function() {
	var viewer = ImageViewer();
	viewer.show($(this).attr('data-src'));
});
$(document).off('click', '.product-image-large');
$(document).on('click', '.product-image-large', function() {
	var viewer = ImageViewer();
	if (typeof angScope.PreviewVariant !== 'undefined' && typeof angScope.PreviewVariant.ProofUrl !== 'undefined') {
		window.open(angScope.PreviewVariant.ProofUrl, '_blank');
	} else if (typeof angScope.LineItem !== 'undefined' && typeof angScope.LineItem.Variant !== 'undefined' && typeof angScope.LineItem.Variant.ProofUrl !== 'undefined') {
		window.open(angScope.LineItem.Variant.ProofUrl, '_blank');
	} else {
		viewer.show($(this).attr('src'));
	}
});
