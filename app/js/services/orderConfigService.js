
// used to define order properties as dictated by business requirements
four51.app.factory('OrderConfig', function() {
    var user, order;
    var setCostCenter = function() {
        // set the cost center if the user only has 1 assigned to them and the order doesn't already have a cost center assigned
        if (user.CostCenters.length == 1 && order.CostCenter == null) {
            order.CostCenter = user.CostCenters[0];
            // also need to set each individual lineitem because Order doesn't actually save the CostCenter
            angular.forEach(order.LineItems, function(n) {
                n.CostCenter = user.CostCenters[0];
            });
        }
    };

    var setPaymentMethod = function() {
        // logic is that we want to default the payment method to the most likely choice of the user.
        // this order is purely a business requirement. not an api requirement.
        if (user.Permissions.contains('SubmitForApproval')) order.PaymentMethod = 'Undetermined';
        if (user.Permissions.contains('PayByPO')) order.PaymentMethod = 'PurchaseOrder';

    }

    return {
        costcenter: function(o, u) {
            order = o; user = u;
            if (order.Status == 'Unsubmitted') {
                setCostCenter();
            }
            return this;
        },
        paymentMethod: function(o,u) {
            order = o; user = u;
            if (order.PaymentMethod == 'Undetermined') { // might be legitimately this type, but can't be another unless already altered
                setPaymentMethod();
            }
            return this;
        }
    };
});


