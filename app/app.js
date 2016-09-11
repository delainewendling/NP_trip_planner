"use strict";

var app = angular.module("NPApp", ["ngRoute", "uiGmapgoogle-maps"])
.constant("FirebaseURL", "https://national-parks-trip-planner.firebaseio.com/")
.config(function(uiGmapGoogleMapApiProvider, ImportantKeys) {
  uiGmapGoogleMapApiProvider.configure({
      key: ImportantKeys.googleMapsKey,
      v: '3.24',
      libraries: 'weather,geometry,visualization,places'
  });
});
let isAuth = (AuthFactory, $window)=> new Promise((resolve, reject)=>{
    //This will be a boolean and it will resolve if its true, meaning you can access the URLs below
    if(AuthFactory.isAuthenticated()){
      console.log("user");
      resolve();
    } else {
      console.log("no user");
      // $window.location.href="#/"
      reject();
    }
});
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
    controller: 'ExploreCtrl',
    resolve: {isAuth}
  })
  .when('/parks/trips', {
    templateUrl: 'partials/trips.html',
    controller: 'TripsCtrl',
    resolve: {isAuth}
  })
  .when('/parks/wishlist', {
    templateUrl: 'partials/wishlist.html',
    controller: 'WishlistCtrl',
    resolve: {isAuth}
  })
  .otherwise('/');
});

//Initializes Firebase right away
app.run((ImportantKeys)=>{
  console.log("firebase running");
  let creds = ImportantKeys;
  let authConfig = {
    apiKey: creds.fbKey,
    authDomain: creds.fbAuth
  };

  firebase.initializeApp(authConfig);

});

