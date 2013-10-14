four51.app.directive('customfilefield', function($parse, $q, $451, fileReader, Security) {
	var obj = {
		scope: {
			customfield: '='
		},
		restrict: 'EA',
		templateUrl: 'partials/controls/fileUpload.html',
		replace: true,
		link: function(scope, element, attrs) {
			var cache = angular.copy(scope.customfield);
			var file_input = $parse("file");
			var image_element = element[0].children[0];
			var replace_box = element[0].children[3]
			var delete_box = element[0].children[4]
			var file_control = element[0].children[6];
			var error_element = element[0].children[8].children[0];
			image_element.src = concatUrl(scope.customfield);

			function concatUrl(field) {
				return field.File.Url + "&scale=" + field.PreviewReduction + "&auth=" + Security.auth();
			}
			function parseExtension() {
				var fileSplit = file_control.files[0].name.split('.');
				return fileSplit[fileSplit.length] || '';
			}
			function createImage(file, callback) {
				var image = new Image();
				image.src = file;
				image.onload = function() {
					callback(this, file);
				}
			}
			function validateImage(image, file) {
				var errors = [];
				if (!scope.customfield.AllowedExt.contains(parseExtension()))
					errors.push("File type not allowed.");
				if (scope.customfield.MaxSize < file.size)
					errors.push('File size can cannot exceed ' + scope.customfield.MaxSize +' KB');
				if (image.width > scope.customfield.MaxWidth)
					errors.push('Image width cannot exceed ' + scope.customfield.MaxWidth + ' pixels;');
				if (image.width > scope.customfield.MaxHeight)
					errors.push('Image height cannot exceed ' + scope.customfield.MaxHeight + ' pixels;');
				return errors;
			}
			var afterSelection = function (file) {
				createImage(file.result, function(image, file) {
					var errors = validateImage(image, file_control.files[0]);
					if (errors.length > 0) {
						//TODO: evaluate whether the angular form validation is usable here instead of the message display
						error_element.innerHTML = errors.join(' ');
					}
					else {
						if (scope.customfield.FileType == 'Image') {
							image_element.src = file;
							scope.customfield.File.ImageWidth = image.width;
							scope.customfield.File.ImageHeight = image.height;
							image_element[image.width > image.height ? 'width' : 'height'] = image[image.width > image.height ? 'width' : 'height'] * scope.customfield.PreviewReduction / 100;
							scope.customfield.File.DotsPerInch = "";
						}
						scope.customfield.Value = file;
						scope.customfield.File.OriginalName = file_control.files[0].name;
						scope.customfield.File.Extension = parseExtension(file_control.files[0].name);
						scope.customfield.File.ContentType = file_control.files[0].type;
						scope.customfield.File.FileSize = file_control.files[0].size;
						file_input.assign(scope, file_control.files[0]);
					}
				});
			}

			var updateModel = function (event) {
				error_element.innerHTML = "";
				switch (event.target.id) {
					case "delete":
						if (event.target.checked) {
							scope.customfield.File == null;
							image_element.src = null;
							replace_box.checked = false;
							break;
						}
						scope.customfield = cache;
						image_element.src = concatUrl(scope.customfield);
						break;
					case "replace":
						if (delete_box.checked) {
							scope.customfield = cache;
							image_element.src = concatUrl(scope.customfield);
							delete_box.checked = false;
						}
						break;
					case "upload":
						if (event.target.files[0] == null) return;
						scope.$apply(function () {
							fileReader.readAsDataUrl(event.target.files[0], scope)
								.then(afterSelection);
						});
						break;
				}
			};
			element.bind('change', updateModel);
		},
		controller: function($scope) {
			$scope.concatUrl = function() {
				return $scope.customfield.File.Url + "&auth=" + Security.auth();
			}
		}
	}
	return obj;
});