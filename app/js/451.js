/* Four51 Global Namespace */

four51.app.factory('$451', function(Cache) {
	function json_filter(input, options, op) {
		if (input == null || options == null) return;
		var result = [];
		angular.forEach(input, function(row) {
            if (row[options.Property] === undefined) return;
			if ((row[options.Property].toString()).toLowerCase() === (options.Value.toString()).toLowerCase()){
				result.push(row);
				if(op) op(row)
			}
		});
		return result;
	}

	function clearStorageMechanisms() {
		Cache.removeAll();
		localStorage.clear();
	}

	function putCache(id,val,options) {
		// probably going to need to test for object type. i'm not sure strings will stringify
		var current = new Date();
		options.persists ?
			localStorage.setItem(id, JSON.stringify({ ttl: options.ttl ? addMillisecondsToDate(options.ttl).getTime() : null, data: val })) :
			Cache.put(id,val);
		return val;
	}

	function getCache(id) {
		// probably going to need to test for object type. pretty sure JSON.parse will yack on a string
		var temp = Cache.get(id);
		if (temp) return temp;

		var local = JSON.parse(localStorage.getItem(id));
		if (local === null) return null;

		return checkCacheTTL(local);
	}

	function checkCacheTTL(cache) {
		if (cache.ttl === null) return cache.data;
		var current = new Date();
		if (cache.ttl - current.getTime() >= 0)
			return cache.data;
		return null;
	}

	function addMillisecondsToDate(ms) {
		var d = new Date();
		d.setMilliseconds(d.getMilliseconds() + ms);
		return d;
	}

    function arrayContainsValue(array, value) {
        return array.indexOf(value) > -1;
    }
	function calcTotal(ps, variant, product, lineItem, debugLineTotal){

		console.log('calc total called');

		var unitPrice = 0;
		// AmountPerQuantity(fixed amount per unit)
		// AmountTotal (fixed amount per line)
		// Percentage (of line total)
		var fixedAddPerLine = 0;
		var percentagePerLine = 0;
		var amountPerQty = 0;
		var priceBreak;
		var otherValueMarkup = 0;
		//var specs = $scope.variant ? $scope.variant.Specs : [];

		var addToMarkups = function(spec){
			console.log('calc spec: ' + spec.Name)
			console.dir(spec)
			if(spec.AllowOtherValue && spec.OtherTextValue && spec.OtherValueMarkup > 0){
				otherValueMarkup += spec.OtherValueMarkup;
			}else if(spec.Options.length && spec.Value){

				var option = json_filter(spec.Options, {Property: 'ID', Value: spec.Value})[0];
				if(!option)
					return;
				//console.dir({markuptype: spec.MarkupType, note: 'markup option', option: option})
				if(spec.MarkupType ==="AmountPerQuantity" )
					amountPerQty += option.PriceMarkup;
				if(spec.MarkupType ==="Percentage" )
					percentagePerLine += option.PriceMarkup;
				if(spec.MarkupType ==="AmountTotal")
					fixedAddPerLine += option.PriceMarkup;
			}
		};
		if(variant) angular.forEach(variant.Specs, addToMarkups );
		angular.forEach(product.Specs, addToMarkups );

		angular.forEach(ps.PriceBreaks, function(pb){

			if(lineItem.Quantity >= pb.Quantity)
				priceBreak = pb; //assumes they will be in order of smallest to largest
		});
		if(!priceBreak){
			console.log('no price break found');
			lineItem.LineTotal = 0;
			return;
		}
		var total = lineItem.Quantity * (priceBreak.Price + amountPerQty);
		total += lineItem.Quantity * priceBreak.Price * (percentagePerLine / 100);
		total += fixedAddPerLine + otherValueMarkup;

		debugLineTotal = "quantity: " + lineItem.Quantity +"<br>" +
			"amount added per quantity: " + amountPerQty + "<br>" +
			"fixed ammount per line added: " + fixedAddPerLine + "<br>" +
			"percentage added to qty*unitprice: " + percentagePerLine + "<br>" +
			"other value markups: " + otherValueMarkup + "<br>" +
			"unit price: " + priceBreak.Price;

		lineItem.LineTotal = total;
	}

	return {
		debug: true,
		appname: four51.app.name,
		api: function(path) {
            //todo: get appname with out using window?
            return '/api/' + window.location.pathname.split('/')[1] + "/" + path;
		},
		// cache is temporary. even refreshing the browser will clear the cache
		// getter attempts to retrieve based on the persistent state longevity of each type { cache, localstorage }
		cache: function(id, val, options) {
			return val ?
				putCache(id, val, options) :
				getCache(id);
		},
		clear: function(key) {
			!key ?
				clearStorageMechanisms():
				Cache.remove(key); localStorage.removeItem(key);
			return this;
		},
		filter: function(input, options, op) {
			return json_filter(input, options, op);
		},
        contains: function(array, value) {
            return arrayContainsValue(array, value);
        },
		calculateLineTotal: function(qty, ps, variant, product, lineItem, debugLineTotal){
			return calcTotal(qty, ps, variant, product, lineItem, debugLineTotal);
		}
	};
});
