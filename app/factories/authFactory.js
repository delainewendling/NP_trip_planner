"use strict";

app.factory("AuthFactory", function($window, ImportantKeys, $q, $http, FirebaseURL){

  let getUserId = ()=>{
    return firebase.auth().currentUser.uid;
  };

  let getUser = ()=>{
    return $q((resolve, reject)=>{
      $http.get(`${FirebaseURL}users.json?orderBy="uid"&equalTo="${getUserId()}"`)
      .success((userData)=>{
        resolve(userData);
      })
      .error((error)=>{
        reject(error);
      });
    });
  };

  let createUserWithEmail = function(userObject){
    return firebase.auth().createUserWithEmailAndPassword(userObject.email, userObject.password)
    .catch(function(error){
      let errorMessage = error.message;
      console.log("Oops, there was an error", errorMessage);
    });
  };

  let loginUserWithEmail = function(userObject){
    return firebase.auth().signInWithEmailAndPassword(userObject.email, userObject.password)
    .catch(function(error){
      let errorMessage = error.message;
      console.log("Oops, there was an error logging in", errorMessage);
    });
  };


  let loginUserWithGoogle = function(){
    let provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider)
    .catch(function(error){
      let errorMessage = error.message;
      console.log("Oops, there was an error logging in", errorMessage);
    });
  };


  let loginUserWithFacebook = function(){
    let provider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(provider)
    .catch(function(error){
      let errorMessage = error.message;
      console.log("Oops, there was an error logging in", errorMessage);
    });
  };

  let saveUserToFirebase = function(userObj){
    return $q((resolve, reject)=>{
      $http.post(`${FirebaseURL}/users.json`, angular.toJson(userObj))
      .success((userInfo)=>{
        resolve(userInfo);
      })
      .error((error)=>{
        reject(error);
      })
    })
  };

  let getAllUsers = function(){
    return $q((resolve, reject)=>{
      $http.get(`${FirebaseURL}/users.json`)
      .success((users)=>{
        resolve(users);
      })
      .error((error)=>{
        reject(error);
      });
    });
  };

  let logoutUser = function(){
    return firebase.auth().signOut();
  };

  let isAuthenticated = ()=>{
    return (firebase.auth().currentUser) ? true : false;
  };

  return {createUserWithEmail, loginUserWithEmail, loginUserWithGoogle, loginUserWithFacebook, logoutUser, isAuthenticated, getUserId, saveUserToFirebase, getAllUsers, getUser};
});