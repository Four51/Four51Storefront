four51.app.controller('UserEditCtrl', ['$scope', '$location', '$sce', '$injector', 'User', 'Order',
    function ($scope, $location, $sce, $injector, User, Order) {
        var _AnonRouter;
        if ($scope.user) $scope.existingUser = $scope.user.Type != 'TempCustomer';
        try {
            _AnonRouter = $injector.get('AnonRouter');
        }
        catch(ex){}

        User.get(function(user) {
            $scope.user = user;
            $scope.loginasuser = {};
            $scope.actionMessage = null;
            $scope.securityWarning = false;

            if ($scope.user.Type != 'TempCustomer')
                $scope.user.TempUsername = $scope.user.Username;
            $scope.getToken = function () {
                $scope.loginasuser.SendVerificationCodeByEmail = true;
                $scope.emailResetLoadingIndicator = true;
                $scope.buttonClicked = true;
                User.login($scope.loginasuser, function () {
                        $scope.resetPasswordError = null;
                        $scope.enterResetToken = true;
                        $scope.emailResetLoadingIndicator = false;
                        $scope.buttonClicked = false;
                    },
                    function (err) {
                        $scope.resetPasswordError = $sce.trustAsHtml(err.Message);
                        $scope.emailResetLoadingIndicator = false;
                        $scope.buttonClicked = false;
                    });

            }
            $scope.resetWithToken = function () {
                $scope.buttonClicked = true;
                $scope.emailResetLoadingIndicator = true;
                if($scope.currentOrder){
                    $scope.loginasuser.CurrentOrderID = $scope.currentOrder.ID;
                }
                User.reset($scope.loginasuser, function (user) {
                        delete $scope.loginasuser;
                        if(user.CurrentOrderID){
                            Order.get(user.CurrentOrderID,function(order){
                                $scope.currentOrder = order;
                                $scope.currentOrder.FromUserID = user.ID;
                                Order.save($scope.currentOrder,function(ordr){
                                    $scope.buttonClicked = false;
                                    $location.path('checkout');
                                });
                            });
                        }
                        else{
                            $scope.buttonClicked = false;
                            $location.path('catalog');
                        }
                    },
                    function (err) {
                        $scope.buttonClicked = false;
                        $scope.emailResetLoadingIndicator = false;
                        $scope.resetPasswordError = $sce.trustAsHtml(err.Message);
                    });
            }
            $scope.save = function () {
                $scope.buttonClicked = true;
                $scope.actionMessage = null;
                $scope.securityWarning = false;
                $scope.user.Username = $scope.user.TempUsername;
                $scope.displayLoadingIndicator = true;
                if ($scope.user.Type == 'TempCustomer'){
                    $scope.user.ConvertFromTempUser = true;
                }
                if($scope.currentOrder){
                    $scope.pendingOrder = angular.copy($scope.currentOrder.ID);
                }

                User.save($scope.user,
                    function (u) {
                        $scope.user = u;
                        if($scope.pendingOrder){
                            Order.get($scope.pendingOrder,function(order){
                                $scope.currentOrder = order;
                                $scope.currentOrder.FromUserID = $scope.user.ID;
                                Order.save($scope.currentOrder,function(ordr){
                                    $scope.securityWarning = false;
                                    $scope.displayLoadingIndicator = false;
                                    $scope.buttonClicked = false;
                                    $scope.actionMessage = 'Your changes have been saved';
                                    $scope.user.TempUsername = u.Username;
                                    if (_AnonRouter && !$scope.existingUser) _AnonRouter.route();
                                });
                            });
                        }
                        else{
                            $scope.securityWarning = false;
                            $scope.displayLoadingIndicator = false;
                            $scope.buttonClicked = false;
                            $scope.actionMessage = 'Your changes have been saved';
                            $scope.user.TempUsername = u.Username;
                            if (_AnonRouter && !$scope.existingUser) _AnonRouter.route();
                        }
                    },
                    function (ex) {
                        $scope.displayLoadingIndicator = false;
                        $scope.buttonClicked = false;
                        if (ex.Code.is('PasswordSecurity'))
                            $scope.securityWarning = true;
                        else {
                            user.Password = null;
                            user.ConfirmPassword = null;
                            if(ex.Message.indexOf("PasswordAlreadyUsed") != -1){
                                ex.Message = "Username already exists. Please choose another.";
                                $scope.actionMessage = $sce.trustAsHtml(ex.Message);
                            }
                            else{
                                $scope.actionMessage = $sce.trustAsHtml(ex.Message);
                            }
                        }
                    }
                );
            };
            $scope.loginExisting = function () {
                $scope.buttonClicked = true;
                if($scope.currentOrder){
                    $scope.pendingOrder = angular.copy($scope.currentOrder.ID);
                }
                User.login({Username: $scope.loginasuser.Username, Password: $scope.loginasuser.Password, ID: $scope.user.ID, Type: $scope.user.Type}, function (u) {
                    $scope.user = u;
                    if($scope.pendingOrder){
                        Order.get($scope.pendingOrder,function(order){
                            $scope.currentOrder = order;
                            $scope.currentOrder.FromUserID = $scope.user.ID;
                            Order.save($scope.currentOrder,function(ordr){
                                $scope.buttonClicked = false;
                                if (_AnonRouter) _AnonRouter.route();
                            });
                        });
                    }
                    else{
                        $scope.buttonClicked = false;
                        if (_AnonRouter) _AnonRouter.route();
                    }

                }, function (err) {
                    $scope.buttonClicked = false;
                    $scope.loginAsExistingError = err.Message;
                });
            };
        });
    }]);