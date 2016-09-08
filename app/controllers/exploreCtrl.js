"use strict";

app.controller("ExploreCtrl", function($scope, ImportantKeys, uiGmapIsReady, uiGmapGoogleMapApi, Trailheads){
  //Will add the map view here
    $scope.map = {
      center: {latitude: 37.8651, longitude: -119.5383 },
      zoom: 9 };
    $scope.options = {scrollwheel: false};
    $scope.marker = {
      id: 0,
      coords: {
        latitude: 37.7459,
        longitude: -119.5332
      },
      type: "spider"
    }

    // Trailheads.getTrailheads()
    // .then((trailCollection)=>{
    //   console.log("trails from explore call", trailCollection);
    //   $scope.trails = trailCollection;
    // });

  // uiGmapGoogleMapApi is a promise.
  // The "then" callback function provides the google.maps object.
  // uiGmapGoogleMapApi.then(function(maps) {
  //   console.log("a map!");
  // });

});