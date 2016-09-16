'use strict';

app.controller('PackingModalCtrl', function($scope, $uibModalInstance, TripFactory, trip) {
  $scope.close = () => {
    $uibModalInstance.close();
  };
  console.log("trip", trip);
  $scope.all = [];
  $scope.camping = [];
  $scope.backpacking = [];
  $scope.roadtrip = [];

  getPackingList("all");
  getTypes();

  function getTypes(){
    //If a user does not check camping and hiking as a type but selects backpacking, they should get the camping packing list.
    if (trip.camping || trip.backpacking && !trip.camping){
      getPackingList("camping");
    }
    if (trip.backpacking){
      getPackingList("backpacking");
    }
    if (trip.roadtrip){
      getPackingList("roadtrip");
    }
  }

  function getPackingList (type){
    TripFactory.getPackingList(type)
    .then((packingList)=>{
      Object.keys(packingList).forEach((key)=>{
        $scope[type].push(packingList[key].topack)
      });
      console.log(`packingList for ${type}`, $scope[type]);
    });
  }

});