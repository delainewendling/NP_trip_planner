"use strict";

app.controller('SingleTripCtrl', function($scope, $routeParams, TripFactory){

  //Need to define these things. Activities will have a trip Id on them that matches the routeParams
  // $scope.activities
  //Write a function in the TripFactory that gets the correct single trip from the database

  //There are 86400000 milliseconds in a day
  let oneDay = 86400000;

    TripFactory.getSingleTrip($routeParams.tripId)
    .then((tripData)=>{
      console.log("trip data", tripData);
      $scope.trip = tripData;
      createDayObject();
    });

    function getNumberOfDays (tripData){
      let difference = tripData.endMilliseconds - tripData.startMilliseconds;
      return (Math.round(difference/oneDay)+1);
    };

    function createDayObject (){
      let days = [];
      for (let i=0; i<getNumberOfDays($scope.trip); i++){
        days.push({
          day: 'Day ' + (i+1),
          date: moment($scope.trip.startMilliseconds + (i*oneDay)).format("dddd MMMM Do YYYY"),
          activities: []
        });
      };
      $scope.days = days;
    };
});


