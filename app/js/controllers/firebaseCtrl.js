function FirebaseChatCtrl($scope, angularFire) {
    var ref = new Firebase('https://451.firebaseio.com/');
    $scope.messages = [];
    angularFire(ref, $scope, "messages");
    $scope.addMessage = function(e) {
        if (e.keyCode != 13) return;
        $scope.messages.push({from: $scope.name, body: $scope.msg});
        $scope.msg = "";
    };
}