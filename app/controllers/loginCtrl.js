"use strict";

app.controller("LoginCtrl", function($scope, AuthFactory, $window){

  $scope.account = {
    email: "",
    password: "",
    username: ''
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
      let userObj = {
        email: userData.email,
        uid: userData.uid,
        username: userData.username
      }
      AuthFactory.saveUserToFirebase(userObj)
      .then(()=>{
        console.log("successfully saved user!");
      })
    }, (error)=>{
      console.log(`Error creating user ${error}`);
    });
  };

  $scope.loginWithEmail = ()=> {
    console.log("You're logging in with an email");
    AuthFactory.loginUserWithEmail($scope.account)
    .then((data)=>{
      console.log("You logged in with your email", data);
      let currentUserId = data.uid;
      checkWithCurrentUsers(data, currentUserId);
      if (data){
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
      let currentUserId = data.user.uid;
      checkWithCurrentUsers(data.user, currentUserId);
      if (data){
        // AuthFactory.instagramAuth()
        $window.location.href = '#/parks/explore';
      }
    }, (error)=>{
      console.log(`Error logging in user ${error}`);
    });
  };

  function checkWithCurrentUsers(userData, currentUserId){
    let count = 0;
    AuthFactory.getAllUsers()
    .then((users)=>{
      console.log("here's the user data", userData);
      Object.keys(users).forEach((key)=>{
        if (currentUserId === users[key].uid) {
          console.log("this user has already been saved");
          count ++;
        }
      });
      if (count === 0){
        let userObj = {
          email: userData.email,
          uid: userData.uid,
          displayName: userData.displayName,
          photoUrl: userData.photoUrl
        }
        AuthFactory.saveUserToFirebase(userObj);
      }
    });
  }

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

