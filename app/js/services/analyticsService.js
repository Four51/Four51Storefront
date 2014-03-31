four51.app.factory('Analytics', ['$analytics', function($analytics) {
	var _order = function(data) {
		$analytics.eventTrack('ecommerce:addTransaction', {
			'id': data.ExternalID,
			'affiliation': $scope.user.Company.Name,
			'revenue': data.Total,
			'shipping': data.ShippingCost,
			'tax': data.TaxCost
		});

		angular.forEach(data.LineItems, function(li) {
			$analytics.eventTrack('ecommerce:addItem', {
				'id': data.ExternalID,
				'name': li.Product.Name,
				'sku': li.Product.InteropID,
				'price': li.UnitPrice,
				'quantity': li.Quantity
			});
		});
		$analytics.eventTrack('ecommerce:send', {});
	};

	return {
		trackOrder: _order
	}
}]);