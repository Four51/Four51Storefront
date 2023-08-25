four51.app.controller('Four51Ctrl', ['$scope', '$route', '$rootScope', '$timeout', '$document', '$window', '$location', '$451', 'User', 'Order', 'Security', 'OrderConfig', 'Category', 'AppConst','XLATService', 'GoogleAnalytics',
function ($scope, $route, $rootScope, $timeout, $document, $window, $location, $451, User, Order, Security, OrderConfig, Category, AppConst, XLATService, GoogleAnalytics) {
	$scope.AppConst = AppConst;
	$scope.scroll = 0;
	$scope.isAnon = $451.isAnon; //need to know this before we have access to the user object
	$scope.Four51User = Security;
	if ($451.isAnon && !Security.isAuthenticated()) {
		var tempUser = {
			Username: null,
			Password: null,
			Email: null
		};
		User.login(tempUser,function (u) {
			location.reload();
		});
	}

	// fix Bootstrap fixed-top and fixed-bottom from jumping around on mobile input when virtual keyboard appears
	if ($(window).width() < 960) {
		$(document)
			.on('focus', ':input:not("button")', function (e) {
				$('.navbar-fixed-bottom, .headroom.navbar-fixed-top').css("position", "relative");
			})
			.on('blur', ':input', function (e) {
				$('.navbar-fixed-bottom, .headroom.navbar-fixed-top').css("position", "fixed");
			});
	}

	function init() {
		if (Security.isAuthenticated()) {
			User.get(function (user) {
				$scope.user = user;
				$scope.user.Culture.CurrencyPrefix = XLATService.getCurrentLanguage(user.CultureUI, user.Culture.Name)[1];
				$scope.user.Culture.DateFormat = XLATService.getCurrentLanguage(user.CultureUI, user.Culture.Name)[2];

				if (!$scope.user.TermsAccepted)
					$location.path('conditions');

				if (user.CurrentOrderID) {
					Order.get(user.CurrentOrderID, function (ordr) {
						$scope.currentOrder = ordr;
						OrderConfig.costcenter(ordr, user);
					});
				}
				else
					$scope.currentOrder = null;

				if (user.Company.GoogleAnalyticsCode) {
					GoogleAnalytics.analyticsLogin(user.Company.GoogleAnalyticsCode);
				}

			});
			Category.tree(function (data) {
				$scope.tree = data;
				$scope.$broadcast("treeComplete", data);
			});
		}
	}

	try {
		trackJs.configure({
			trackAjaxFail: false
		});
	}
	catch(ex) {}

	$scope.errorSection = '';

	function cleanup() {
		Security.clear();
	}

	$scope.$on('event:auth-loginConfirmed', function(){
		$route.reload();
	});
	$scope.$on("$routeChangeSuccess", init);
	$scope.$on('event:auth-loginRequired', cleanup);

	// Timeout timer value
	var TimeOutTimerValue = 15*60*1000;

	// Start a timeout
	var TimeOut_Thread = $timeout(function(){ LogoutByTimer() } , TimeOutTimerValue);
	var bodyElement = angular.element($document);

	angular.forEach(['keydown', 'keyup', 'click', 'mousemove', 'DOMMouseScroll', 'mousewheel', 'mousedown', 'touchstart', 'touchmove', 'scroll', 'focus'],
		function(EventName) {
			bodyElement.bind(EventName, function (e) { TimeOut_Resetter(e) });
		});

	function LogoutByTimer(){
		User.logout($scope.user, function(u){
			if ($scope.isAnon) {
				$timeout(function () {
					$location.path("/catalog");
					location.reload(true);
				}, 500);
			}
		}, function(ex){
			console.log(ex.Message);
		});
	}

	function TimeOut_Resetter(e){
		/// Stop the pending timeout
		$timeout.cancel(TimeOut_Thread);

		/// Reset the timeout
		TimeOut_Thread = $timeout(function(){ LogoutByTimer() } , TimeOutTimerValue);
	}
}]);
