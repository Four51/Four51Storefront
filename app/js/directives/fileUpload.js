four51.app.directive('customfilefield2', function($parse,$resource, $451, fileReader, Security) {
	var obj = {
		restrict: 'E',
		templateUrl: 'partials/controls/fileUpload.html',
		replace: true,
		link: function(scope, element, attrs) {
			var file_input = $parse("file");
			var result = {};

			var afterSelection = function(file) {
				var f = {
					data: file.result
				}
				$resource($451.api('uploadedfile')).save(f).$promise.then(function(u) {
					result = u;
					console.log(result);
				});
			}

			var updateModel = function (event) {
				if (event.target.id != 'upload' || event.target.files[0] == null) return;
				scope.$apply(function () {
					fileReader.readAsDataUrl(event.target.files[0], scope)
						.then(afterSelection);
					file_input.assign(scope,  event.target.files[0]);
				});
			}
			element.bind('change', updateModel);
		}
	}
	return obj;
});