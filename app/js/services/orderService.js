four51.app.factory('Order', ['$resource', '$rootScope', '$451', 'Security', 'Error', function($resource, $rootScope, $451, Security, Error) {
	var _multipleShip = false;
	function _then(fn, data, broadcast) {
		if (angular.isFunction(fn))
			fn(data);
		if (!broadcast)
			$rootScope.$broadcast('event:orderUpdate', data);
	}

	function _extend(order) {
		order.isEditable = order.Status == 'Unsubmitted' || order.Status == 'Open' || order.Status == 'AwaitingApproval';
		angular.forEach(order.LineItems, function(item) {
			item.OriginalQuantity = item.Quantity; //needed to validate qty changes compared to available quantity
			angular.forEach(item.Specs, function(spec) {
				if (spec.ControlType == 'File' && spec.File && spec.File.Url.indexOf('auth') == -1)
					spec.File.Url += "&auth=" + Security.auth();
			});
			item.SpecsLength = Object.keys(item.Specs).length;
		});

		order.forceMultipleShip = function(value) {
			_multipleShip = value;
		}
		order.IsMultipleShip = function() {
			var multi = false;
			if (_multipleShip && order.LineItems[0].ShipAddressID == null) return true;
			angular.forEach(order.LineItems, function(li, i) {
				if (multi) return;
				multi = i > 0 ?
					(li.ShipAddressID != order.LineItems[i-1].ShipAddressID || li.ShipperID != order.LineItems[i-1].ShipperID) :
					false;
			});
			return multi;
		}
	}

	var _get = function(id, success, suppress) {
		var currentOrder = store.get('451Cache.Order.' + id);
		currentOrder ? (function() { _extend(currentOrder);	_then(success, currentOrder); })() :
			$resource($451.api('order/:id'), { id: '@id' }).get({ id: id }).$promise.then(function(o) {
				_extend(o);
				store.set('451Cache.Order.' + id, o);
				_then(success, o, suppress);
			});
	};

	var _save = function(order, success, error) {
		$resource($451.api('order')).save(order).$promise.then(
			function(o) {
				store.set('451Cache.Order.' + o.ID, o);
				store.remove('451Cache.User' + $451.apiName);
				_extend(o);
				_then(success, o);
			},
			function(ex) {
				error(Error.format(ex));
			}
		);
	};

	var _delete = function(order, success, error) {
		$resource($451.api('order')).delete().$promise.then(
			function() {
				store.remove('451Cache.Order.' + order.ID);
				store.remove('451Cache.User' + $451.apiName);
				_then(success);
			},
			function(ex) {
				error(Error.format(ex));
			}
		);
	};

	var _submit = function(order, success, error) {
		$resource($451.api('order'), { }, { submit: { method: 'PUT' }}).submit(order).$promise.then(
			function(o) {
				store.set('451Cache.Order.' + o.ID);
				store.remove('451Cache.User' + $451.apiName);
				_extend(o);
				_then(success,o);
			},
			function(ex) {
				error(Error.format(ex));
			}
		);
	}

	var _repeat = function(id, success, error) {
		$resource($451.api('order/repeat/:id'), {'id': id}, { repeat: { method: 'PUT'}}).repeat().$promise.then(
			function(o) {
				store.set('451Cache.Order.' + o.ID);
				store.remove('451Cache.User' + $451.apiName);
				_extend(o);
				_then(success, o);
			},
			function(ex) {
				error(Error.format(ex));
			}
		);
	}

	var _approve = function(order, success, error) {
		$resource($451.api('order/approve/:id'), {'id': order.ID}, { approve: { method: 'PUT', params: { 'comment': order.ApprovalComment}}}).approve().$promise.then(
			function(o) {
				_extend(o);
				_then(success, o);
			},
			function(ex) {
				error(Error.format(ex));
			}
		);
	}

	var _decline = function(order, success, error) {
		$resource($451.api('order/decline/:id'), {'id': order.ID}, { decline: { method: 'PUT', params: { 'comment': order.ApprovalComment}}}).decline().$promise.then(
			function(o) {
				_extend(o);
				_then(success, o);
			},
			function(ex) {
				error(Error.format(ex));
			}
		);
	}

	var _deletelineitem = function(id, lineitemid, success, error) {
		store.remove('451Cache.Order.' + id);
		$resource($451.api('order/:id/lineitem/:lineitemid'), {'id': id, 'lineitemid': lineitemid }, { lineitemdelete: { method: 'DELETE'}}).lineitemdelete().$promise.then(
			function(o) {
				if (o.ID) {
					store.set('451Cache.Order.' + o.ID, o);
					_extend(o);
					_then(success, o);
				} else {
					store.remove('451Cache.User' + $451.apiName);
					_then(success, null);
				}
			},
			function(ex) {
				error(Error.format(ex));
			}
		);
	};

	var _updateship = function(order) {
		if (!order) return this;
		order.ShipperID = null;
		angular.forEach(order.LineItems, function(li) {
			li.ShipperName = null;
			li.ShipperID = null;
		});
		order.ShipperName = null;
		order.ShippingCost = null;
		return this;
	};

	var _calcdisc = function(order, acct) {
		if (acct == null) return order.Total;
		var discount = 0;
		if (acct.AccountType.MaxPercentageOfOrderTotal != 100) {
			var total = order.Total - acct.Balance;
			if (total < (total / acct.AccountType.MaxPercentageOfOrderTotal))
				discount = total / acct.AccountType.MaxPercentageOfOrderTotal;
			else
				discount = acct.Balance;
		}
		else
			discount = acct.Balance;

		return order.Total - discount;
	};

	var _listShipments = function(order, success){
		$resource($451.api('order/:id/shipments'), { id: order.ID }).query().$promise.then(function(shipments) {
			_then(success, shipments, true);
		});
	};

	return {
		get: _get,
		save: _save,
		delete: _delete,
		submit: _submit,
		repeat: _repeat,
		approve: _approve,
		decline: _decline,
		deletelineitem: _deletelineitem,
		clearshipping: _updateship,
		calculatediscount: _calcdisc,
		listShipments: _listShipments
	}
}]);