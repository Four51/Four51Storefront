'use strict';

var four51 = {};
four51.app = angular.module('451order', ['ngResource', 'ngRoute', 'ngAnimate', 'ngSanitize', 'ngCookies', 'ngTouch', 'ui.validate', 'ui.mask', 'headroom', 'ui.bootstrap', 'angulartics', 'angulartics.google.analytics']);
;
four51.app.factory('$451', function() {
	function json_filter(input, options, op) {
		if (input == null || options == null) return;
		var result = [];

		angular.forEach(input, function(row) {
            if (row[options.Property] === undefined && !options instanceof Array) return;

			var checkRow = function(opt){
				if (row[opt.Property] === opt.Value) {
					return row;
				}
			}

			var add;
			if (options instanceof Array){ //does an OR on the list of conditions. could add to it to optionally have OR/AND
				for(var i = 0; i < options.length; i++){
					add = checkRow(options[i]);
					if(add)
						break;
				}
			}else{
				add = checkRow(options);
			}

			if(add){
				result.push(row);
				if(op) op(row)
			}
		});
		return result;
	}

    function arrayContainsValue(array, value) {
        if (angular.isArray(value)) {
            var found = false;
            angular.forEach(value, function(v) {
                found = !found ? array.indexOf(v) > -1 : found;
            })
            return found;
        }
        else
            return array.indexOf(value) > -1;
    }
	var _isPositiveInteger = function(n) {
		return n >>> 0 === parseFloat(n);
	}

	return {
		debug: true,
		isAnon: four51IsAnonUser,
		apiName : four51.apiName(),
		api: function(path) {
            return '/api/' + four51.apiName() + "/" + path;
		},
		filter: function(input, options, op) {
			return json_filter(input, options, op);
		},
        contains: function(array, value) {
            return arrayContainsValue(array, value);
        },
		isPositiveInteger: _isPositiveInteger
	};
});
four51.apiName = function(){
	return four51.app.ApiAppName ? four51.app.ApiAppName : window.location.pathname.split('/')[1];
};
four51.app.filter('onproperty', ['$451', function($451) {
	var defaults = {
		'OrderStats': 'Type',
		'Message': 'Box'
	};

	return function(input, query) {
		if (!input || input.length === 0) return;
		if (!query) return input;
		query.Property = query.Property || defaults[query.Model];
		return $451.filter(input, query);
	}
}]);

four51.app.filter('kb', function() {
	return function(value) {
		return isNaN(value) ? value : parseFloat(value) / 1024;
	}
});

four51.app.filter('noliverates', function() {
	return function(value) {
		var output = [];
		angular.forEach(value, function(v) {
			if (v.ShipperRateType != 'ActualRates')
				output.push(v);
		});
		return output;
	}
});
four51.app.config(['$locationProvider', function($locationProvider) {
		$locationProvider.html5Mode(false);
}]);

