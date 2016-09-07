"use strict";

app.controller("ExploreCtrl", function($scope){
  //Will add the map view here
  $scope.initMap = function(){
    $scope.map = new google.maps.Map(document.getElementById('map'), )
  };

});