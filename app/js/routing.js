'use strict'

/* routing */
four51.app.config(['$routeProvider', function($routeProvider) {
		$routeProvider.
			when('/listOrders', { templateUrl: 'partials/listOrders.html', controller: 'ListOrdersCtrl' }).
			when('/orderdetails/:orderid', {templateUrl: 'partials/orderDetails.html', controller: 'OrderDetailsCtrl'}).
            when('/catalog', { templateUrl: 'partials/category.html', controller: 'CategoryCtrl' }).
            when('/catalog/:categoryInteropID', { templateUrl: 'partials/category.html', controller: 'CategoryCtrl' }).
            when('/product/:productInteropID', {templateUrl: 'partials/product.html', controller: 'ProductCtrl'}).
            when('/product/:productInteropID/v/:variantInteropID', {templateUrl: 'partials/product.html', controller: 'ProductCtrl'}).
            when('/order', { templateUrl: 'partials/orderSearch.html', controller: 'OrderSearchCtrl' }).
			when('/order/:id', { templateUrl: 'partials/reporting/orderHistoryView.html', controller: 'OrderViewCtrl' }).
			when('/favoriteorders', { templateUrl: 'partials/favoriteOrderList.html', controller: 'FavoriteOrderCtrl' }).
			when('/lineitem/:orderid/:lineitemid/', { templateUrl: 'partials/reporting/lineItemHistoryView.html', controller: 'LineItemViewCtrl' }).
			when('/message', { templateUrl: 'partials/messageList.html', controller: 'MessageListCtrl' }).
			when('/message/:id', { templateUrl: 'partials/messageView.html', controller: 'MessageViewCtrl' }).
            when('/admin', { templateUrl: 'partials/userView.html', controller: 'UserEditCtrl' }).
            when('/addresses', { templateUrl: 'partials/addressList.html', controller: 'AddressListCtrl' }).
            when('/address', { templateUrl: 'partials/addressEditView.html', controller: 'AddressViewCtrl' }).
            when('/address/:id', { templateUrl: 'partials/addressEditView.html', controller: 'AddressViewCtrl' }).
            when('/cart', { templateUrl: 'partials/cartView.html', controller: 'CartViewCtrl'}).
            when('/checkout', { templateUrl: 'partials/checkOutView.html', controller: 'CheckOutViewCtrl' }).
			when('/login', { templateUrl: 'partials/login.html', controller: 'LoginCtrl' }).
			otherwise({redirectTo: '/catalog'});
	}]);