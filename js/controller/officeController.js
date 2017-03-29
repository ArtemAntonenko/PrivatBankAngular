privatBankApp.controller("officeCtrl", ["$scope", "privateBankService", "$filter", "$window", function($scope, privateBankService, $filter, $window){

    downloadOffices();
    
    console.log($window.innerWidth);
    
    $scope.itemsOnPage = 6;
    $scope.currentPage = 1;
    
    $scope.titles = ["Название", "Адрес", "Город", "Страна", "Телефон"];
    
    $scope.dataIsReady = false;

    $scope.layout = 'table';
    $scope.lastChoosenLayout = 'table';
    $scope.showLayoutPannel = true;
    $scope.trigger = false;
    $scope.mapLoading = false;
//    $scope.mapIsOpened = null;


    function downloadOffices(){
        privateBankService.getOffices().then(function(result){
            $scope.offices = result.data;
            $scope.rawOffices = result.data;
            
            setNumberOfPages();
            
            $scope.dataIsReady = true;
            
//            console.log($scope.numberOfPages);
        });
    }
    
    $scope.showPreviousPage = function(){
        $scope.currentPage = (($scope.currentPage - 1) <= 0) ? $scope.currentPage : $scope.currentPage - 1;
        console.log("showPreviousPage");
    }
    
    $scope.showNextPage = function(){
        $scope.currentPage = (($scope.currentPage + 1) >= $scope.numberOfPages) ? $scope.numberOfPages : $scope.currentPage + 1;
        console.log("showNextPage");

    }
    
    $scope.changeNumberOfPages = function(searchCriteria){
        
//        console.log(searchCriteria.split(" "));
        
        
        
        var result = $scope.rawOffices;
        
        console.log(searchCriteria.replace(new RegExp(" ", "g"),","));
        
        var criterias = searchCriteria.replace(new RegExp(" ", "g"),",").split(",");

        for(var i = 0; i < criterias.length; i++){
           result = $filter("filter")(result, criterias[i]);
        }
        
        $scope.offices = result;
        
        $scope.currentPage = $scope.offices.length === 0
                            ? 0 : 1;
        
        setNumberOfPages();
        
    };
    
    function setNumberOfPages(){
        $scope.numberOfPages = Math.ceil($scope.offices.length / $scope.itemsOnPage);
    }
    
    $scope.isListEmpty = function(){
        if($scope.offices){
            return $scope.offices.length === 0;            
        }
    };

    $scope.setLayout = function (layout) {
        $scope.layout = layout;
        $scope.lastChoosenLayout = layout;

    };

    $scope.setItemShowOnMap = function(office){
        console.log("etItemShowOnMap() + mapLoading = true");
        $scope.currentShowOnMap = office;
        $scope.trigger = !$scope.trigger;
        $scope.mapLoading = true;

    };


    
}]);
