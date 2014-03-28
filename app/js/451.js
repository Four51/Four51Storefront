four51.app.factory('$451', ['AppConst', function(AppConst) {
	function json_filter(input, options, op) {
		if (input == null || options == null) return;
		var result = [];

		angular.forEach(input, function(row) {
            if (row[options.Property] === undefined && !options instanceof Array) return;

			var checkRow = function(opt){
				if (row[opt.Property] === opt.Value) {
					return row;
				}
			}

			var add;
			if (options instanceof Array){ //does an OR on the list of conditions. could add to it to optionally have OR/AND
				for(var i = 0; i < options.length; i++){
					add = checkRow(options[i]);
					if(add)
						break;
				}
			}else{
				add = checkRow(options);
			}

			if(add){
				result.push(row);
				if(op) op(row)
			}
		});
		return result;
	}

    function arrayContainsValue(array, value) {
        if (angular.isArray(value)) {
            var found = false;
            angular.forEach(value, function(v) {
                found = !found ? array.indexOf(v) > -1 : found;
            })
            return found;
        }
        else
            return array.indexOf(value) > -1;
    }
	var _isPositiveInteger = function(n) {
		return n >>> 0 === parseFloat(n);
	}

	return {
		debug: AppConst.debug,
		isAnon: four51IsAnonUser,
		apiName : four51.apiName(),
		api: function(path) {
            return '/api/' + four51.apiName() + "/" + path;
		},
		filter: function(input, options, op) {
			return json_filter(input, options, op);
		},
        contains: function(array, value) {
            return arrayContainsValue(array, value);
        },
		isPositiveInteger: _isPositiveInteger
	};
}]);
four51.apiName = function(){
	return four51.app.ApiAppName ? four51.app.ApiAppName : window.location.pathname.split('/')[1];
};