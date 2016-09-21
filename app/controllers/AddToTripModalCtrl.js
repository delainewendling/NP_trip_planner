'use strict';

app.controller("AddToTripModalCtrl", function ($scope, ActivityFactory, TripFactory, $uibModalInstance, trailObj, AuthFactory, $window){

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
      name: trailObj.name,
      distance: trailObj.distance,
      elevationGain: trailObj.elevationGain,
      permit: trailObj.permit,
      difficulty: trailObj.difficulty,
      estTime: trailObj.estTime,
      tripId: '',
      dayId: '',
      startDate: '',
      notes: '',
      uid: trailObj.uid,
      type: 'trail'
  };

  $scope.planATrip = ()=>{
    $scope.closeModal();
    $window.location.href = "#/parks/trips/create";
  };

  $scope.showTripName = (tripName)=>{
    $scope.tripName = tripName;
  };
  $scope.getDay = (day)=>{
    $scope.tripDay = day;
  };
  //We need to get available days from the trip chosen in the dropdown menu
  $scope.getDaysAndLogTrip= (tripId)=>{
    $scope.showTripAlert = false;
    $scope.trailObj.tripId = tripId;
    TripFactory.getSingleTrip(tripId)
    .then((tripData)=>{
      $scope.trip = tripData;
    });
  };

  $scope.logDay = (dayId)=>{
    $scope.showDayAlert = false;
    $scope.trailObj.dayId= dayId;

  };

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

  //Closes the Trips dropdown
  $scope.closeTrips = function() {
    $scope.status.isTripOpen = false;
    //working
    $scope.status.isDayDisabled = false;
  };

  //Closes the days dropdown
  $scope.closeDays = function(startDate) {
    $scope.trailObj.startDate = startDate;
    $scope.status.isDayOpen = false;
  };

  $scope.showTripAlert = false;
  $scope.showDayAlert = false;
  $scope.addTrail = ()=>{
    if ($scope.trailObj.tripId && $scope.trailObj.startDate){
      ActivityFactory.addActivity($scope.trailObj)
      .then((trailData)=>{
        console.log("successfully added trail to trip");
        $scope.closeModal();
      });
    } else if (!$scope.trailObj.tripId){
      $scope.showTripAlert = true;
    } else if (!$scope.trailObj.startDate){
      $scope.showDayAlert = true;
    }
  };

  $scope.tripAlert = { type: 'danger', msg: 'Make sure you choose a trip!' };
  $scope.dayAlert = { type: 'danger', msg: 'Make sure you choose a day!' };
  $scope.closeTripAlert = function() {
    $scope.showTripAlert = false;
  };
  $scope.closeDayAlert = function() {
    $scope.showDayAlert = false;
  };
  //Closes Modal (nothing is saved)
  $scope.closeModal = () => {
    $uibModalInstance.close();
  };

});