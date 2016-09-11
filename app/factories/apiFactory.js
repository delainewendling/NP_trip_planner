"use strict";

app.factory("ApiFactory", function($q, $http, ImportantKeys){

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

  let getActivities = function(park, activity, radius){
    return $q((resolve, reject)=>{
      $http.get("https://trailapi-trailapi.p.mashape.com/?lat=37.73&lon=-119.6&q[activities_activity_name_cont]="+park+"&q[activities_activity_type_name_eq]="+activity+"&q[country_cont]=United+States&q[state_cont]="+"state"+"&radius="+radius+"&mashape-key="+ImportantKeys.trailsAPI)
      .success((data)=>{
        resolve(data);
        console.log("all the info", data);
      })
      .error((error)=>{
        reject(error);
        console.log("error", error);
      });
    });
  };

return {getTrailheads, getActivities};
});