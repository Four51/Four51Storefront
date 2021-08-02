function drawCustomForm(params, $scope, imageSource) {
    // This can be expanded in the future to support objects or arrays but for now it just calls a function drawForm_<params>()
    if (typeof params == 'string') {
        window["drawForm_" + params]();
    }
}
