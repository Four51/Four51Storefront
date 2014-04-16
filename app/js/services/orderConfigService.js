four51.app.factory('OrderConfig', function() {
    var user, order;
    var setCostCenter = function() {
        // set the cost center if the user only has 1 assigned to them and the order doesn't already have a cost center assigned
        if (user.CostCenters.length == 1 && order.CostCenter == null) {
            order.CostCenter = user.CostCenters[0].Name;
            // also need to set each individual lineitem because Order doesn't actually save the CostCenter
            angular.forEach(order.LineItems, function(n) {
                n.CostCenter = user.CostCenters[0].Name;
            });
        }
    };

    var setPaymentMethod = function(accounts) {
        // logic is that we want to default the payment method to the most likely choice of the user.
        // this order is purely a business requirement. not an api requirement.
	    if (user.Permissions.contains('SubmitForApproval') && order.Approvals.length > 0) {
		    order.PaymentMethod = 'Undetermined'; return;
	    }
	    if (user.Permissions.contains('PayByBudgetAccount') && accounts.length > 0) {
		    order.PaymentMethod = 'BudgetAccount'; return;
	    }
	    if (user.Permissions.contains('PayByCreditCard') && user.AvailableCreditCards.length > 0) {
		    order.PaymentMethod = 'CreditCard'; return;
	    }
        if (user.Permissions.contains('PayByPO')) {
	        order.PaymentMethod = 'PurchaseOrder'; return;
        }
	    if (order.PaymentMethod == 'Undetermined' && order.Approvals.length == 0)
	        order.PaymentMethod = null;
	    return null;
    }

	var setDefaultAddress = function() {
		if (!order) return;
		angular.forEach(user.CostCenters, function(c) {
			if (c.DefaultAddressID) {
				if (order.CostCenter) {
					order.ShipAddressID = order.ShipAddressID || order.CostCenter == c.Name ? c.DefaultAddressID : null;
					angular.forEach(order.LineItems, function(li) {
						li.ShipAddressID = order.ShipAddressID;
					});
				}
				angular.forEach(order.LineItems, function(li) {
					if (li.CostCenter)
						li.ShipAddressID = li.ShipAddressID || li.CostCenter == c.Name ? c.DefaultAddressID : null;
				});
			}
		});
	}

	var showOrderDetails = function() {
		return (user.Permissions.contains('EditPOID') ||
			user.Permissions.contains('Comments') ||
			(user.Permissions.contains('CostCenterPerOrder') && !user.Permissions.contains('CostCenterPerLine')) ||
			order.OrderFields.length > 0);
	}

	function _hasAddress() {
		if (!order) return false;
		if (order.ShipAddressID != null) return true;
		angular.forEach(order.LineItems, function(li) {
			if (li.ShipAddressID != null) return true;
		});
		return false;
	}

    return {
	    address: function(o, u) {
			order = o; user = u;
		    // not supporting cost center default addreses due to issues with assignments to the user
		    if (!_hasAddress())
			    setDefaultAddress();
		    return this;
	    },
        costcenter: function(o, u) {
            order = o; user = u;
            if (order.Status == 'Unsubmitted') {
                setCostCenter();
            }
            return this;
        },
        paymentMethod: function(o,u,a) { // not used. set in the api now but leaving here for potential
            order = o; user = u;
            if (order.PaymentMethod == 'Undetermined') { // might be legitimately this type, but can't be another unless already altered
                setPaymentMethod(a);
            }
            return this;
        },
	    hasConfig: function(o,u) {
		    order = o; user = u;
		    return showOrderDetails();
	    }
    };
});


