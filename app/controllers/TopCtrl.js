"use strict";

app.controller("TopCtrl", function($scope, $window, $route, AuthFactory){
  let currentUser = null;
  $scope.isReady = false;

  var DATABASEREF = firebase.database().ref();
  DATABASEREF.on("value", (snapshot)=>{
    let invitations = snapshot.val().invitations;
    console.log("invitations from Firebase", snapshot.val().invitations);
    if (invitations){
      Object.keys(invitations).forEach((key)=>{
        let userId = AuthFactory.getUserId();
        if (invitations[key].uid === userId){
          let userInvitations = [];
          $scope.hasInvitations = true;
          userInvitations.push(invitations[key]);
          $scope.numberOfInvitations = userInvitations.length
        }
        else {
          $scope.hasInvitations = false;
        }
      })
    } else {
      $scope.hasInvitations = false;
    }
  })

  firebase.auth().onAuthStateChanged(function(user){
    if (user){
      currentUser = user.uid;
      console.log("Current user logged is?", user.uid);
      $scope.isLoggedIn = true;
      // checkRoute();
      $route.reload();
      $scope.isReady = true;
    } else {
      $scope.isReady = false;
      console.log("no user", $scope.isReady);
      currentUser = null;
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