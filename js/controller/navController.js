
privatBankApp.controller("navCtrl", ["$scope", "$location", function ($scope, $location) {

    // console.log($location.url());

    $scope.currentSelected = "home";

    $scope.$on('$routeChangeStart', function(next, current) {
        $scope.currentSelected = $location.url();
    });

    $scope.isSelected = function (item) {
//        console.log("isSelected = " + item + " " + ($scope.currentSelected === item));
        return $scope.currentSelected === item;
    };


}]);