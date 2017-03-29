
privatBankApp.config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when("/",{
            templateUrl: "template/home.html"
        })
        .when("/currency",{
            templateUrl: "template/currency.html",
            controller: "currencyCtrl"
        })
        .when("/office",{
            templateUrl: "template/office.html",
             controller: "officeCtrl"
        })
        .otherwise({
            redirectTo: "/"
        });
}]);