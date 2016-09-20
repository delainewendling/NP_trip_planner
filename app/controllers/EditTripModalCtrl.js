'use strict';

app.controller('EditTripModalCtrl', function($scope, trip, $uibModalInstance, TripFactory, $routeParams, $route){

  let startMilliseconds,
      endMilliseconds,
      startMonthNumber,
      endMonthNumber;
  let days = [];

  $scope.trip = {
    name: trip.name,
    description: trip.description,
    startDate: new Date(trip.startDate),
    endDate: new Date(trip.endDate),
    color: trip.color
  }

  $scope.minStartDate = $scope.trip.startDate;

  $scope.updateEndDate = ()=>{
    $scope.endDat = $scope.startDate;
    $scope.minEndDate = $scope.trip.startDate;
  };

  function calculateMilliseconds(){
    startMilliseconds = $scope.trip.startDate.getTime();
    endMilliseconds = $scope.trip.endDate.getTime();
  }

  //The trip object that is saved to firebase should have an array of days so that trips can be added to specific days of the trip
  //There are 86400000 milliseconds in a day
  let oneDay = 86400000;

  function getNumberOfDays (){
    let difference = endMilliseconds - startMilliseconds;
    return (Math.round(difference/oneDay));
  }

  //For each day of the trip I want to have a day number, corresponding date, and id. This uses the number of days and creates an array of objects with the desired properties.
  function createDayArray (){
    for (let i=0; i<=getNumberOfDays(); i++){
      days.push({
        day: 'Day ' + (i+1),
        date: moment(startMilliseconds + (i*oneDay)).format("dddd MMMM Do YYYY"),
        startDate: $scope.trip.startDate,
        id: increaseByOne(i)
      });
    }
    return days;
  }

  function increaseByOne (index){
    return index+1;
  }

  $scope.close = ()=> {
    $uibModalInstance.close();
  };

  $scope.updateTripColor = (event, newColor)=>{
    $('.tripBackgroundColor').removeClass('selectedColor');
    $(event.target).addClass('selectedColor');
    $scope.trip.color = newColor;

  };

  $scope.updateTrip = ()=>{
    calculateMilliseconds();
    createDayArray();
    startMonthNumber = moment($scope.trip.startDate).format('M');
    endMonthNumber = moment($scope.trip.endDate).format('M');
    $scope.trip.startMonthId = startMonthNumber;
    $scope.trip.endMonthId = endMonthNumber;
    $scope.trip.startMilliseconds = startMilliseconds;
    $scope.trip.endMilliseconds = endMilliseconds;
    $scope.trip.days = days;
    TripFactory.updateTrip($routeParams.tripId, $scope.trip)
    .then((tripData)=>{
      $scope.close();
      $route.reload();
    });
  };

});