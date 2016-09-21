"use strict";

app.factory("TrailFactory", ($q, $http, FirebaseURL)=>{

  let getTrailInfo = ()=>{
    return $q((resolve, reject)=>{
      $http.get('../../data/trailData.json')
      .success((trailData)=>{
        resolve(trailData);
      })
      .error((error)=>{
        reject(error);
      });
    });
  };

  let getCampgroundInfo = ()=>{
    return $q((resolve, reject)=>{
      $http.get('../../data/campgrounds.json')
      .success((campgroundData)=>{
        resolve(campgroundData);
      })
      .error((error)=>{
        reject(error);
      });
    });
  };

  let getTrailsFromWishlist = (userId)=>{
     return $q((resolve, reject)=>{
      $http.get(`${FirebaseURL}/wishlist.json?orderBy="uid"&equalTo="${userId}"`)
      .success((trailData)=>{
        resolve(trailData);
      })
      .error((error)=>{
        reject(error);
      });
    });
  };

  return {getTrailInfo, getTrailsFromWishlist, getCampgroundInfo};
});