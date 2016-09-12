"use strict";

app.controller("WishlistCtrl", function($scope, FirebaseFactory){

  $scope.showMoreInfo = -1;

  

  function showWishlistItems() {
    FirebaseFactory.getWishlistItems()
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
  }

  $scope.wishlistDelete = (itemId)=>{
    FirebaseFactory.deleteWishlistItem(itemId)
    .then(()=>{
      console.log("item deleted");
      showWishlistItems();
    });
  };

});