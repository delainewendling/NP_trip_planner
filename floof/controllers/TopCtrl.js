"use strict";

app.controller("TopCtrl", function($scope, $window, $route, AuthFactory){
  let currentUser = null;
  $scope.isReady = false;

  let DATABASEREF = firebase.database().ref();
  DATABASEREF.on("value", (snapshot)=>{
    let invitations = snapshot.val().invitations;
    console.log("invitations changed", invitations)
    $scope.numberOfInvitations = '';
    if (invitations){
      console.log("you have invitations");
      $scope.numberOfInvitations = Object.keys(invitations).length;
      Object.keys(invitations).forEach((key)=>{
        let userId = AuthFactory.getUserId();
        if (invitations[key].uid === userId){
          $scope.hasInvitations = true;
          $scope.$apply();
        }
      else {
        console.log("none of the invitations are for you");
        $scope.hasInvitations = false;
        $scope.numberOfInvitations = 0;
        $scope.$apply();
      }
      })
    } else {
      console.log("no invitations");
      $scope.hasInvitations = false;
    }
    let members = snapshot.val().members;
    if (members){
      $scope.membersArr = [];
      Object.keys(members).forEach((key)=>{
        let userId = AuthFactory.getUserId();
        if (members[key].uid === userId){
          $scope.membersArr.push(members[key]);
        }
      })
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