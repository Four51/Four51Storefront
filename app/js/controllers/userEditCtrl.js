four51.app.controller('UserEditCtrl', ['$scope', '$location', '$sce', '$injector', 'User',
    function ($scope, $location, $sce, $injector, User) {
        var _AnonRouter;
        if ($scope.user) $scope.existingUser = $scope.user.Type != 'TempCustomer';
        try {
            _AnonRouter = $injector.get('AnonRouter');
        }
        catch(ex){}

        User.get(function(user) {
            $scope.user = user;
            $scope.loginasuser = {};
            $scope.PasswordReset = null;
            $scope.actionMessage = null;
            $scope.securityWarning = false;
            $scope.loginMessage = null;
            $scope.securityWarning = false;

            $scope.loginExisting = function () {
                User.login({Username: $scope.loginasuser.Username, Password: $scope.loginasuser.Password, ID: $scope.user.ID, Type: $scope.user.Type}, function (u) {
                    if (_AnonRouter) _AnonRouter.route();
                }, function (ex) {
                    $scope.loginAsExistingError = ex.Message;
                    if (ex.Code.is('PasswordSecurity'))
                        $scope.securityWarning = true;
                        $scope.PasswordReset = true;
                        $scope.PasswordSecurityException = true;
                        $scope.loginAsExistingError = $sce.trustAsHtml(ex.Message);
                        $scope.credentials = {};
                        $scope.credentials.Username = $scope.loginasuser.Username;
                        $scope.credentials.CurrentPassword = $scope.loginasuser.Password;
                });
            };

            $scope.changePassword = function() {
                //need to reset this to avoid api error in IE only!
                //( System.NullReferenceException: Object reference not set to an instance of an object. at API.Controllers.LoginController.Login(FourUser user, Boolean SendVerificationCodeByEmail) )
                delete $scope.credentials.Email;
                $scope.credentials.Username = $scope.loginasuser.Username;
                $scope.credentials.CurrentPassword = $scope.loginasuser.Password;
                //
                $scope.loginMessage = null;
                _change();
            };

            var _change = function() {
                User.login($scope.credentials,
                    function(u) {
                        //anon router
                        if (_AnonRouter) _AnonRouter.route();
                        //delete $scope.credentials;
                    },
                    function(ex) {
                        $scope[ex.Code.text] = true;
                        $scope.loginMessage = ex.Message;
                        if (ex.Code.is('PasswordSecurity'))
                            $scope.securityWarning = true;
                            $scope.PasswordReset = true;
                            $scope.PasswordSecurityException = true;
                            $scope.loginAsExistingError = $sce.trustAsHtml(ex.Message);

                        $scope.credentials.Password = null;
                        $scope.credentials.NewPassword = null;
                        $scope.credentials.ConfirmPassword = null;
                    }
                );
            };

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

            };

            <!--TODO: doesnt redirect to cart and removes cart -->
            $scope.resetWithToken = function () {
                $scope.emailResetLoadingIndicator = true;
                User.reset($scope.loginasuser, function (user) {
                        delete $scope.loginasuser;
                        //$location.path('catalog');
                        if (_AnonRouter) _AnonRouter.route();
                    },
                    function (err) {
                        $scope.emailResetLoadingIndicator = false;
                        $scope.resetPasswordError = $sce.trustAsHtml(err.Message);
                    });
            };

            $scope.save = function () {
                $scope.actionMessage = null;
                $scope.securityWarning = false;
                $scope.user.Username = $scope.user.TempUsername;
                $scope.displayLoadingIndicator = true;
                if ($scope.user.Type == 'TempCustomer')
                    $scope.user.ConvertFromTempUser = true;

                User.save($scope.user,
                    function (u) {
                        $scope.securityWarning = false;
                        $scope.displayLoadingIndicator = false;
                        $scope.actionMessage = 'Your changes have been saved';
                        $scope.user.TempUsername = u.Username;
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

        });
    }
]);