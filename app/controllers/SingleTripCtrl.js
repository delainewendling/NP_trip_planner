"use strict";

app.controller('SingleTripCtrl', function($scope, $routeParams, TripFactory, TrailFactory, $route, NoteFactory){

  //Need to define these things. Activities will have a trip Id on them that matches the routeParams
  // $scope.activities
  //Write a function in the TripFactory that gets the correct single trip from the database

  $scope.activities = [];

    TripFactory.getSingleTrip($routeParams.tripId)
    .then((tripData)=>{
      //trip.day.id is correct here
      console.log("trip data", tripData);
      $scope.trip = tripData;
    });

    // showNotes();
    showTrails();

    function showNotes(){
      NoteFactory.getNotes($routeParams.tripId)
      .then((noteData)=>{
        let notes = [];
        console.log("note data", noteData);
        Object.keys(noteData).forEach((key)=>{
          noteData[key].id =key;
          notes.push(noteData[key]);
        });
        addNotesToActivities(notes);
      });
    };

    function addNotesToActivities(notes){
      Object.keys(notes).forEach((key)=>{
        $scope.activities.push({
          text: notes[key].text,
          dayId: notes[key].dayId,
          id: notes[key].id,
          wishlist: false
        });
      });
      console.log("activities", $scope.activities);
    };

    function showTrails(){
      TrailFactory.getTrailsInTrip($routeParams.tripId)
      .then((trailData)=>{
        let trails = [];
        Object.keys(trailData).forEach((key)=>{
          trailData[key].id =key;
          trails.push(trailData[key]);
        })
        addTrailsToActivities(trails);
      });
    }

    function addTrailsToActivities(trails){
      console.log("trails", trails);
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

    $scope.cardAdded = false;
    $scope.createNote= (dayId)=>{
      $scope.activities.push({
        text: '',
        id: dayId,
        wishlist: false
      });
      $scope.cardAdded = true;
      console.log("activities?", $scope.activities);
    }

    $scope.addNote = (event, dayId, text)=>{
      if (event.charCode == 13) {
        console.log("note will be added", dayId);
        let noteObj = {
          text,
          day: dayId,
          tripId: $routeParams.tripId
        }
        NoteFactory.addNote(noteObj)
        .then((note)=>{
          console.log("added note!");
        });
      };
    };



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


