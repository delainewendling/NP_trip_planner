'use strict';

app.controller('DeleteTripModalCtrl', function($scope, $uibModalInstance){

  $scope.close = () => {
    $uibModalInstance.close();
  };

  $scope.deleteTrip = ()=>{
    TripFactory.deleteTrip($routeParams.tripId)
    .then(()=>{
      console.log("trip deleted");
    });
  };

});