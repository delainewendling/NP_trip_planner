"use strict";

app.controller("NavCtrl", function($scope, AuthFactory, TripFactory, $uibModal, $window){

  $scope.logout = function(){
    AuthFactory.logoutUser()
    .then(()=>{
      console.log("user logged out");
    });
  };

  firebase.auth().onAuthStateChanged(function(user){
    if (user){
      getTrips();
    }
  });

  $scope.getTrips = ()=>{
    getTrips();
  };

  function getTrips (){
    let trips = [];
    TripFactory.getTrips()
    .then((tripData)=>{
      Object.keys(tripData).forEach((key)=>{
        tripData[key].id = key;
        trips.push(tripData[key]);
      });
      $scope.trips = trips;
    });
  }


  $scope.status = {
    isTripOpen: false
  };

  $scope.toggled = function(open) {
    console.log('Dropdown is now: ', open);
  };

  $scope.toggleDropdown = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.status.isopen = !$scope.status.isopen;
  };

  $scope.openCreateTripView = ()=>{
    // let modalInstance = $uibModal.open({
    //   templateUrl: 'partials/CreateTripModal.html',
    //   controller: 'CreateTripModalCtrl'
    // });
    $window.location.href = '#/parks/trips/create';
  }

});