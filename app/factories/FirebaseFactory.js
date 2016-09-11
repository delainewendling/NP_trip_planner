"use strict";

app.factory("FirebaseFactory", function($q, $http, FirebaseURL){

  let getWishlistItems = ()=>{
    return $q((resolve, reject)=>{
      $http.get(`${FirebaseURL}/wishlist.json`)
      .success((wishlistData)=>{
        console.log("wishlist", wishlistData);
        resolve(wishlistData);
      })
      .error((error)=>{
        reject(error);
      })
    });
  };

  let addToWishlist = (trailObj)=>{
    return $q((resolve,reject)=>{
      $http.post(`${FirebaseURL}/wishlist.json`, JSON.stringify(trailObj))
      .success((trailData)=>{
        resolve(trailData);
      })
      .error((error)=>{
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