four51.app.directive('customfilefield', ['$parse', '$resource', '$451', 'fileReader', 'Security',
function($parse, $resource, $451, fileReader, Security) {
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
			var replace_box = $('.replace', element)[0];
			var delete_box = $('.delete', element)[0];
			var file_control = $('.upload', element)[0];
			var error_element = $('.error', element)[0];

			var afterSelection = function(file) {
                scope.uploadFileIndicator = true;
                $resource($451.api('uploadfile')).save({ Data: file.result, Name: file_control.files[0].name, ID: scope.customfield.ID, SourceType: scope.customfield.SourceType, SourceID: scope.customfield.SourceID }).$promise.then(function(u) {
                    u.Url += "&auth=" + Security.auth();
					scope.customfield.File = u;
					scope.customfield.Value = u.ID;
                    scope.uploadFileIndicator = false;
				}).catch(function(ex) {
					error_element.innerHTML = (!ex.data.Message) ?
						"An error occurred. Please select a new file and try again." :
						ex.data.Message;
                        scope.uploadFileIndicator = false;
				});
			}

			var reset = function() {
				scope.$apply(function() {
					scope.customfield = angular.copy(cache);
				});
			}

			var updateModel = function (event) {
				error_element.innerHTML = "";
				switch (event.target.name) {
					case "delete":
						scope.replace = false;
						if (event.target.checked) {
							scope.$apply(function() {
								scope.customfield.File = null;
                                scope.customfield.Value = null;
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
						if (!event.target.checked && cache.Value) {
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
						scope.replace = replace_box.checked = false;
                        scope.delete = delete_box.checked = false;
						break;
				}
			}
			element.bind('change', updateModel);
		}
	};

	return obj;
}]);