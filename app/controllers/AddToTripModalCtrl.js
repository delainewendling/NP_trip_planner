'use strict';

app.controller("AddToTripModalCtrl", function ($scope, TrailFactory, TripFactory, $uibModalInstance, trailName, AuthFactory){

  //Get the Trips from a user's firebase and use them to populate the trips dropdown menu
  function getTrips (){
    let trips = [];
    TripFactory.getTrips()
    .then((tripData)=>{
      Object.keys(tripData).forEach((key)=>{
        tripData[key].id = key;
        trips.push(tripData[key]);
      });
      $scope.trips = trips;
    });
  }

  getTrips();

  $scope.trailObj = {
      trailName,
      tripId: '',
      dayId: '',
      startDate: '',
      startTime: '',
      endTime: '',
      notes: '',
      uid: AuthFactory.getUserId()
  }

  //We need to get available days from the trip chosen in the dropdown menu
  $scope.getDaysAndLogTrip= (tripId)=>{
    $scope.trailObj.tripId = tripId;
    console.log("trip id is: ", tripId);
    TripFactory.getSingleTrip(tripId)
    .then((tripData)=>{
      $scope.trip = tripData;
    });
  };

  $scope.logDay = (dayId)=>{
    console.log("day id", dayId);
    $scope.trailObj.dayId= dayId;

  }

  $scope.status = {
    isTripOpen: false,
    isDayOpen: false,
    isDayDisabled: true,
    isTimeOpen: false
  };

  //Opens the clicked dropdown menu
  $scope.openTrips= ($event)=>{
    $event.preventDefault();
    $event.stopPropagation();
    //Want to close the other dropdown menus before opening the chosen dropdown
    $scope.status.isDayOpen = false;
    $scope.status.isTimeOpen = false;
    $scope.status.isTripOpen = !$scope.status.isTripOpen;
  };

  $scope.openDays= ($event)=>{
    $event.preventDefault();
    $event.stopPropagation();
    $scope.status.isTripOpen = false;
    $scope.status.isTimeOpen = false;
    $scope.status.isDayOpen = !$scope.status.isDayOpen;
  };

  $scope.openTime= ($event)=>{
    $event.preventDefault();
    $event.stopPropagation();
    $scope.status.isTripOpen = false;
    $scope.status.isDayOpen = false;
    $scope.status.isTimeOpen = !$scope.status.isTimeOpen;
  };

  //Closes the Trips dropdown
  $scope.closeTrips = function() {
    console.log("closing?", $scope.status.isTripOpen)
    //not working
    $scope.status.isTripOpen = false;
    //working
    $scope.status.isDayDisabled = false;
  };

  //Closes the days dropdown
  $scope.closeDays = function(startDate) {
    $scope.trailObj.startDate = startDate;
    console.log("what is the start date?", startDate);
    $scope.status.isDayOpen = false;
    $scope.startTime = new Date(`${startDate} 7:00:00`);
    $scope.endTime = new Date(`${startDate} 7:00:00`);
  };

  //Want to set the hour step to one hour and minute step to 15 minutes
  $scope.hstep = 1;
  $scope.mstep = 15;

  $scope.ismeridian = true;
  $scope.toggleMode = function() {
    $scope.ismeridian = !$scope.ismeridian;
  };

  $scope.updateStart = function() {
    $scope.trailObj.startTime = $scope.startTime;
    console.log("new start time", $scope.startTime);
  };

  $scope.updateEnd = function() {
    $scope.trailObj.endTime = $scope.endTime;
    console.log("new end time", $scope.endTime);
  };

  $scope.addTrail = ()=>{
    console.log("what is the trailName?", $scope.trailObj.trailName);
    console.log("what are the notes?", $scope.trailObj.notes);
    TrailFactory.addTrailToTrip($scope.trailObj)
    .then((trailData)=>{
      console.log("successfully added trail to trip");
      $scope.closeModal();
    })
  }

  //Closes Modal (nothing is saved)
  $scope.closeModal = () => {
    $uibModalInstance.close();
  };

});