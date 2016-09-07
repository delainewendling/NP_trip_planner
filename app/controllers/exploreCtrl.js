"use strict";

app.controller("ExploreCtrl", function($scope, ImportantKeys, uiGmapIsReady, uiGmapGoogleMapApi){
  //Will add the map view here
    $scope.map = {
      center: {latitude: 40.7128, longitude: -74.0059 },
      zoom: 14 };
    $scope.options = {scrollwheel: false};
    $scope.markers = [];
  // uiGmapGoogleMapApi is a promise.
  // The "then" callback function provides the google.maps object.
  // uiGmapGoogleMapApi.then(function(maps) {
  //   console.log("a map!");
  // });

});