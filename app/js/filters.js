four51.app.filter('onproperty', ['$451', function($451) {
	var defaults = {
		'OrderStats': 'Type',
		'Message': 'Box'
	};

	return function(input, query) {
		if (!input || input.length === 0) return;
		if (!query) return input;
		query.Property = query.Property || defaults[query.Model];
		return $451.filter(input, query);
	}
}]);

four51.app.filter('kb', function() {
	return function(value) {
		return isNaN(value) ? value : parseFloat(value) / 1024;
	}
});

four51.app.filter('r', ['$sce', 'WhiteLabel', function($sce, WhiteLabel) {
	return function(value) {
		var result = value, found = false;
		angular.forEach(WhiteLabel.replacements, function(c) {
			if (found) return;
			if (c.key == value) {
				result = $sce.trustAsHtml(c.value);
				found = true;
			}
		});
		return result;
	}
}]);

four51.app.filter('rc', ['$sce', 'WhiteLabel', function($sce, WhiteLabel) {
	return function(value) {
		var result = value, found = false;
		angular.forEach(WhiteLabel.replacements, function(c) {
			if (found) return;
			if (c.key.toLowerCase() == value.toLowerCase()) {
				result = $sce.trustAsHtml(c.value);
				found = true;
			}
		});
		return result;
	}
}]);

four51.app.filter('rl', ['$sce', 'WhiteLabel', function($sce, WhiteLabel) {
	return function(value) {
		var result = value, found = false;
		angular.forEach(WhiteLabel.replacements, function(c) {
			if (found) return;
			if (c.key.toLowerCase() == value.toLowerCase()) {
				result = $sce.trustAsHtml(c.value.toLowerCase());
				found = true;
			}
		});
		return result;
	}
}]);

four51.app.filter('noliverates', function() {
	return function(value) {
		var output = [];
		angular.forEach(value, function(v) {
			if (v.ShipperRateType != 'ActualRates')
				output.push(v);
		});
		return output;
	}
});

four51.app.filter('paginate', function() {
	return function(input, start) {
		if (typeof input != 'object' || !input) return;
		start = +start; //parse to int
		return input.slice(start);
	}
});

four51.app.factory('XLATService', ['$interpolate', function($interpolate) {

    var currentLanguage = "en-US";
    var currentCulture = "en-US";
    var tables = $.extend(true, {}, XLATTables);

    var _getCurrentLanguage = function(userLanguage, userCulture) {
        currentLanguage =  userLanguage ? userLanguage : currentLanguage;
        currentCulture =  userCulture ? userCulture : currentCulture;
        return [currentCulture, tables["Currency"][currentCulture], tables["Date"][currentCulture]];
    };

    var _setCurrentLanguage = function(newCurrentLanguage) {
        currentLanguage = newCurrentLanguage;
    };

    function upperCase(char) {
        char = char.charAt(0);
        return char == char.toUpperCase();
    }

    var _xlat = function(value, parameters) {
        if (currentLanguage == 'en-US' || !tables[currentLanguage]) return value;
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

four51.app.filter('culturecurrency', ['XLATService', function(XLATService) {
    return function(value) {
        if  (value || value == 0) {
            /**
             * Number.prototype.format(n, x, s, c)
             *
             * @param integer n: length of decimal
             * @param integer x: length of whole part
             * @param mixed   s: sections delimiter
             * @param mixed   c: decimal delimiter
             **/
            Number.prototype.formatCurrency = function(n, x, s, c) {
                var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
                    num = this.toFixed(Math.max(0, ~~n));

                return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
            };

            var culture = XLATService.getCurrentLanguage()[0];
            var currencyPrefix = XLATService.getCurrentLanguage()[1];

            var result = "";
            switch(culture) {
                case "en-US":
                    result = currencyPrefix + value.formatCurrency(2, 3, ',', '.');
                    break;
                case "en-GB":
                    result = currencyPrefix + value.formatCurrency(2, 3, ',', '.');
                    break;
                case "nl-NL":
                    result = currencyPrefix + value.formatCurrency(2, 3, '.', ',');
                    break;
                case "en-IE":
                    result = currencyPrefix + value.formatCurrency(2, 3, ',', '.');
                    break;
                case "pt-BR":
                    result = currencyPrefix + value.formatCurrency(2, 3, '.', ',');
                    break;
                case "zh-CN":
                    result = currencyPrefix + value.formatCurrency(2, 3, ',', '.');
                    break;
                case "es-MX":
                    result = currencyPrefix + value.formatCurrency(2, 3, ',', '.');
                    break;
                case "fr-FR":
                    result = currencyPrefix + value.formatCurrency(2, 3, ' ', ',');
                    break;
                default:
                    result = value;
                    break;
            }
            return result;
        }
    }
}]);

