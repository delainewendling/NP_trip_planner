'use strict';

app.controller('DeleteTripModalCtrl', function($scope, $uibModalInstance, TripFactory, $routeParams, $window){

  $scope.close = () => {
    $uibModalInstance.close();
  };

  $scope.deleteTrip = ()=>{
    TripFactory.deleteTrip($routeParams.tripId)
    .then(()=>{
      console.log("trip deleted");
      $scope.close();
      $window.location.href='#/parks/explore';
    });
  };

});