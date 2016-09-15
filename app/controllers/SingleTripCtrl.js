"use strict";

app.controller('SingleTripCtrl', function($scope, $routeParams, TripFactory, TrailFactory, $route, NoteFactory, $uibModal){

  //This is where the trails that have been added to this trip are located. 
  $scope.trails = [];

    TripFactory.getSingleTrip($routeParams.tripId)
    .then((tripData)=>{
      console.log("trip data", tripData);
      $scope.trip = tripData;
    });

    //Opens a modal to make sure the user really wants to delete the trip
    $scope.openDeleteModal = ()=>{
      let modalInstance = $uibModal.open({
      templateUrl: 'partials/DeleteTrip.html',
      controller: 'DeleteTripModalCtrl'
      });
    };

    showNotes();
    showTrails();
    $scope.notes = [];

    function showNotes(){
      NoteFactory.getNotes($routeParams.tripId)
      .then((noteData)=>{
        console.log("note data", noteData);
        Object.keys(noteData).forEach((key)=>{
          noteData[key].id =key;
          $scope.notes.push(noteData[key]);
        });
        addNotesToNotes($scope.notes);
      });
    };

    function addNotesToNotes(notes){
      Object.keys(notes).forEach((key)=>{
        $scope.notes.push({
          text: notes[key].text,
          day: notes[key].dayId,
          id: notes[key].id,
          wishlist: false
        });
      });
      console.log("notes", $scope.notes);
    };

    function showTrails(){
      TrailFactory.getTrailsInTrip($routeParams.tripId)
      .then((trailData)=>{
        let trails = [];
        Object.keys(trailData).forEach((key)=>{
          trailData[key].id =key;
          trails.push(trailData[key]);
        })
        addTrailsToTrailsArr(trails);
      });
    }

    function addTrailsToTrailsArr(trails){
      console.log("trails", trails);
      Object.keys(trails).forEach((key)=>{
        $scope.trails.push({
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
      console.log("activities", $scope.trails);
    };

    $scope.deleteTrailFromTrip = (trailId)=>{
      TripFactory.deleteTrailFromTrip(trailId)
      .then(()=>{
        console.log("successfully deleted");
        //For now, the only way I know how to get rid of the deleted item is to reload the page. Not ideal - want to fix later. 
        $route.reload();
        // showTrails();
      })
    }

    $scope.addNote= (dayId)=>{
      //Need to create a noteObj to add to Firebase. Even though there is no text in this note the note instance needs to be added so that the user is updating the note when pressing enter rather than creating a whole new note everytime the enter key is pressed.
      let noteObj = {
        text: '',
        day: dayId,
        tripId: $routeParams.tripId
      }
      //A new note needs to be added to $scope.notes so that the user sees a card show up on the screen. This instance of the note will be replaced with the note in firebase when the user navigates away from this page.
      $scope.notes.push(noteObj);
      //The note is added to firebase
      NoteFactory.addNote(noteObj)
      .then((note)=>{
        console.log("added note!", note);
      });
    };

    $scope.updateNote = (event, noteId, text)=>{
      if (event.charCode == 13) {
        console.log("note will be updated", noteId);
        let textPatch = { text }
        NoteFactory.updateNote(textPatch, noteId)
        .then((note)=>{
          console.log("updated note!");
        });
      };
    };

    // $scope.autoExpand = function(e) {
    //     var element = typeof e === 'object' ? e.target : document.getElementById(e);
    //     var scrollHeight = element.scrollHeight -60; // replace 60 by the sum of padding-top and padding-bottom
    //     element.style.height =  scrollHeight + "px";
    // };

    // function expand() {
    //   $scope.autoExpand('TextArea');
    // }

});


