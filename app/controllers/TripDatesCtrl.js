"use strict";

app.controller("TripDatesCtrl", function($scope, $uibModal){
  $scope.startDate = new Date();

  $scope.endDate = new Date();

  $scope.minStartDate = new Date(
    $scope.startDate.getFullYear(),
    $scope.startDate.getMonth(),
    $scope.startDate.getDate());

  $scope.updateEndDate = ()=>{
    console.log("hello");
    $scope.minEndDate = $scope.startDate;
  }

  $scope.getTripDates = ()=>{
    console.log("start date", $scope.startDate);
    console.log("end date", $scope.endDate);
    let modalInstance = $uibModal.open({
      templateUrl: 'partials/CreateTripModal.html',
      controller: 'CreateTripModalCtrl',
      resolve: {
        startDate: $scope.startDate,
        endDate: $scope.endDate,
        isEditing: false
      }
    });
  };
});