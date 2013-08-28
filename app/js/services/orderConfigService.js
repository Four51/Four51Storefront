
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

    return {
        costcenter: function(o, u) {
            order = o; user = u;
            if (order.Status == 'Unsubmitted') {
                setCostCenter();
            }
            return this;
        }
    };
});


