/**
 * Created with JetBrains WebStorm.
 * User: rmelanson
 * Date: 6/13/13
 * Time: 10:31 AM
 * To change this template use File | Settings | File Templates.
 */
//this file should contain common shared matchers and support functions

//ngScenario for Test Runner doesn't like nested IT blocks, so DON'T DO IT, it will fail miserably and not tell you why.

angular.scenario.dsl('scope', function() {
    return function(selector, entry) {
        return this.addFutureAction('find scope variable for \'' + selector + '\'',
            function($window, $document, done) {
                var $ = $window.$; // jQuery inside the iframe
                var elem = $(selector);
                if (!elem.length) {
                    return done('No element matched \'' + selector + '\'.');
                }
                var entries = entry.split('.');
                var prop = elem.scope();
                for (var i in entries) {
                    prop = prop[entries[i]];
                }
                done(null, prop);
            });
    };
});
angular.scenario.matcher('toEqualFuture', function(future) {
    return this.actual === future.value;
});
angular.scenario.matcher('toBeGreaterThanFuture', function(future) {
    return +this.actual > +future.value;
});
function includes(array, obj) {
    return indexOf(array, obj) != -1;
}
function indexOf(array, obj) {
    if (array.indexOf) return array.indexOf(obj);

    for ( var i = 0; i < array.length; i++) {
        if (obj === array[i]) return i;
    }
    return -1;
}
angular.scenario.matcher('toContainFuture', function(future) {
    return includes(this.actual, future.value);
});
