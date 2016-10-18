'use strict';

app.factory('ActivityFactory', ($q, $http, FirebaseURL)=>{

// Sort the activities by index as they come back from Firebase
  let getActivities = (tripId)=>{
    let activities = [];
    return $q((resolve, reject)=>{
      $http.get(`${FirebaseURL}activities.json?orderBy="tripId"&equalTo="${tripId}"`)
      .success((activityData)=>{
        Object.keys(activityData).forEach((key)=>{
          activityData[key].id = key;
          activities.push(activityData[key]);
        })
        activities.sort(function (a, b) {
          return a.index - b.index;
        });
        resolve(activities);
      })
      .error((error)=>{
        reject(error);
      });
    });
  };

  let updateActivity = (patchedObj, activityId)=>{
    return $q((resolve, reject)=>{
      $http.patch(`${FirebaseURL}activities/${activityId}.json`, angular.toJson(patchedObj))
      .success((noteData)=>{
        resolve(noteData);
      })
      .error((error)=>{
        reject(error);
      });
    });
  }

  let addActivity = (activityObj)=>{
    return $q((resolve, reject)=>{
      $http.post(`${FirebaseURL}activities.json`, JSON.stringify(activityObj))
      .success((activityData)=>{
        resolve(activityData);
      })
      .error((error)=>{
        reject(error);
      });
    });
  };

  let deleteActivityFromTrip = (activityId)=>{
    return $q((resolve, reject)=>{
      $http.delete(`${FirebaseURL}activities/${activityId}.json`)
      .success((deleted)=>{
        resolve(deleted);
      })
      .error((error)=>{
        reject(error);
      });
    });
  };

  let updateAllActivitiesInView = (activities)=>{
    if (!activities) {return;}
    // Update the index of all pins on the board
    return $q.all(
      activities.map((activity) => {
        return updateActivity(activity, activity.id);
      })
    );
  };

  return {getActivities, addActivity, updateActivity, deleteActivityFromTrip, updateAllActivitiesInView};
});