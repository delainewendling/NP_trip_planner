"use strict";

app.controller("trailsCtrl", function($scope, Trailheads, $firebaseArray, ImportantKeys){

  Trailheads.getTrailheads()
  .then((trailCollection)=>{
    $scope.trails = trailCollection;
  });

  // $scope.addTrail = function(){
  //   // calling $add on a synchronized array is like Array.push(),
  //   // except that it saves the changes to our database!
  //   $scope.trails.$add({
  //     name: $scope.user,
  //     park_name: $scope.message,
  //     park_agency_website:
  //   });
  // }

});