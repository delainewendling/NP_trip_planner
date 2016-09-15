'use strict';

app.controller('CreateTripModalCtrl', function($scope, $uibModalInstance, AuthFactory, TripFactory, $route, startDate, endDate, isEditing, $mdDateLocale) {

  //Convert the dates passed into the controller function to MM-DD-YYYY format so that they are in a nice format for the modal view.
  $mdDateLocale.formatDate = function(date) {
    return moment(date).format('MM-DD-YYYY');
  };
  $scope.startDt = $mdDateLocale.formatDate(startDate);
  $scope.endDt = $mdDateLocale.formatDate(endDate);
  $scope.isEditing = isEditing;

  //The trip object that is saved to firebase should have an array of days so that trips can be added to specific days of the trip
  let startMilliseconds = startDate.getTime();
  let endMilliseconds = endDate.getTime();
  //There are 86400000 milliseconds in a day
  let oneDay = 86400000;

  function getNumberOfDays (){
    let difference = endMilliseconds - startMilliseconds;
    return (Math.round(difference/oneDay)+1);
  };

  //For each day of the trip I want to have a day number, corresponding date, and id. This uses the number of days and creates an array of objects with the desired properties.
  function createDayArray (){
    let days = [];
    for (let i=1; i<=getNumberOfDays(); i++){
      days.push({
        day: 'Day ' + (i),
        date: moment(startMilliseconds + (i*oneDay)).format("dddd MMMM Do YYYY"),
        startDate,
        id: i
      });
    };
    return days;
  };

  //The following are the properties on the trip object saved to firebase
  $scope.trip = {
    name: '',
    description: '',
    startDate,
    endDate,
    startMilliseconds,
    endMilliseconds,
    imgUrl: '',
    numberOfDays: getNumberOfDays(),
    days: createDayArray()
  }

  //A trip is created and added to firebase using the create button 
  $scope.create = () => {
    $scope.trip.uid = AuthFactory.getUserId();
    TripFactory.createTrip($scope.trip)
    .then(()=>{
      $scope.trip = {};
      $uibModalInstance.close();
      $route.reload();
    });
  };

  //Closes the modal
  $scope.close = () => {
    $uibModalInstance.close();
  };

  // $scope.update = (board)=>{
  //   let updatedBoard = {
  //     title: board.title,
  //     description: board.description
  //   };
  //   BoardsFactory.updateBoard(updatedBoard, board.id)
  //   .then(()=>{
  //     console.log("successful edit");
  //     $scope.board = {};
  //     $uibModalInstance.close();
  //     return BoardsFactory.getBoards();
  //   })
  //   .then((boards)=>{
  //     console.log("boards", boards);
  //     $route.reload();
  //   });
  // };

});
