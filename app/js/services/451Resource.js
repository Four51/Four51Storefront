(function() {
	angular.module('451Resources', [])
		
		.factory('SpendingAccount', function($resource, $451){
			var _cacheName = '451Cache.Accounts.' + $451.apiName;
			function _then(fn, data) {
				if (angular.isFunction(fn))
					fn(data);
			}

			var _query = function(success) {
				var accounts = store.get(_cacheName);
				accounts ? _then(success, accounts) :
					$resource($451.api('spendingaccount')).query().$promise.then(function(list) {
						store.set(_cacheName, list);
						_then(success, list);
					});
			}

			return {
				query: _query
			};
		})
		.factory('Address', function($resource, $451){
			function _then(fn, data) {
				if (angular.isFunction(fn))
					fn(data);
			}

			function _extend(address) {
				//set default value to US if it's a new address and other values
				address.Country = address.Country || 'US';
				address.IsBilling = address.IsBilling || true;
				address.IsShipping = address.IsShipping || true;
			}

			var _get = function(id, success) {
				var address = store.get('451Cache.Address.' + id);
				address ? (function() { _extend(address); _then(success, address); })() :
					$resource($451.api('address/:id'), { id: '@id' }).get({ id: id }).$promise.then(function(add) {
						store.set('451Cache.Address.' + id, add);
						_extend(add);
						_then(success, add);
					});
			}

			var _save = function(address, success) {
				return $resource($451.api('address')).save(address).$promise.then(function(add) {
					store.remove('451Cache.Addresses');
					store.set('451Cache.Address.' + add.ID, add);
					_extend(add);
					_then(success, add);
				});
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
		})
		.factory('AddressList', function($resource, $451) {
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
				angular.forEach(addresses, function(add) {
					if (add.Selected) {
						$resource($451.api('address')).delete(add);
					}
				});
				store.set('451Cache.Addresses');
				_then(success);
			}

			return {
				query: _query,
				delete: _delete
			}
		})
		.factory('Category', function($resource, $451){
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
		})
		.factory('Coupon', function($resource, $451){
			function _then(fn, data) {
				if (angular.isFunction(fn))
					fn(data);
			}

			var _save = function(code, success) {
				return $resource($451.api('coupon')).save({ 'CouponCode': code}).$promise.then(function(c) {
					_then(success, c);
				});
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
		})
		.factory('FavoriteOrder', function($resource, $451) {
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
				$resource($451.api('favoriteorder'), {},  { 'save': { method: 'POST', isArray: true }}).save(order).$promise.then(function(fav) {
					store.set(_cacheName, fav);
					_then(success, fav);
				});
			}

			var _delete = function(orders, success) {
				angular.forEach(orders, function(order, key) {
					if (order.Selected) {
						orders.splice(key, 1);
						$resource($451.api('favoriteorder')).delete(order);
					}
				});
				store.set(_cacheName, orders);
				_then(success, orders);
			}

			return {
				query: _query,
				save: _save,
				delete: _delete
			}
		})
		.factory('Message', function($resource, $451) {
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
		})
		.factory('MessageList', function($resource, $451) {
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
				angular.forEach(messages, function(msg) {
					if (msg.Selected)
						$resource($451.api('message')).delete(msg);
				});
				store.set('451Cache.Messages', messages);
				_then(success,messages);
			}

			return {
				query: _query,
				delete: _delete
			}
		})
		.factory('OrderConfig', function() {
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

			var setDefaultAddress = function() {
				if (order.CostCenter == null)
					angular.forEach(user.CostCenters, function(c) {
						if (c.DefaultAddressID) {
							order.ShipAddressID = order.ShipAddressID || c.DefaultAddressID;
							angular.forEach(order.LineItems, function(li) {
								li.ShipAddressID = li.ShipAddressID || c.DefaultAddressID;
							});
						}
					});
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
				paymentMethod: function(o,u) {
					order = o; user = u;
					if (order.PaymentMethod == 'Undetermined') { // might be legitimately this type, but can't be another unless already altered
						setPaymentMethod();
					}
					return this;
				}
			};
		})
		.factory('OrderSearch', function($resource, $451) {

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
		})
		.factory('Order', function($resource, $rootScope, $451) {
			function _then(fn, data) {
				if (angular.isFunction(fn))
					fn(data);
			}

			function _extend(order) {
				order.isEditable = order.Status == 'Unsubmitted' || order.Status == 'Open';
			}

			var _get = function(id, success) {
				var currentOrder = store.get('451Cache.Order.' + id);
				currentOrder ? (function() { _extend(currentOrder);	_then(success, currentOrder); })() :
					$resource($451.api('order')).get({'id': id }).$promise.then(function(o) {
						store.set('451Cache.Order.' + id, o);
						_then(success, o);
					});
			}

			var _save = function(order, success) {
				$resource($451.api('order')).save(order).$promise.then(function(o) {
					store.set('451Cache.Order.' + o.ID, o);
					_extend(o);
					_then(success, o);
				});
			}

			var _delete = function(order, success) {
				$resource($451.api('order')).delete().$promise.then(function() {
					store.remove('451Cache.Order.' + order.ID);
					_then(success);
				});
			}

			var _submit = function(order, success) {
				$resource($451.api('order'), { }, { submit: { method: 'PUT' }}).submit(order).$promise.then(function(o) {
					store.set('451Cache.Order.' + o.ID);
					_extend(o);
					_then(success,o);
				});
			}

			return {
				get: _get,
				save: _save,
				delete: _delete,
				submit: _submit
			}
		})
		.factory('OrderSearchCriteria', function($resource, $http, $451) {

			var _query = function(success) {
				$resource($451.api('orderstats')).query().$promise.then(function(stats) {
					if (angular.isFunction(success))
						success(stats);
				});
			}

			return {
				query: _query
			}
		})
		.factory('Product', function($resource, $451){
			var _cacheName = '451Cache.Product.' + $451.apiName;
			function _then(fn, data) {
				if (angular.isFunction(fn))
					fn(data);
			}

			var _get = function(param, success) {
				var product = store.get(_cacheName + param);
				product ? _then(success, product) :
					$resource($451.api('Products/:interopID'), { interopID: '@ID' }).get({ interopID: param }).$promise.then(function(product) {
						store.set(_cacheName + product.InteropID, product);
						_then(success, product);
					});
			}

			var _search = function(categoryInteropID, searchTerm, success) {
				if(!categoryInteropID && !searchTerm) return null;
				var criteria = {
					'CategoryInteropID': categoryInteropID,
					'SearchTerms': searchTerm ? searchTerm : ''
				};
				var cacheID = '451Cache.Products.' + criteria.CategoryInteropID + criteria.SearchTerms.replace(/ /g, "");
				var products = store.get(cacheID);
				products ? _then(success, products) :
					$resource($451.api('Products')).query(criteria).$promise.then(function(products) {
						store.set(cacheID, products);
						_then(success, products);
					});
			}

			return {
				get: _get,
				search: _search
			}
		})
		.factory('Variant', function($resource, $451){
			function _then(fn, data) {
				if (angular.isFunction(fn))
					fn(data);
			}

			var _get = function(params, success) {
				var variant = store.get('451Cache.Variants.' + params.ProductInteropID + params.VariantInteropID );
				variant ? _then(success, variant) :
					$resource($451.api('variant')).get(params).$promise.then(function(variant) {
						store.set('451Cache.Variants.' + params.ProductInteropID + params.VariantInteropID, variant);
						_then(success, variant);
					});
			}

			return {
				get: _get
			}
		})
		.factory('ProductDisplayService', function($451, Variant){
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
					if(spec.AllowOtherValue && spec.OtherTextValue && spec.OtherValueMarkup > 0)
						otherMarkup = spec.OtherValueMarkup;

					if((spec.Options && spec.SelectedOptionID) || otherMarkup){

						var option = !spec.SelectedOptionID ? null : $451.filter(spec.Options, {Property: 'ID', Value: spec.SelectedOptionID})[0];
						if(!option && !otherMarkup)
							return;
						if(spec.MarkupType ==="AmountPerQuantity" )
							amountPerQty += otherMarkup || option.PriceMarkup;
						if(spec.MarkupType ==="Percentage" )
							percentagePerLine += otherMarkup || option.PriceMarkup;
						if(spec.MarkupType ==="AmountTotal")
							fixedAddPerLine += otherMarkup || option.PriceMarkup;
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
			}
			function productViewScope(scope){
				scope.specChanged = function(spec){
					if(!spec){
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
							});
						}
					}
					calcTotal(scope.LineItem);
				}
				scope.inventoryDisplay = function(product, variant){
					if(product.IsVariantLevelInventory){
						return variant ? variant.QuantityAvailable : null;
					}else{
						return product.QuantityAvailable;
					}
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

				if(scope.LineItem.Variant){
					scope.LineItem.PriceSchedule = scope.LineItem.Variant.StandardPriceSchedule ? scope.LineItem.Variant.StandardPriceSchedule : scope.LineItem.Product.StandardPriceSchedule; //include user permissions to decide to show
					//moved to productViewScope scope.StaticSpecGroups = scope.LineItem.Variant.StaticSpecGroups || scope.LineItem.Product.StaticSpecGroups;
				}else{
					scope.LineItem.PriceSchedule = variantHasPriceSchedule(scope.LineItem.Product, 'StandardPriceSchedule') ? null : scope.LineItem.Product.StandardPriceSchedule; //don't show price schedule if variant overrides parent PS
				}
				if(!scope.LineItem.Specs){//it's possible we're reloading this due to changing a variant and we don't want to leave the spec values behind
					scope.LineItem.Specs = {};
					angular.forEach(scope.LineItem.Product.Specs, function(item){
						if(item.CanSetForLineItem || item.DefinesVariant)
						{
							//TODO:doesn't mesh with caching
							scope.LineItem.Specs[item.Name] = item;// Object.create(item);
						}
					});
				}

				scope.allowAddToOrder = scope.LineItem.Variant || scope.LineItem.Product.Variants.length == 0;//this will include some order type and current order logic.
				//short view//scope.allowAddToOrder = scope.LineItem.Product.Variants.length == 0 && scope.lineItemSpecs.length == 0 && scope.LineItem.Product.Type != 'VariableText';
				//one view//ng-show="LineItem.Variant || LineItem.Product.Variants.length == 0"
			}

			function productViewName(p){
				p.ViewName = staticSpecSPAConfig(p, 'ViewName') || 'default';
			}
			function staticSpecSPAConfig(product, specName){
				if(!product.StaticSpecGroups)
					return null;
				if(!product.StaticSpecGroups.SPAProductConfig)
					return null;
				if(!product.StaticSpecGroups.SPAProductConfig.Specs[specName])
					return null;
				return product.StaticSpecGroups.SPAProductConfig.Specs[specName].Value || escapeNull;
			}

			return{
				setNewLineItemScope: function(scope){
					newLineItemScope(scope);
				},
				setProductViewScope: function(scope){
					productViewScope(scope);
					productViewName(scope.LineItem.Product);
				},
				setProductViewName: function(p){
					productViewName(p);
				},
				calculateLineTotal: function(lineItem){
					return calcTotal(lineItem);
				},
				getStaticSpecSPAConfig: function(product, specName){
					return staticSpecSPAConfig(product, specName);
				}
			}
		})
		.factory('Security', function($451, $cookieStore) {
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
		})
		.factory('Shipper', function($resource, $451) {
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
				var id = buildCacheID(order),
					shippers = store.get(id);
				shippers ? _then(success, shippers) :
					$resource($451.api('shipper')).query().$promise.then(function(list) {
						store.set(id, list);
						_then(success, list);
					});
			}

			return {
				query: _query
			}
		})
		.factory('User', function($rootScope, $resource, $451, Security) {
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

				// u.AvailableCreditCards.Count = Object.keys(u.AvailableCreditCards).length;
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

			var _save = function(user, success) {
				$resource($451.api('user')).save(user).$promise.then(function(u) {
					_extend(u);
					_then(success,u);
					store.set(_cacheName, u);
				});
			}

			var _login = function(credentials,success) {
				store.clear();
				$resource($451.api('login')).get(credentials).$promise.then(function(u) {
					_then(success,u);
				});
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
			}
		})
		.factory('Resources', function() {
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
})();