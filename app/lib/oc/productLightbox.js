angular.module('OrderCloud-ProductLightbox', [
    'ngTouch',
    'ui.bootstrap'
]);

angular.module('OrderCloud-ProductLightbox')
    .directive('productlightbox', productlightbox)
    .controller('LightboxCtrl', LightboxCtrl)
    .provider('Lightbox', Lightbox)
    .service('ImageLoader', ImageLoader)
    .directive('lightboxSrc', lightboxSrc)
;

function productlightbox() {
    var directive = {
        restrict: 'E',
        template: template
    };
    return directive;

    function template() {
        return [
            '<style>',
            '.galleryThumbs {width:100%;margin:0 auto;position: relative;text-align: center;}',
            '.galleryThumbs li {padding: 3px 5px;list-style-type: none;display:inline-block;}',
            '.galleryThumbs li:first-child {padding-left:0;}',
            '.galleryThumbs .img-thumbnail {border:1px solid #ccc;max-height:50px;max-width:50px;padding:0}',
            '.galleryThumbs .active .img-thumbnail {border:1px solid #6e6e6e;}',
            '.galleryImages li {list-style-type:none;}',
            '.galleryImages a {display:block;}',
            '.galleryImages a.no-click {cursor:none;pointer-events: none;}',
            '.galleryImages .product-image-large {display:none;}',
            '.galleryImages .active .product-image-large {display:block !important;max-height:100%;max-width:100%;position:relative;top:0;}',
            '</style>',
            '<div class="panel-body">',
            '<ul class="galleryImages">',
            '<li ng-repeat="image in LineItem.images">',
            '<a class="hidden-xs" ng-click="openLightboxModal($index)" ng-class="{active: $index==$parent.index}">',
            '<img ng-src="{{image.url}}" class="product-image-large img-responsive" />',
            '</a>',
            '<a class="no-click visible-xs" ng-class="{active: $index==$parent.index}">',
            '<img ng-src="{{image.url}}" class="product-image-large img-responsive" />',
            '</a>',
            '</li>',
            '</ul>',
            '</div>',
            '<div class="panel-footer">',
            '<ul class="galleryThumbs">',
            '<li ng-repeat="image in LineItem.images">',
            '<a ng-click="$parent.index=$index" ng-class="{active: $index==$parent.index}">',
            '<img ng-src="{{image.url}}" class="img-thumbnail img-responsive" />',
            '</a>',
            '</li>',
            '</ul>',
            '</div>'
        ].join('');
    }
}

LightboxCtrl.$inject = ['$scope', 'Lightbox'];
function LightboxCtrl($scope, Lightbox) {
    function LightboxImageScope($scope) {
        if ($scope.LineItem.Specs && $scope.LineItem.Specs.Color) {
            var varSpecName = "Color";
        }
        var specGroupName = "LightboxImages";

        if ($scope.LineItem.Specs || $scope.LineItem.Product && $scope.LineItem.Product.StaticSpecGroups) {

            $scope.LineItem.images = [];
            var count = 0;

            if ($scope.LineItem.Product.StaticSpecGroups[specGroupName]) {
                if (varSpecName) {
                    var specOption = $scope.LineItem.Specs[varSpecName].Value;
                }
                angular.forEach($scope.LineItem.Product.StaticSpecGroups[specGroupName].Specs, function (staticSpecs) {
                    var image = {};
                    image.Number = count;
                    image.url = staticSpecs.FileURL;
                    image.Selected = false;
                    image.Name = staticSpecs.Name;
                    var staticSpec = staticSpecs.Name; // this assumes that the name will match the variable spec value
                    if (staticSpec.indexOf(specOption) > -1) {
                        image.Selected = true;
                    }
                    $scope.LineItem.images.push(image);
                    count++;
                });
            }
            $scope.imageLoaded = true;
        }
    }

    //trigger the click for the first image
    if (!$scope.index) {
        $scope.index = 0;
    }

    $scope.openLightboxModal = function (index) {
        Lightbox.openModal($scope.LineItem.images, index);
    };

    $scope.$watch('LineItem.Product.StaticSpecGroups', function(n,o){
        if ( n!= o) {
            LightboxImageScope($scope);
        }
    });

    $scope.$watch('LineItem.Specs.Color.Value', function(n,o){
        if ( n!= o) {
            LightboxImageScope($scope);
            angular.forEach ($scope.LineItem.images, function(img) {
                if (img.Selected) {
                    $scope.index = img.Number;
                }
            });
        }
    });
}

