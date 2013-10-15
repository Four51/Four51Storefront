four51.app.directive('customfilefield', function($parse, $resource, $451, fileReader, Security) {
	var obj = {
		scope: {
			customfield: '=',
			replace: '@ngModel'
		},
		restrict: 'E',
		templateUrl: 'partials/controls/fileUpload.html',
		replace: true,
		link: function(scope, element, attrs) {
			var cache = angular.copy(scope.customfield);
			var file_input = $parse("file");
			var replace_box = element[0].children[3];
			var delete_box = element[0].children[4];
			var file_control = element[0].children[6];
			var error_element = element[0].children[8].children[0];

			var afterSelection = function(file) {
				$resource($451.api('uploadfile')).save({ Data: file.result, Name: file_control.files[0].name, ID: scope.customfield.ID }).$promise.then(function(u) {
					u.Url += "&auth=" + Security.auth();
					scope.customfield.File = u;
					scope.customfield.Value = u.ID;
				}).catch(function(ex) {
					error_element.innerHTML = (ex.status == 500) ?
						"An error occurred. Please select a new file and try again." :
						ex.data.Message;
				});
			}

			var reset = function() {
				scope.$apply(function() {
					scope.customfield = angular.copy(cache);
				});
			}

			var updateModel = function (event) {
				error_element.innerHTML = "";
				switch (event.target.id) {
					case "delete":
						scope.replace = false;
						if (event.target.checked) {
							scope.$apply(function() {
								scope.customfield.File = null;
								replace_box.checked = false;
							});
							break;
						}
						reset();
						break;
					case "replace":
						if (delete_box.checked) {
							scope.customfield = cache;
							reset();
							delete_box.checked = false;
						}
						if (!event.target.checked) {
							reset();
						}
						break;
					case "upload":
						if (event.target.files[0] == null) return;
						scope.$apply(function () {
							fileReader.readAsDataUrl(event.target.files[0], scope)
								.then(afterSelection);
							file_input.assign(scope,  event.target.files[0]);
						});
						break;
				}
			}
			element.bind('change', updateModel);
		}
	}
	return obj;
});