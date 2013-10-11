function FirebaseChatCtrl($scope, angularFire) {
    var ref = new Firebase('https://m9t7ys4lhh4.firebaseio-demo.com/');
    $scope.messages = [];
    angularFire(ref, $scope, "messages");
    $scope.addMessage = function(e) {
        if (e.keyCode != 13) return;
        $scope.messages.push({from: $scope.name, body: $scope.msg});
        $scope.msg = "";
    };
}