function Lightbox() {
    this.getImageUrl = function (image) {
        return image.url;
    };
    this.getImageCaption = function (image) {
        return image.caption;
    };
    this.calculateImageDimensionLimits = function (dimensions) {
        if (dimensions.windowWidth >= 768) {
            return {
                'maxWidth': dimensions.windowWidth - 92,
                'maxHeight': dimensions.windowHeight - 126
            };
        } else {
            return {
                'maxWidth': dimensions.windowWidth - 52,
                'maxHeight': dimensions.windowHeight - 86
            };
        }
    };
    this.calculateModalDimensions = function (dimensions) {
        var width = Math.max(400, dimensions.imageDisplayWidth + 32);
        var height = Math.max(200, dimensions.imageDisplayHeight + 66);
        if (width >= dimensions.windowWidth - 20 || dimensions.windowWidth < 768) {
            width = 'auto';
        }
        if (height >= dimensions.windowHeight) {
            height = 'auto';
        }
        return {
            'width': width,
            'height': height
        };
    };
    this.$get = ['$document', '$modal', '$timeout', 'ImageLoader', function ($document, $modal, $timeout, ImageLoader) {
        var Lightbox = {};
        Lightbox.images = [];
        Lightbox.index = -1;
        Lightbox.getImageUrl = this.getImageUrl;
        Lightbox.getImageCaption = this.getImageCaption;
        Lightbox.calculateImageDimensionLimits = this.calculateImageDimensionLimits;
        Lightbox.calculateModalDimensions = this.calculateModalDimensions;
        Lightbox.keyboardNavEnabled = false;
        Lightbox.image = {};
        Lightbox.modalInstance = null;
        Lightbox.openModal = function (newImages, newIndex) {
            Lightbox.images = newImages;
            Lightbox.setImage(newIndex);
            Lightbox.modalInstance = $modal.open({
                'template': imagelightboxtemplate,
                'controller': ['$scope', function ($scope) {
                    $scope.Lightbox = Lightbox;
                    Lightbox.keyboardNavEnabled = true;
                }],
                'windowClass': 'lightbox-modal'
            });
            Lightbox.modalInstance.result['finally'](function () {
                Lightbox.images = [];
                Lightbox.index = 1;
                Lightbox.image = {};
                Lightbox.imageUrl = null;
                Lightbox.imageCaption = null;

                Lightbox.keyboardNavEnabled = false;
            });
            return Lightbox.modalInstance;
        };
        Lightbox.closeModal = function (result) {
            return Lightbox.modalInstance.close(result);
        };
        Lightbox.setImage = function (newIndex) {
            if (!(newIndex in Lightbox.images)) {
                throw 'Invalid image.';
            }
            var success = function () {
                Lightbox.index = newIndex;
                Lightbox.image = Lightbox.images[Lightbox.index];
            };

            var imageUrl = Lightbox.getImageUrl(Lightbox.images[newIndex]);
            ImageLoader.load(imageUrl).then(function () {
                success();
                Lightbox.imageUrl = imageUrl;
                Lightbox.imageCaption = Lightbox.getImageCaption(Lightbox.image);
            }, function () {
                success();
                Lightbox.imageUrl = '//:0';
                Lightbox.imageCaption = 'Failed to load image';
            });
        };
        Lightbox.firstImage = function () {
            Lightbox.setImage(0);
        };
        Lightbox.prevImage = function () {
            Lightbox.setImage((Lightbox.index - 1 + Lightbox.images.length) %
                Lightbox.images.length);
        };
        Lightbox.nextImage = function () {
            Lightbox.setImage((Lightbox.index + 1) % Lightbox.images.length);
        };
        Lightbox.lastImage = function () {
            Lightbox.setImage(Lightbox.images.length - 1);
        };
        Lightbox.setImages = function (newImages) {
            Lightbox.images = newImages;
            Lightbox.setImage(Lightbox.index);
        };
        $document.bind('keydown', function (event) {
            if (!Lightbox.keyboardNavEnabled) {
                return;
            }
            var method = null;
            switch (event.which) {
                case 39: // right arrow key
                    method = 'nextImage';
                    break;
                case 37: // left arrow key
                    method = 'prevImage';
                    break;
            }
            if (method !== null && ['input', 'textarea'].indexOf(
                    event.target.tagName.toLowerCase()) === -1) {
                // the view doesn't update without a manual digest
                $timeout(function () {
                    Lightbox[method]();
                });
                event.preventDefault();
            }
        });
        return Lightbox;
    }];
}

function imagelightboxtemplate () {
    return [
        '<style>',
        '.modal-body {background: none repeat scroll 0 0; background-color: white !important; width:100%; height:auto;}',
        '.lightbox-nav {position: relative;margin-bottom: 12px;text-align: center;font-size: 0;}',
        '.lightbox-nav .btn-group {vertical-align: top;}',
        '.lightbox-image-container {position: relative;text-align: center;}',
        '.lightbox-image-caption {position: absolute;top: 0;left: 0;margin: 0.5em 0.9em;color: #000;font-size: 1.5em;font-weight: bold;text-align: left;' +
        'text-shadow: 0.1em 0.1em 0.2em rgba(255, 255, 255, 0.5);}',
        '.lightbox-image-caption span {padding:0.1em 0; background-color: rgba(255, 255, 255, 0.75);box-shadow: 0.4em 0 0 rgba(255, 255, 255, 0.75),-0.4em 0 0 rgba(255, 255, 255, 0.75);}',
        '</style>',
        '<div class="modal-body" ng-swipe-left="Lightbox.nextImage()" ng-swipe-right="Lightbox.prevImage()">',
        '<div class="lightbox-nav">',
        '<div class="btn-group">',
        '<a class="btn btn-xs btn-default" ng-click="Lightbox.prevImage()"><i class="fa fa-chevron-left"></i> Previous</a>',
        '<a ng-href="{{Lightbox.imageUrl}}" target="_blank" class="btn btn-xs btn-default" title="Open in new tab">Open image in new tab</a>',
        '<a class="btn btn-xs btn-default" ng-click="Lightbox.nextImage()">Next <i class="fa fa-chevron-right"></i></a>',
        '<a class="btn btn-xs btn-default pull-right" aria-hidden="true" ng-click="$dismiss()">Close <i class="fa fa-times"></i></a>',
        '</div>',
        '</div>',
        '<div class="lightbox-image-container">',
        '<div class="lightbox-image-caption"><span>{{Lightbox.imageCaption}}</span></div>',
        '<img lightbox-src="{{Lightbox.imageUrl}}" alt="">',
        '</div>',
        '</div>',
        '</div>'
    ].join('');
}

