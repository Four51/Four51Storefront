angular.module('OrderCloud-SpecFormPreview', []);

angular.module('OrderCloud-SpecFormPreview')
    .directive('specformpreview', specformpreview)
    .controller('SpecFormPreviewCtrl', SpecFormPreviewCtrl)
;

function specformpreview() {
    var directive = {
        restrict: 'E',
        scope:{
            variant:'=',
            product:'=',
            varianterrors:'=',
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
                '.panel-sfp{background-color: #cccccc;padding: 20px;}',
            '</style>',
            '<div class="panel panel-default panel-sfp">',
                '<loadingindicator ng-show="loadingImage" />',
                '<figure>',
                    '<img id="451_img_prod_lg" class="product-image-large img-responsive" ng-src="{{previewvariant.PreviewUrl || variant.PreviewUrl || product.LargeImageUrl}}" imageonload/>',
                '</figure>',
                '<div class="empty" ng-hide="previewvariant.PreviewUrl || variant.PreviewUrl || product.LargeImageUrl">',
                    '<span class="fa empty"><i class="fa fa-camera"></i></span>',
                '</div>',
            '</div>',
            '<div class="text-center">',
                '<span class="btn-group">',
                    '<button class="btn btn-default btn-sfp" ng-click="previewOnly(variant,true,varianterrors)">',
                        '{{(\'Preview\' | r) + \' \' + (\'Proof\' | r) | xlat}}',
                    '</button>',
                '</span>',
            '</div>',
            '<div class="view-error-message" ng-show="showVariantErrors && varianterrors.length">',
                '<ul class="alert-warning">',
                    '<li class="text-center">',
                        '<span class="badge">',
                            '<i class="fa fa-exclamation-circle fa-inverse"></i>',
                            '{{varianterrors.length}}',
                        '</span>',
                    '</li>',
                    '<li class="text-center">',
                        '<ul ng-class="{\'one\': errorSection == \'open\', \'two\': errorSection == \'\' }">',
                            '<li class="alert-warning" ng-repeat="e in varianterrors">{{e | xlat}}</li>',
                        '</ul>',
                    '</li>',
                    '<li class="text-center">',
                        '<a ng-show="varianterrors.length > 1">',
                            '<i class="fa fa-caret-down" ng-click="errorSection = \'open\'" ng-hide="errorSection == \'open\'"></i>',
                            '<i class="fa fa-caret-up" ng-click="errorSection = \'\'" ng-show="errorSection == \'open\'"></i>',
                        '</a>',
                    '</li>',
                '</ul>',
            '</div>'
        ].join('');
    }
}

SpecFormPreviewCtrl.$inject = ['$scope', 'Variant'];
function SpecFormPreviewCtrl($scope, Variant) {
    $scope.loadingImage = false;
    
    var previewVariant = function(variant, saveNew, hideErrorAlert, varianterrors) {
        $scope.loadingImage = true;
        if(varianterrors.length){
            $scope.showVariantErrors = true;
            $scope.loadingImage = false;
            if(!hideErrorAlert){
                $window.alert("please fill in all required fields"); //the default spec form should be made to deal with showing $scope.variantErrors, but it's likely existing spec forms may not deal with $scope.variantErrors
            }
            return;
        }
        if(saveNew) $scope.Variant.InteropID = null;
        Variant.save(variant, function(data){
            $scope.previewvariant = data;
        });
    }

    $scope.$on('event:imageLoaded', function(event, result) {
        $scope.loadingImage = false;
        $scope.$apply();
    });
    
    $scope.previewOnly = function(variant,hideErrorWindowAlert,varianterrors){
        if($scope.previewvariant && $scope.previewvariant.InteropID){
            var d = {
                "ProductInteropID": $scope.Product.InteropID,
                "InteropID": $scope.previewvariant.InteropID
            };
            Variant.delete(d,
                function() {
                    previewVariant(variant, false, hideErrorWindowAlert,varianterrors);
                },
                function(ex) {
                    $scope.showAddToCartErrors = true;
                }
            );
        }
        else{
            previewVariant(variant, false, hideErrorWindowAlert,varianterrors);
        }
        
    }
}