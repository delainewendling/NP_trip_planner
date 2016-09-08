"use strict";

app.controller("NavCtrl", function($scope, AuthFactory, $window){

  $scope.logout = function(){
    AuthFactory.logoutUser()
    .then(()=>{
      $window.location.href = '/';
    });
  };

});