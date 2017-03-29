
privatBankApp.controller("currencyCtrl", ["$scope", "privateBankService",
    function ($scope, privateBankService) {

    // console.log($location.url());

    $scope.titles = ["Валюта", "Нац. валюта", "Покупка", "Продажа"];
    $scope.dataIsReady = false;
    $scope.error = false;
    $scope.downloadData = getCashRate;

    getCashRate();

    function getCashRate() {
        $scope.dataIsReady = false;
        $scope.error = false;

        privateBankService.getCashRate().then(function (result) {
            $scope.data = result.data;
            // console.log(result.data);
            $scope.error = false;
            $scope.dataIsReady = true;
            $scope.lastTimeUpdated = new Date().toLocaleString("ru");

        }, function (err) {
            // alert("Возникла ошибка при загрузке данных - пожалуйста проверьте интернет подключение");
            $scope.dataIsReady = false;
            $scope.error = true;
        });
    }




}]);
