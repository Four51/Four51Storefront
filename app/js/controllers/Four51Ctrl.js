four51.app.controller('Four51Ctrl', ['$rootScope', '$scope', '$route', '$location', '$451', 'User', 'Order', 'Security', 'OrderConfig', 'Category', 'AppConst','XLATService', 'GoogleAnalytics',
function ($rootScope, $scope, $route, $location, $451, User, Order, Security, OrderConfig, Category, AppConst, XLATService, GoogleAnalytics) {
	$scope.AppConst = AppConst;
	$scope.scroll = 0;
	$scope.isAnon = $451.isAnon; //need to know this before we have access to the user object
	$scope.Four51User = Security;
	if ($451.isAnon && !Security.isAuthenticated()) {
		User.login(function () {
			$route.reload();
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
		$rootScope.csUser = false;
		if (Security.isAuthenticated()) {
			User.get(function (user) {
				$scope.user = user;
				$scope.user.Culture.CurrencyPrefix = XLATService.getCurrentLanguage(user.CultureUI, user.Culture.Name)[1];
				$scope.user.Culture.DateFormat = XLATService.getCurrentLanguage(user.CultureUI, user.Culture.Name)[2];
				for (var i = 0; i < $scope.user.Groups.length; i++) {
					var groupName = $scope.user.Groups[i].Name;
					if (groupName === '07_LP_CreativeServices') {
						$rootScope.csUser = true;
					}
				}
				if (!$scope.user.TermsAccepted) $location.path('conditions');
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
				$scope.isLifepoint = $scope.user.Groups[0]?.Name === '01_Lifepoint';
				$scope.isScion = $scope.user.Groups[0]?.Name === '02_Scion Hospitals';
				//Vivid Impact Ticketing System Integration
				$scope.user.AllowTicketing = false;
				$scope.user.TicketingDashboard = false;
				$scope.hostUser = false;
				$scope.hostHscUser = false;
				$scope.sapAruUser = false;
				$scope.sapAruLtachUser = false;
				$scope.sapIrfUser = false;
				$scope.sapBehavioralUser = false;
				$scope.sapHscUser = false;

				angular.forEach($scope.user.Groups, function (f) {
					if (f.Name === 'Ticketing') {
						$scope.user.AllowTicketing = true;
					}
					if (f.Name === 'TicketingDashboard') {
						$scope.user.TicketingDashboard = true;
					}
					if (f.Name === '08_HOST_Acute Care Hospital and/or Physician Practice') {
						$scope.hostUser = true;
					}
					if (f.Name === '08_HOST_Lifepoint HSC (South)') {
						$scope.hostHscUser = true;
					}
					if (f.Name === '09_SAP_ARU') {
						$scope.sapAruUser = true;
					}
					if (f.Name === '09_SAP_ARU-LTACH') {
						$scope.sapAruLtachUser = true;
					}
					if (f.Name === '09_SAP_IRF') {
						$scope.sapIrfUser = true;
					}
					if (f.Name === '09_SAP_Lifepoint Behavioral Health') {
						$scope.sapBehavioralUser = true;
					}
					if (f.Name === '09_SAP_Lifepoint HSC (North)') {
						$scope.sapHscUser = true;
					}
				});
				var userFirst = 'First Name=' + user.FirstName;
				var userLast = '&Last Name=' + user.LastName;
				var userCompany = '&Name of Your Organization=' + user.Company.Name;
				var userEmail = '&Email=' + user.Email;
				var supportLink = 'https://app.smartsheet.com/b/form/3bfbede69e4148d5ae191cb855aec487?';
				var encodedSupportLink = encodeURI(supportLink + userFirst + userLast + userEmail + userCompany)
				$scope.supportURI = encodedSupportLink;
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
}]);
