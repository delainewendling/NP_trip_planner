"use strict";

app.factory("TripFactory", ($q, $http, FirebaseURL, AuthFactory, ActivityFactory, TrailFactory)=>{

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

  let addTripToUser = (userId, tripObj)=>{
    return $q((resolve, reject)=>{
      $http.patch(`${FirebaseURL}users/${userId}/trips.json`, JSON.stringify(tripObj))
      .success((tripData)=>{
        resolve(tripData);
      })
      .error((error)=>{
        reject(error);
      });
    });
  }

  let getSingleTrip = (tripId)=>{
    return $q((resolve, reject)=>{
      $http.get(`${FirebaseURL}trips/${tripId}.json`)
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
      $http.delete(`${FirebaseURL}trips/${tripId}.json`)
      .success((tripData)=>{
        resolve(tripData);
      })
      .error((error)=>{
        reject(error);
      });
    });
  };

  let updateTrip = (tripId, patchedTrip)=>{
    return $q((resolve, reject)=>{
      $http.patch(`${FirebaseURL}trips/${tripId}.json`, JSON.stringify(patchedTrip))
      .success((tripData)=>{
        resolve(tripData);
      })
      .error((error)=>{
        reject(error);
      });
    });
  };

  let deleteTrailFromTrip = (trailId)=>{
    return $q((resolve, reject)=>{
      $http.delete(`${FirebaseURL}trails/${trailId}.json`)
      .success((trailData)=>{
        resolve(trailData);
      })
      .error((error)=>{
        reject(error);
      });
    });
  };

  let getAverageTemp = (monthId)=>{
    return $q((resolve, reject)=>{
      $http.get(`${FirebaseURL}temperature.json?orderBy="monthId"&equalTo="${monthId}"`)
      .success((tempData)=>{
        resolve(tempData);
      })
      .error((error)=>{
        reject(error);
      });
    });
  };

  let getPackingList = (type)=>{
    return $q((resolve, reject)=>{
      $http.get(`${FirebaseURL}packingseason.json?orderBy="type"&equalTo="${type}"`)
      .success((packingData)=>{
        resolve(packingData);
      })
      .error((error)=>{
        reject(error);
      });
    });
  };

  let getUserPackingList = (tripId)=>{
    return $q((resolve, reject)=>{
      $http.get(`${FirebaseURL}packinglist.json?orderBy="tripId"&equalTo="${tripId}"`)
      .success((packingData)=>{
        resolve(packingData);
      })
      .error((error)=>{
        reject(error);
      });
    });
  };

  let addItemToPackingList = (packingItemObj)=>{
    return $q((resolve, reject)=>{
      $http.post(`${FirebaseURL}packinglist.json`, JSON.stringify(packingItemObj))
      .success((packingData)=>{
        resolve(packingData);
      })
      .error((error)=>{
        reject(error);
      });
    });
  };

  let deleteItemFromList = (listId)=>{
    return $q((resolve, reject)=>{
      $http.delete(`${FirebaseURL}packinglist/${listId}.json`)
      .success((packingData)=>{
        resolve(packingData);
      })
      .error((error)=>{
        reject(error);
      });
    });
  };

  let updatePackingItem = (packingObj, itemId)=>{
    return $q((resolve, reject)=>{
      $http.patch(`${FirebaseURL}packinglist/${itemId}.json`, JSON.stringify(packingObj))
      .success((packingData)=>{
        resolve(packingData);
      })
      .error((error)=>{
        reject(error);
      });
    });
  };

  let createInvitation = (invitation)=>{
    return $q((resolve, reject)=>{
      $http.post(`${FirebaseURL}/invitations.json`, angular.toJson(invitation))
      .success((invite)=>{
        resolve(invite);
      })
      .error((error)=>{
        reject(error);
      });
    });
  };

  let getInvitations = ()=>{
    return $q((resolve, reject)=>{
      $http.get(`${FirebaseURL}invitations.json?orderBy="uid"&equalTo="${AuthFactory.getUserId()}"`)
      .success((invitations)=>{
        resolve(invitations);
      })
      .error((error)=>{
        reject(error);
      });
    });
  };

  let deleteInvitation = (invitationId)=>{
    return $q((resolve, reject)=>{
      $http.delete(`${FirebaseURL}invitations/${invitationId}.json`)
      .success((invitationDelete)=>{
        resolve(invitationDelete);
      })
      .error((error)=>{
        reject(error);
      });
    });
  };

  return {createTrip, deleteTrip, getSingleTrip, deleteTrailFromTrip, updateTrip, getAverageTemp, getPackingList, addItemToPackingList, getUserPackingList, deleteItemFromList, updatePackingItem, createInvitation, getInvitations, deleteInvitation, addTripToUser};
});