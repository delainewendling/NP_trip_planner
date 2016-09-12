'use strict';

app.controller('CreateTripModalCtrl', function($scope, $uibModalInstance, AuthFactory, TripFactory, $route, startDate, endDate, isEditing) {

  $scope.startDt = startDate;
  $scope.endDt = startDate;
  $scope.isEditing = isEditing;

  $scope.trip = {
    name: '',
    description: '',
    startDate: $scope.startDt,
    endDate: $scope.endDt,
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
