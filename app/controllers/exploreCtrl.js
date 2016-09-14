"use strict";

app.controller("ExploreCtrl", function($scope, ImportantKeys, uiGmapIsReady, uiGmapGoogleMapApi, ApiFactory, TrailFactory, WishlistFactory, AuthFactory){
  //The map that shows up when the user goes to the Yosemite view should be centered on Yosemite National Park. Below are the coordinates for Yosemite.
    $scope.map = {
      center: {latitude: 37.8651, longitude: -119.5383 },
      zoom: 9,
      bounds: {}
    };
    $scope.options = {scrollwheel: false};
    //I want the sidebar to be closed when a marker hasn't been clicked
    $scope.beenClicked = false;
    $scope.inWishlist = false;

  $scope.trailNames = [];

  //I need to get the trail information from firebase and create objects that will provide the necessary information to create a marker for each trail. I also want to print information in the sidebar about each trail so I need to create an object for each trail with that information.
    TrailFactory.getTrailInfo()
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
          longitude: trail.coords.longitude,
          icon: '../images/hikerLogo.png',
          name: trail.name
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
          description: trail.description,
          park: trail.park,
          estTime: trail.estTime,
          distance: trail.distance,
          difficulty: trail.difficulty,
          hazards: trail.hazards,
          permit: trail.permit,
          elevationGain: trail.elevationGain,
          scenery: trail.sceneryFactor,
          crowd: trail.crowdFactor
        });
      });
    };


    function getWishlistTrails () {
      TrailFactory.getTrailsFromWishlist(AuthFactory.getUserId())
      .then((trailData)=>{
        console.log("what are the wishlist trails?", trailData);
        //I want to create an array of trail names from the wishlist so that I can compare the names in the wishlist to the names on the markers and see if that trail has been added to the wishlist of not.
        Object.keys(trailData).forEach((key)=>{
          $scope.trailNames.push(trailData[key].name);
        })
        console.log("trail Names in wishlist", $scope.trailNames);
      });
    }

    getWishlistTrails();

    //When a marker is clicked I want to make sure that the user does not add a trail to his/her wishlist when it has already been added.
    $scope.onClick = function(instance, event, marker) {
      $scope.trailInfo = $scope.trailsInfo[marker.id];
      $scope.inWishlist = inWishlist(marker.name);
      showInformation();
    };

    function inWishlist(trailName){
      let counter = 0;
      $scope.trailNames.forEach((trail)=>{
        if (trail == trailName) {
          counter++;
        }
      });
      if (counter){
        return true;
      } else {
        return false;
      }
    };

    //This function shows the sidebar when any marker is clicked. The appropriate information is shown in the sidebar
    function showInformation(){
      $scope.beenClicked = true;
      $scope.$apply();
    }
    //Since each marker calls the onClick function it is difficult to open and close the sidebar by resetting the beenClicked property using clicks. Therefore, I created a button that will make the beenClicked property false so that the user can close the sidebar when he/she is done looking at trail information.
    $scope.closeSidebar = ()=>{
      $scope.beenClicked = false;
    }
    //The user should be able to add a trail to his/her wishlist if there are no trips planned
    $scope.addTrailToWishlist = (trailInfo)=>{
      let userId = AuthFactory.getUserId();
      trailInfo.uid = userId;
      console.log("trail info", trailInfo);
      WishlistFactory.addToWishlist(trailInfo)
      .then((trailData)=>{
        $scope.closeSidebar();
        getWishlistTrails();
      });
    };

  // ApiFactory.getActivities("Yosemite+National+Park", "hiking", "25")
  // .then((trailCollection)=>{
  //   console.log("trails from explore call", trailCollection);
  //   $scope.trails = trailCollection;
  // });


});