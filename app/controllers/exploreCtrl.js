"use strict";

app.controller("ExploreCtrl", function($scope, ImportantKeys, uiGmapIsReady, uiGmapGoogleMapApi, ApiFactory, TrailinfoFactory){
  //Will add the map view here
    $scope.map = {
      center: {latitude: 37.8651, longitude: -119.5383 },
      zoom: 9,
      bounds: {}
    };
    $scope.options = {scrollwheel: false};

    // $scope.halfDomeInfo = {
    //   imgUrl: '../images/halfDome.jpeg',
    //   title: 'Half Dome'
    // }

    TrailinfoFactory.getTrailInfo()
    .then((trailData)=>{
      let trails = trailData.trails;
      console.log("trails now", trails);
      setMarkers(trails);
      setTrailInfo(trails);
    });

    function setMarkers(trails){
      trails.forEach((trail)=>{
        $scope.marker = {
          id: trail.id,
          coords: trail.coords
        }
      });
    }

    function setTrailInfo(trails){
      trails.forEach((trail)=>{
        $scope.trailInfo = {
          id: trail.id,
          name: trail.name,
          imgUrl: trail.coverImgUrl
        }
      });
    };

    $scope.beenClicked = false;

    $scope.onClick = function() {

      $scope.beenClicked = !$scope.beenClicked;
      $scope.$apply();
    };

  //   var createRandomMarker = function(i, bounds) {
  //     var lat_min = bounds.southwest.latitude,
  //       lat_range = bounds.northeast.latitude - lat_min,
  //       lng_min = bounds.southwest.longitude,
  //       lng_range = bounds.northeast.longitude - lng_min;

  //     // if (idKey === null) {
  //     //   idKey = "id";
  //     // }

  //     var latitude = lat_min + (Math.random() * lat_range);
  //     var longitude = lng_min + (Math.random() * lng_range);
  //     var ret = {
  //       latitude: latitude,
  //       longitude: longitude,
  //       title: 'm' + i,
  //       id: i
  //     };
  //     return ret;
  //   };
  //   $scope.randomMarkers = [];
  //   // Get the bounds from the map once it's loaded
  //   $scope.$watch(function() {
  //     return $scope.map.bounds;
  //   }, function(nv, ov) {
  //     // Only need to regenerate once
  //     if (!ov.southwest && nv.southwest) {
  //       var markers = [];
  //       for (var i = 0; i < 50; i++) {
  //         markers.push(createRandomMarker(i, $scope.map.bounds))
  //       }
  //       $scope.randomMarkers = markers;
  //     }
  //   }, true);

  // ApiFactory.getActivities("Yosemite+National+Park", "hiking", "25")
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