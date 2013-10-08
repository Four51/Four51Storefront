/* example usage:
 <div file-input="file"></div>
*/

four51.app.directive('customfilefield', function($parse, $451, fileReader, Security, resampler) {
	var obj = {
		scope: {
			customfield: '='
		},
		restrict: 'EA',
		template: '<div class="fileInput">{{customfield.Label}} <input type="file" /><br /><img ng-show="imageSrc" image-drop="imageSrc" ng-src="{{imageSrc}}" /></div>',
		replace: true,
		link: function(scope, element, attrs) {
			var file_input = $parse("file");

			scope.imageSrc = scope.customfield.File.Url + "&auth=" + Security.auth();

			var resampleImage = function (imageData) {
				return resampler.resample(
					imageData,
					500, 500,
					scope);
			};

			var placeImage = function (imageData) {
				scope.imageSrc = imageData;
				scope.customfield.Value = imageData;
			};

			var updateModel = function () {
				scope.$apply(function () {
					file_input.assign(scope, element[0].children[0].files[0]);
					fileReader.readAsDataUrl(element[0].children[0].files[0], scope)
						.then(resampleImage)
						.then(placeImage);
				});
			};
			element.bind('change', updateModel);
		}
	}
	return obj;
});