"use strict";

app.factory("TrailFactory", ($q, $http, FirebaseURL)=>{

  let getYosemiteTrailInfo = ()=>{
    return $q((resolve, reject)=>{
      $http.get('../../data/yosemiteTraildata.json')
      .success((trailData)=>{
        resolve(trailData);
      })
      .error((error)=>{
        reject(error);
      });
    });
  };

  let getYosemiteCampgroundInfo = ()=>{
    return $q((resolve, reject)=>{
      $http.get('../../data/yosemiteCampgrounds.json')
      .success((campgroundData)=>{
        resolve(campgroundData);
      })
      .error((error)=>{
        reject(error);
      });
    });
  };

  let getGlacierTrailInfo = ()=>{
    return $q((resolve, reject)=>{
      $http.get('../../data/glacierTraildata.json')
      .success((trailData)=>{
        resolve(trailData);
      })
      .error((error)=>{
        reject(error);
      });
    });
  };

  let getGlacierCampgroundInfo = ()=>{
    return $q((resolve, reject)=>{
      $http.get('../../data/glacierCampgrounds.json')
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

  return {getYosemiteTrailInfo, getGlacierTrailInfo, getTrailsFromWishlist, getYosemiteCampgroundInfo, getGlacierCampgroundInfo};
});