"use strict";

app.controller("TopCtrl", function($scope, $window, $route){
  let currentUser = null;
  firebase.auth().onAuthStateChanged(function(user){
    if (user){
      currentUser = user.uid;
      console.log("Current user logged is?", user.uid);
      $scope.isLoggedIn = true;
      // checkRoute();
      $route.reload();
    } else {
      currentUser = null;
      console.log("no user from event listener");
      $scope.isLoggedIn = false;
      $window.location.href = '#/';
    }
  });
  checkRoute();

  //Make sure the appropriate navbar element is highlighted based on view
  function checkRoute (){
    $scope.explore = false;
    $scope.wishlist = false;
    $scope.plan = false;

    if ($window.location.href == '#/parks/explore'){
      console.log("explore!");
      $scope.explore = true;
      $scope.wishlist = false;
      $scope.plan = false;
      $scope.trips = false;
    }

    if ($window.location.href == '#/parks/wishlist'){
      console.log("wishlist!");
      $scope.wishlist= true;
      $scope.trips = false;
      $scope.explore =false;
      $scope.plan = false;
    }

    if ($window.location.href == '#/parks/trips/create'){
      console.log("plan a trip!");
      $scope.plan= true;
      $scope.explore = false;
      $scope.wishlist = false;
      $scope.trips = false;
    }
  }

});