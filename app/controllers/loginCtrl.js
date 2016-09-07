"use strict";

app.controller("LoginCtrl", function($scope, AuthFactory, $window){
  $scope.account = {
    email: "",
    password: ""
  };

  $scope.register = ()=>{
    console.log("You clicked register!");
    AuthFactory.createUserWithEmail({
      email: $scope.account.email,
      password: $scope.account.password
    })
    .then((userData)=>{
      console.log("user data", userData);
      if (userData){
        $scope.loginWithEmail();
      }
    }, (error)=>{
      console.log(`Error creating user ${error}`);
    });
  };

  $scope.loginWithEmail = ()=> {
    console.log("You're logging in with an email");
    AuthFactory.loginUserWithEmail($scope.account)
    .then((data)=>{
      console.log("You logged in with your email", data);
      if (data){
        $window.location.href = '#/parks/explore'
      }
    }, (error)=>{
      console.log(`Error logging in user ${error}`);
    });
  }
});

