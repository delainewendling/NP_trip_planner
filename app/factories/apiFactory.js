"use strict";

app.factory("Trailheads", function($q, $http, ImportantKeys){

  let getTrailheads = function(){
    let trails = [];
    return $q((resolve, reject)=>{
      $http.get("https://api.transitandtrails.org/api/v1/trailheads?key="+ImportantKeys.trailsAPI)
      .success((trailData)=>{
        resolve(trailData);
      })
      .error((error)=>{
        reject(error);
      });
    });
  };

return {getTrailheads};
});