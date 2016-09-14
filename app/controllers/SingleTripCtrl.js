"use strict";

app.controller('SingleTripCtrl', function($scope, $routeParams, TripFactory, TrailFactory, $route){

  //Need to define these things. Activities will have a trip Id on them that matches the routeParams
  // $scope.activities
  //Write a function in the TripFactory that gets the correct single trip from the database

    TripFactory.getSingleTrip($routeParams.tripId)
    .then((tripData)=>{
      console.log("trip data", tripData);
      $scope.trip = tripData;
    });

    showTrails();

    function showTrails(){
      TrailFactory.getTrailsInTrip($routeParams.tripId)
      .then((trailData)=>{
        console.log("trail data", trailData);
        let trails = [];
        Object.keys(trailData).forEach((key)=>{
          trailData[key].id =key;
          trails.push(trailData[key]);
        })
        addTrailsToActivities(trails);
      });
    }

    function addTrailsToActivities(trails){
      $scope.activities = [];
      Object.keys(trails).forEach((key)=>{
        $scope.activities.push({
          name: trails[key].name,
          dayId: trails[key].dayId,
          id: trails[key].id,
          distance: trails[key].distance,
          estTime: trails[key].estTime,
          elevationGain: trails[key].elevationGain,
          difficulty: trails[key].difficulty,
          startTime: trails[key].startTime,
          endTime: trails[key].endTime,
          notes: trails[key].notes,
          wishlist: true
        });
      });
      console.log("activities", $scope.activities);
    };

    $scope.deleteFromTrip = (trailId)=>{
      TripFactory.deleteTrailFromTrip(trailId)
      .then(()=>{
        console.log("successfully deleted");
        showTrails();
      })
    }

    $scope.addNote = (event, dayId)=>{
      if (event.charCode == 13) {
        console.log("note will be added", dayId);
      }
    }

    $scope.cardAdded = false;

    $scope.createNote= (dayId)=>{
      console.log("day id", dayId);
      $scope.activities.push({
        text: '',
        id: dayId
      });
      $scope.cardAdded = true;
      console.log("activities?", $scope.activities);
    }

    // // Generate initial model
    // for (var i = 1; i <= 3; ++i) {
    //     $scope.models.lists.A.push({label: "Item A" + i});
    //     $scope.models.lists.B.push({label: "Item B" + i});
    // }

    // // Model to JSON for demo purpose
    // $scope.$watch('models', function(model) {
    //     $scope.modelAsJson = angular.toJson(model, true);
    // }, true);


});


