'use strict';

app.controller('DeleteTripModalCtrl', function($scope, $uibModalInstance, TripFactory, $routeParams, $window, ActivityFactory){

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
      return ActivityFactory.getActivities(tripId)
    })
    .then((activityData)=>{
      console.log("activities in trip", activityData);
      Object.keys(activityData).forEach((activityId)=>{
        ActivityFactory.deleteActivityFromTrip(activityId);
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