"use strict";

app.controller("ExploreCtrl", function($scope, ImportantKeys, uiGmapIsReady, uiGmapGoogleMapApi){
  //Will add the map view here
    $scope.map = {
      center: {latitude: 37.8651, longitude: -119.5383 },
      zoom: 9 };
    $scope.options = {scrollwheel: false};
    $scope.markers = [];
  // uiGmapGoogleMapApi is a promise.
  // The "then" callback function provides the google.maps object.
  // uiGmapGoogleMapApi.then(function(maps) {
  //   console.log("a map!");
  // });

});