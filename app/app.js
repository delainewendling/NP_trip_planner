"use strict";

var app = angular.module("NPApp", ["firebase", "ngRoute"])
.constant("FirebaseURL", "https://national-parks-trip-planner.firebaseio.com/");

app.config(function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl: 'partials/login.html',
    controller: 'LoginCtrl'
  })
  .when('/login', {
    templateUrl: 'partials/login.html',
    controller: 'LoginCtrl'
  })
  .when('/parks/explore', {
    templateUrl: 'partials/explore.html',
    controller: 'ExploreCtrl'
  })
  .when('/parks/trips', {
    templateUrl: 'partials/trips.html',
    controller: 'TripsCtrl'
  })
  .when('/parks/wishlist', {
    templateUrl: 'partials/wishlist.html',
    controller: 'WishlistCtrl'
  })
  .otherwise('/login');
});

//Initializes Firebase right away
app.run((ImportantKeys)=>{
  let creds = ImportantKeys;
  let authConfig = {
    apiKey: creds.fbKey,
    authDomain: creds.fbAuth
  };

  firebase.initializeApp(authConfig);

});

