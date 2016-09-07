"use strict";

var app = angular.module("NPApp", ["ngRoute", "uiGmapgoogle-maps"])
.constant("FirebaseURL", "https://national-parks-trip-planner.firebaseio.com/")
.config(function(uiGmapGoogleMapApiProvider, ImportantKeys) {
  uiGmapGoogleMapApiProvider.configure({
      key: ImportantKeys.googleMapsKey,
      v: '3.24',
      libraries: 'weather,geometry,visualization,places'
  });
})
.config(function($routeProvider){
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

