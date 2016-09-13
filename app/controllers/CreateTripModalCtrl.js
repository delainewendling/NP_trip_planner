'use strict';

app.controller('CreateTripModalCtrl', function($scope, $uibModalInstance, AuthFactory, TripFactory, $route, startDate, endDate, isEditing, $mdDateLocale) {

  $mdDateLocale.formatDate = function(date) {
    return moment(date).format('MM-DD-YYYY');
  };

  let startMilliseconds = startDate.getTime();
  let endMilliseconds = endDate.getTime();

  $scope.startDt = $mdDateLocale.formatDate(startDate);
  $scope.endDt = $mdDateLocale.formatDate(endDate);
  $scope.isEditing = isEditing;

  $scope.trip = {
    name: '',
    description: '',
    startDate,
    endDate,
    startMilliseconds,
    endMilliseconds,
    imgUrl: ''
  }

  $scope.close = () => {
    $uibModalInstance.close();
  };

  $scope.create = () => {
    $scope.trip.uid = AuthFactory.getUserId();
    TripFactory.createTrip($scope.trip)
    .then(()=>{
      $scope.trip = {};
      $uibModalInstance.close();
      $route.reload();
    });
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
