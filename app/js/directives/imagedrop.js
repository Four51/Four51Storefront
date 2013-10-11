
four51.app.directive("imageDrop", function ($parse, fileReader) {
	return {
		restrict: "EA",
		link: function (scope, element, attrs) {
			var expression = attrs.imageDrop;
			var accesor = $parse(expression);

			var onDragOver = function (e) {
				e.preventDefault();
				element.addClass("dragOver");
			};

			var onDragEnd = function (e) {
				e.preventDefault();
				element.removeClass("dragOver");
			};

			var placeImage = function (imageData) {
				accesor.assign(scope, imageData);
			};

			var loadFile = function (file) {
				fileReader
					.readAsDataUrl(file, scope)
					.then(placeImage);
			};


			element.bind("dragover", onDragOver)
				.bind("dragleave", onDragEnd)
				.bind("drop", function (e) {
					onDragEnd(e);
					loadFile(e.originalEvent.dataTransfer.files[0]);
				});

			scope.$watch(expression, function () {
				element.attr("src", accesor(scope));
			});
		}
	};
});
