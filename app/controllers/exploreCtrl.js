"use strict";

app.controller("ExploreCtrl", function($scope, ImportantKeys, uiGmapIsReady, uiGmapGoogleMapApi, ApiFactory, TrailinfoFactory, FirebaseFactory, AuthFactory){
  //The map that shows up when the user goes to the Yosemite view should be centered on Yosemite National Park. Below are the coordinates for Yosemite.
    $scope.map = {
      center: {latitude: 37.8651, longitude: -119.5383 },
      zoom: 9,
      bounds: {}
    };
    $scope.options = {scrollwheel: false};
    //I want the sidebar to be closed when a marker hasn't been clicked
    $scope.beenClicked = false;

  //I need to get the trail information from firebase and create objects that will provide the necessary information to create a marker for each trail. I also want to print information in the sidebar about each trail so I need to create an object for each trail with that information.
    TrailinfoFactory.getTrailInfo()
    .then((trailData)=>{
      let trails = trailData.trails;
      setMarkers(trails);
      setTrailInfo(trails);
    });

    //Creating objects with relevant information for each marker and pushing to an array
    function setMarkers(trails){
      $scope.markers = [];
      trails.forEach((trail)=>{
        $scope.markers.push({
          id: trail.id,
          latitude: trail.coords.latitude,
          longitude: trail.coords.longitude
        });
      });
    };

    //Creating objects with relevant information for each trail and pushing to an array
    function setTrailInfo(trails){
      $scope.trailsInfo = [];
      trails.forEach((trail)=>{
        $scope.trailsInfo.push({
          id: trail.id,
          name: trail.name,
          imgUrl: trail.coverImgUrl,
          whyVisit: trail.whyVisit,
          description: trail.description
        });
      });
    };


    $scope.onClick = function(instance, event, marker) {
      console.log("marker id", marker.id);
      $scope.trailInfo = $scope.trailsInfo[marker.id];
      console.log("trail Info", $scope.trailInfo);
      showInformation();
    };
    //This function shows the sidebar when any marker is clicked. The appropriate information is shown in the sidebar
    function showInformation(){
      $scope.beenClicked = true;
      $scope.$apply();
    }
    //Since each marker calls the onClick function it is difficult to open and close the sidebar by resetting the beenClicked property using clicks. Therefore, I created a button that will make the beenClicked property false so that the user can close the sidebar when he/she is done looking at trail information.
    $scope.closeSidebar = ()=>{
      $scope.beenClicked = false;
      // $scope.$apply();
    }
    //The user should be able to add a trail to his/her wishlist if there are no trips planned
    $scope.addTrailToWishlist = (trailInfo)=>{
      let userId = AuthFactory.getUserId();
      trailInfo.uid = userId;
      trailInfo.wishlist = true;
      console.log("trail info", trailInfo);
      FirebaseFactory.addToWishlist(trailInfo)
      .then((trailData)=>{
        $scope.closeSidebar();
        console.log("successfully added", trailData);
      });
    };

  // ApiFactory.getActivities("Yosemite+National+Park", "hiking", "25")
  // .then((trailCollection)=>{
  //   console.log("trails from explore call", trailCollection);
  //   $scope.trails = trailCollection;
  // });


});