four51.app.config(['$provide', function($provide) {
	$provide.decorator('$exceptionHandler', function($delegate, $injector) {
		return function $broadcastingExceptionHandler(ex, cause) {
			$delegate(ex, cause);
			$injector.get('$rootScope').$broadcast('exception', ex, cause);
		}
	});
}]);
four51.app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$locationProvider.html5Mode(true);

	var concatProductView = function(routeParams){
			return 'productview.hcf?id='+ routeParams.productInteropID;
	}

	var concatSpecFormView = function(routeParams){
		return 'specform.hcf?id=' + routeParams.productInteropID;
	}

	$routeProvider.
		when('/listOrders', { templateUrl: 'partials/listOrders.html', controller: 'ListOrdersCtrl' }).
		when('/orderdetails/:orderid', {templateUrl: 'partials/orderDetails.html', controller: 'OrderDetailsCtrl'}).
        when('/catalog', { templateUrl: 'partials/categoryView.html', controller: 'CategoryCtrl' }).
        when('/catalog/:categoryInteropID', { templateUrl: 'partials/categoryView.html', controller: 'CategoryCtrl' }).
        when('/product/:productInteropID', {templateUrl: concatProductView, controller: 'ProductCtrl'}).
        when('/product/:productInteropID/:variantInteropID', {templateUrl: concatProductView, controller: 'ProductCtrl'}).
		when('/product/:productInteropID/:variantInteropID/edit', {templateUrl: concatSpecFormView, controller: 'SpecFormCtrl'}).
		when('/order', { templateUrl: 'partials/orderSearchView.html', controller: 'OrderSearchCtrl' }).
		when('/order/:id', { templateUrl: 'partials/Reporting/orderHistoryView.html', controller: 'OrderViewCtrl' }).
		when('/favoriteorders', { templateUrl: 'partials/favoriteOrderListView.html', controller: 'FavoriteOrderCtrl' }).
		when('/order/:orderid/:lineitemindex/', { templateUrl: 'partials/Reporting/lineItemHistoryView.html', controller: 'LineItemViewCtrl' }).
		when('/message', { templateUrl: 'partials/messageListView.html', controller: 'MessageListCtrl' }).
		when('/message/:id', { templateUrl: 'partials/messageView.html', controller: 'MessageViewCtrl' }).
        when('/admin', { templateUrl: 'partials/userView.html', controller: 'UserEditCtrl' }).
        when('/addresses', { templateUrl: 'partials/addressListView.html', controller: 'AddressListCtrl' }).
        when('/address', { templateUrl: 'partials/addressView.html', controller: 'AddressViewCtrl' }).
        when('/address/:id', { templateUrl: 'partials/addressView.html', controller: 'AddressViewCtrl' }).
        when('/cart', { templateUrl: 'partials/cartView.html', controller: 'CartViewCtrl'}).
        when('/checkout', { templateUrl: 'partials/checkOutView.html', controller: 'CheckOutViewCtrl' }).
		when('/cart/:productInteropID/:lineItemIndex', { templateUrl: concatProductView, controller: 'LineItemEditCtrl'}).
		when('/login', { templateUrl: 'partials/controls/login.html', controller: 'LoginCtrl' }).
		when('/search', { templateUrl: 'partials/searchView.html', controller: 'ProductSearchCtrl' }).
        when('/search/:searchTerm', { templateUrl: 'partials/searchView.html', controller: 'ProductSearchCtrl' }).
        when('/security', { templateUrl: 'partials/security.html', controller: 'SecurityCtrl' }).
        when('/conditions', { templateUrl: 'partials/conditions.html', controller: 'ConditionsCtrl' }).
		when('/reports', { templateUrl: 'partials/reportsView.html', controller: 'ReportsCtrl' }).
		when('/report/:id', { templateUrl: 'partials/Reporting/reportView.html', controller: 'ReportCtrl' }).
		otherwise({redirectTo: '/catalog'});
}]);
four51.app.constant("AppConst",{});
four51.app.controller('Four51Ctrl', ['$scope', '$route', '$location', '$451', 'User', 'Order', 'Security', 'OrderConfig', 'Category', 'AppConst',
function ($scope, $route, $location, $451, User, Order, Security, OrderConfig, Category, AppConst) {
    $scope.AppConst = AppConst;
	$scope.scroll = 0;
	$scope.isAnon = $451.isAnon; //need to know this before we have access to the user object
	$scope.Four51User = Security;
	if ($451.isAnon && !Security.isAuthenticated()){
		User.login(function() {
			$route.reload();
		});
	}

    // fix Bootstrap fixed-top and fixed-bottom from jumping around on mobile input when virtual keyboard appears
    if ( $(window).width() < 960 ) {
        $(document)
        .on('focus', ':input:not("button")', function(e) {
            $('.navbar-fixed-bottom, .headroom.navbar-fixed-top').addClass('ng-hide');
        })
        .on('blur', ':input', function(e) {
            $('.navbar-fixed-bottom, .headroom.navbar-fixed-top').removeClass('ng-hide');
        });
    }

    function init() {
        if (Security.isAuthenticated()) {
            User.get(function(user) {
                $scope.user = user;

	            if (!$scope.user.TermsAccepted)
		            $location.path('conditions');

	            if (user.CurrentOrderID) {
                    Order.get(user.CurrentOrderID, function(ordr) {
                        $scope.currentOrder = ordr;
			            OrderConfig.costcenter(ordr, user);
                    });
                }
                else
                    $scope.currentOrder = null;

            });
            Category.tree(function(data) {
				$scope.tree = data;
				$scope.$broadcast("treeComplete", data);
	        });
        }
    }

	function analytics(id) {
		if (id.length == 0) return;
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
			(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
			m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

		ga('create', id, 'four51.com');
		ga('require', 'ecommerce', 'ecommerce.js');
	}

    $scope.errorSection = '';

    function cleanup() {
        Security.clear();
    }

    $scope.$on('event:auth-loginConfirmed', function(){
        $route.reload();
	    User.get(function(user) {
		    analytics(user.Company.GoogleAnalyticsCode);
	    });
	});
	$scope.$on("$routeChangeSuccess", init);
    $scope.$on('event:auth-loginRequired', cleanup);
}]);
four51.app.controller('CategoryCtrl', ['$routeParams', '$sce', '$scope', '$451', 'Category', 'Product', 'Nav',
function ($routeParams, $sce, $scope, $451, Category, Product, Nav) {
	$scope.productLoadingIndicator = true;
	$scope.trusted = function(d){
		if(d) return $sce.trustAsHtml(d);
	}
	Product.search($routeParams.categoryInteropID, null, null, function(products) {
        $scope.products = products;
		$scope.productLoadingIndicator = false;
    });
    if ($routeParams.categoryInteropID) {
	    $scope.categoryLoadingIndicator = true;
        Category.get($routeParams.categoryInteropID, function(cat) {
            $scope.currentCategory = cat;
	        $scope.categoryLoadingIndicator = false;
        });
    }else if($scope.tree){
		$scope.currentCategory ={SubCategories:$scope.tree};
	}

	$scope.$on("treeComplete", function(data){
		if (!$routeParams.categoryInteropID) {
			$scope.currentCategory ={SubCategories:$scope.tree};
		}
	});

    // panel-nav
    $scope.navStatus = Nav.status;
    $scope.toggleNav = Nav.toggle;

}]);
four51.app.controller('ErrorCtrl', ['$scope', function ($scope) {
	$scope.open = function() {
		$scope.isError = true;
	};
	$scope.close = function() {
		$scope.isError = false;
	};
	$scope.opts = {
		backdropFade: true,
		dialogFade: true
	};

	$scope.$on('exception', function(event, exception) {
		var ex = exception.data ? exception.data : exception;
		try {
			$scope.error = {
				Message: ex.Message || '',
				Detail: ex.ExceptionMessage || ex.message,
				Code: ex.ExceptionType || '',
				StackTrace: ex.StackTrace || ''
			};
			console.dir($scope.error);
			//if ($451.debug)
			//	$scope.open();
		}
		catch(e) {
			console.log('An error occurred while handling an error. Consult the object written to the log. Keep in mind you must use the Error() if you are throwing an error in your JavaScript');
			console.dir(event);
			console.dir(ex);
		}
	});

	$scope.template = { url: 'partials/errorView.html'};
}]);
four51.app.controller('LoginCtrl', ['$scope', '$sce', '$route', 'User',
function ($scope, $sce, $route, User) {
	var codes = ['PasswordSecurityException'];

	$scope.loginMessage = null;
	$scope.buttonText = "Logon";
	$scope.$on('event:auth-loginFailed', function(event, message) {
		$scope.loginMessage = message;
	});


	$scope.login = function() {
		$scope.loginMessage = null;
		// need to reset any error codes that might be set so we can handle new one's
		angular.forEach(codes, function(c) {
			$scope[c] = null;
		});
		User.login($scope.credentials,
			function(data) {
				if ($scope.credentials.Email) {
					$scope.loginMessage = data.LogonInfoSent;
					$scope.EmailNotFoundException = false;
					$scope.showEmailHelp = false;
					$scope.credentials.Email = null;
					$scope.credentials.Username = null;
					$scope.credentials.Password = null;
				}
			},
			function(ex) {
				$scope[ex.Code.text] = true;
				if (ex.Code.is('PasswordSecurity'))
					$scope.loginMessage = $sce.trustAsHtml(ex.Message);
				if (ex.Code.is('EmailNotFoundException') && $scope.credentials.Email)
					$scope.loginMessage = $sce.trustAsHtml(ex.Detail);
				$scope.credentials.Username = null;
				$scope.credentials.Password = null;
				$scope.credentials.CurrentPassword = null;
				$scope.credentials.NewPassword = null;
				$scope.credentials.ConfirmPassword = null;
			}
		);
	};
}]);
four51.app.controller('OrderSearchCtrl', ['$scope', '$location', 'OrderSearchCriteria', 'OrderSearch',
function ($scope,  $location, OrderSearchCriteria, OrderSearch) {
    OrderSearchCriteria.query(function(data) {
        $scope.OrderSearchCriteria = data;
        $scope.hasStandardTypes = _hasType(data, 'Standard');
        $scope.hasReplenishmentTypes = _hasType(data, 'Replenishment');
        $scope.hasPriceRequestTypes = _hasType(data, 'PriceRequest');
    });

    function _hasType(data, type) {
        var hasType = false;
        angular.forEach(data, function(o) {
            if (hasType || o.Type == type && o.Count > 0)
                hasType = true;
        });
        return hasType;
    }
	$scope.OrderSearch = function($event, criteria) {
		$event.preventDefault();
		$scope.showNoResults = false;
		OrderSearch.search(criteria, function(list) {
            $scope.orders = list;
			$scope.showNoResults = list.length == 0;
        });
		$scope.orderSearchStat = criteria;
	};
}]);
four51.app.controller('OrderViewCtrl', ['$scope', '$location', '$routeParams', 'Order', 'FavoriteOrder', 'Address', 'User',
function ($scope, $location, $routeParams, Order, FavoriteOrder, Address, User) {
	$scope.loadingIndicator = true;

	var shipToMultipleAddresses = function(order) {
		if (!order) return false;
		var multi = false;
		angular.forEach(order.LineItems, function(li, i) {
			multi = multi || i > 0 ? li.ShipAddressID != order.LineItems[i-1].ShipAddressID : false;
		});
		return multi;
	};

	Order.get($routeParams.id, function(data){
		$scope.loadingIndicator = false;
        $scope.order = data;
        $scope.hasSpecsOnAnyLineItem = false;
		for(var i = 0; i < data.LineItems.length ; i++) {
			if (data.LineItems[i].Specs) {
				$scope.hasSpecsOnAnyLineItem = true;
				break;
			}
		}
        $scope.hasShipperOnAnyLineItem = function() {
            angular.forEach(data.LineItems, function(item) {
                if (item.ShipperID) return true;
            });
            return false;
        };
        $scope.hasShipAccountOnAnyLineItem = function() {
            angular.forEach(data.LineItems, function(item) {
                if (item.ShipAccount) return true;
            });
            return false;
        };

		if (shipToMultipleAddresses(data)) {
	        angular.forEach(data.LineItems, function(item) {
	            if (item.ShipAddressID) {
	                Address.get(item.ShipAddressID, function(add) {
	                    item.ShipAddress = add;
	                });
	            }
	        });
		}
		else {
			Address.get(data.ShipAddressID || data.LineItems[0].ShipAddressID, function(add) {
				data.ShipAddress = add;
			});
		}

        Address.get(data.BillAddressID, function(add){
            data.BillAddress = add;
        });
	});

	$scope.saveFavorite = function() {
		$scope.displayLoadingIndicator = true;
        FavoriteOrder.save($scope.order, function() {
	        $scope.displayLoadingIndicator = false;
        });
	};

    $scope.repeatOrder = function() {
        $scope.order.Repeat = true;
        Order.save($scope.order, function(data) {
            $scope.currentOrder = data;
            $scope.user.CurrentOrderID = data.ID;
            User.save($scope.user, function(data){
                $scope.user = data;
                $location.path('/cart');
            });
        });
    };

    $scope.onPrint = function()  {
        window.print();
    };
}]);
four51.app.controller('LineItemViewCtrl', ['$scope', '$routeParams', 'Order', 'Product',
function ($scope, $routeParams, Order, Product) {
    Order.get($routeParams.orderid, function(data){
        $scope.order = data;
        $scope.LineItem = data.LineItems[$routeParams.lineitemindex];

		//static spec groups are not captured on line item so they require another product.get if we want them shown here.
		//not setting this product to scope to avoid confusion between live product data and line item history data.
		Product.get($scope.LineItem.Product.InteropID, function(data){
			$scope.StaticSpecGroups = data.StaticSpecGroups || {};
			//slight hack to get the line item specs to show with the product static spec groups.
			angular.forEach($scope.LineItem.Specs, function(item){
				item.VisibleToCustomer = true;
			});
			$scope.StaticSpecGroups.VariableSpecs = {Name: 'Variable Specs', Specs: $scope.LineItem.Specs};
		});
	});
}]);
four51.app.controller('NavCtrl', ['$location', '$route', '$scope', '$451', 'User',
function ($location, $route, $scope, $451, User) {
    $scope.Logout = function(){
        User.logout();
        if ($scope.isAnon) {
            $location.path("/catalog");
            User.login();
        }
    };

	$scope.refreshUser = function() {
		store.clear();
	}

    // http://stackoverflow.com/questions/12592472/how-to-highlight-a-current-menu-item-in-angularjs
    $scope.isActive = function(path) {
        var cur_path = $location.path().replace('/', '');
        var result = false;

        if (path instanceof Array) {
            angular.forEach(path, function(p) {
                if (p == cur_path && !result)
                    result = true;
            });
        }
        else {
            if (cur_path == path)
                result = true;
        }
        return result;
    };
    // extension of above isActive in path
    $scope.isInPath = function(path) {
        var cur_path = $location.path().replace('/', '');
        var result = false;

        if(cur_path.indexOf(path) > -1) {
            result = true;
        }
        else {
            result = false;
        }
        return result;
    };

	$scope.Clear = function() {
		localStorage.clear();
		$route.reload();
	}

	$scope.$on('event:orderUpdate', function(event, order) {
		$scope.cartCount = order ? (order.Status == 'Unsubmitted' || order.Status == 'AwaitingApproval') ? order.LineItems.length : null : null;
	});
}]);
four51.app.controller('ProductCtrl', ['$scope', '$routeParams', '$route', '$location', '$451', 'Product', 'ProductDisplayService', 'Order', 'Variant', 'User',
function ($scope, $routeParams, $route, $location, $451, Product, ProductDisplayService, Order, Variant, User) {
    $scope.selected = 1;
    $scope.LineItem = {};
	$scope.addToOrderText = "Add To Cart";
	$scope.loadingIndicator = true;

	$scope.calcVariantLineItems = function(i){
		$scope.variantLineItemsOrderTotal = 0;
		angular.forEach($scope.variantLineItems, function(item){
			$scope.variantLineItemsOrderTotal += item.LineTotal || 0;
		})
	};
	function setDefaultQty(lineitem) {
		$scope.LineItem.Quantity = lineitem.Product.StandardPriceSchedule.DefaultQuantity > 0 ? lineitem.Product.StandardPriceSchedule.DefaultQuantity : null;
	}
	ProductDisplayService.getProductAndVariant($routeParams.productInteropID,$routeParams.variantInteropID, function(data){
		$scope.LineItem.Product = data.product;
		$scope.LineItem.Variant = data.variant;
		setDefaultQty($scope.LineItem);
		ProductDisplayService.setNewLineItemScope($scope);
		ProductDisplayService.setProductViewScope($scope);
		$scope.$broadcast('ProductGetComplete');
		$scope.loadingIndicator = false;
		$scope.setAddToOrderErrors();
	});

	$scope.addToOrder = function(){
		if($scope.lineItemErrors && $scope.lineItemErrors.length){
			$scope.showAddToCartErrors = true;
			return;
		}
		if(!$scope.currentOrder){
			$scope.currentOrder = {};
			$scope.currentOrder.LineItems = [];
		}
		if($scope.allowAddFromVariantList){
			angular.forEach($scope.variantLineItems, function(item){
				if(item.Quantity > 0){
					$scope.currentOrder.LineItems.push(item);
				}
			});
		}else{
			$scope.currentOrder.LineItems.push($scope.LineItem);
		}
		$scope.addToOrderIndicator = true;
		Order.save($scope.currentOrder,
			function(o){
				$scope.user.CurrentOrderID = o.ID;
				User.save($scope.user, function(){
					$scope.addToOrderIndicator = true;
					$location.path('/cart');
				});
			},
			function(ex) {
				$scope.addToOrderIndicator = false;
				$scope.addToOrderError = ex.Message;
				$route.reload();
			}
		);
	}
}]);

/* product matrix control
four51.app.controller('CustomProductCtrlMatrix', function($scope, $451, Variant, ProductDisplayService){
	//just a little experiment on extending the product view
	$scope.matrixLineTotal = 0;
	$scope.LineItems = {};
	$scope.LineKeys = [];
	$scope.lineChanged = function(){
		var addToOrderTotal = 0;
		angular.forEach($scope.LineKeys, function(key){
			if($scope.LineItems[key].Variant){
				ProductDisplayService.calculateLineTotal($scope.LineItems[key]);
				addToOrderTotal += $scope.LineItems[key].LineTotal;
			}
		$scope.matrixLineTotal = addToOrderTotal;

		});
	};

	$scope.addMatrixToOrder = function(){ };

	$scope.setFocusVariant = function(opt1, opt2){

		if($scope.LineItems[opt1.Value.toString() + opt2.Value.toString()].Variant){
			$scope.LineItem.Variant = $scope.LineItems[opt1.Value.toString() + opt2.Value.toString()].Variant;
			return;
		}

		Variant.get({'ProductInteropID': $scope.LineItem.Product.InteropID, 'SpecOptionIDs': [opt1.ID, opt2.ID]}, function(data){
			$scope.LineItem.Variant = data;
		});
	};
	$scope.$watch("LineItems", function(){
		$scope.lineChanged();
	}, true);

	$scope.$on('ProductGetComplete', function(){
		var specs = $451.filter($scope.LineItem.Product.Specs, {Property: 'DefinesVariant', Value: true});
		$scope.matrixSpec1 = specs[0];
		$scope.matrixSpec2 = specs[1];
		angular.forEach(specs[0].Options, function(option1){
			angular.forEach(specs[1].Options, function(option2){
				$scope.LineKeys.push(option1.Value.toString() + option2.Value.toString());
				$scope.LineItems[option1.Value.toString() + option2.Value.toString()] = {
					Product: $scope.LineItem.Product,
					PriceSchedule: $scope.LineItem.PriceSchedule,
				};
			});
		});
	});
});
*/

;
four51.app.controller('ProductListCtrl', ['$routeParams', '$rootScope', '$scope', 'Product',
function ($routeParams,$rootScope, $scope, Product) {
    $scope.loadSearch = function(){

        if($scope.category && $scope.category.products){
            $scope.Products = $scope.category.products;
            return;
        }

        if($scope.category) {
            Product.search($scope.categoryInteropID, null, null, function(data) {
                $scope.category.products = $scope.Products = data;
            });
        }
    }
}]);
four51.app.controller('MessageListCtrl', ['$scope', 'MessageList', function($scope, MessageList) {
	MessageList.query(function(list) {
        $scope.messages = list;
    });

	$scope.checkAll = function(event) {
		angular.forEach($scope.messages, function(msg) {
			msg.Selected = event.currentTarget.checked;
		});
	};

	$scope.deleteSelected = function() {
		$scope.displayLoadingIndicator = true;
		MessageList.delete($scope.messages, function() {
			MessageList.query(function(list) {
				$scope.messages = list;
				$scope.displayLoadingIndicator = false;
			});
		});
	};
}]);
four51.app.controller('MessageViewCtrl', ['$scope', '$location', '$routeParams', 'Message',
function($scope, $location, $routeParams, Message) {
    Message.get($routeParams.id, function(msg) {
        $scope.message = msg;
        $scope.canReply = function() {
            return msg.Box == 'Inbox';
        }
    });

	$scope.delete = function(event) {
		event.preventDefault();
        Message.delete($scope.message, function() {
			$location.path("/message");
		});

	};
	$scope.ok = function() {
		$location.path('/message');
	}
	$scope.send = function(event) {
        Message.save($scope.message, function() {
			$location.path('/message');
		});
	}
}]);
four51.app.controller('FavoriteOrderCtrl', ['$scope', '$location', '$routeParams', 'FavoriteOrder', 'Order', 'User',
function ($scope, $location, $routeParams, FavoriteOrder, Order, User) {
    FavoriteOrder.query(function(favs) {
        $scope.favoriteorders = favs;
    });

	$scope.repeat = function(order) {
		order.Repeat = true;
		Order.save(order, function(data) {
			$scope.currentOrder = data;
			$scope.user.CurrentOrderID = data.ID;
			User.save($scope.user, function(data) {
				$scope.user = data;
				$location.path('/cart');
			});
		});
	};

	$scope.checkAll = function(event) {
		angular.forEach($scope.favoriteorders, function(order) {
			order.Selected = event.currentTarget.checked;
		});
	};
	$scope.deleteSelected = function() {
        FavoriteOrder.delete($scope.favoriteorders, function() {
            FavoriteOrder.query(function(favs) {
                $scope.favoriteorders = favs;
            });
        });
	};

    $scope.saveFavoriteNow = function() {
        $location.path('order');
    };
}]);
four51.app.controller('UserEditCtrl', ['$scope', '$location', '$sce', 'User',
function ($scope, $location, $sce, User) {
	$scope.loginasuser = {};
	$scope.actionMessage = null;

	if($scope.user.Type != 'TempCustomer')
		$scope.user.TempUsername = $scope.user.Username

	$scope.save = function() {
		$scope.actionMessage = null;
		$scope.securityWarning = false;
		$scope.user.Username = $scope.user.TempUsername;
		$scope.displayLoadingIndicator = true;
        if($scope.user.Type == 'TempCustomer')
			$scope.user.ConvertFromTempUser = true;

		User.save($scope.user,
			function(u) {
				$scope.securityWarning = false;
				$scope.displayLoadingIndicator = false;
				$scope.actionMessage = 'Your changes have been saved';
				$scope.user.TempUsername = u.Username;
			},
			function(ex) {
				$scope.displayLoadingIndicator = false;
				if (ex.Code.is('PasswordSecurity'))
					$scope.securityWarning = true;
				else
					$scope.actionMessage = $sce.trustAsHtml(ex.Message);
			}
		);
    };
	$scope.loginExisting = function(){
		User.login({Username: $scope.loginasuser.Username, Password:  $scope.loginasuser.Password, ID: $scope.user.ID, Type: $scope.user.Type},function(u){
			$location.path("/catalog");
		});
	};
}]);
four51.app.controller('GiftCardRedemptionCtrl', function($scope, GiftCard) {
	$scope.redeemGiftCard = function() {
		$scope.$parent.gcMessage = null;
		GiftCard.redeem(this.giftcard,
			function(card) {
				$scope.giftcard = card;
			},
			function(ex) {
				$scope.$parent.gcMessage = ex.Message;
			}
		);
	}
});
;
four51.app.controller('AddressInputCtrl', ['$scope', '$rootScope', '$location', 'User', 'Address', 'Resources',
function ($scope, $rootScope, $location, User, Address, Resources) {
    $scope.save = function() {
	    $scope.objectExists = false;
        Address.save(this.address,
	        function(address) {
                $rootScope.$broadcast('event:AddressSaved', address);
                $location.path($scope.return);
            },
	        function(ex) {
	            if (ex.Code.is('ObjectExistsException'))
	                $scope.objectExists = true;
            }
        );
    };
    $scope.delete = function() {
        Address.delete(this.address, function() {
            $location.path($scope.return);
        });
    };

	$scope.cancel = function() {
		$scope.return ? $location.path($scope.return) : $rootScope.$broadcast('event:AddressCancel');
	};

    $scope.countries = Resources.countries;
    $scope.states = Resources.states;

    $scope.country = function(item) {
        return $scope.address != null ? $scope.address.Country == item.country : false;
    };
    $scope.hasStates = function() {
        return $scope.address != null ? $scope.address.Country == 'US' || $scope.address.Country == 'CA' || $scope.address.Country == 'NL' : false;
    };

    $scope.isPhoneRequired = function() {
        return ($scope.user.Permissions.contains('BillingAddressPhoneRequired') && $scope.address.IsBilling) ||
            ($scope.user.Permissions.contains('ShipAddressPhoneRequired') && $scope.address.IsShipping);
    }
}]);

four51.app.controller('AddressListCtrl', ['$scope', '$location', '$451', 'AddressList',
function ($scope, $location, $451, AddressList) {
    AddressList.query(function(list) {
        $scope.addresses = list;
    });
    $scope.deleteSelected = function() {
	    $scope.displayLoadingIndicator = true;
        AddressList.delete($scope.addresses, function() {
	        AddressList.query(function(list) {
		        $scope.addresses = list;
		        $scope.displayLoadingIndicator = false;
	        });
        });
    };

    $scope.newAddress = function() {
        $location.path('address');
    };
    $scope.checkAll = function(event) {
        angular.forEach($scope.addresses, function(add) {
            add.Selected = event.currentTarget.checked;
        });
    }
}]);
four51.app.controller('AddressViewCtrl', ['$scope', '$routeParams', 'Address',
function ($scope, $routeParams, Address) {
   $routeParams.id ?
        Address.get($routeParams.id, function(add) {
            $scope.address = add;
        }) :
        $scope.address = { Country: 'US' };
    $scope.return = '/addresses';
}]);
four51.app.controller('CartViewCtrl', ['$scope', '$location', '$451', 'Order', 'OrderConfig', 'User',
function ($scope, $location, $451, Order, OrderConfig, User) {
    $scope.currentDate = new Date();
	$scope.errorMessage = null;
    $scope.continueShopping = function() {
	    if (!$scope.cart.$invalid) {
	        if (confirm('Do you want to save changes to your order before continuing?') == true)
		        $scope.saveChanges(function() { $location.path('catalog') });
        }
	    else
		    $location.path('catalog');
    };

	$scope.cancelOrder = function() {
		if (confirm('Are you sure you wish to cancel your order?') == true) {
			$scope.displayLoadingIndicator = true;
			$scope.actionMessage = null;
			Order.delete($scope.currentOrder,
				function(){
					$scope.currentOrder = null;
					$scope.user.CurrentOrderID = null;
					User.save($scope.user, function(){
						$location.path('catalog');
					});
					$scope.displayLoadingIndicator = false;
					$scope.actionMessage = 'Your Changes Have Been Saved!';
				},
				function(ex) {
					$scope.actionMessage = 'An error occurred: ' + ex.Message;
					$scope.displayLoadingIndicator = false;
				}
			);
		}
	};

	$scope.saveChanges = function(callback) {
		$scope.actionMessage = null;
		$scope.errorMessage = null;
		if($scope.currentOrder.LineItems.length == $451.filter($scope.currentOrder.LineItems, {Property:'Selected', Value: true}).length) {
			$scope.cancelOrder();
		}
		else {
			$scope.displayLoadingIndicator = true;
			OrderConfig.address($scope.currentOrder, $scope.user);
			Order.save($scope.currentOrder,
				function(data) {
					$scope.currentOrder = data;
					$scope.displayLoadingIndicator = false;
					if (callback) callback();
	                $scope.actionMessage = 'Your Changes Have Been Saved!';
				},
				function(ex) {
					$scope.errorMessage = ex.Message;
					$scope.displayLoadingIndicator = false;
				}
			);
		}
	};

	$scope.removeItem = function(item) {
		if ($scope.currentOrder.LineItems.length > 1) {
			if (confirm('Are you sure you wish to remove this item from your cart?') == true) {
				item.Selected = true;
				$scope.saveChanges();
			}
		}
		else {
			item.Selected = true;
			$scope.saveChanges();
		}
	}

    $scope.checkOut = function() {
	    $scope.displayLoadingIndicator = true;
	    OrderConfig.address($scope.currentOrder, $scope.user);
        Order.save($scope.currentOrder,
	        function(data) {
                $scope.currentOrder = data;
                $location.path('checkout');
                $scope.displayLoadingIndicator = false;
	        },
	        function(ex) {
		        $scope.errorMessage = ex.Message;
		        $scope.displayLoadingIndicator = false;
	        }
        );
    };

	$scope.$watch('currentOrder.LineItems', function(newval) {
		var newTotal = 0;
        if (!$scope.currentOrder) return newTotal;
		angular.forEach($scope.currentOrder.LineItems, function(item){
			newTotal += item.LineTotal;
		});
		$scope.currentOrder.Subtotal = newTotal;
	}, true);

    $scope.copyAddressToAll = function() {
        angular.forEach($scope.currentOrder.LineItems, function(n) {
            n.DateNeeded = $scope.currentOrder.LineItems[0].DateNeeded;
        });
    };

	$scope.copyCostCenterToAll = function() {
		angular.forEach($scope.currentOrder.LineItems, function(n) {
			n.CostCenter = $scope.currentOrder.LineItems[0].CostCenter;
		});
	};

    $scope.onPrint = function()  {
	    window.print();
    };
}]);
four51.app.controller('CheckOutViewCtrl', ['$scope', '$location', '$filter', '$rootScope', '$451', 'Analytics', 'User', 'Order', 'OrderConfig', 'FavoriteOrder', 'AddressList',
function ($scope, $location, $filter, $rootScope, $451, Analytics, User, Order, OrderConfig, FavoriteOrder, AddressList) {
	if (!$scope.currentOrder) {
        $location.path('catalog');
    }

    AddressList.query(function(list) {
        $scope.addresses = list;
    });

	$scope.hasOrderConfig = OrderConfig.hasConfig($scope.currentOrder, $scope.user);
	$scope.checkOutSection = $scope.hasOrderConfig ? 'order' : 'shipping';

	$scope.shipaddress = { Country: 'US', IsShipping: true, IsBilling: false };
	$scope.billaddress = { Country: 'US', IsShipping: false, IsBilling: true };

	$scope.$on('event:AddressSaved', function(event, address) {
		if (address.IsShipping) {
			$scope.currentOrder.ShipAddressID = address.ID;
			if (!$scope.shipToMultipleAddresses)
				$scope.setShipAddressAtOrderLevel();
			$scope.addressform = false;
		}
		if (address.IsBilling) {
			$scope.currentOrder.BillAddressID = address.ID;
			$scope.billaddressform = false;
		}
		AddressList.query(function(list) {
			$scope.addresses = list;
		});
		$scope.shipaddress = { Country: 'US', IsShipping: true, IsBilling: false };
		$scope.billaddress = { Country: 'US', IsShipping: false, IsBilling: true };
	});

    function submitOrder() {
	    $scope.displayLoadingIndicator = true;
	    $scope.errorMessage = null;
        Order.submit($scope.currentOrder,
	        function(data) {
				$scope.user.CurrentOrderID = null;
				User.save($scope.user, function(data) {
			        $scope.user = data;
	                $scope.displayLoadingIndicator = false;
		        });
		        $scope.currentOrder = null;
		        $location.path('/order/' + data.ID);
	        },
	        function(ex) {
		        $scope.errorMessage = ex.Message;
		        $scope.displayLoadingIndicator = false;
		        $scope.shippingUpdatingIndicator = false;
		        $scope.shippingFetchIndicator = false;
	        }
        );
    };

    function saveChanges(callback) {
	    $scope.displayLoadingIndicator = true;
	    $scope.errorMessage = null;
	    $scope.actionMessage = null;
	    var auto = $scope.currentOrder.autoID;
	    OrderConfig.address($scope.currentOrder, $scope.user);
	    Order.save($scope.currentOrder,
	        function(data) {
		        $scope.currentOrder = data;
		        if (auto) {
			        $scope.currentOrder.autoID = true;
			        $scope.currentOrder.ExternalID = 'auto';
		        }
		        $scope.displayLoadingIndicator = false;
		        if (callback) callback($scope.currentOrder);
	            $scope.actionMessage = "Your changes have been saved";
	        },
	        function(ex) {
		        $scope.currentOrder.ExternalID = null;
		        $scope.errorMessage = ex.Message;
		        $scope.displayLoadingIndicator = false;
		        $scope.shippingUpdatingIndicator = false;
		        $scope.shippingFetchIndicator = false;
	        }
        );
    };

    $scope.continueShopping = function() {
	    if (confirm('Do you want to save changes to your order before continuing?') == true)
	        saveChanges(function() { $location.path('catalog') });
        else
		    $location.path('catalog');
    };

    $scope.cancelOrder = function() {
	    if (confirm('Are you sure you wish to cancel your order?') == true) {
		    $scope.displayLoadingIndicator = true;
	        Order.delete($scope.currentOrder,
		        function() {
		            $scope.user.CurrentOrderID = null;
		            $scope.currentOrder = null;
			        User.save($scope.user, function(data) {
				        $scope.user = data;
				        $scope.displayLoadingIndicator = false;
				        $location.path('catalog');
			        });
		        },
		        function(ex) {
			        $scope.actionMessage = ex.Message;
			        $scope.displayLoadingIndicator = false;
		        }
	        );
	    }
    };

    $scope.saveChanges = function() {
        saveChanges();
    };

    $scope.submitOrder = function() {
       submitOrder();
    };

    $scope.saveFavorite = function() {
        FavoriteOrder.save($scope.currentOrder);
    };
}]);
four51.app.controller('ApprovalInputCtrl', ['$scope', '$rootScope', 'Order',
function ($scope, $rootScope, Order) {
	$scope.approveOrder = function() {
		$scope.loadingIndicator = true;
		$scope.order.Approve = true;
		Order.submit($scope.order,
			function(data) {
				$scope.order = data;
				$scope.loadingIndicator = false;
			},
			function(ex) {
				$scope.loadingIndicator = false;
				$scope.error = ex.Detail;
			}
		);
	}

	$scope.declineOrder = function() {
		$scope.loadingIndicator = true;
		$scope.order.Decline = true;
		Order.submit($scope.order, function(data) {
			$scope.order = data;
			$scope.loadingIndicator = false;
		});
	}
}]);
four51.app.controller('SpecFormCtrl', ['$scope', '$location', '$route', '$routeParams', 'ProductDisplayService', 'Variant',
function ($scope, $location, $route, $routeParams, ProductDisplayService, Variant) {
	var varID = $routeParams.variantInteropID == 'new' ? null :  $routeParams.variantInteropID;

	ProductDisplayService.getProductAndVariant($routeParams.productInteropID, varID, function(data){
		$scope.Product = data.product;
		if(varID)
			$scope.Variant = data.variant;
		else{
			$scope.Variant = {};
			$scope.Variant.ProductInteropID = $scope.Product.InteropID;
			$scope.Variant.Specs = {};
			angular.forEach($scope.Product.Specs, function(item){
				if(!item.CanSetForLineItem)
				{
					$scope.Variant.Specs[item.Name] = item;
				}
			});
		}
	});

	$scope.save = function(){
		Variant.save($scope.Variant, function(data){
			$location.path('/product/' + $scope.Product.InteropID + '/'+ data.InteropID);
		});
	}
}]);
four51.app.controller('ConditionsCtrl', ['$scope', '$location', 'User',
function ($scope, $location, User) {
	$scope.accept = function() {
		$scope.user.AcceptConditions = true;
		User.save($scope.user, function() {
			$location.path('catalog');
		});
	}
}]);
four51.app.controller('ReportsCtrl', ['$scope', '$location', '$451', 'SavedReports',
function ($scope, $location, $451, SavedReports) {
	SavedReports.query(function(list) {
		$scope.Reports = list;
	});

	$scope.GetReport = function(event, id) {
		event.preventDefault();
		SavedReports.get(id, function(data) {
			$scope.report = data;
		});
	}
}]);
four51.app.controller('ReportCtrl', ['$scope', '$routeParams', '$451', 'SavedReports',
function($scope, $routeParams, $451, SavedReports) {
	SavedReports.get($routeParams.id, function(data) {
		$scope.report = data;
	});
}]);
four51.app.controller('ProductSearchCtrl', ['$scope', 'Product', '$routeParams', '$location',
function($scope, Product, $routeParams, $location) {
	if($routeParams.searchTerm){
		$scope.searchTerm = $routeParams.searchTerm;
		Product.search(null, $scope.searchTerm, null, function(products) {
			$scope.products = products;
		});
	}
	$scope.search = function(){
		$location.path('/search/' + $scope.searchTerm);
	}
}]);
four51.app.controller('LineItemEditCtrl', ['$scope', '$routeParams', '$location', 'Product', 'ProductDisplayService', 'Order',
function ($scope, $routeParams, $location, Product, ProductDisplayService, Order) {
	$scope.LineItem = {};
	$scope.LineItem = $scope.currentOrder.LineItems[$routeParams.lineItemIndex];
	Product.get($scope.LineItem.Product.InteropID, function(product){
		$scope.LineItem.Product = product;
		ProductDisplayService.setProductViewScope($scope);
	});
	$scope.allowAddToOrder = true;
	$scope.addToOrderText = "Save Line Item";
	$scope.addToOrder = function(){
		if($scope.lineItemErrors && $scope.lineItemErrors.length){
			$scope.showAddToCartErrors = true;
			return;
		}
		Order.save($scope.currentOrder, function(o){
			$scope.currentOrder = o;
			$location.path('/cart');
		}, function(ex){
			console.log(ex);
		});
	}
}]);
four51.app.controller('RelatedProductsCtrl', ['$scope', 'Product', '$sce', function($scope, Product, $sce){
	if($scope.relatedgroupid){
		Product.search(null, null, $scope.relatedgroupid, function(products) {
			$scope.relatedProducts = products;
		});
		$scope.trusted = function(d){
			if(d) return $sce.trustAsHtml(d);
		}
	}
}]);
four51.app.controller('shortProductViewCtrl', ['$routeParams', '$scope', 'ProductDisplayService', function ($routeParams, $scope, ProductDisplayService) {
	$scope.LineItem = {};
	$scope.LineItem.Product = $scope.p;
	ProductDisplayService.setNewLineItemScope($scope);
	ProductDisplayService.setProductViewScope($scope);
	$scope.allowAddToOrderInProductList = $scope.allowAddToOrder && $scope.LineItem.Specs.length == 0 && $scope.LineItem.Product.Type != 'VariableText';
}]);
four51.app.config(['$httpProvider', function($httpProvider) {
	$httpProvider.interceptors.push(['$q', '$rootScope', '$451', 'Security', function($q, $rootScope, $451, Security) {
		function appendAuth(config) {
			config.headers['Authorization'] = Security.auth();
			return config;
		}

		return {
			'request': function(config) {
				return appendAuth(config) || $q.when(appendAuth(config));
			},
			'response': function(response) {
				// using status code 202 [Created] to represent the authentication token has been created. it fits the RFC spec and makes the authentication handling much more RESTy
				if (response.status === 202) {
                    Security.init(response.data, response.headers()["www-authenticate"]);
                    $rootScope.$broadcast('event:auth-loginConfirmed', response.data);
				}

				//if ($451.debug && typeof response.data == 'object')
				//	console.log(response.data);

				return response || $q.when(response);
			},
			'responseError': function(response) {
				if (response.status === 401) { // unauthorized
					$rootScope.$broadcast('event:auth-loginRequired');
                    return $q.reject(response);
				}

				// login failed for:
				if (response.status == 403) {
					$rootScope.$broadcast('event:auth-loginFailed', response.data.Message);
                    return $q.reject(response);
				}

				if (response.status != 200) {
                    //return $q.reject(response);
					throw response;
				}

				return $q.reject(response);
			}
		};
	}]);
}]);
four51.app.factory('Error', function() {
	var defineError = function(ex) {
		var obj = {
			Message: ex.data.Message || ex.Message || '',
			Detail: ex.data.ExceptionMessage || ex.ExceptionMessage || ex.message,
			Code: { text: ex.data.ExceptionType || ex.ExceptionType || '' },
			StackTrace: ex.data.StackTrace || ex.StackTrace || ''
		}
		obj.Code.text = obj.Code.text.replace('Four51.Framework.', '').replace('DBExceptions+', '');

		obj.Code.is = function(code) {
			return obj.Code.text.indexOf(code) > -1;
		}

		return obj;
	}

	return {
		format: defineError
	}
});
four51.app.factory('Security', ['$451', '$cookieStore', function($451, $cookieStore) {
	var _cookieName = 'user.' + $451.apiName;
    return {
        init: function(user, auth) {
            this.currentUser = {
	            SiteID: user.SiteID,
                Username: user.Username,
                InteropID: user.InteropID,
                FirstName: user.FirstName,
                LastName: user.LastName,
                Email: user.Email,
                Auth: auth
            };
            $cookieStore.put(_cookieName, this.currentUser);
        },
        clear: function() {
            $cookieStore.remove(_cookieName);
        },
        auth: function() {
            var user = $cookieStore.get(_cookieName);
            return user ? user.Auth : null;
        },
        isAuthenticated: function() {
            this.currentUser =  $cookieStore.get(_cookieName);
            return !!this.currentUser;
        },
        logout: function() {
            $cookieStore.remove(_cookieName);
            delete this.currentUser;
        }
    }
}]);
four51.app.factory('User', ['$q', '$rootScope', '$resource', '$451', 'Security', 'Error', function($q, $rootScope, $resource, $451, Security, Error) {
    var _cacheName = '451Cache.User.' + $451.apiName;
	function _then(fn, data) {
        if (angular.isFunction(fn))
            fn(data);
    }

    function _extend(u) {
		u.Permissions.contains = function(value) {
            return $451.contains(u.Permissions, value);
        };
        if ($451.contains(u.Permissions, ['PayByVisa', 'PayByMasterCard', 'PayByAmex', 'PayByDiscover', 'PayByDinersClub', 'PayByJCB', 'PayByDelta', 'PayBySwitch', 'PayBySolo', 'PayByElectron', 'PayByLaser']))
            u.Permissions.push('PayByCreditCard');

	    angular.forEach(u.CustomFields, function(f) {
			if (f.ControlType == 'File' && f.File && f.File.Url.indexOf('auth') == -1)
				f.File.Url += "&auth=" + Security.auth();
	    });
	    u.Company.POIDMask = u.Company.POIDMask.toUpperCase();
    }

	var _refresh = function() {
		store.remove(_cacheName);
		_get();
	}

    var _get = function(success) {
        var user = store.get(_cacheName);
	    user ? (function() { _extend(user); _then(success,user); })() :
            $resource($451.api('user')).get().$promise.then(function(u) {
                _extend(u);
                _then(success,u);
                store.set(_cacheName, u);
            });
    }

    var _save = function(user, success, error) {
        $resource($451.api('user')).save(user).$promise.then(
	        function(u) {
                _extend(u);
                _then(success,u);
                store.set(_cacheName, u);
            },
	        function(ex) {
		        if (angular.isFunction(error))
			        error(Error.format(ex));
	        }
        );
    }

    var _login = function(credentials, success, error) {
	    store.clear();
        $resource($451.api('login')).get(credentials).$promise.then(
	        function(u) {
                _then(success,u);
	        },
	        function(ex) {
		        if (angular.isFunction(error))
			        error(Error.format(ex));
	        }
        );
    }

    var _logout = function() {
        store.clear();
        Security.logout();
    }

    return {
        get: _get,
        login: _login,
        save: _save,
        logout: _logout,
	    refresh: _refresh
    };
}]);
four51.app.factory('ProductDisplayService', function($451, $sce, Variant, Product){
	function calcTotal(lineItem){

		var ps = lineItem.PriceSchedule;
		var variant = lineItem.Variant;
		var product = lineItem.Product;
		var unitPrice = 0;
		// AmountPerQuantity(fixed amount per unit)
		// AmountTotal (fixed amount per line)
		// Percentage (of line total)
		var fixedAddPerLine = 0;
		var percentagePerLine = 0;
		var amountPerQty = 0;
		var priceBreak;
		//var otherValueMarkup = 0;
		//var specs = $scope.variant ? $scope.variant.Specs : [];

		var addToMarkups = function(spec){
			var otherMarkup;
			if(spec.isOtherSelected && spec.OtherValueMarkup > 0)
				otherMarkup = spec.OtherValueMarkup;

			if((spec.Options && spec.SelectedOptionID) || otherMarkup){

				var option = !spec.SelectedOptionID ? null : $451.filter(spec.Options, {Property: 'ID', Value: spec.SelectedOptionID})[0];
				if(!option && !otherMarkup)
					return;
				if(spec.MarkupType ==="AmountPerQuantity" )
					amountPerQty += otherMarkup || option.Markup;
				if(spec.MarkupType ==="Percentage" )
					percentagePerLine += otherMarkup || option.Markup;
				if(spec.MarkupType ==="AmountTotal")
					fixedAddPerLine += otherMarkup || option.Markup;
			}
		};

		if(variant) angular.forEach(variant.Specs, addToMarkups );
		angular.forEach(lineItem.Specs, addToMarkups );

		angular.forEach(ps.PriceBreaks, function(pb){

			if(lineItem.Quantity >= pb.Quantity)
				priceBreak = pb; //assumes they will be in order of smallest to largest
		});
		if(!priceBreak){
			lineItem.LineTotal = 0;
			return;
		}
		var total = lineItem.Quantity * (priceBreak.Price + amountPerQty);
		total += lineItem.Quantity * priceBreak.Price * (percentagePerLine / 100);
		total += fixedAddPerLine; //+ otherValueMarkup;

		var debugLineTotal = "line total debug:\rquantity:" + lineItem.Quantity +" & " +
			"amount added per quantity:" + amountPerQty + " & " +
			"fixed ammount per line added:" + fixedAddPerLine + " & " +
			"percentage added to qty*unitprice:" + percentagePerLine + " & " + //"'other value' markup:" + otherValueMarkup + " & " +
			"unit price:" + priceBreak.Price;
		lineItem.LineTotal = total;
		lineItem.UnitPrice = priceBreak.Price;
	}
	function productViewScope(scope){
		scope.lineItemErrors = [];
		scope.$watch("LineItem", function(){
			scope.setAddToOrderErrors();
		}, true);
		scope.$watch("variantLineItems", function(){
			scope.setAddToOrderErrors();
		}, true);
		scope.setAddToOrderErrors = function(){
			//console.log("set add to order errors")
			var newErrorList = [];

			if(scope.allowAddFromVariantList){
				var haveQty = false;
				var haveQtyError = false;
				angular.forEach(scope.variantLineItems, function(item){
					if(item.Quantity > 0)
						haveQty = true;
					if(item.qtyError && !haveQtyError)
					{
						newErrorList.push(item.qtyError);
						haveQtyError = true;
					}
				});
				if(scope.LineItem.Product.Type == 'VariableText' && !Object.keys(scope.variantLineItems).length)
					newErrorList.push("Please create a variant.");
				else if(!haveQty && !haveQtyError)
					newErrorList.push("Please select a quantity");

			}else if(!scope.LineItem.Quantity && !scope.LineItem.qtyError)//if there's a qty error, just use that. in this case, there's no qty error because it hasn't been validated yet.
				newErrorList.push("Please select a quantity.");

			if(scope.LineItem.qtyError)
				newErrorList.push(scope.LineItem.qtyError);

			if(!scope.LineItem.Variant && scope.LineItem.Product.IsVBOSS){
				newErrorList.push("Please select an active product");
			}
			angular.forEach(scope.LineItem.Specs, function(s){
				if(s.Required && !s.Value)
					newErrorList.push(s.Name + " is a required field");
			});
			//if(scope.addToOrderForm && scope.addToOrderForm.$invalid){
			//	newErrorList.push("Please fill all required fields");
			//}
			scope.lineItemErrors = newErrorList;
		}

		scope.specChanged = function(spec){
			console.log('spec changed');
			if(!spec){
				return;
			}
			if(scope.variantLineItems){
				angular.forEach(scope.variantLineItems, function(item){
					calcTotal(item);
				});
				scope.calcVariantLineItems();
				return;
			}
			if(spec.DefinesVariant)
			{
				var specOptionIDs = [];
				var hasAllVarDefiningSpecs = true;
				$451.filter(scope.LineItem.Specs, {Property: 'DefinesVariant', Value:true}, function(item){
					if(!item.SelectedOptionID)
					{
						hasAllVarDefiningSpecs = false;
						return;
					}
					specOptionIDs.push(item.SelectedOptionID);
				})
				if(hasAllVarDefiningSpecs){
					//{'ProductInteropID': productInteropID, 'SpecOptionIDs': specOptionIDs}
					Variant.get({'ProductInteropID': scope.LineItem.Product.InteropID, 'SpecOptionIDs': specOptionIDs}, function(data){
						if(!data.IsDefaultVariant)
							scope.LineItem.Variant = data;
						newLineItemScope(scope);
					}, function(ex){
						scope.LineItem.Variant = null;
					});
				}
			}
			calcTotal(scope.LineItem);

		}
		scope.trustedDescription = function(p){
			if(p) return $sce.trustAsHtml(p.Description);
		}
		scope.inventoryDisplay = function(product, variant){
			var qa = product.IsVariantLevelInventory ? variant : product;
			if(qa)
				return qa.QuantityAvailable > 0 ? qa.QuantityAvailable : 0;
			else return null;
		}
		if(scope.LineItem.Variant){
			//scope.LineItem.Variant = variant;
			scope.StaticSpecGroups = scope.LineItem.Variant.StaticSpecGroups || scope.LineItem.Product.StaticSpecGroups;
		}else{
			scope.StaticSpecGroups = scope.LineItem.Product.StaticSpecGroups;
		}
	}
	function newLineItemScope(scope){
		function variantHasPriceSchedule(product, scheduleType){
			if(!product.Variants)
				return false;
			for(var i = 0; i < product.Variants.length; i++){
				if(product.Variants[i][scheduleType])
					return true;
			}
			return false;
		}

		var hasAddToOrderSpecs = false; //TODO:determine based on lineitem or product setup

		if(!scope.LineItem.Specs){//it's possible we're reloading this due to changing a variant and we don't want to leave the spec values behind
			scope.LineItem.Specs = {};
			angular.forEach(scope.LineItem.Product.Specs, function(item){
				if(item.CanSetForLineItem || item.DefinesVariant)
				{
					hasAddToOrderSpecs = true;
					scope.LineItem.Specs[item.Name] = item;// Object.create(item);
				}
			});
		}

		scope.allowAddFromVariantList =
			(scope.LineItem.Product.ShowSpecsWithVariantList || !hasAddToOrderSpecs)
				&& !scope.LineItem.Variant
				&& scope.LineItem.Product.Variants
				&& (scope.LineItem.Product.Variants.length > 0 || scope.LineItem.Product.Type == 'VariableText')

		if(scope.LineItem.Variant){
			scope.LineItem.PriceSchedule = scope.LineItem.Variant.StandardPriceSchedule ? scope.LineItem.Variant.StandardPriceSchedule : scope.LineItem.Product.StandardPriceSchedule; //include user permissions to decide to show
			//moved to productViewScope scope.StaticSpecGroups = scope.LineItem.Variant.StaticSpecGroups || scope.LineItem.Product.StaticSpecGroups;
		}else{
			scope.LineItem.PriceSchedule = variantHasPriceSchedule(scope.LineItem.Product, 'StandardPriceSchedule') ? null : scope.LineItem.Product.StandardPriceSchedule; //don't show price schedule if variant overrides parent PS
			if(scope.allowAddFromVariantList){
				var p = scope.LineItem.Product;
				scope.variantLineItems = {};
				angular.forEach(p.Variants, function(v){
					scope.variantLineItems[v.InteropID] = {PriceSchedule: v.StandardPriceSchedule || p.StandardPriceSchedule, Product: p, Variant: v, Specs: scope.LineItem.Specs};
				});
			}
		}

		scope.allowAddToOrder =  scope.allowAddFromVariantList || (scope.LineItem.Variant || (scope.LineItem.Product.VariantCount == 0 && scope.LineItem.Product.Type != 'VariableText'));//this will include some order type and current order logic.

		//short view//scope.allowAddToOrder = scope.LineItem.Product.Variants.length == 0 && scope.lineItemSpecs.length == 0 && scope.LineItem.Product.Type != 'VariableText';
		//one view//ng-show="LineItem.Variant || LineItem.Product.Variants.length == 0"
	}

	//function productViewName(p){
	//	p.ViewName = staticSpecSPAConfig(p, 'ViewName') || 'default';
	//}
	function staticSpecSPAConfig(product, specName){
		if(!product.StaticSpecGroups)
			return null;
		if(!product.StaticSpecGroups.SPAProductConfig)
			return null;
		if(!product.StaticSpecGroups.SPAProductConfig.Specs[specName])
			return null;
		return product.StaticSpecGroups.SPAProductConfig.Specs[specName].Value || escapeNull;
	}
	function _getProductAndVariant(productInteropID, variantInteropID, callback){
		Product.get(productInteropID, function(data){
			var p = data;
			if(variantInteropID){
				if(p.Type == 'VariableText'){
					Variant.get({VariantInteropID: variantInteropID, ProductInteropID: p.InteropID }, function(v) {
						callback({product: p, variant: v});
					});
				}else{
					var variant = $451.filter(data.Variants, {Property: 'InteropID', Value: variantInteropID})[0];
					callback({product: p, variant: variant});
				}
			}
			else
				callback({product:p});
		});
	};
	return{
		getProductAndVariant: _getProductAndVariant,
		setNewLineItemScope: function(scope){
			newLineItemScope(scope);
		},
		setProductViewScope: function(scope){
			productViewScope(scope);
			//productViewName(scope.LineItem.Product);
		},
		//setProductViewName: function(p){
		//	productViewName(p);
		//},
		calculateLineTotal: function(lineItem){
			return calcTotal(lineItem);
		},
		getStaticSpecSPAConfig: function(product, specName){
			return staticSpecSPAConfig(product, specName);
		}
	}
});
four51.app.factory('Order', ['$resource', '$rootScope', '$451', 'Security', 'Error', function($resource, $rootScope, $451, Security, Error) {
	function _then(fn, data) {
		if (angular.isFunction(fn))
			fn(data);
		$rootScope.$broadcast('event:orderUpdate', data);
	}

	function _extend(order) {
		order.isEditable = order.Status == 'Unsubmitted' || order.Status == 'Open';
		angular.forEach(order.LineItems, function(item) {
			item.OriginalQuantity = item.Quantity; //needed to validate qty changes compared to available quantity
			angular.forEach(item.Specs, function(spec) {
				if (spec.ControlType == 'File' && spec.File && spec.File.Url.indexOf('auth') == -1)
					spec.File.Url += "&auth=" + Security.auth();
			});
			item.SpecsLength = Object.keys(item.Specs).length;
		});

		order.IsMultipleShip = function() {
			var multi = false;
			angular.forEach(order.LineItems, function(li, i) {
				multi = multi || i > 0 ? (li.ShipAddressID != order.LineItems[i-1].ShipAddressID || li.ShipperID != order.LineItems[i-1].ShipperID ||  (li.ShipFirstName != order.LineItems[i-1].ShipFirstName && order.LineItems[i-1].ShipLastName != order.ShipLastName)) : false;
			});
			return multi;
		}
	}

	var _get = function(id, success) {
		var currentOrder = store.get('451Cache.Order.' + id);
		currentOrder ? (function() { _extend(currentOrder);	_then(success, currentOrder); })() :
	        $resource($451.api('order')).get({'id': id }).$promise.then(function(o) {
		        _extend(o);
		        store.set('451Cache.Order.' + id, o);
	            _then(success, o);
	        });
    }

    var _save = function(order, success, error) {
        $resource($451.api('order')).save(order).$promise.then(
	        function(o) {
		        store.set('451Cache.Order.' + o.ID, o);
		        _extend(o);
	            _then(success, o);
	        },
	        function(ex) {
		        error(Error.format(ex));
	        }
        );
    }

    var _delete = function(order, success, error) {
        $resource($451.api('order')).delete().$promise.then(
	        function() {
		        store.remove('451Cache.Order.' + order.ID);
	           _then(success);
	        },
	        function(ex) {
		        error(Error.format(ex));
	        }
        );
    }

    var _submit = function(order, success, error) {
        $resource($451.api('order'), { }, { submit: { method: 'PUT' }}).submit(order).$promise.then(
	        function(o) {
		        store.set('451Cache.Order.' + o.ID);
		        _extend(o);
	            _then(success,o);
	        },
	        function(ex) {
		        error(Error.format(ex));
	        }
        );
    }

    return {
        get: _get,
        save: _save,
        delete: _delete,
        submit: _submit
    }
}]);
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
		angular.forEach(user.CostCenters, function(c) {
			if (c.DefaultAddressID) {
				if (order.CostCenter)
					order.ShipAddressID = order.ShipAddressID ||  order.CostCenter == c.Name ? c.DefaultAddressID : null;
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


;
four51.app.factory('OrderSearch', ['$resource', '$451', function($resource, $451) {

    var _search = function(stat, success) {
        $resource($451.api('order'),{},
            { 'get': { method: 'GET', isArray: true }}
        ).get(stat).$promise.then(function(list) {
            if (angular.isFunction(success))
                success(list);
        });
    }

	return {
		search: _search
	};
}]);
four51.app.factory('OrderSearchCriteria', ['$resource', '$http', '$451', function($resource, $http, $451) {

    var _query = function(success) {
        $resource($451.api('orderstats')).query().$promise.then(function(stats) {
            if (angular.isFunction(success))
                success(stats);
        });
    }

	return {
		query: _query
	}
}]);
four51.app.factory('Product', ['$resource', '$451', 'Security', function($resource, $451, Security) {
	//var _cacheName = '451Cache.Product.' + $451.apiName;
	function _then(fn, data) {
		if (angular.isFunction(fn))
			fn(data);
	}

	function _extend(product) {
		product.ViewName = product.ViewName || 'default';
		angular.forEach(product.Specs, function(spec) {
			if (spec.ControlType == 'File' && spec.File && spec.File.Url.indexOf('auth') == -1)
				spec.File.Url += "&auth=" + Security.auth();
		});

		angular.forEach(product.StaticSpecGroups, function(group) {
			angular.forEach(group.Specs, function(spec) {
				if (spec.FileURL && spec.FileURL.indexOf('auth') == -1)
					spec.FileURL += "&auth=" + Security.auth();
			});
		});

		product.StaticSpecLength = product.StaticSpecGroups ? Object.keys(product.StaticSpecGroups).length : 0;
	}

     var _get = function(param, success) {
	     //var product = store.get(_cacheName + param);
	     //product ? (function() { _extend(product);	_then(success, product); })() :
		 var product = $resource($451.api('Products/:interopID'), { interopID: '@ID' }).get({ interopID: param }).$promise.then(function(product) {
				_extend(product);
				//store.set(_cacheName + product.InteropID, product);
				_then(success, product);
	         });
    }

    var _search = function(categoryInteropID, searchTerm, relatedProductsGroupID, success) {
        if(!categoryInteropID && !searchTerm && !relatedProductsGroupID) return null;

        var criteria = {
            'CategoryInteropID': categoryInteropID,
            'SearchTerms': searchTerm ? searchTerm : '',
			'RelatedProductGroupID': relatedProductsGroupID
        };
	    //var cacheID = '451Cache.Products.' + criteria.CategoryInteropID + criteria.SearchTerms.replace(/ /g, "");
		//var products = store.get(cacheID);
	    //products ? _then(success, products) :
	    var products = $resource($451.api('Products')).query(criteria).$promise.then(function(products) {
		        //store.set(cacheID, products);
	            angular.forEach(products, _extend);
				_then(success, products);
	        });
    }
	
	return {
        get: _get,
        search: _search
    }
}]);
four51.app.factory('Variant', ['$resource', '$451', 'Security', function($resource, $451, Security) {
	function _then(fn, data) {
		if (angular.isFunction(fn))
			fn(data);
	}

	function _extend(variant) {
		angular.forEach(variant.Specs, function(spec) {
			if (spec.ControlType == 'File' && spec.File && spec.File.Url.indexOf('auth') == -1)
				spec.File.Url += "&auth=" + Security.auth();
		});
	}

	var _get = function(params, success, error) {

		$resource($451.api('variant')).get(params).$promise.then(function(variant) {
			_extend(variant);
			_then(success, variant);
		},function(ex) {
			error(ex);
		});
	}
	var _save = function(variant, success) {
		return $resource($451.api('variant')).save(variant).$promise.then(function(v) {
			var queryParams = {ProductInteropID: v.ProductInteropID, VariantInteropID: v.InteropID};
			//store.remove(getCacheName(queryParams));
			_extend(v);
			//store.set(getCacheName(queryParams), v);
			_then(success, v);
		});
	}
	return {
		get: _get,
		save: _save
	}
}]);
four51.app.factory('Category', ['$resource', '$451', function($resource, $451) {
    function _then(fn, data) {
        if (angular.isFunction(fn))
            fn(data);
    }

    var _get = function(interopID, success) {
		var category = store.get('451Cache.Category.' + interopID);
        category ? _then(success,category) :
            $resource($451.api('categories/:interopID', {interopID: '@ID'})).get({ 'interopID': interopID}).$promise.then(function(category) {
	            store.set('451Cache.Category.' + category.InteropID, category);
                _then(success, category);
            });
    }

	var _treeCacheName = '451Cache.Tree.' + $451.apiName;
    var _query = function(success){
		var tree = store.get(_treeCacheName);
        tree ? _then(success,tree) :
            $resource($451.api('categories'), {}, { query: { method: 'GET', isArray: true }}).query().$promise.then(function(tree){
                store.set(_treeCacheName, tree);
               _then(success, tree);
            });
    }

    return {
        tree: _query,
        get: _get
    }
}]);
four51.app.factory('Message', ['$resource', '$451', function($resource, $451) {
	function _then(fn, data) {
		if (angular.isFunction(fn))
			fn(data);
	}

    var _get = function(id, success) {
		var message = store.get('451Cache.Message.' + id);
		message ? _then(success, message) :
	        $resource($451.api('message/:id'), { id: '@id' }).get({ 'id': id}).$promise.then(function(msg) {
		        store.set('451Cache.Message.' + msg.ID, msg);
	            _then(success, msg);
	        });
    }

    var _delete = function(msg, success) {
        $resource($451.api('message')).delete(msg, function() {
	        store.remove('451Cache.Messages');
	        store.remove('451Cache.Message.' + msg.ID);
            _then(success);
        });
    }

    var _save = function(msg, success) {
        $resource($451.api('message')).save(msg).$promise.then(function(m) {
	        store.remove('451Cache.Messages');
	        store.set('451Cache.Message.' + m.ID, m);
            _then(success, m);
        });
    }

	return {
		get: _get,
		delete: _delete,
		save: _save
	}
}]);
four51.app.factory('MessageList', ['$q', '$resource', '$451', function($q, $resource, $451) {
	function _then(fn, data) {
		if (angular.isFunction(fn))
			fn(data);
	}

	var _query = function(success) {
		var messages = store.get('451Cache.Messages');
		messages ? _then(success, messages) :
			$resource($451.api('message')).query().$promise.then(function(list) {
				store.set('451Cache.Messages', list);
				_then(success, list);
			});
	}

	var _delete = function(messages, success) {
		store.remove('451Cache.Messages');

		var queue = [];
		angular.forEach(messages, function(msg) {
			if (msg.Selected) {
				queue.push((function() {
					var d = $q.defer();
					$resource($451.api('message')).delete(msg).$promise.then(function() {
						d.resolve();
					});
					return d.promise;
				})());
			}
		});

		$q.all(queue).then(function() {
			_then(success);
		});
	}

	return {
		query: _query,
		delete: _delete
	}
}]);
four51.app.factory('FavoriteOrder', ['$q', '$resource', '$451', function($q, $resource, $451) {
	var _cacheName = '451Cache.FavoriteOrders.' + $451.apiName;
	function _then(fn, data) {
		if (angular.isFunction(fn))
			fn(data);
	}

    var _query = function(success) {
		var favorites = store.get(_cacheName);
	    favorites ? _then(success, favorites) :
	        $resource($451.api('favoriteorder'), {}, { isArray: true}).query(function(fav) {
		        store.set(_cacheName, fav);
	           _then(success, fav);
	        });
    }

    var _save = function(order, success) {
	    store.remove(_cacheName);
	    store.remove('451Cache.Order.' + order.ID);
        $resource($451.api('favoriteorder'), {},  { 'save': { method: 'POST', isArray: true }}).save(order).$promise.then(function(fav) {
	        store.set(_cacheName, fav);
            _then(success, fav);
        });
    }

	var _delete = function(orders, success) {
		store.remove(_cacheName);

		var queue = [];
		angular.forEach(orders, function(o) {
			if (o.Selected) {
				queue.push((function() {
					var d = $q.defer();
					$resource($451.api('favoriteorder')).delete(o).$promise.then(function() {
						d.resolve();
					});
					return d.promise;
				})());
			}
		});

		$q.all(queue).then(function() {
			_then(success);
		});
	}

	return {
		query: _query,
		save: _save,
		delete: _delete
	}
}]);
four51.app.factory('SpendingAccount', ['$resource', '$rootScope', '$451', function($resource, $rootScope, $451) {
	function _then(fn, data) {
        if (angular.isFunction(fn)) {
            fn(data);
	        $rootScope.$broadcast('event:SpendingAccountUpdate', data);
        }
    }

    var _query = function(success) {
		return $resource($451.api('spendingaccount')).query().$promise.then(function(list) {
		   _then(success, list);
		});
    }

    return {
        query: _query
    };
}]);
four51.app.factory('Address', ['$resource', '$451', 'Error', function($resource, $451, Error) {
    function _then(fn, data) {
        if (angular.isFunction(fn))
            fn(data);
    }

	function _extend(address) {	}

    var _get = function(id, success) {
		var address = store.get('451Cache.Address.' + id);
	    address ? (function() { _extend(address); _then(success, address); })() :
            $resource($451.api('address/:id'), { id: '@id' }).get({ id: id }).$promise.then(function(add) {
                store.set('451Cache.Address.' + id, add);
	            _extend(add);
                _then(success, add);
            });
    }

    var _save = function(address, success, error) {
        return $resource($451.api('address')).save(address).$promise.then(
		    function(add) {
		        store.remove('451Cache.Addresses');
	            store.set('451Cache.Address.' + add.ID, add);
		        _extend(add);
	            _then(success, add);
	        },
	        function(ex) {
		        error(Error.format(ex));
	        }
        );
    }

    var _delete = function(address, success) {
        return $resource($451.api('address')).delete(address).$promise.then(function() {
	        store.remove('451Cache.Addresses');
            store.remove('451Cache.Address.' + address.ID);
            _then(success);
        });
    }

    return {
        get: _get,
        save: _save,
        delete: _delete
    };
}]);
four51.app.factory('AddressList', ['$q', '$resource', '$451', function($q, $resource, $451) {
	function _then(fn, data) {
		if (angular.isFunction(fn))
			fn(data);
	}

	var _query = function(success) {
		var addresses = store.get('451Cache.Addresses');
		addresses ? _then(success, addresses) :
			$resource($451.api('address')).query().$promise.then(function(list) {
				store.set('451Cache.Addresses', list);
				_then(success, list);
			});
	}

	var _delete = function(addresses, success) {
		store.remove('451Cache.Addresses');

		var queue = [];
		angular.forEach(addresses, function(add) {
			if (add.Selected) {
				queue.push((function() {
					var d = $q.defer();
					$resource($451.api('address')).delete(add).$promise.then(function() {
						d.resolve();
					});
					return d.promise;
				})());
			}
		});

		$q.all(queue).then(function() {
			_then(success);
		});
	}

	return {
		query: _query,
		delete: _delete
	}
}]);
four51.app.factory('Shipper', ['$resource', '$451', function($resource, $451) {
	function _then(fn, data) {
		if (angular.isFunction(fn))
			fn(data);
	}

	function buildCacheID(order) {
		var cacheID = "451Cache.Shippers." + order.ID;
		angular.forEach(order.LineItems, function(item) {
			cacheID += item.Quantity + item.Product.InteropID + item.ShipAddressID;
		});
		return cacheID;
	}

    var _query = function(order, success) {
	    if (!order) return null;
	    //var id = buildCacheID(order),
		//    shippers = store.get(id);
		//shippers ? _then(success, shippers) :
	        $resource($451.api('shipper')).query().$promise.then(function(list) {
		//        store.set(id, list);
	            _then(success, list);
	        });
    }

    return {
        query: _query
    }
}]);
four51.app.factory('Coupon', ['$resource', '$451', 'Error', function($resource, $451, Error){
	function _then(fn, data) {
		if (angular.isFunction(fn))
			fn(data);
	}

	var _save = function(code, success, error) {
		return $resource($451.api('coupon')).save({ 'CouponCode': code}).$promise.then(
			function(c) {
				_then(success, c);
			},
			function(ex) {
				error(Error.format(ex));
			}
		);
	}

	var _delete = function(success) {
		return $resource($451.api('coupon')).delete().$promise.then(function() {
			_then(success);
		});
	}

	return {
		apply: _save,
		remove: _delete
	};
}]);
four51.app.factory('GiftCard', ['$resource', '$451', 'Error', function($resource, $451, Error) {
	function _then(fn, data) {
		if (angular.isFunction(fn))
			fn(data);
	}

	var _redeem = function(giftcard, success, error) {
		return $resource($451.api('giftcard')).save(giftcard).$promise.then(
			function(card) {
				_then(success, card);
			},
			function(ex) {
				error(Error.format(ex));
			}
		);
	}


	return {
		redeem: _redeem
	};
}]);
four51.app.factory('SavedCreditCard', ['$resource', '$rootScope', '$451', function($resource, $rootScope, $451) {
	function _then(fn, data) {
        if (angular.isFunction(fn)) {
            fn(data);
        }
    }

    var _query = function(success) {
	    var cards = store.get('451Cache.SavedCards');
	    cards ? _then(success, cards) :
			$resource($451.api('savedcreditcard')).query().$promise.then(function(list) {
				store.set('451Cache.SavedCards', list);
		        _then(success, list);
			});
    };

	var _delete = function(card, success) {
		$resource($451.api('savedcreditcard')).delete(card, function() {
			store.remove('451Cache.SavedCards');
			_then(success);
		});
	};

    return {
        query: _query,
	    delete: _delete
    };
}]);
four51.app.factory('Resources', function() {
    var countries = [
        { "label": "United States of America", "value": "US"},
        { "label": "Afghanistan", "value": "AF"},
        { "label": "Åland Islands", "value": "AX"},
        { "label": "Albania", "value": "AL"},
        { "label": "Algeria", "value": "DZ"},
        { "label": "American Samoa", "value": "AS"},
        { "label": "Andorra", "value": "AD"},
        { "label": "Angola", "value": "AO"},
        { "label": "Anguilla", "value": "AI"},
        { "label": "Antarctica", "value": "AQ"},
        { "label": "Antigua and Barbuda", "value": "AG"},
        { "label": "Argentina", "value": "AR"},
        { "label": "Armenia", "value": "AM"},
        { "label": "Aruba", "value": "AW"},
        { "label": "Australia", "value": "AU"},
        { "label": "Austria", "value": "AT"},
        { "label": "Azerbaijan", "value": "AZ"},
        { "label": "Bahamas", "value": "BS"},
        { "label": "Bahrain", "value": "BH"},
        { "label": "Bangladesh", "value": "BD"},
        { "label": "Barbados", "value": "BB"},
        { "label": "Belarus", "value": "BY"},
        { "label": "Belgium", "value": "BE"},
        { "label": "Belize", "value": "BZ"},
        { "label": "Benin", "value": "BJ"},
        { "label": "Bermuda", "value": "BM"},
        { "label": "Bhutan", "value": "BT"},
        { "label": "Bolivia", "value": "BO"},
        { "label": "Bosnia and Herzegovina", "value": "BA"},
        { "label": "Botswana", "value": "BW"},
        { "label": "Bouvet Island", "value": "BV"},
        { "label": "Brazil", "value": "BR"},
        { "label": "British Indian Ocean Territory", "value": "IO"},
        { "label": "Brunei Darussalam", "value": "BN"},
        { "label": "Bulgaria", "value": "BG"},
        { "label": "Burkina Faso", "value": "BF"},
        { "label": "Burundi", "value": "BI"},
        { "label": "Cambodia", "value": "KH"},
        { "label": "Cameroon", "value": "CM"},
        { "label": "Canada", "value": "CA"},
        { "label": "Cape Verde", "value": "CV"},
        { "label": "Cayman Islands", "value": "KY"},
        { "label": "Central African Republic", "value": "CF"},
        { "label": "Chad", "value": "TD"},
        { "label": "Chile", "value": "CL"},
        { "label": "China", "value": "CN"},
        { "label": "Christmas Island Australia", "value": "CX"},
        { "label": "Cocos Keeling Islands", "value": "CC"},
        { "label": "Colombia", "value": "CO"},
        { "label": "Comoros", "value": "KM"},
        { "label": "Congo", "value": "CG"},
        { "label": "Congo, D.R.", "value": "CD"},
        { "label": "Cook Islands", "value": "CK"},
        { "label": "Costa Rica", "value": "CR"},
        { "label": "Cote D'Ivoire Ivory Coast", "value": "CI"},
        { "label": "Croatia Hrvatska", "value": "HR"},
        { "label": "Cuba", "value": "CU"},
        { "label": "Cyprus", "value": "CY"},
        { "label": "Czech Republic", "value": "CZ"},
        { "label": "Denmark", "value": "DK"},
        { "label": "Djibouti", "value": "DJ"},
        { "label": "Dominica", "value": "DM"},
        { "label": "Dominican Republic", "value": "DO"},
        { "label": "Ecuador", "value": "EC"},
        { "label": "Egypt", "value": "EG"},
        { "label": "El Salvador", "value": "SV"},
        { "label": "Equatorial Guinea", "value": "GQ"},
        { "label": "Eritrea", "value": "ER"},
        { "label": "Estonia", "value": "EE"},
        { "label": "Ethiopia", "value": "ET"},
        { "label": "Faeroe Islands", "value": "FO"},
        { "label": "Falkland Islands Malvinas", "value": "FK"},
        { "label": "Fiji", "value": "FJ"},
        { "label": "Finland", "value": "FI"},
        { "label": "France", "value": "FR"},
        { "label": "France, Metropolitan", "value": "FX"},
        { "label": "French Guiana", "value": "GF"},
        { "label": "French Polynesia", "value": "PF"},
        { "label": "French Southern Territories", "value": "TF"},
        { "label": "Gabon", "value": "GA"},
        { "label": "Gambia", "value": "GM"},
        { "label": "Georgia", "value": "GE"},
        { "label": "Germany", "value": "DE"},
        { "label": "Ghana", "value": "GH"},
        { "label": "Gibraltar", "value": "GI"},
        { "label": "Greece", "value": "GR"},
        { "label": "Greenland", "value": "GL"},
        { "label": "Grenada", "value": "GD"},
        { "label": "Guadeloupe", "value": "GP"},
        { "label": "Guam", "value": "GU"},
        { "label": "Guatemala", "value": "GT"},
        { "label": "Guinea", "value": "GN"},
        { "label": "Guinea Bissau", "value": "GW"},
        { "label": "Guyana", "value": "GY"},
        { "label": "Haiti", "value": "HT"},
        { "label": "Heard and McDonald Is.", "value": "HM"},
        { "label": "Honduras", "value": "HN"},
        { "label": "Hong Kong", "value": "HK"},
        { "label": "Hungary", "value": "HU"},
        { "label": "Iceland", "value": "IS"},
        { "label": "India", "value": "IN"},
        { "label": "Indonesia", "value": "ID"},
        { "label": "Iran", "value": "IR"},
        { "label": "Iraq", "value": "IQ"},
        { "label": "Isle of Man", "value": "IM"},
        { "label": "Ireland", "value": "IE"},
        { "label": "Israel", "value": "IL"},
        { "label": "Italy", "value": "IT"},
        { "label": "Jamaica", "value": "JM"},
        { "label": "Japan", "value": "JP"},
        { "label": "Jersey", "value": "JE"},
        { "label": "Jordan", "value": "JO"},
        { "label": "Kazakhstan", "value": "KZ"},
        { "label": "Kenya", "value": "KE"},
        { "label": "Kiribati", "value": "KI"},
        { "label": "Korea North", "value": "KP"},
        { "label": "Korea South", "value": "KR"},
        { "label": "Kuwait", "value": "KW"},
        { "label": "Kyrgyzstan", "value": "KG"},
        { "label": "Lao P.Dem.R.", "value": "LA"},
        { "label": "Latvia", "value": "LV"},
        { "label": "Lebanon", "value": "LB"},
        { "label": "Lesotho", "value": "LS"},
        { "label": "Liberia", "value": "LR"},
        { "label": "Libyan Arab Jamahiriya", "value": "LY"},
        { "label": "Liechtenstein", "value": "LI"},
        { "label": "Lithuania", "value": "LT"},
        { "label": "Luxembourg", "value": "LU"},
        { "label": "Macau", "value": "MO"},
        { "label": "Macedonia", "value": "MK"},
        { "label": "Madagascar", "value": "MG"},
        { "label": "Malawi", "value": "MW"},
        { "label": "Malaysia", "value": "MY"},
        { "label": "Maldives", "value": "MV"},
        { "label": "Mali", "value": "ML"},
        { "label": "Malta", "value": "MT"},
        { "label": "Marshall Islands", "value": "MH"},
        { "label": "Martinique", "value": "MQ"},
        { "label": "Mauritania", "value": "MR"},
        { "label": "Mauritius", "value": "MU"},
        { "label": "Mayotte", "value": "YT"},
        { "label": "Mexico", "value": "MX"},
        { "label": "Micronesia", "value": "FM"},
        { "label": "Moldova", "value": "MD"},
        { "label": "Monaco", "value": "MC"},
        { "label": "Mongolia", "value": "MN"},
        { "label": "Montenegro", "value":     "ME"},
        { "label": "Montserrat", "value": "MS"},
        { "label": "Morocco", "value": "MA"},
        { "label": "Mozambique", "value": "MZ"},
        { "label": "Myanmar", "value": "MM"},
        { "label": "Namibia", "value": "NA"},
        { "label": "Nauru", "value": "NR"},
        { "label": "Nepal", "value": "NP"},
        { "label": "Netherlands", "value": "NL"},
        { "label": "Netherlands Antilles", "value": "AN"},
        { "label": "New Caledonia", "value": "NC"},
        { "label": "New Zealand", "value": "NZ"},
        { "label": "Nicaragua", "value": "NI"},
        { "label": "Niger", "value": "NE"},
        { "label": "Nigeria", "value": "NG"},
        { "label": "Niue", "value": "NU"},
        { "label": "Norfolk Island", "value": "NF"},
        { "label": "Northern Mariana Islands", "value": "MP"},
        { "label": "Norway", "value": "NO"},
        { "label": "Oman", "value": "OM"},
        { "label": "Pakistan", "value": "PK"},
        { "label": "Palau", "value": "PW"},
        { "label": "Palestinian Territory, Occupied", "value": "PS"},
        { "label": "Panama", "value": "PA"},
        { "label": "Papua New Guinea", "value": "PG"},
        { "label": "Paraguay", "value": "PY"},
        { "label": "Peru", "value": "PE"},
        { "label": "Philippines", "value": "PH"},
        { "label": "Pitcairn", "value": "PN"},
        { "label": "Poland", "value": "PL"},
        { "label": "Portugal", "value": "PT"},
        { "label": "Puerto Rico", "value": "PR"},
        { "label": "Qatar", "value": "QA"},
        { "label": "Reunion", "value": "RE"},
        { "label": "Romania", "value": "RO"},
        { "label": "Russian Federation", "value": "RU"},
        { "label": "Rwanda", "value": "RW"},
        { "label": "Saint Helena", "value": "SH"},
        { "label": "Saint Kitts and Nevis", "value": "KN"},
        { "label": "Saint Lucia", "value": "LC"},
        { "label": "Saint Pierre and Miquelon", "value": "PM"},
        { "label": "Saint Vincent and the Grenadines", "value": "VC"},
        { "label": "Samoa", "value": "WS"},
        { "label": "San Marino", "value": "SM"},
        { "label": "Sao Tome and Principe", "value": "ST"},
        { "label": "Saudi Arabia", "value": "SA"},
        { "label": "Senegal", "value": "SN"},
        { "label": "Serbia", "value":     "RS"},
        { "label": "Seychelles", "value": "SC"},
        { "label": "Sierra Leone", "value": "SL"},
        { "label": "Singapore", "value": "SG"},
        { "label": "Slovakia", "value": "SK"},
        { "label": "Slovenia", "value": "SI"},
        { "label": "Solomon Islands", "value": "SB"},
        { "label": "Somalia", "value": "SO"},
        { "label": "South Africa", "value": "ZA"},
        { "label": "S. Georgia &amp; S. Sandwich Is.", "value": "GS"},
        { "label": "Spain", "value": "ES"},
        { "label": "Sri Lanka", "value": "LK"},
        { "label": "Sudan", "value": "SD"},
        { "label": "Suriname", "value": "SR"},
        { "label": "Svalbard &amp; Jan Mayen Is.", "value": "SJ"},
        { "label": "Swaziland", "value": "SZ"},
        { "label": "Sweden", "value": "SE"},
        { "label": "Switzerland", "value": "CH"},
        { "label": "Syrian Arab Rep.", "value": "SY"},
        { "label": "Taiwan", "value": "TW"},
        { "label": "Tajikistan", "value": "TJ"},
        { "label": "Tanzania", "value": "TZ"},
        { "label": "Thailand", "value": "TH"},
        { "label": "Timor-Leste", "value": "TG"},
        { "label": "Togo", "value": "TG"},
        { "label": "Tokelau", "value": "TK"},
        { "label": "Tonga", "value": "TO"},
        { "label": "Trinidad and Tobago", "value": "TT"},
        { "label": "Tunisia", "value": "TN"},
        { "label": "Turkey", "value": "TR"},
        { "label": "Turkmenistan", "value": "TM"},
        { "label": "Turks and Caicos Islands", "value": "TC"},
        { "label": "Tuvalu", "value": "TU"},
        { "label": "Uganda", "value": "UG"},
        { "label": "Ukraine", "value": "UA"},
        { "label": "United Kingdom", "value": "GB"},
        { "label": "United Arab Emirates", "value": "AE"},
        { "label": "US Minor Outlying Is.", "value": "UM"},
        { "label": "Uruguay", "value": "UY"},
        { "label": "Uzbekistan", "value": "UZ"},
        { "label": "Vanuatu", "value": "VU"},
        { "label": "Vatican City State", "value": "VC"},
        { "label": "Venezuela", "value": "VE"},
        { "label": "Viet Nam", "value": "VN"},
        { "label": "Virgin Islands British", "value": "VG"},
        { "label": "Virgin Islands US", "value": "VI"},
        { "label": "Wallis and Futuna Islnds", "value": "WF"},
        { "label": "Western Sahara", "value": "EH"},
        { "label": "Yemen", "value": "YE"},
        { "label": "Yugoslavia", "value": "YU"},
        { "label": "Zambia", "value": "ZM"},
        { "label": "Zimbabwe", "value": "ZW"}
    ];
    var states = [
        { "label": "Alabama", "value": "AL", "country": "US" },
        { "label": "Alaska", "value": "AK", "country": "US" },
        { "label": "Arizona", "value": "AZ", "country": "US" },
        { "label": "Arkansas", "value": "AR", "country": "US" },
        { "label": "California", "value": "CA", "country": "US" },
        { "label": "Colorado", "value": "CO", "country": "US" },
        { "label": "Connecticut", "value": "CT", "country": "US" },
        { "label": "Delaware", "value": "DE", "country": "US" },
        { "label": "District of Columbia", "value": "DC", "country": "US" },
        { "label": "Florida", "value": "FL", "country": "US" },
        { "label": "Georgia", "value": "GA", "country": "US" },
        { "label": "Hawaii", "value": "HI", "country": "US" },
        { "label": "Idaho", "value": "ID", "country": "US" },
        { "label": "Illinois", "value": "IL", "country": "US" },
        { "label": "Indiana", "value": "IN", "country": "US" },
        { "label": "Iowa", "value": "IA", "country": "US" },
        { "label": "Kansas", "value": "KS", "country": "US" },
        { "label": "Kentucky", "value": "KY", "country": "US" },
        { "label": "Louisiana", "value": "LA", "country": "US" },
        { "label": "Maine", "value": "ME", "country": "US" },
        { "label": "Maryland", "value": "MD", "country": "US" },
        { "label": "Massachusetts", "value": "MA", "country": "US" },
        { "label": "Michigan", "value": "MI", "country": "US" },
        { "label": "Minnesota", "value": "MN", "country": "US" },
        { "label": "Mississippi", "value": "MS", "country": "US" },
        { "label": "Missouri", "value": "MO", "country": "US" },
        { "label": "Montana", "value": "MT", "country": "US" },
        { "label": "Nebraska", "value": "NE", "country": "US" },
        { "label": "Nevada", "value": "NV", "country": "US" },
        { "label": "New Hampshire", "value": "NH", "country": "US" },
        { "label": "New Jersey", "value": "NJ", "country": "US" },
        { "label": "New Mexico", "value": "NM", "country": "US" },
        { "label": "New York", "value": "NY", "country": "US" },
        { "label": "North Carolina", "value": "NC", "country": "US" },
        { "label": "North Dakota", "value": "ND", "country": "US" },
        { "label": "Ohio", "value": "OH", "country": "US" },
        { "label": "Oklahoma", "value": "OK", "country": "US" },
        { "label": "Oregon", "value": "OR", "country": "US" },
        { "label": "Pennsylvania", "value": "PA", "country": "US" },
        { "label": "Rhode Island", "value": "RI", "country": "US" },
        { "label": "South Carolina", "value": "SC", "country": "US" },
        { "label": "South Dakota", "value": "SD", "country": "US" },
        { "label": "Tennessee", "value": "TN", "country": "US" },
        { "label": "Texas", "value": "TX", "country": "US" },
        { "label": "Utah", "value": "UT", "country": "US" },
        { "label": "Vermont", "value": "VT", "country": "US" },
        { "label": "Virginia", "value": "VA", "country": "US" },
        { "label": "Washington", "value": "WA", "country": "US" },
        { "label": "West Virginia", "value": "WV", "country": "US" },
        { "label": "Wisconsin", "value": "WI", "country": "US" },
        { "label": "Wyoming", "value": "WY", "country": "US" },
        { "label": "Armed Forces Americas (AA)", "value": "AA", "country": "US" },
        { "label": "Armed Forces Africa/Canada/Europe/Middle East (AE)", "value": "AE", "country": "US" },
        { "label": "Armed Forces Pacific (AP)", "value": "AP", "country": "US" },
        { "label": "American Samoa", "value": "AS", "country": "US" },
        { "label": "Federated States of Micronesia", "value": "FM", "country": "US" },
        { "label": "Guam", "value": "GU", "country": "US" },
        { "label": "Marshall Islands", "value": "MH", "country": "US" },
        { "label": "Northern Mariana Islands", "value": "MP", "country": "US" },
        { "label": "Palau", "value": "PW", "country": "US" },
        { "label": "Puerto Rico", "value": "PR", "country": "US" },
        { "label": "Virgin Islands", "value": "VI", "country": "US" },
        { "label": "Drenthe", "value": "Drenthe", "country": "NL" },
        { "label": "Flevoland", "value": "Flevoland", "country": "NL" },
        { "label": "Friesland", "value": "Friesland", "country": "NL" },
        { "label": "Gelderland", "value": "Gelderland", "country": "NL" },
        { "label": "Groningen", "value": "Groningen", "country": "NL" },
        { "label": "Limburg", "value": "Limburg", "country": "NL" },
        { "label": "Noord-Brabant", "value": "Noord-Brabant", "country": "NL" },
        { "label": "Noord-Holland", "value": "Noord-Holland", "country": "NL" },
        { "label": "Overijssel", "value": "Overijssel", "country": "NL" },
        { "label": "Utrecht", "value": "Utrecht", "country": "NL" },
        { "label": "Zeeland", "value": "Zeeland", "country": "NL" },
        { "label": "Zuid-Holland", "value": "Zuid-Holland", "country": "NL" },
        { "label": "Alberta", "value": "AB", "country": "CA" },
        { "label": "British Columbia", "value": "BC", "country": "CA" },
        { "label": "Manitoba", "value": "MB", "country": "CA" },
        { "label": "New Brunswick", "value": "NB", "country": "CA" },
        { "label": "Newfoundland and Labrador", "value": "NL", "country": "CA" },
        { "label": "Northwest Territories", "value": "NT", "country": "CA" },
        { "label": "Nova Scotia", "value": "NS", "country": "CA" },
        { "label": "Nunavut", "value": "NU", "country": "CA" },
        { "label": "Ontario", "value": "ON", "country": "CA" },
        { "label": "Prince Edward Island", "value": "PE", "country": "CA" },
        { "label": "Quebec", "value": "QC", "country": "CA" },
        { "label": "Saskatchewan", "value": "SK", "country": "CA" },
        { "label": "Yukon", "value": "YT", "country": "CA" }
    ];

    return {
        countries:  countries,
        states: states
    };
});
four51.app.factory('SavedReports', ['$resource', '$451', function($resource, $451) {
	function _then(fn, data) {
		if (angular.isFunction(fn)) {
			fn(data);
		}
	}

	function _extend(report) {
		switch (report.ReportType) {
			case 'LineItem':
			default:
				break;
		}
		report.AvailableTypes = {"LineItem": "Line Item", "Order": "Order" };
		if (report.ColumnOptions)
			report.ColumnOptionsLength = Object.keys(report.ColumnOptions).length;
	}

	var _query = function(success) {
		var reports = store.get('451Cache.SavedReports');
		reports ? (function() { _extend(reports); _then(success, reports); })() :
			$resource($451.api('savedreports')).query().$promise.then(function(list) {
				store.set('451Cache.SavedReports', list);
				_extend(list);
				_then(success, list);
			});
	}

	var _get = function(id, success) {
		$resource($451.api('savedreports/:id'), { id: '@id' }).get({ id: id }).$promise.then(function(data) {
			_extend(data);
			_then(success, data);
		});
	}

	return {
		query: _query,
		get: _get
	};
}]);
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
four51.app.factory('Nav', function() {
    var _status = { "visible" : true};

    var _toggle = function() {
        _status.visible = !_status.visible;
    }

    return {
        status: _status,
        toggle: _toggle
    };
});
four51.app.factory('fileReader', ['$q', function($q) {
	var onLoad = function(reader, deferred, scope) {
		return function () {
			scope.$apply(function () {
				deferred.resolve(reader);
			});
		};
	};

	var onError = function (reader, deferred, scope) {
		return function () {
			scope.$apply(function () {
				deferred.reject(reader);
			});
		};
	};

	var onProgress = function(reader, scope) {
		return function (event) {
			scope.$broadcast("fileProgress",
				{
					total: event.total,
					loaded: event.loaded
				});
		};
	};

	var getReader = function(deferred, scope) {
		var reader = new FileReader();
		reader.onload = onLoad(reader, deferred, scope);
		reader.onerror = onError(reader, deferred, scope);
		reader.onprogress = onProgress(reader, scope);
		return reader;
	};

	var readAsDataURL = function (file, scope) {
		var deferred = $q.defer();

		var reader = getReader(deferred, scope);
		reader.readAsDataURL(file);

		return deferred.promise;
	};

	return {
		readAsDataUrl: readAsDataURL
	}
}]);
four51.app.directive('ngMatch', ['$parse', function($parse) {
	var obj = {
		restrict: 'A',
		require: '?ngModel',
		link: function(scope, elem, attrs, ctrl) {
			if (!ctrl) return;
			if (!attrs['ngMatch']) return;

			var firstPassword = $parse(attrs['ngMatch']);

			var validator = function (value) {
				var temp = firstPassword(scope),
					v = value === temp;
				ctrl.$setValidity('match', v);
				return value;
			}

			ctrl.$parsers.unshift(validator);
			ctrl.$formatters.push(validator);
			attrs.$observe('ngMatch', function () {
				validator(ctrl.$viewValue);
			});
		}
	};
	return obj;
}]);
four51.app.directive('redirect', ['$location', function($location) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			attrs.$observe('redirect', function() {
				element.on('click', function() {
					scope.$apply(function() {
						$location.path(attrs.redirect);
					});
				});
			});
		}
	};
}]);
four51.app.directive('shortproductview', function() {
	var obj = {
		restrict: "E",
		scope: {
			p: '=',
            user: '='
		},
		templateUrl:'partials/shortProductView.html',
		controller: 'shortProductViewCtrl'
	};

	return obj;
});

four51.app.directive('relatedproducts', function() {
	var obj = {
		scope: {
			relatedgroupid: '='
		},
		restrict: 'E',
		templateUrl: 'partials/relatedProductsView.html',
		controller: 'RelatedProductsCtrl'
	};

	return obj;
});

four51.app.directive('pricescheduletable', function() {
    var obj = {
        scope: {
            ps : '=',
            p : '='
        },
        restrict: 'E',
        templateUrl: 'partials/priceScheduleView.html'
    };

    return obj;
});

four51.app.directive('staticspecstable', function() {
    var obj = {
        scope: {
			specgroups : '=',
	        length: '='
        },
        restrict: 'E',
        templateUrl: 'partials/controls/staticSpecs.html',
		controller: function($scope){
			$scope.hasvisiblechild = function(specs){
				var hasChild = false;
				angular.forEach(specs, function(item){
					if(item.VisibleToCustomer)
						hasChild = true;
				})
				return hasChild;
			}
		}
    };

    return obj;
});

four51.app.directive('productnav', function() {
	var obj = {
		scope: {
			product: '=',
			variant: '=',
			editvariant: '='
		},
		restrict: 'E',
		templateUrl: 'partials/controls/productNav.html'
	};
	return obj;
});

four51.app.directive("variantlist", function() {
	var obj = {
		restrict: 'E',
		templateUrl:'partials/controls/variantList.html'
	};
	return obj;
});
four51.app.directive('quantityfield', ['$451', 'ProductDisplayService', function($451, ProductDisplayService){
	var obj = {
		scope: {
			lineitem : '=',
			calculated: '=',
			required: '='
		},
		restrict: 'E',
		template: '<div>'+
			'<inlineerror ng-show="lineitem.qtyError" title="{{lineitem.qtyError}}" />'+
			'<select id="451qa_input_qty" class="form-control" ng-change="qtyChanged(lineitem)" ng-if="lineitem.PriceSchedule.RestrictedQuantity" ng-required="required" ng-model="lineitem.Quantity" ng-options="pb.Quantity as getRestrictedQtyText(pb, lineitem.Product.QuantityMultiplier) for pb in lineitem.PriceSchedule.PriceBreaks" ui-validate="\'validQuantityAddToOrder($value, lineitem)\'"><option value=""></option></select>'+
			'<input id="451qa_input_qty" placeholder="0" autocomplete="off" class="form-control" ng-change="qtyChanged(lineitem)" ng-if="!lineitem.PriceSchedule.RestrictedQuantity" type="text" ng-required="required" name="qtyInput" ng-model="lineitem.Quantity" ui-validate="\'validQuantityAddToOrder($value, lineitem)\'"/>'+
			'<i class="fa fa-edit"></i>'+
			'</div>',
		link: function(scope){
			scope.getRestrictedQtyText = function(priceBreak, qtyMultiplier){
				var qtyText = priceBreak.Quantity * qtyMultiplier;
				if(qtyMultiplier > 1)
					qtyText += ' (' + priceBreak.Quantity + 'x' + qtyMultiplier +')';
				return qtyText;
			};
			scope.qtyChanged = function(lineitem){
				ProductDisplayService.calculateLineTotal(lineitem);
				if(scope.calculated)
					scope.calculated(lineitem);
			};
			scope.validQuantityAddToOrder = function(value, lineItem){

				var variant = lineItem.Variant;
				var product = lineItem.Product;
				var priceSchedule = lineItem.PriceSchedule;

				if(value == "" && !scope.required)
				{
					lineItem.qtyError = null;
					return scope.valid | true;
				}
				if(value == null){
					scope.lineitem.qtyError = null;
					return scope.valid | true;
				}
				if(!product && !variant)
					return scope.valid | true;

				if(!priceSchedule)
					return scope.valid | true;

				scope.valid = true;

				if(!$451.isPositiveInteger(value))
				{
					scope.lineitem.qtyError = "Please select a valid quantity";
					scope.valid = false;
					return scope.valid;
				}
				if(priceSchedule.MinQuantity > value){
					scope.valid = false;
					scope.lineitem.qtyError = "must be equal or greater than " + priceSchedule.MinQuantity;
				}

				if(priceSchedule.MaxQuantity && priceSchedule.MaxQuantity < value){
					scope.lineitem.qtyError = "must be equal or less than " + priceSchedule.MaxQuantity;
					scope.valid = false;
				}

				if(product.IsVariantLevelInventory && !variant){
					//console.log('variant not selected can\'t check qty available'); //in vboss the user may select the qty before the variant. we may have to change when this gets called so inventory available can be re validated if the variant is chnaged based on a selection spec. It's probably not a big deal since the api will check inventory available on adding to order.
				}
				else{
					var qtyAvail = (product.IsVariantLevelInventory ? variant.QuantityAvailable : product.QuantityAvailable) + (lineItem.OriginalQuantity || 0);

					if(qtyAvail < value && product.AllowExceedInventory == false){
						scope.lineitem.qtyError = "cannot exceed the Quantity Available of " +  qtyAvail;
						scope.valid = false;
					}
				}
				if(scope.valid)
					scope.lineitem.qtyError = null;

				return scope.valid;
			}

		}
	}
	return obj;
}]);
four51.app.directive('paymentselector', function() {
   var obj = {
       restrict: 'E',
	   priority: 99,
       templateUrl: 'partials/controls/paymentSelection.html',
       controller: function($scope, $rootScope, SavedCreditCard) {
	       $scope.paymentSelection = {};
	       $scope.isSplitBilling = false;

	       var getCardByID = function(id) {
		       var selectedCard = null;
		       angular.forEach($scope.paymentSelection.SavedCards, function(card) {
			       if (card.ID == id)
				       selectedCard = card;
		       });
		       return selectedCard;
	       };

           $scope.setPaymentMethod = function(type) {
               $scope.currentOrder.PaymentMethod = type;
               $rootScope.$broadcast('event:paymentMethodChange', type);
           };

	       $scope.setBudgetAccount = function(count) {
		       $scope.setPaymentMethod('BudgetAccount');
		       if ($scope.currentOrder.BudgetAccountID || count > 1) return;
		       angular.forEach($scope.SpendingAccounts, function(a) {
			       if (a.AccountType.PurchaseCredit) {
				       $scope.currentOrder.BudgetAccountID = a.ID;
				       $scope.selectedBudgetAccount = a;
			       }
		       });
	       };

	       $rootScope.$on('event:SpendingAccountUpdate', function(event, accounts) {
		       if (!$scope.currentOrder) return;
		       if ($scope.currentOrder.PaymentMethod == 'BudgetAccount') {
			       angular.forEach(accounts, function(a) {
				       if ($scope.selectedBudgetAccount) return;
				       if ($scope.currentOrder.BudgetAccountID == null && a.AccountType.PurchaseCredit) {
							$scope.currentOrder.BudgetAccountID = a.ID;
							$scope.selectedBudgetAccount = a;
				       }
				       else if (a.AccountType.PurchaseCredit && a.ID == $scope.currentOrder.BudgetAccountID) {
					       $scope.selectedBudgetAccount = a;
				       }
			       });
		       }
	       });

	       $scope.deleteSavedCard = function(id) {
		       if (confirm('Are you sure you wish to delete this saved credit card? This cannot be undone') == true) {
			       var card = getCardByID(id);
			       SavedCreditCard.delete(card, function() {
				       SavedCreditCard.query(function(cards) {
					       $scope.currentOrder.CreditCardID = null;
					       $scope.paymentSelection.SavedCards = cards;
				       });
			       });
		       }
	       };
	       $scope.showDelete = function(id) {
		       if (id == null) return false;
		       var card = getCardByID(id);
		       return card.IsCustEditable;
	       };

	       SavedCreditCard.query(function(cards) {
		       $scope.paymentSelection.SavedCards = cards;
	       });
	   }
   };

   return obj;
});
four51.app.directive('customtextfield', function() {
    var obj = {
        scope: {
            customfield : '='
        },
        restrict: 'E',
        transclude: true,
        templateUrl: 'partials/controls/customTextField.html',
	    controller: function($scope) {
			if (!$scope.customfield.Value && $scope.customfield.DefaultValue)
				$scope.customfield.Value = $scope.customfield.DefaultValue;
	    }
    }
    return obj;
});
;
four51.app.directive('customselectionfield', ['$451', function($451) {
	var obj = {
		scope: {
			customfield : '=',
			change: '='
		},
		restrict: 'E',
		transclude: true,
		templateUrl: 'partials/controls/customSelectionField.html',
		link: function(scope, element, attr) {
			scope.changed = function() {
				//reset values
				scope.customfield.isOtherSelected = false;
				angular.forEach(scope.customfield.Options, function(opt) {
					opt.Selected = false;
				});
				// end reset
				scope.customfield.Value = this.item == null ? null : this.item.Value;
				scope.customfield.SelectedOptionID = this.item == null ? null : this.item.ID;
				if (this.item != null) this.item.Selected = true;

				if (this.item != null && this.item.Value.indexOf('Other') > -1) {
					scope.customfield.isOtherSelected = true;
					this.item.Selected = true;
					scope.customfield.SelectedOptionID = this.item.ID;
					scope.customfield.Value = scope.other;
				}
				if (scope.change)
					scope.change(scope.customfield);
			};
			scope.otherChanged = function() {
				scope.customfield.isOtherSelected = true;
				scope.customfield.Value = scope.other;
				if (scope.change)
					scope.change(scope.customfield);
			};
			scope.item = {}, scope.other = ''; // initialize the item variable to avoid checking for null

			scope.init = function() {
				var id = scope.customfield.Value != null ? scope.customfield.Options[scope.customfield.Options.length-1].ID : scope.customfield.DefaultOptionID;
				var matched = false;
				angular.forEach(scope.customfield.Options, function(n,i) {
					if (matched) return;
					if (scope.customfield.Value == n.Value) {
						id = n.ID;
						matched = true;
					}
					if  (scope.customfield.Value == null) {
						id = scope.customfield.DefaultOptionID;
						if (id != null) scope.customfield.Value = $451.filter(scope.customfield.Options, { 'Property': 'ID', 'Value': id })[0].Value;
						matched = true;
					}
				});
				this.item = scope.customfield.Value != null ? $451.filter(scope.customfield.Options, { 'Property': 'ID', 'Value': id })[0] : null;
				if (this.item && this.item.Value == 'Other') {
					scope.other = scope.customfield.Value;
					this.otherChanged();
				}
			};
		}
	}
	return obj;
}]);
four51.app.directive('approvalrulelist', function() {
    var obj = {
        scope: {
            order: "="
        },
        restrict: 'E',
        templateUrl: 'partials/controls/approvalRuleSummary.html'
    };
    return obj;
});
four51.app.directive('categorytree', function() {
	var obj = {
		restrict: 'E',
		replace: true,
		scope: {
			tree: '='
		},
		templateUrl: 'partials/categoryTree.html'
	};
	return obj;
});

four51.app.directive('node', ['$compile', function($compile) {
	var obj = {
		restrict: 'E',
		replace: true,
		scope: {
			node: '='
		},
		template: '<li class="451_cat_item"><a ng-href="#/catalog/{{node.InteropID}}" ng-bind-html="node.Name"></a></li>',
		link: function(scope, element) {
			if (angular.isArray(scope.node.SubCategories)) {
				element.append("<categorytree tree='node.SubCategories' />");
				$compile(element.contents())(scope);
			}
		}
	};
	return obj;
}]);
four51.app.directive('addressinput', function() {
	var obj = {
		restrict: 'E',
		scope: {
			address : '=',
			return: '=',
			user: '='
		},
		templateUrl: 'partials/controls/addressInput.html',
		controller: 'AddressInputCtrl'
	}
	return obj;
});
four51.app.directive('orderhistorydetails', function() {
	var obj = {
		restrict: 'E',
		templateUrl: 'partials/Reporting/orderHistoryDetailsView.html'
	};
	return obj;
});

four51.app.directive('orderhistorysummary', function() {
	var obj = {
		restrict: 'E',
		templateUrl: 'partials/Reporting/orderHistorySummaryView.html'
	};
	return obj;
});

four51.app.directive('lineitemhistorygrid', function() {
	var obj = {
		restrict: 'E',
		templateUrl: 'partials/Reporting/lineItemHistoryGridView.html'
	};
	return obj;
});

four51.app.directive('lineitemreport', function() {
	var obj = {
		restrict: 'E',
		templateUrl: 'partials/Reporting/lineItemReport.html',
		controller: function($scope) {
			$scope.open = function(cal, event) {
				event.preventDefault();
				event.stopPropagation();
				$scope[cal] = true;
			};
		}
	};
	return obj;
});
;
four51.app.directive('inlineerror', function () {
	return {
		restrict:'E',
		transclude:true,
		scope:{ title:'@' },
		template:'<p class="view-inline-error">{{title}}</p>',
		replace:true
	};
});
four51.app.directive('navigation', function() {
	var obj = {
		restrict: 'E',
		templateUrl: 'partials/controls/nav.html',
		controller: 'NavCtrl'
	};
	return obj;
});

four51.app.directive('accountnavigation', function() {
    var obj = {
        restrict: 'E',
        templateUrl: 'partials/controls/accountnav.html',
        controller: 'NavCtrl'
    };
    return obj;
});

four51.app.directive('backStep', function(){
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('click', function () {
                history.back();
                scope.$apply();
            });
        }
    };
});
four51.app.directive('branding', function() {
    var obj = {
        restrict: 'E',
        templateUrl: 'partials/branding.html'
    }
    return obj;
});

