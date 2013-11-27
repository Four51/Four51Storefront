four51.app.directive('loadingindicator', function () {
    return {
        restrict:'A',
        scope: {
	        title: '@title'
        },
        template:'<div class="container col-xs-12 app-loading-indicator-cell"><span class="app-loading-indicator"></span><p class="app-loading-indicator-title">{{title}}</p></div>'
    };
});
