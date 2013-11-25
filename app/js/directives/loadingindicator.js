four51.app.directive('loadingindicator', function () {
    return {
        restrict:'E',
        scope:{ title:'@title' },
        template:'<div class="container col-xs-12 app-loading-indicator-cell"><span class="app-loading-indicator"></span></div>',
        replace:true
    };
});
