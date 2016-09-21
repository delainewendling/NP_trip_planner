'use strict';

app.factory("MemberFactory", ($q, $http, FirebaseURL)=>{

  let addMember = (memberObj)=>{
    return $q((resolve, reject)=>{
      $http.post(`${FirebaseURL}members.json`, angular.toJson(memberObj))
      .success((data)=>{
        resolve(data);
      })
      .error((error)=>{
        reject(error);
      });
    });
  };

  let getMembers = (userId)=>{
    return $q((resolve, reject)=>{
      $http.get(`${FirebaseURL}members.json?orderBy="uid"&equalTo="${userId}"`)
      .success((memberData)=>{
        resolve(memberData);
      })
      .error((error)=>{
        reject(error);
        console.log("error", error);
      });
    });
  };

  return {addMember, getMembers};
});