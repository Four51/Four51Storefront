four51.app.controller('UserEditCtrl', ['$scope', '$sce', '$route', '$location', '$injector', 'User',
    function ($scope, $sce, $route, $location, $injector, User) {

        $scope.PasswordReset = $location.search().token != null;
        var codes = ['PasswordSecurityException'];

        //anon router
        var _AnonRouter;
        if ($scope.user) $scope.existingUser = $scope.user.Type != 'TempCustomer';
        try {
            _AnonRouter = $injector.get('AnonRouter');
        }
        catch(ex){}
        //

        $scope.loginMessage = null;
        $scope.$on('event:auth-loginFailed', function(event, message) {
            $scope.loginMessage = message;
        });

        $scope.login = function() {
            //need to reset these to avoid api error in IE only!
            //( System.NullReferenceException: Object reference not set to an instance of an object. at API.Controllers.LoginController.Login(FourUser user, Boolean SendVerificationCodeByEmail) )
            delete $scope.credentials.Email;
            $scope.credentials.CurrentPassword = null;
            $scope.credentials.NewPassword = null;
            //
            $scope.loginMessage = null;
            // need to reset any error codes that might be set so we can handle new one's
            angular.forEach(codes, function(c) {
                $scope[c] = null;
            });
            _login();
        };

        var _login = function() {
            User.login($scope.credentials,
                function(data) {
                    //anon router
                    if (_AnonRouter) _AnonRouter.route();

                    delete $scope.credentials;
                },
                function(ex) {
                    $scope.credentials = {};
                    $scope[ex.Code.text] = true;
                    $scope.loginMessage = ex.Message || "User name and password not found";
                    if (ex.Code.is('PasswordSecurity'))
                        $scope.loginMessage = $sce.trustAsHtml(ex.Message);

                    /*$scope.credentials.Username = null;*/
                    $scope.credentials.Username = $scope.user.TempUsername;
                    $scope.credentials.Password = null;
                    /*$scope.credentials.CurrentPassword = null;*/
                    $scope.credentials.CurrentPassword = $scope.user.Password;
                    $scope.credentials.NewPassword = null;
                    $scope.credentials.ConfirmPassword = null;
                }
            );
        }

        $scope.changePassword = function() {
            //need to reset this to avoid api error in IE only!
            //( System.NullReferenceException: Object reference not set to an instance of an object. at API.Controllers.LoginController.Login(FourUser user, Boolean SendVerificationCodeByEmail) )
            delete $scope.credentials.Email;
            //
            $scope.loginMessage = null;
            // need to reset any error codes that might be set so we can handle new one's
            angular.forEach(codes, function(c) {
                $scope[c] = null;
            });
            _change();
        };

        var _change = function() {
            User.login($scope.credentials,
                function(data) {
                    //anon router
                    if (_AnonRouter) _AnonRouter.route();

                    delete $scope.credentials;
                },
                function(ex) {
                    //$scope.credentials = {};
                    $scope[ex.Code.text] = true;
                    $scope.loginMessage = ex.Message;
                    if (ex.Code.is('PasswordSecurity'))
                        $scope.loginMessage = $sce.trustAsHtml(ex.Message);

                    /*$scope.credentials.Username = null;*/
                    //$scope.credentials.Username = $scope.user.TempUsername;
                    $scope.credentials.Password = null;
                    /*$scope.credentials.CurrentPassword = null;*/
                    //$scope.credentials.CurrentPassword = $scope.user.Password;
                    $scope.credentials.NewPassword = null;
                    $scope.credentials.ConfirmPassword = null;
                }
            );
        }

        User.get(function(user) {
            $scope.user = user;
            $scope.loginasuser = {};
            $scope.actionMessage = null;
            $scope.securityWarning = false;
        });

        $scope.getToken = function () {
            $scope.loginasuser.SendVerificationCodeByEmail = true;
            $scope.emailResetLoadingIndicator = true;
            User.login($scope.loginasuser, function () {
                    $scope.resetPasswordError = null;
                    $scope.enterResetToken = true;
                    $scope.emailResetLoadingIndicator = false;
                },
                function (err) {
                    $scope.resetPasswordError = $sce.trustAsHtml(err.Message);
                    $scope.emailResetLoadingIndicator = false;
                });

        }

        $scope.resetWithToken = function () {
            $scope.emailResetLoadingIndicator = true;
            User.reset($scope.loginasuser, function (user) {
                    delete $scope.loginasuser;
                    $location.path('catalog');
                },
                function (err) {
                    $scope.emailResetLoadingIndicator = false;
                    $scope.resetPasswordError = $sce.trustAsHtml(err.Message);
                });
        }

        $scope.save = function () {
            $scope.actionMessage = null;
            $scope.securityWarning = false;
            $scope.displayLoadingIndicator = true;
            if ($scope.user.Type == 'TempCustomer') {
                $scope.user.Username = $scope.user.TempUsername;
                $scope.user.ConvertFromTempUser = true;
            }
            User.save($scope.user,
                function (u) {
                    $scope.securityWarning = false;
                    $scope.displayLoadingIndicator = false;
                    $scope.actionMessage = 'Your changes have been saved';
                    //$scope.user.TempUsername = u.Username;
                    if (_AnonRouter && !$scope.existingUser) _AnonRouter.route();
                },
                function (ex) {
                    $scope.displayLoadingIndicator = false;
                    if (ex.Code.is('PasswordSecurity'))
                        $scope.securityWarning = true;
                    else {
                        $scope.actionMessage = $sce.trustAsHtml(ex.Message);
                    }
                }
            );
        };
    }
]);