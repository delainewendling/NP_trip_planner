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
        // AuthFactory.instagramAuth()
        $window.location.href = '#/parks/explore';
      }
    }, (error)=>{
      console.log(`Error logging in user ${error}`);
    });
  };

  $scope.loginWithGoogle = ()=> {
    console.log("You're logging in with google");
    AuthFactory.loginUserWithGoogle()
    .then((data)=>{
      console.log("You logged in with google", data);
      if (data){
        // AuthFactory.instagramAuth()
        $window.location.href = '#/parks/explore';
      }
    }, (error)=>{
      console.log(`Error logging in user ${error}`);
    });
  };

   $scope.loginWithFacebook = ()=> {
    console.log("You're logging in with facebook");
    AuthFactory.loginUserWithFacebook()
    .then((data)=>{
      console.log("You logged in with facebook", data);
      if (data){
        $window.location.href = '#/parks/explore';
      }
    }, (error)=>{
      console.log(`Error logging in user ${error}`);
    });
  };

});

