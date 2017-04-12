
privatBankApp.directive("mapPanel", ["googleService", function (googleService) {

        var directive = {};

        directive.restrict = "E";
        
        directive.templateUrl = "template/mapElement.html";

        directive.scope = {
            office: "=",
            trigger: "=",
            loading: "="
        };

        directive.link = function ($scope, element, attributes) {
            console.log("map element link function");


            $scope.selectedMode = "DRIVING";
            $scope.visible = null;
            var directionsService = new google.maps.DirectionsService();
            var directionsDisplay= new google.maps.DirectionsRenderer();
            var choosenOfficeLoc;
            var marker;
            

            initMap();


            function initMap() {
                var mapSettings = {
                    zoom: 15
                };
                googleMap = new google.maps.Map(document.getElementById("map"), mapSettings);
                console.log("init map " + googleMap)
            }



            $scope.$watch("trigger", function () {

                if (!$scope.office) return;

                var office = $scope.office;
                var address = office.country + " " + office.city + " " + office.address;
                
                googleService.getCoordinates(address).then(function (prom) {
//                    console.log(prom.data);
                    var data = prom.data;
                    
                    console.log(prom.data);

                    if(data.status != "OK"){
                        $scope.loading = false;
                      
                        alert("Адрес не найден на карте Гугл");
                        return;
                    }
                    
                    $scope.visible = true;
                    
                    choosenOfficeLoc = data.results[0].geometry.location;

                    renderMap(choosenOfficeLoc);
                    
                    $scope.loading = false;
                   

                }, function (err) {
                    alert("Ошибка при загрузке данных");
                    $scope.loading = false;
                   
                });

            }); 



            function renderMap(location) {

                var position = {lat: location.lat, lng: location.lng};

                googleMap.setCenter(new google.maps.LatLng(location.lat, location.lng));
                googleMap.setZoom(15);
                cleanMap();

                marker = new google.maps.Marker({
                    position: position,
                    map: googleMap,
                    title: $scope.office.name
                });
                
                setTimeout(function(){
                    console.log("position top = " + $("map-panel").offset().top);
                    window.scrollTo(0, $("map-panel").offset().top - 10); 
                }, 500);

            }


           function cleanMap() {
               if(directionsDisplay){
                   directionsDisplay.setMap(null);
               }
               if(marker){
                   marker.setMap(null);
               }
           }
//
           $scope.$watch("selectedMode", function () {
               console.log("selectedMode")
               calculateDirection();
           });
//
           $scope.showDirection = function() {
               calculateDirection();
           };

        function calculateDirection() {
            
            
            if(!$scope.visible) return;
            
            $scope.loading = true;
            
            navigator.geolocation.getCurrentPosition(function (pos) {

                console.log("calculate direction");
        
                console.log(choosenOfficeLoc.lat + " " + choosenOfficeLoc.lng);

                var selectMode = $scope.selectedMode;
    
                cleanMap();
                directionsDisplay.setMap(googleMap);

                var startPosition = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
                var destination = new google.maps.LatLng(choosenOfficeLoc.lat, choosenOfficeLoc.lng);

                var request = {
                    origin: startPosition,
                    destination: destination,
                    travelMode: google.maps.TravelMode[selectMode]
                };

                directionsService.route(request, function (response, status) {
                    if(status == google.maps.DirectionsStatus.OK){
                        directionsDisplay.setDirections(response);
                    }
                });
                
                $scope.$apply(function(){
                   $scope.loading = false; 
                });
               

            }, function () {
                alert("Для прокладки маршрута необходимо разрешить получение текущих координат и перезагрузить страницу");
                $scope.loading = false;
            });
        }

//        };
//
//      
        }

        return directive;

    }
]);





//            var officeCont = $(".officesContainer");
//            var mapDiv = $("#map");
//            var googleMap;
//            var btnClose = $("<button class='btn btn-info '>Закрыть карту<span class='glyphicon glyphicon-eject'></span></button>");
//            var btnDirection = $("<button class='btn btn-info'>Проложить маршрут<span class='glyphicon glyphicon glyphicon-move'></span></button>");
//
//            var selectMenu = $("<select class='form-control'>" +
//                "<option value='DRIVING'>Автомобилем</option>" +
//                "<option value='WALKING'>Пешком</option>" +
//                "<option value='BICYCLING'>Велосипедом</option>");
//
//            var containerForBtns = $("<div class='containerForBtns'></div>");
//            containerForBtns.append(selectMenu).append(btnDirection).append(btnClose);
//            $(".content").append(containerForBtns);
//
//
//            btnClose.on("click", function () {
//                hideMap();
//            });
//
//            btnDirection.on("click", function () {
//               showDirection();
//            });
//
//            setOptionChangeListener()

// function showMap() {
//     var top = (window.innerWidth < 767) ? "530px" : "460px";
//     officeCont.animate({"top": top}, "slow");
//     mapDiv.animate({"opacity":"1"}, 1500);
//     containerForBtns.show().animate({"opacity":"1"}, 1500);
//     mapIsVisible = true;
// }
//



//
//            function hideMap(btn) {
//                containerForBtns.hide().css({"opacity":"0"});
//                officeCont.animate({"top":"0px"}, "slow");
//                mapDiv.animate({"opacity":"0"}, 100);
//                mapIsVisible = false;
//            }
//
//            $(window).resize(function () {
//                console.log("resize function" + ", mapIsVisible = " + mapIsVisible + ", window.innerWidth < 767 = " + (window.innerWidth < 767));
//                if((window.innerWidth < 767) && mapIsVisible){
//                    officeCont.css({"top":"530px"});
//                    console.log("top : 530px");
//                }else if ((window.innerWidth > 767) && mapIsVisible){
//                    officeCont.css({"top":"460px"});
//                }
//            });
//
//            function setOptionChangeListener() {
//                $(".form-control").on("change", function () {
//                    showDirection();
//                });
//            }
