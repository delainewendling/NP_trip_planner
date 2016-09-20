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

  let updateTrailNote = (textPatch, trailId)=>{
    return $q((resolve, reject)=>{
      $http.patch(`${FirebaseURL}trails/${trailId}.json`, JSON.stringify(textPatch))
      .success((trailData)=>{
        resolve(trailData);
      })
      .error((error)=>{
        reject(error);
      });
    });
  };



  return {getTrailInfo, addTrailToTrip, getTrailsFromWishlist, getTrailsInTrip, updateTrailNote, getCampgroundInfo};
});