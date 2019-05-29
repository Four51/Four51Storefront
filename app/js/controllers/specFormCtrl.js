four51.app.controller('SpecFormCtrl', ['$scope', '$location', '$route', '$routeParams', '$window', 'ProductDisplayService', 'Variant', 'Order',
function ($scope, $location, $route, $routeParams, $window, ProductDisplayService, Variant, Order) {
    $scope.isEditforApproval = $routeParams.orderID && $scope.user.Permissions.contains('EditApprovalOrder');
    $scope.EditingLineItem = (typeof($routeParams.lineItemIndex) != 'undefined');
    if ($scope.EditingLineItem) $scope.LineItemIndex = $routeParams.lineItemIndex;
    if ($scope.isEditforApproval) {
        Order.get($routeParams.orderID, function(order) {
            $scope.currentOrder = order;
            init();
        });
    }
    else {init()}

    function init() {
        $scope.variantErrors = [];

        //used for SpecFormPreview
        $scope.PreviewVariant = {};

        var varID = $routeParams.variantInteropID == 'new' ? null :  $routeParams.variantInteropID;
        $scope.loadingImage = true;
        ProductDisplayService.getProductAndVariant($routeParams.productInteropID, varID, function(data){
            $scope.Product = data.product;
            if(varID)
                $scope.Variant = data.variant;
            else{
                $scope.Variant = {};
                $scope.Variant.ProductInteropID = $scope.Product.InteropID;
                $scope.Variant.Specs = {};
                angular.forEach($scope.Product.Specs, function(item){
                    if(!item.CanSetForLineItem)
                    {
                        $scope.Variant.Specs[item.Name] = item;
                    }
                });
            }
        });
        function validateVariant(){
            if(!$scope.Variant) return;
            var newErrors = [];
            angular.forEach($scope.Variant.Specs, function(s){
                if(s.Required && !s.Value)
                    newErrors.push(s.Label || s.Name + ' is a required field');
            });
            $scope.variantErrors = newErrors;
        }
        $scope.$watch('Variant.Specs', function(o, n){
            validateVariant();
        }, true);
        function saveVariant(variant, saveNew, hideErrorAlert /*for compatibility*/) {
            if($scope.variantErrors.length){
                $scope.showVariantErrors = true;
                if(!hideErrorAlert)
                    $window.alert("please fill in all required fields"); //the default spec form should be made to deal with showing $scope.variantErrors, but it's likely existing spec forms may not deal with $scope.variantErrors
                return;
            }
            if(saveNew) $scope.Variant.InteropID = null;
            Variant.save(variant, function(data){
                if ($scope.isEditforApproval || $scope.EditingLineItem) {
                    if (saveNew) {
                        $location.path('/product/' + $scope.Product.InteropID + '/'+ data.InteropID + '/' + $scope.currentOrder.ID);
                    }
                    else {
                        $scope.currentOrder.LineItems[$scope.LineItemIndex].Variant = data;
                        Order.save($scope.currentOrder, function(o) {
                            $location.path('/cart/' + $scope.Product.InteropID + '/' + o.ID + '/' + $scope.LineItemIndex)
                        });
                    }
                }
                else {
                    $location.path('/product/' + $scope.Product.InteropID + '/'+ data.InteropID);
                }
            });
        }

        //accept variant from SpecFormPreview
        $scope.save = function(hideErrorWindowAlert, previewvariant) {
            var curVariant = {};
            if(previewvariant){
                curVariant = previewvariant.ExternalID ? previewvariant : $scope.Variant;
            }
            else{
                curVariant = $scope.Variant;
            }
            saveVariant(curVariant, false, hideErrorWindowAlert);
        }
        //accept variant from SpecFormPreview
        $scope.saveasnew = function(hideErrorAlert, previewvariant) {
            var curVariant = {};
            if(previewvariant){
                curVariant = previewvariant.ExternalID ? previewvariant : $scope.Variant;
            }
            else{
                curVariant = $scope.Variant;
            }
            saveVariant(curVariant, true, hideErrorAlert);
        }

        $scope.$on('event:imageLoaded', function(event, result) {
            $scope.loadingImage = !result;
            $scope.$apply();
        });
    }
}]);