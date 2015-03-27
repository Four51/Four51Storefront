four51.app.factory('GoogleAnalytics', function(){
    var service = {
        analyticsLogin: _loginAnalytics,
        ecommerce: _ecommerce
    };

    function _loginAnalytics(UserCode) {
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

        ga('create', UserCode, 'auto');
        /* Load the E-Commerce plugin for google analytics*/
        ga('require', 'ecommerce');
    }

    function _ecommerce(data, user) {
        ga('ecommerce:addTransaction', getTransactionData(data, user));
        sendItems(data.LineItems, data.ExternalID.toString(), user);
        /* Send the transaction and item data to google analytics */
        ga('ecommerce:send');
        /* Clear any data that might have been saved */
        ga('ecommerce:clear');
    }

    function getTransactionData(data, user) {
        var transaction = {
            'id': data.ExternalID.toString(),                  // Transaction ID.
            'affiliation': user.Company.Name.toString(),       // Affiliation or store name.
            'revenue': data.Total.toString(),                  // Grand Total.
            'shipping': data.ShippingCost.toString(),          // Shipping.
            'tax': data.TaxCost.toString()                     // Tax.
        };
        return transaction;
    }

    function sendItems(LineItems, transID, user) {
        angular.forEach(LineItems, function (item){
            ga('ecommerce:addItem', getItemData(item, transID, user));
        });
    }

    function getItemData(item, transID, user) {
        var product = {
            'id': transID,                                           // Transaction ID.
            'name': item.Product.Name.toString(),                    // Product name.
            'sku': item.Product.ExternalID.toString(),               // SKU code.
            'price': item.UnitPrice.toString(),                      // Unit Price.
            'quantity': item.Quantity.toString(),                    // Quantity.
            'currency': user.Culture.CurrencyCode.toString()         // Currency.
        };
        return product;
    }

    return service;
});
