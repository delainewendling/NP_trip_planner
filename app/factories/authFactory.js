"use strict";

app.factory("AuthFactory", function($window, ImportantKeys){

  let getUserId = ()=>{
    return firebase.auth().currentUser.uid;
  };

  let createUserWithEmail = function(userObject){
    return firebase.auth().createUserWithEmailAndPassword(userObject.email, userObject.password)
    .catch(function(error){
      let errorMessage = error.message;
      console.log("Oops, there was an error", errorMessage);
    });
  };

  let loginUserWithEmail = function(userObject){
    // if (firebase.auth().currentUser) {
    //   let facebookCredential = firebase.auth.FacebookAuthProvider.credential(
    // response.authResponse.accessToken);
    //   var emailCredential = firebase.auth.EmailPasswordAuthProvider.credential(email, password);
    //   linkCredentials(facebookCredential, emailCredential);
    // }
    return firebase.auth().signInWithEmailAndPassword(userObject.email, userObject.password)
    .catch(function(error){
      let errorMessage = error.message;
      console.log("Oops, there was an error logging in", errorMessage);
    });
  };


  let loginUserWithGoogle = function(){
    let provider = new firebase.auth.GoogleAuthProvider();
    // if (firebase.auth().currentUser) {
    //   let facebookCredential = firebase.auth.FacebookAuthProvider.credential(
    // response.authResponse.accessToken);
    //   var emailCredential = firebase.auth.EmailPasswordAuthProvider.credential(email, password);
    //   linkCredentials(facebookCredential, emailCredential);
    // }
    return firebase.auth().signInWithPopup(provider)
    .catch(function(error){
      //If the user has already signed up with the same email address Firebase will only let one user sign-in with that
    //    if (error.code === 'auth/account-exists-with-different-credential') {
    // // The pending Google credential.
    // var pendingCred = error.credential;
    // // The provider account's email address.
    // var email = error.email;
    // // Get registered providers for this email.
    // auth.fetchProvidersForEmail(email).then(function(providers) {
    //    }
      let errorMessage = error.message;
      console.log("Oops, there was an error logging in", errorMessage);
    });
  };


  let loginUserWithFacebook = function(){
    let provider = new firebase.auth.FacebookAuthProvider();
    // if (firebase.auth().currentUser) {
    //   let facebookCredential = firebase.auth.FacebookAuthProvider.credential(
    // response.authResponse.accessToken);
    //   var emailCredential = firebase.auth.EmailPasswordAuthProvider.credential(email, password);
    //   linkCredentials(facebookCredential, emailCredential);
    // }
    return firebase.auth().signInWithPopup(provider)
    .catch(function(error){
      let errorMessage = error.message;
      console.log("Oops, there was an error logging in", errorMessage);
    });
  };

  let linkCredentials = function(credentialOne, credentialTwo){
    if (credentialOne){
      auth.currentUser.link(credentialOne).then(function(user) {
        console.log("Account linking success", user);
      }, function(error) {
        console.log("Account linking error", error);
      });
    }
    if (credentialTwo){
      auth.currentUser.link(credentialTwo).then(function(user) {
        console.log("Account linking success", user);
      }, function(error) {
        console.log("Account linking error", error);
      });
    }
  };

  // let instagramAuth = ()=> {
  //   $window.location.href = `https://api.instagram.com/oauth/authorize/?client_id=${ImportantKeys.instagramClientId}&redirect_uri=https://localhost/#/parks/explore&response_type=token`;
  // }

  let logoutUser = function(){
    return firebase.auth().signOut();
  };

  let isAuthenticated = ()=>{
    return (firebase.auth().currentUser) ? true : false;
  };

  return {createUserWithEmail, loginUserWithEmail, loginUserWithGoogle, loginUserWithFacebook, logoutUser, isAuthenticated, getUserId};
});