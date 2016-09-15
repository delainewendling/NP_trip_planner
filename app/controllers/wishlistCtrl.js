"use strict";

app.controller("WishlistCtrl", function($scope, WishlistFactory, $uibModal, $mdDialog){

  $scope.showMoreInfo = -1;

  function showWishlistItems() {
    WishlistFactory.getWishlistItems()
    .then((wishlist)=>{
      $scope.wishlistItems = [];
      Object.keys(wishlist).forEach((key)=>{
        wishlist[key].fbId = key;
        $scope.wishlistItems.push(wishlist[key]);
      });
      console.log("we got the wishlist", $scope.wishlistItems);
    });
  }

  showWishlistItems();

  $scope.viewItem = (itemId)=>{
    console.log("itemId", itemId);
    $scope.showMoreInfo = itemId;
  };

  $scope.wishlistDelete = (itemId)=>{
    WishlistFactory.deleteWishlistItem(itemId)
    .then(()=>{
      console.log("item deleted");
      showWishlistItems();
    });
  };

  $scope.addToTrip = (trailObj)=>{
    console.log("trail obj", trailObj);
    let modalInstance = $uibModal.open({
      templateUrl: 'partials/AddToTripModal.html',
      controller: 'AddToTripModalCtrl',
      resolve:{
        trailObj
      }
    });
  };

});