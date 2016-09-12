"use strict";

app.controller('SingleTripCtrl', function($scope, $routeParams, TripFactory){

  //Need to define these things. Activities will have a trip Id on them that matches the routeParams
  // $scope.activities
  //Write a function in the TripFactory that gets the correct single trip from the database

    TripFactory.getSingleTrip($routeParams.tripId)
    .then((tripData)=>{
      console.log()
      $scope.trip = tripData;
    });


});