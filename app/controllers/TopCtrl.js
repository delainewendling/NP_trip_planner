"use strict";

app.controller("TopCtrl", function($scope, $window, $route){
  let currentUser = null;
  firebase.auth().onAuthStateChanged(function(user){
    if (user){
      currentUser = user.uid;
      console.log("Current user logged is?", user.uid);
      $scope.isLoggedIn = true;
      //This will manually start the digest cycle
      $route.reload();
    } else {
      currentUser = null;
      console.log("no user from event listener");
      $scope.isLoggedIn = false;
      $window.location.href = '#/';
    }
  });
});