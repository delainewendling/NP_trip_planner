"use strict";

app.factory("Trailheads", function($q, $http, ImportantKeys){

  let getTrailheads = function(){
    return $q((resolve, reject)=>{
      $http.get("https://api.transitandtrails.org/api/v1/trailheads?key="+ImportantKeys.trailsAPI)
      .success((trailData)=>{
        console.log("trail data", trailData);
        resolve(trailData);
      })
      .error((error)=>{
        console.log("oops there was an error", error);
        reject(error);
      });
    });
  };

return {getTrailheads};
});