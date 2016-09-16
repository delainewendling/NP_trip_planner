'use strict';

app.controller('CreateTripModalCtrl', function($scope, AuthFactory, TripFactory, $route,$window) {

  let startMilliseconds,
      endMilliseconds,
      startDate,
      endDate,
      startMonth,
      endMonth,
      startMonthNumber,
      endMonthNumber;

  $scope.startDate = new Date();

  $scope.endDate = new Date();

  $scope.minStartDate = new Date(
    $scope.startDate.getFullYear(),
    $scope.startDate.getMonth(),
    $scope.startDate.getDate());

  $scope.updateEndDate = ()=>{
    console.log("hello");
    $scope.minEndDate = $scope.startDate;
  };

  function calculateMilliseconds(){
    startMilliseconds = $scope.startDate.getTime();
    endMilliseconds = $scope.endDate.getTime();
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
    let days = [];
    for (let i=0; i<=getNumberOfDays(); i++){
      days.push({
        day: 'Day ' + (i+1),
        date: moment(startMilliseconds + (i*oneDay)).format("dddd MMMM Do YYYY"),
        startDate,
        id: increaseByOne(i)
      });
    }
    return days;
  }

  function increaseByOne (index){
    return index+1;
  }

  //The following are the properties on the trip object saved to firebase
  $scope.trip = {
      name: '',
      description: '',
      imgUrl: '',
      camping: false,
      backpacking: false,
      roadtrip: false
  };
  //A trip is created and added to firebase using the create button
  $scope.create = () => {
    startMonth = moment($scope.startDate).format('MMMM');
    endMonth = moment($scope.endDate).format('MMMM');
    startMonthNumber = moment($scope.startDate).format('M');
    endMonthNumber = moment($scope.endDate).format('M');
    console.log("start month number", startMonthNumber);
    console.log("end month number", endMonthNumber);
    startDate = $scope.startDate;
    endDate = $scope.endDate;
    calculateMilliseconds();
    $scope.trip.startDate = startDate;
    $scope.trip.endDate = endDate;
    $scope.trip.startMilliseconds = startMilliseconds;
    $scope.trip.endMilliseconds = endMilliseconds;
    $scope.trip.startMonth = startMonth;
    $scope.trip.endMonth = endMonth;
    $scope.trip.startMonthId = startMonthNumber;
    $scope.trip.endMonthId = endMonthNumber;
    $scope.trip.numberOfDays = getNumberOfDays();
    $scope.trip.days = createDayArray();
    $scope.trip.uid = AuthFactory.getUserId();
    console.log("$scope.trip", $scope.trip);
    TripFactory.createTrip($scope.trip)
    .then(()=>{
      $scope.trip = {};
      $window.location.href = '#/parks/explore';
    });
  };


});
