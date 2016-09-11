"use strict";

app.controller("NavCtrl", function($scope, AuthFactory){

  $scope.logout = function(){
    AuthFactory.logoutUser()
    .then(()=>{
      console.log("user logged out");
    });
  };

});