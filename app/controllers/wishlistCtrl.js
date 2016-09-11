"use strict";

app.controller("WishlistCtrl", function($scope, FirebaseFactory){

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

  $scope.wishlistDelete = (itemId)=>{
    FirebaseFactory.deleteWishlistItem(itemId)
    .then(()=>{
      console.log("item deleted");
      showWishlistItems();
    });
  };

});