ImageLoader.$inject = ['$q'];
function ImageLoader ($q){
    this.load = function (url) {
        var deferred = $q.defer();
        var image = new Image();
        image.onload = function () {
            if ((typeof this.complete === 'boolean' && this.complete === false) ||
                (typeof this.naturalWidth === 'number' && this.naturalWidth === 0)) {
                deferred.reject();
            }
            deferred.resolve(image);
        };
        image.onerror = function () {
            deferred.reject();
        };
        image.src = url;
        return deferred.promise;
    };
}

lightboxSrc.$inject = ['$window', 'ImageLoader', 'Lightbox'];
function lightboxSrc($window, ImageLoader, Lightbox) {
    var calculateImageDisplayDimensions = function (dimensions) {
        var w = dimensions.width;
        var h = dimensions.height;
        var minW = dimensions.minWidth;
        var minH = dimensions.minHeight;
        var maxW = dimensions.maxWidth;
        var maxH = dimensions.maxHeight;

        var displayW = w;
        var displayH = h;

        if (w < minW && h < minH) {
            if (w / h > maxW / maxH) {
                displayH = minH;
                displayW = Math.round(w * minH / h);
            } else {
                displayW = minW;
                displayH = Math.round(h * minW / w);
            }
        } else if (w < minW) {
            displayW = minW;
            displayH = Math.round(h * minW / w);
        } else if (h < minH) {
            displayH = minH;
            displayW = Math.round(w * minH / h);
        }
        if (w > maxW && h > maxH) {
            if (w / h > maxW / maxH) {
                displayW = maxW;
                displayH = Math.round(h * maxW / w);
            } else {
                displayH = maxH;
                displayW = Math.round(w * maxH / h);
            }
        } else if (w > maxW) {
            displayW = maxW;
            displayH = Math.round(h * maxW / w);
        } else if (h > maxH) {
            displayH = maxH;
            displayW = Math.round(w * maxH / h);
        }

        return {
            'width': displayW || 0,
            'height': displayH || 0 // NaN is possible when dimensions.width is 0
        };
    };
    var imageWidth = 0;
    var imageHeight = 0;

    return {
        'link': function (scope, element, attrs) {
            var resize = function () {
                var windowWidth = $window.innerWidth;
                var windowHeight = $window.innerHeight;
                var imageDimensionLimits = Lightbox.calculateImageDimensionLimits({
                    'windowWidth': windowWidth,
                    'windowHeight': windowHeight,
                    'imageWidth': imageWidth,
                    'imageHeight': imageHeight
                });
                var imageDisplayDimensions = calculateImageDisplayDimensions(
                    angular.extend({
                        'width': imageWidth,
                        'height': imageHeight,
                        'minWidth': 1,
                        'minHeight': 1,
                        'maxWidth': 3000,
                        'maxHeight': 3000,
                    }, imageDimensionLimits)
                );
                var modalDimensions = Lightbox.calculateModalDimensions({
                    'windowWidth': windowWidth,
                    'windowHeight': windowHeight,
                    'imageDisplayWidth': imageDisplayDimensions.width,
                    'imageDisplayHeight': imageDisplayDimensions.height
                });
                element.css({
                    'width': imageDisplayDimensions.width + 'px',
                    'height': imageDisplayDimensions.height + 'px'
                });
                angular.element(
                    document.querySelector('.lightbox-modal .modal-dialog')
                ).css({
                        'width': modalDimensions.width + 'px'
                    });
                angular.element(
                    document.querySelector('.lightbox-modal .modal-content')
                ).css({
                        'height': modalDimensions.height + 'px'
                    });
            };
            scope.$watch(function () {
                return attrs.lightboxSrc;
            }, function (src) {
                element[0].src = '//:0';

                ImageLoader.load(src).then(function (image) {
                    imageWidth = image.naturalWidth;
                    imageHeight = image.naturalHeight;
                    resize();
                    element[0].src = src;
                });
            });
            angular.element($window).on('resize', resize);
        }
    };
}