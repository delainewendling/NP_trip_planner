'use strict';

app.controller("AddToTripModalCtrl", function ($scope, TripFactory, $uibModalInstance){

  function getTrips (){
    TripFactory.getTrips()
    .then((tripData)=>{
      $scope.trips = tripData;
    });
  }

  getTrips();

  $scope.close = () => {
    $uibModalInstance.close();
  };

  $scope.status = {
    isopen: false
  };

  $scope.openTrips = ($event)=>{
    $event.preventDefault();
    $event.stopPropagation();
    $scope.status.isopen = !$scope.status.isopen;
  }

  $scope.toggled = function(open) {
    console.log('Dropdown is now: ', open);
  };

});