
privatBankApp.directive("resizeControl", function () {

    var directive = {};

    directive.restrict = "A";

    // directive.template = "<div>{{layout}}</div>";

    directive.replace = true;
    
    directive.link = function ($scope, element, attributes) {
//        console.log("directive link function");

        if(window.innerWidth < 1000){
            $scope.layout = "block";
            $scope.lastChoosenLayout = "block";
            $scope.showLayoutPannel = false;
        }

        $(window).resize(function () {
//            console.log("window.innerWidth" + window.innerWidth);
            if(window.innerWidth < 1000){
                $scope.$apply(function () {
                    $scope.layout = "block";
                    $scope.showLayoutPannel = false;
                });
//                console.log("block");
            }else{
                $scope.$apply(function () {
                    $scope.layout = $scope.lastChoosenLayout;
                    $scope.showLayoutPannel = true;
                });
            }
        });

    };

    return directive;

});