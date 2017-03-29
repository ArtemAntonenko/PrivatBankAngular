
privatBankApp.factory("googleService", function ($http) {

    return {
        getCoordinates: function (address) {
            var url = "https://maps.googleapis.com/maps/api/geocode/json?address=";
            var key = "&key=AIzaSyD-sTwlX_--WC__bdPWk7Q1T81EzDwowII";
            return $http.get(url + address + key);
        }
    }

});