"use strict";

app.controller("TripsCtrl", function($scope, TripFactory, $route, $window){

  function showTrips(){
    TripFactory.getTrips()
    .then((tripInfo)=>{
      $scope.trips = tripInfo
      console.log("trips", $scope.trips);
    });
  }

  showTrips();

  $scope.tripDelete = (tripId)=>{
    TripFactory.deleteTrip(tripId)
    .then((data)=>{
      console.log("successfully deleted");
      $route.reload();
    });
  };

  $scope.showTrip = (tripId)=>{
    $window.location.href = `#/parks/trip/${tripId}`;
  }

});