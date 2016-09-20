"use strict";

app.factory("WishlistFactory", function($q, $http, FirebaseURL, AuthFactory){

  let getWishlistItems = ()=>{
    let userId = AuthFactory.getUserId();
    return $q((resolve, reject)=>{
      $http.get(`${FirebaseURL}/wishlist.json?orderBy="uid"&equalTo="${userId}"`)
      .success((wishlistData)=>{
        console.log("wishlist", wishlistData);
        resolve(wishlistData);
      })
      .error((error)=>{
        reject(error);
      });
    });
  };

  let addToWishlist = (trailObj)=>{
    return $q((resolve,reject)=>{
      $http.post(`${FirebaseURL}wishlist.json`, angular.toJson(trailObj))
      .success((trailData)=>{
        resolve(trailData);
      })
      .error((error)=>{
        console.log(error);
        reject(error);
      });
    });
  };

  let deleteWishlistItem = (itemId)=>{
    return $q((resolve,reject)=>{
      $http.delete(`${FirebaseURL}/wishlist/${itemId}.json`)
      .success((trailData)=>{
        resolve(trailData);
      })
      .error((error)=>{
        reject(error);
      });
    });
  };

  return {addToWishlist, getWishlistItems, deleteWishlistItem};

});