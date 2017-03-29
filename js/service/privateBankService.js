
privatBankApp.factory("privateBankService", function ($http) {

    return {

        getCashRate: function () {
            
           var url =  "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5";
            
           return $http.get(url);
        },
        
        getOffices: function(){
                        
            var url = "res/offices.json";

            return $http.get(url);
        }

    }


});