"use strict";

app.factory("TripFactory", ($q, $http, FirebaseURL)=>{

  let createTrip = (tripObj)=>{
    return $q((resolve, reject)=>{
      $http.post(`${FirebaseURL}/trips.json`, JSON.stringify(tripObj))
      .success((tripData)=>{
        resolve(tripData);
      })
      .error((error)=>{
        reject(error);
      });
    });
  };

  let getTrips = ()=>{
    let trips = [];
    return $q((resolve, reject)=>{
      $http.get(`${FirebaseURL}/trips.json`)
      .success((tripData)=>{
        Object.keys(tripData).forEach((key)=>{
          tripData[key].id = key;
          trips.push(tripData[key]);
        });
        resolve(tripData);
      })
      .error((error)=>{
        reject(error);
      });
    });
  };

  let getSingleTrip = (tripId)=>{
    return $q((resolve, reject)=>{
      $http.get(`${FirebaseURL}/trips/${tripId}.json`)
      .success((tripData)=>{
        resolve(tripData);
      })
      .error((error)=>{
        reject(error);
      });
    });
  };

  let deleteTrip = (tripId)=>{
    return $q((resolve, reject)=>{
      $http.delete(`${FirebaseURL}/trips/${tripId}.json`)
      .success((tripData)=>{
        resolve(tripData);
      })
      .error((error)=>{
        reject(error);
      });
    });
  };

  return {createTrip, getTrips, deleteTrip, getSingleTrip};
});