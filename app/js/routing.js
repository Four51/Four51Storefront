'use strict'

/* routing */
four51.app.config(['$routeProvider', function($routeProvider) {
		var concatProductView = function(routeParams){
			return 'partials/productviews/'+ routeParams.view +'.html'
		}

		$routeProvider.
			when('/listOrders', { templateUrl: 'partials/listOrders.html', controller: 'ListOrdersCtrl' }).
			when('/orderdetails/:orderid', {templateUrl: 'partials/orderDetails.html', controller: 'OrderDetailsCtrl'}).
            when('/catalog', { templateUrl: 'partials/category.html', controller: 'CategoryCtrl' }).
            when('/catalog/:categoryInteropID', { templateUrl: 'partials/category.html', controller: 'CategoryCtrl' }).
            when('/product/:view/:productInteropID', {templateUrl: concatProductView, controller: 'ProductCtrl'}).
            when('/product/:view/:productInteropID/:variantInteropID', {templateUrl: concatProductView, controller: 'ProductCtrl'}).
            when('/order', { templateUrl: 'partials/orderSearch.html', controller: 'OrderSearchCtrl' }).
			when('/order/:id', { templateUrl: 'partials/reporting/orderHistoryView.html', controller: 'OrderViewCtrl' }).
			when('/favoriteorders', { templateUrl: 'partials/favoriteOrderList.html', controller: 'FavoriteOrderCtrl' }).
			when('/order/:orderid/:lineitemindex/', { templateUrl: 'partials/reporting/lineItemHistoryView.html', controller: 'LineItemViewCtrl' }).
			when('/message', { templateUrl: 'partials/messageList.html', controller: 'MessageListCtrl' }).
			when('/message/:id', { templateUrl: 'partials/messageView.html', controller: 'MessageViewCtrl' }).
            when('/admin', { templateUrl: 'partials/userView.html', controller: 'UserEditCtrl' }).
            when('/addresses', { templateUrl: 'partials/addressList.html', controller: 'AddressListCtrl' }).
            when('/address', { templateUrl: 'partials/addressEditView.html', controller: 'AddressViewCtrl' }).
            when('/address/:id', { templateUrl: 'partials/addressEditView.html', controller: 'AddressViewCtrl' }).
            when('/cart', { templateUrl: 'partials/cartView.html', controller: 'CartViewCtrl'}).
            when('/checkout', { templateUrl: 'partials/checkOutView.html', controller: 'CheckOutViewCtrl' }).
			when('/cart/:view/:lineItemIndex', { templateUrl: concatProductView, controller: 'LineItemEditCtrl'}).
			when('/login', { templateUrl: 'partials/login.html', controller: 'LoginCtrl' }).
            when('/search', { templateUrl: 'partials/search.html', controller: 'Four51Ctrl' }).
			otherwise({redirectTo: '/catalog'});
	}]);