four51.app.factory('Kit', ['$resource', '$451', 'Order', function($resource, $451, Order) {
	var svc = {
		get: _get,
		saveOrder: _save,
		mapKitToOrder: _map
	};

	function _extend(kit) {
		angular.forEach(kit.KitItems, function(item) {
			item.LineItem = {};
		});
		kit.KitParent.LineItem = {};
		return kit;
	}

	function _map(kit, lineitem) {
		angular.forEach(kit.KitItems, function(item) {
			loop(item, lineitem);
		});

		function loop(kititem, lineitem) {
			if (lineitem.IsKitChild && lineitem.KitItemID == kititem.ID) {
				kititem.LineItem = lineitem;
				return;
			}
			else if (lineitem.NextKitLineItem) {
				loop(kititem, lineitem.NextKitLineItem);
			}

			return;
		}
	}

	function _get(id) {
		var http = $resource($451.api('kit/:interopID'), { interopID: id }).get().$promise.then(success);
		return http;

		function success(kit) {
			return _extend(kit);
		}
	}

	function _save(order, success, error) {
		Order.clearshipping(order).save(order, success, error);
	}

	return svc;
}]);