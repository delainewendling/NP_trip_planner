"use strict";

var app = angular.module("NPApp", ["ngRoute", "uiGmapgoogle-maps", 'ngMaterial', 'ngMessages', 'ui.bootstrap', 'ngAnimate', 'ngSanitize', 'dndLists'])
.constant("FirebaseURL", "https://national-parks-trip-planner.firebaseio.com/")
.config(function(uiGmapGoogleMapApiProvider, ImportantKeys) {
  uiGmapGoogleMapApiProvider.configure({
      key: ImportantKeys.googleMapsKey,
      v: '3.24',
      libraries: 'weather,geometry,visualization,places'
  });
});

//Allows me to focus on an input after a button is clicked
app.directive('focusMe', function($timeout) {
  return {
    scope: { trigger: '=focusMe' },
    link: function(scope, element) {
      scope.$watch('trigger', function(value) {
        if(value === true) {
          element[0].focus();
          scope.trigger = false;
        }
      });
    }
  };
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
    templateUrl: 'partials/LandingPage.html',
    controller: 'LandingPageCtrl'
  })
  .when('/login', {
    templateUrl: 'partials/Login.html',
    controller: 'LoginCtrl'
  })
  .when('/parks/explore', {
    templateUrl: 'partials/Explore.html',
    controller: 'ExploreCtrl',
    resolve: {isAuth}
  })
  .when('/parks/explore/yosemite', {
    templateUrl: 'partials/Yosemite.html',
    controller: 'YosemiteCtrl',
    resolve: {isAuth}
  })
  .when('/parks/explore/glacier', {
    templateUrl: 'partials/Glacier.html',
    controller: 'GlacierCtrl',
    resolve: {isAuth}
  })
  .when('/parks/trips/create', {
    templateUrl: 'partials/CreateTripView.html',
    controller: 'CreateTripViewCtrl',
    resolve: {isAuth}
  })
  .when('/parks/trip/:tripId', {
    templateUrl: 'partials/SingleTrip.html',
    controller: 'SingleTripCtrl',
    resolve: {isAuth}
  })
  .when('/parks/wishlist', {
    templateUrl: 'partials/Wishlist.html',
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
    apiKey: creds.apiKey,
    authDomain: creds.authDomain,
    databaseURL: creds.databaseURL
  }
  firebase.initializeApp(creds);

});

