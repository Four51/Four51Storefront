four51.app.directive('inlineerror', function () {
	return {
		restrict:'E',
		transclude:true,
		scope:{ title:'@' },
		template:'<p class="view-inline-error">{{title}}</p>',
		replace:true
	};
});