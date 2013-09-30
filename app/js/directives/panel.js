four51.app.directive('panel', function () {
	return {
		restrict:'E',
		transclude:true,
		scope:{ title:'@title' },
		template:'<li class="nav-header visible-phone visible-tablet animated fadeIn">' +
			'<a ng-href=#/catalog ng-transclude></a>' +
			'</li>',
		replace:true
	};
});
