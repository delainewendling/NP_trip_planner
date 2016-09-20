'use strict';

app.controller('DeleteTripModalCtrl', function($scope, $uibModalInstance, TripFactory, $routeParams, $window, TrailFactory, NoteFactory){

  let tripId = $routeParams.tripId;

  $scope.close = () => {
    $uibModalInstance.close();
  };

  //Not only do we want to delete the trip object connected to that user from Firebase but we also want to delete anything associated with the trip - notes, packing list, and trails that have been added.
  $scope.deleteTrip = ()=>{
    TripFactory.deleteTrip(tripId)
    .then(()=>{
      console.log("trip was deleted");
      $scope.close();
      $window.location.href='#/parks/explore';
      return TrailFactory.getTrailsInTrip(tripId)
    })
    .then((trailData)=>{
      console.log("trails in trip", trailData);
      Object.keys(trailData).forEach((trailId)=>{
        TripFactory.deleteTrailFromTrip(trailId);
      });
      return NoteFactory.getNotes(tripId)
    })
    .then((noteData)=>{
      console.log("notes in trip", noteData);
      Object.keys(noteData).forEach((noteId)=>{
        NoteFactory.deleteNoteFromTrip(noteId);
      });
      return TripFactory.getUserPackingList(tripId)
    })
    .then((packingData)=>{
      console.log("user packing list", packingData);
      Object.keys(packingData).forEach((listId)=>{
        TripFactory.deleteItemFromList(listId);
      });
    });
  };

});