;
four51.app.directive('login', function() {
	var obj = {
		restrict: 'E',
		templateUrl: 'partials/controls/login.html',
		controller: 'LoginCtrl'
	}
	return obj;
});
four51.app.directive('approval', function() {
	var obj = {
		restrict: 'E',
		scope: {
			order: "=order"
		},
		templateUrl: 'partials/controls/approvalInput.html',
		controller: 'ApprovalInputCtrl'
	}
	return obj;
});
;
four51.app.directive('customfilefield', ['$parse', '$resource', '$451', 'fileReader', 'Security',
function($parse, $resource, $451, fileReader, Security) {
	var obj = {
		scope: {
			customfield: '=',
			replace: '@ngModel'
		},
		restrict: 'E',
		templateUrl: 'partials/controls/fileUpload.html',
		replace: true,
		link: function(scope, element, attrs) {
			var cache = angular.copy(scope.customfield);
			var file_input = $parse("file");
			var replace_box = $('.replace', element)[0];
			var delete_box = $('.delete', element)[0];
			var file_control = $('.upload', element)[0];
			var error_element = $('.error', element)[0];

			var afterSelection = function(file) {
                scope.uploadFileIndicator = true;
                $resource($451.api('uploadfile')).save({ Data: file.result, Name: file_control.files[0].name, ID: scope.customfield.ID, SourceType: scope.customfield.SourceType, SourceID: scope.customfield.SourceID }).$promise.then(function(u) {
                    u.Url += "&auth=" + Security.auth();
					scope.customfield.File = u;
					scope.customfield.Value = u.ID;
                    scope.uploadFileIndicator = false;
				}).catch(function(ex) {
					error_element.innerHTML = (ex.status == 500) ?
						"An error occurred. Please select a new file and try again." :
						ex.data.Message;
                        scope.uploadFileIndicator = false;
				});
			}

			var reset = function() {
				scope.$apply(function() {
					scope.customfield = angular.copy(cache);
				});
			}

			var updateModel = function (event) {
				error_element.innerHTML = "";
				switch (event.target.name) {
					case "delete":
						scope.replace = false;
						if (event.target.checked) {
							scope.$apply(function() {
								scope.customfield.File = null;
                                scope.customfield.Value = null;
								replace_box.checked = false;
							});
							break;
						}
						reset();
						break;
					case "replace":
						if (delete_box.checked) {
							scope.customfield = cache;
							reset();
							delete_box.checked = false;
						}
						if (!event.target.checked && cache.Value) {
                            reset();
						}
						break;
					case "upload":
						if (event.target.files[0] == null) return;
						scope.$apply(function () {
							fileReader.readAsDataUrl(event.target.files[0], scope)
								.then(afterSelection);
							file_input.assign(scope,  event.target.files[0]);
						});
						scope.replace = replace_box.checked = false;
                        scope.delete = delete_box.checked = false;
						break;
				}
			}
			element.bind('change', updateModel);
		}
	};

	return obj;
}]);
four51.app.directive('shortcartview', function() {
    var obj = {
        restrict: 'E',
        templateUrl: 'partials/shortCartView.html'
    };
    return obj;
});
four51.app.directive('loadingindicator', function () {
    return {
        restrict:'E',
        scope: { title: '@title' },
        templateUrl: 'partials/controls/loadingIndicator.html'
    };
});
four51.app.directive('alertShow', ['$animate', function($animate) {
    return {
        scope: {
            'alertShow': '='
        },
        link: function(scope, element) {
            scope.$watch('alertShow', function(show) {
                if (show) {
                    $animate.removeClass(element, 'ng-hide');
                    $animate.addClass(element, 'ng-hide');
                }
            });
        }
    }
}]);
four51.app.directive('giftcardredemption', function() {
	var obj = {
		restrict: 'E',
		templateUrl: 'partials/controls/giftCardRedemption.html',
		controller: 'GiftCardRedemptionCtrl'
	};
	return obj;
});
four51.app.directive('copyright', function() {
    var obj = {
        restrict: 'E',
        templateUrl: 'partials/copyrightView.html'
    }
    return obj;
});
four51.app.directive('ordersummary', ['Order', 'Coupon', function(Order, Coupon) {
	var obj = {
		restrict: 'AE',
		templateUrl: 'partials/controls/orderSummary.html',
		controller: function($scope) {
			var save = function(callback) {
				Order.save($scope.currentOrder,
					function(data) {
						$scope.currentOrder = data;
						if (callback) callback($scope.currentOrder);
					},
					function(ex) {

					}
				);
			};

			$scope.applyCoupon = function() {
				$scope.couponLoadingIndicator = true;
				$scope.couponError = null;
				Coupon.apply($scope.currentOrder.CouponCode,
					function(coupon) {
						$scope.currentOrder.Coupon = coupon;
						save(function() {
							$scope.couponLoadingIndicator = false;
						});
					},
					function(ex) {
						$scope.couponError = ex.Message;
						$scope.couponLoadingIndicator = false;
					}
				);
			};

			$scope.removeCoupon = function() {
				$scope.couponError = null;
				$scope.couponRemoveIndicator = true;
				Coupon.remove(function() {
					save(function() {
						$scope.couponRemoveIndicator = false;
					});
				});
			};
		}
	};
	return obj;
}]);
four51.app.directive('orderdetails', function() {
	var obj = {
		restrict: 'AE',
		templateUrl: 'partials/controls/orderDetails.html',
		controller: function($scope) {

		}
	};
	return obj;
});
four51.app.directive('ordershipping', ['Order', 'Shipper', 'Address', 'OrderConfig', function(Order, Shipper, Address, OrderConfig) {
	var obj = {
		restrict: 'AE',
		templateUrl: 'partials/controls/orderShipping.html',
		controller: function($scope) {
			var saveChanges = function(callback) {
				$scope.errorMessage = null;
				var auto = $scope.currentOrder.autoID;
				Order.save($scope.currentOrder,
					function(data) {
						$scope.currentOrder = data;
						$scope.displayLoadingIndicator = false;
						if (auto) {
							$scope.currentOrder.autoID = true;
							$scope.currentOrder.ExternalID = 'auto';
						}
						if (callback) callback($scope.currentOrder);
					},
					function(ex) {
						$scope.currentOrder.ExternalID = null;
						$scope.errorMessage = ex.Message;
						$scope.shippingUpdatingIndicator = false;
						$scope.shippingFetchIndicator = false;
					}
				);
			};

			Shipper.query($scope.currentOrder, function(list) {
				$scope.shippers = list;
			});

			$scope.setMultipleShipAddress = function() {
				angular.forEach($scope.currentOrder.LineItems, function(li, i) {
					if (i == 0) return;
					li.ShipAddressID = null;
					li.ShipFirstName = null;
					li.ShipLastName = null;
					li.ShipperID = null;
					li.ShipperName = null;
				});
			}

			$scope.setSingleShipAddress = function() {
				angular.forEach($scope.currentOrder.LineItems, function(li) {
					li.ShipAddressID = $scope.currentOrder.LineItems[0].ShipAddressID;
					li.ShipFirstName = $scope.currentOrder.LineItems[0].ShipFirstName;
					li.ShipLastName = $scope.currentOrder.LineItems[0].ShipLastName;
					li.ShipperID = $scope.currentOrder.LineItems[0].ShipperID;
				});
			};

			$scope.$watch('currentOrder.ShipAddressID', function(newValue) {
				$scope.orderShipAddress = {};
				if ($scope.currentOrder) {
					$scope.currentOrder.ShipFirstName = null;
					$scope.currentOrder.ShipLastName = null;
					angular.forEach($scope.currentOrder.LineItems, function(item) {
						item.ShipFirstName = null;
						item.ShipLastName = null;
					});
				}

				if (newValue) {
					Address.get(newValue, function(add) {
						if ($scope.user.Permissions.contains('EditShipToName') && !add.IsCustEditable) {
							angular.forEach($scope.currentOrder.LineItems, function(item) {
								item.ShipFirstName = add.FirstName;
								item.ShipLastName = add.LastName;
							});
						}
						$scope.orderShipAddress = add;
					});
				}
			});

			$scope.setShipAddressAtLineItem = function(item) {
				item.ShipFirstName = null;
				item.ShipLastName = null;
				saveChanges(function(order) {
					Shipper.query(order, function(list) {
						$scope.shippers = list;
					});
				});
			};

			$scope.setShipAddressAtOrderLevel = function() {
				$scope.shippingFetchIndicator = true;
				$scope.currentOrder.ShipperName = null;
				$scope.currentOrder.Shipper = null;
				$scope.currentOrder.ShipperID = null;
				angular.forEach($scope.currentOrder.LineItems, function(li) {
					li.ShipAddressID = $scope.currentOrder.ShipAddressID;
					li.ShipFirstName = null;
					li.ShipLastName = null;
					li.ShipperName = null;
					li.Shipper = null;
					li.ShipperID = null;
				});
				saveChanges(function(order) {
					Shipper.query(order, function(list) {
						$scope.shippers = list;
						$scope.shippingFetchIndicator = false;
					});
				});
			};
			$scope.updateShipper = function(li) {
				$scope.shippingUpdatingIndicator = true;
				$scope.shippingFetchIndicator = true;
				if (!li) {
					angular.forEach($scope.shippers, function(s) {
						if (s.Name == $scope.currentOrder.LineItems[0].ShipperName)
							$scope.currentOrder.Shipper = s;
					});

					angular.forEach($scope.currentOrder.LineItems, function(item) {
						item.ShipperName = $scope.currentOrder.Shipper ? $scope.currentOrder.Shipper.Name : null;
						item.ShipperID = $scope.currentOrder.Shipper ? $scope.currentOrder.Shipper.ID : null;
					});

					saveChanges(function() {
						$scope.shippingUpdatingIndicator = false;
						$scope.shippingFetchIndicator = false;
					});
				}
				else {
					angular.forEach($scope.shippers, function(s) {
						if (s.Name == li.ShipperName)
							li.Shipper = s;
					});
					li.ShipperName = li.Shipper.Name;
					li.ShipperID = li.Shipper.ID;
					saveChanges(function() {
						$scope.shippingUpdatingIndicator = false;
						$scope.shippingFetchIndicator = false;
					});
				}
			};

			$scope.$on('event:AddressCancel', function(event) {
				$scope.addressform = false;
			});

		}
	};
	return obj;
}]);
four51.app.directive('orderbilling', ['SpendingAccount', 'Address', function(SpendingAccount, Address) {
	var obj = {
		restrict: 'AE',
		templateUrl: 'partials/controls/orderBilling.html',
		controller: function($scope) {
			SpendingAccount.query(function(data) {
				$scope.SpendingAccounts = data;
				budgetAccountCalculation($scope.currentOrder.BudgetAccountID);
			});

			$scope.$watch('currentOrder.BillAddressID', function(newValue) {
				if (newValue) {
					Address.get(newValue, function(add) {
						if ($scope.user.Permissions.contains('EditBillToName') && !add.IsCustEditable) {
							$scope.currentOrder.BillFirstName = add.FirstName;
							$scope.currentOrder.BillLastName = add.LastName;
						}
						$scope.BillAddress = add;
					});
				}
			});

			$scope.$on('event:AddressCancel', function(event) {
				$scope.billaddressform = false;
			});

			$scope.$watch('currentOrder.PaymentMethod', function(event) {
				if (event == 'BudgetAccount' && $scope.SpendingAccounts) {
					if ($scope.SpendingAccounts.length == 1)
						$scope.currentOrder.BudgetAccountID = $scope.SpendingAccounts[0].ID;
					else {
						var count = 0, account;
						angular.forEach($scope.SpendingAccounts, function(s) {
							if (s.AccountType.PurchaseCredit) {
								count += 1;
								account = s;
							}
						});
						if (count == 1 && account)
							$scope.currentOrder.BudgetAccountID = account.ID;
					}
				}
				else {
					if (!$scope.isSplitBilling && $scope.currentOrder) {
						$scope.currentOrder.BudgetAccountID = null;
						$scope.currentOrder.currentBudgetAccount = null;
					}
				}
				$scope.cart_billing.$setValidity('paymentMethod', validatePaymentMethod(event));
			});

			var budgetAccountCalculation = function(value) {
				if (value) {
					var valid = validatePaymentMethod('BudgetAccount');
					angular.forEach($scope.SpendingAccounts, function(a) {
						if (a.ID == value) {
							$scope.currentBudgetAccount = a;
						}
					});
					var discount = $scope.currentBudgetAccount.AccountType.MaxPercentageOfOrderTotal != 100 ?
						$scope.currentOrder.Total * ($scope.currentBudgetAccount.AccountType.MaxPercentageOfOrderTotal *.01) :
						$scope.currentBudgetAccount.Balance;
					$scope.remainingOrderTotal = $scope.currentOrder.Total - discount;
					$scope.cart_billing.$setValidity('paymentMethod', valid);
				}
			}

			$scope.$watch('currentOrder.Total', function(total) {
				if ($scope.currentOrder && $scope.currentOrder.BudgetAccountID)
					budgetAccountCalculation($scope.currentOrder.BudgetAccountID);
			});

			$scope.$watch('currentOrder.BudgetAccountID', function(value) {
				$scope.currentBudgetAccount = null;
				budgetAccountCalculation(value);
			});

			function validatePaymentMethod(method) {
				var validateAccount = function() {
					var account = null;
					angular.forEach($scope.SpendingAccounts, function(a) {
						if ($scope.currentOrder && a.ID == $scope.currentOrder.BudgetAccountID)
							account = a;
					});
					if (account) {
						$scope.isSplitBilling = false;
						if (account.AccountType.MaxPercentageOfOrderTotal != 100) {
							$scope.isSplitBilling = true;
							return false;
						}

						if (account.Balance < $scope.currentOrder.Total) {
							$scope.isSplitBilling = !account.AccountType.AllowExceed;
							return account.AccountType.AllowExceed;
						}
						else
							return true;
					}
					return false;
				}

				var valid = false;
				switch (method) {
					case 'Undetermined':
						valid = $scope.user.Permissions.contains('SubmitForApproval');
						break;
					case 'PurchaseOrder':
						valid = $scope.user.Permissions.contains('PayByPO');
						break;
					case 'BudgetAccount':
						valid = $scope.user.Permissions.contains('PayByBudgetAccount');
						valid = valid ? validateAccount() : valid;
						break;
					case 'CreditCard':
						valid = $scope.user.Permissions.contains('PayByCreditCard');
						break;
					default:
						return false;
				}
				return valid;
			}
		}
	};
	return obj;
}]);
four51.app.directive('orderapprovals', function() {
	var obj = {
		restrict: 'AE',
		templateUrl: 'partials/controls/orderApprovals.html',
		controller: function($scope) {

		}
	};
	return obj;
});
four51.app.directive('daterange', function() {
	var obj = {
		scope: {
			options: '=ngOptions',
			fromdate: '=fromdate',
			todate: '=todate'
		},
		restrict: 'E',
		templateUrl: 'partials/controls/dateRange.html',
		controller: function($scope) {
			var logic = {
				'LastDay': function() {
					var date = new Date();
					var day = date.getDate();
					date.setDate(day - 1);
					$scope.fromdate = date;
					$scope.todate = date;
				},
				'LastWeek': function() {
					var date = new Date();
					var day = date.getDate();
					date.setDate(day - 7);
					$scope.fromdate = date;
					$scope.todate = new Date();
				},
				'LastMonth': function() {
					var date = new Date();
					var month = date.getMonth();
					date.setMonth(month - 1);
					$scope.fromdate = date;
					$scope.todate = new Date();
				},
				'LastThreeMonths': function() {
					var date = new Date();
					var month = date.getMonth();
					date.setMonth(month - 3);
					$scope.fromdate = date;
					$scope.todate = new Date();
				},
				'LastYear': function() {
					var date = new Date();
					var year = date.getYear();
					date.setYear(year - 1);
					$scope.fromdate = date;
					$scope.todate = new Date();
				}
			};

			$scope.changed = function() {
				logic[$scope.span]();
			}
		}
	};

	return obj;
});
four51.app.directive('cartprint', function() {
    var obj = {
        restrict: 'E',
        templateUrl: 'partials/cartPrintView.html'
    }
    return obj;
});

four51.app.directive('orderprint', function() {
    var obj = {
        restrict: 'E',
        templateUrl: 'partials/orderPrintView.html'
    }
    return obj;
});
