four51.app.directive('customfilefield', function($parse, $451, fileReader, Security) {
	var obj = {
		scope: {
			customfield: '='
		},
		restrict: 'EA',
		templateUrl: 'partials/controls/fileUpload.html',
		replace: true,
		link: function(scope, element, attrs) {
			var file_input = $parse("file");
			var file_control = element[0].children[1];

			scope.imageSrc = scope.customfield.File.Url + "&scale=" + scope.customfield.File.Scale + "&auth=" + Security.auth();

			var placeImage = function (imageData) {
				scope.imageSrc = imageData;
				scope.customfield.Value = imageData;
			};

			var updateModel = function () {
				if (file_control.files[0] == null) return;
				scope.$apply(function () {
					var extension = file_control.files[0].name.split('.')[1] || '';
					// all the client side validation we can do
					var errors = [];
					if (!scope.customfield.AllowedExt.contains(extension))
						errors.push("File type not allowed.");
					if (scope.customfield.MaxSize < file_control.files[0].size)
						errors.push('File size is limited to ' + scope.customfield.MaxSize + ' and the file you chose is ' + file_control.files[0].size + '.');
					if (errors.length > 0) {
						throw new Error(errors.join(' '));
						return;
					}

					scope.customfield.OriginalName = file_control.files[0].name;
					scope.customfield.File.Extension = extension;
					scope.customfield.File.ContentType = file_control.files[0].type;
					scope.customfield.File.FileSize = file_control.files[0].size;
					// i'm going to null out some properties of the image that aren't accessible in the browser to avoid possible confusion
					scope.customfield.File.ImageWidth = "";
					scope.customfield.File.ImageHeight = "";
					scope.customfield.File.DotsPerInch = "";

					file_input.assign(scope, file_control.files[0]);
					fileReader.readAsDataUrl(file_control.files[0], scope)
						.then(placeImage);
				});
			};
			element.bind('change', updateModel);
		},
		controller: function($scope) {

		}
	}
	return obj;
});