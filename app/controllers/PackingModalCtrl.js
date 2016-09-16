'use strict';

app.controller('PackingModalCtrl', function($scope, $uibModalInstance, TripFactory, trip, AuthFactory, $routeParams) {
  $scope.close = () => {
    $uibModalInstance.close();
  };

  $scope.isAdding = false;
  $scope.blurInput = (event)=>{
    if (event.charCode == 13) {
      let target = event.target;
      target.blur();
    }
  };
  $scope.showInput = ()=>{
    $scope.isAdding = true;
  };
  $scope.addItem = (content)=>{
    console.log("content", content);
    let newItem = {
      tripId: $routeParams.tripId,
      item: content,
      packed: false
    };
    $scope.items.push(newItem);
    $scope.isAdding = false;
    $scope.item.text = '';
    TripFactory.addItemToPackingList(newItem);
  };
  doesUserHavePackingList();

  function doesUserHavePackingList (){
    TripFactory.getUserPackingList($routeParams.tripId)
    .then((packingData)=>{
      if(Object.keys(packingData).length>0) {
        $scope.items = [];
        console.log("there is already packing data");
        Object.keys(packingData).forEach((key)=>{
          packingData[key].id = key;
          $scope.items.push(packingData[key]);
        });
        console.log("items", $scope.items);
      } else {
        //If the user doesn't have a packing list then one needs to be created.
        console.log("there is no packing data");
        initializePackingList();
      }
    });
  }

  $scope.deleteItemFromList = (listId, index)=>{
    TripFactory.deleteItemFromList(listId);
    $scope.items.splice(index, 1);
  };

  $scope.updatePacked = (packedValue, itemId)=>{
    let packedObj = {packed: packedValue};
    TripFactory.updatePackingItem(packedObj, itemId);
  };

  //The following commands should only happen the first time the Modal is opened. What this function does is it grabs the relevant packing list information for that particular trip type and posts each item to Firebase with the tripId and a property of packed as false. This creates a copy of the item so that the user can delete the item, check off the item as complete, and add items.
  function initializePackingList () {
    //There is a packing list for all trip types so this should be called regardless of the trip type. No packing list has a duplicate with another packing list
    getPackingList("all");
    getTypes();

    function getTypes(){
      //If a user does not check camping and hiking as a type but selects backpacking, they should still get the camping packing list because it contains tent, etc.
      if (trip.camping || trip.backpacking && !trip.camping){
        //The camping list is a packing list that corresponds to ONLY camping
        getPackingList("camping");
      }
      if (trip.backpacking){
        //The backpacking list is a packing list that corresponds to ONLY backpacking
        getPackingList("backpacking");
      }
      if (trip.roadtrip){
        //The roadtrip list is a packing list that corresponds to ONLY roadtrips
        getPackingList("roadtrip");
      }
    }

    function getPackingList (type){
      TripFactory.getPackingList(type)
      .then((packingList)=>{
        Object.keys(packingList).forEach((key)=>{
          //Digging into the object to grab just the items. Then loop through that array and post that item, with some added properties to Firebase.
          packingList[key].topack.forEach((item)=>{
            item.tripId = $routeParams.tripId;
            item.packed = false;
            TripFactory.addItemToPackingList(item)
            .then((key)=>{
              console.log("key?", key);
            });
          });
        });
        doesUserHavePackingList();
      });
    }
  }

});