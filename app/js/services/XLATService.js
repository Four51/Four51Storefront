four51.app.factory('XLATService', ['$interpolate', function($interpolate) {

    var currentLanguage = "en-US";
    var tables = $.extend(true, {}, XLATTables);

    var _getCurrentLanguage = function(userLanguage) {
        currentLanguage =  userLanguage;
        return currentLanguage;
    };

    var _setCurrentLanguage = function(newCurrentLanguage) {
        currentLanguage = newCurrentLanguage;
    };

    function upperCase(char) {
        char = char.charAt(0);
        if (char == char.toUpperCase()) {
            return true;
        }
        else {
            return false;
        }
    }

    var _xlat = function(value, parameters) {
        if (currentLanguage == 'en-US' || !tables[currentLanguage]) return value;
        //if (value.indexOf('or both') == -1) return value;
        var table = tables[currentLanguage];
        var isUpperCase = value ? upperCase(value) : false;
        var original = value;
        value = value ? value.toLowerCase() : value;
        while(table.hasOwnProperty(value) && $.isFunction(table[value])) {
            value = table[value](parameters);
        }
        if(table.hasOwnProperty(value)) {
            if(parameters == null || $.isEmptyObject(parameters)) {
                var result = table[value.toLowerCase()];
                result = isUpperCase ? result.charAt(0).toUpperCase() + result.slice(1) : result;
                return result;
            } else {
                var result = $interpolate(table[value].toLowerCase())(parameters);
                result = isUpperCase ? result.charAt(0).toUpperCase() + result.slice(1) : result;
                return result;
            }
        } else {
            var result = isUpperCase ? original.charAt(0).toUpperCase() + original.slice(1) : original;
            return result;
        }
    };

    return {
        getCurrentLanguage: _getCurrentLanguage,
        setCurrentLanguage: _setCurrentLanguage,
        xlat: _xlat
    }
}]);

four51.app.filter('xlat', ['XLATService', function(XLATService) {
    return function(value, parameters) {
        return XLATService.xlat(value, parameters);
    };
}]);