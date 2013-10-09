/* example usage:
 <div file-input="file"></div>
*/

four51.app.directive('customfilefield', function($parse, $451, fileReader, Security) {
	var obj = {
		scope: {
			customfield: '='
		},
		restrict: 'EA',
		template: '<div class="fileInput">{{customfield.Label}} <input type="file" /><br /><img ng-show="imageSrc" image-drop="imageSrc" ng-src="{{imageSrc}}" /></div>',
		replace: true,
		link: function(scope, element, attrs) {
			var file_input = $parse("file");

			scope.imageSrc = scope.customfield.File.Url + "&scale=10&auth=" + Security.auth();

			var placeImage = function (imageData) {
				scope.imageSrc = imageData;
				scope.customfield.Value = imageData;
			};

			var updateModel = function () {
				scope.$apply(function () {
					file_input.assign(scope, element[0].children[0].files[0]);
					fileReader.readAsDataUrl(element[0].children[0].files[0], scope)
						.then(placeImage);
				});
			};
			element.bind('change', updateModel);
		}
	}
	return obj;
});