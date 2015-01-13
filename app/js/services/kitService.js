four51.app.factory('Kit', ['$resource', '$451', function($resource, $451) {

	function _get(id, callback) {
		$resource($451.api('kit/:interopID'), { interopID: id }).get().$promise.then(function(kit) {
			callback(kit);
		});
	}

	var svc = {
		get: _get
	};
	return svc;

}]);