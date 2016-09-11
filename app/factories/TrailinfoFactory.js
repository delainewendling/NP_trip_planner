"use strict";

app.factory("TrailinfoFactory", ($q, $http)=>{

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

  return {getTrailInfo};
});