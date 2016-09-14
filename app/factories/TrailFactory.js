"use strict";

app.factory("TrailFactory", ($q, $http, FirebaseURL)=>{

  let getTrailInfo = ()=>{
    return $q((resolve, reject)=>{
      $http.get('../../data/test.json')
      .success((trailData)=>{
        resolve(trailData);
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
        console.log("trail data", trailData);
        resolve(trailData);
      })
      .error((error)=>{
        reject(error);
      });
    });
  };

  let getTrailsInTrip = (tripId)=>{
     return $q((resolve, reject)=>{
      $http.get(`${FirebaseURL}/trails.json?orderBy="tripId"&equalTo="${tripId}"`)
      .success((trailData)=>{
        resolve(trailData);
      })
      .error((error)=>{
        reject(error);
      });
    });
  };

  let addTrailToTrip = (trailObj)=>{
    return $q((resolve, reject)=>{
      $http.post(`${FirebaseURL}/trails.json`, JSON.stringify(trailObj))
      .success((trailData)=>{
        resolve(trailData);
      })
      .error((error)=>{
        reject(error);
      });
    });
  };



  return {getTrailInfo, addTrailToTrip, getTrailsFromWishlist, getTrailsInTrip};
});