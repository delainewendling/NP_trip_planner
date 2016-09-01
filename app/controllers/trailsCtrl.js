"use strict";

app.controller("trailsCtrl", function($scope, Trailheads){

  Trailheads.getTrailheads()
  .then((trailCollection)=>{
    $scope.trails = trailCollection;
  });

});