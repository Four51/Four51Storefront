'use strict';

$451.app.controller('CategoryCtrl', function ($scope, CategoryService) {
    console.log("loading category ctrl");
    $scope.categories = CategoryService.get();
});