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

//navigation functions

function e2eClickSideNavCategory(intCatLevel,strCatName){
    var strNLevelsSelect = ""; //each level of depth is "ul li "
    var strSelector = "";
    for(var i = 0; i < intCatLevel; i++){
        strNLevelsSelect = strNLevelsSelect + "ul li "
    }

    if(strCatName != null){
        strSelector = ".nav-header " + strNLevelsSelect + "a:contains('" + strCatName + "')"
    }
    else{//if strcatname isn't specified just pick the first at the nth level
        strSelector = ".nav-header " + strNLevelsSelect + "a:first"
    }

    element(strSelector).click();
}
function e2eClickMainNavCategory(intNthCat,strCatName){
    var strSelector = "";

    if(strCatName != null){
        strSelector = "#451_lbl_subcatlist ul li a:contains('" + strCatName + "')"
    }
    else{//if strcatname isn't specified just pick the first at the nth level
        strSelector = "#451_lbl_subcatlist ul li:nth-child(" + intNthCat + ") a"
    }

    element(strSelector).click();
}

//product functions
function e2eClickProductFromList(intNthProd,strProdName){
    var strSelector = "";

    if(strProdName != null){
        strSelector = "#451_lst_prod li a:contains('" + strProdName + "')"
    }
    else{//if intNthProd isn't specified just pick the first at the nth level
        strSelector = "#451_lst_prod li:nth-child(" + intNthProd + ") a"
    }

    element(strSelector).click();
}