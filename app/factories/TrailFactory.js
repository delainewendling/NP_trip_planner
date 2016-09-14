"use strict";

app.factory("TrailFactory", ($q, $http, FirebaseURL)=>{

  let getTrailInfo = ()=>{
    return $q((resolve, reject)=>{
      $http.get('../../data/test.json')
      .success((trailData)=>{
        console.log("trail data", trailData);
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
        console.log("trail data", trailData);
        resolve(trailData);
      })
      .error((error)=>{
        reject(error);
      });
    });
  }

  return {getTrailInfo, addTrailToTrip};
});