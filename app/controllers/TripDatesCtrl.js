"use strict";

app.controller("TripDatesCtrl", function($scope, $uibModal){
  $scope.startDate = new Date();

  $scope.endDate = null;

  $scope.minStartDate = new Date(
    $scope.startDate.getFullYear(),
    $scope.startDate.getMonth(),
    $scope.startDate.getDate());

  $scope.updateEndDate = ()=>{
    console.log("hello");
    $scope.minEndDate = $scope.startDate;
  };

  $scope.getTripDates = ()=>{
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