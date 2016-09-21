"use strict";

app.controller("NavCtrl", function($scope, AuthFactory, TripFactory, $uibModal, $window, MemberFactory){

  $scope.logout = function(){
    AuthFactory.logoutUser();
  };

  firebase.auth().onAuthStateChanged(function(user){
    if (user){
      getTrips();
    }
  });

  $scope.invitations = [];
  var invitationsFromFirebase = {};

  console.log("repository of invitations", $scope.invitations);

  //We cannot grab the invitations for a user if the webpage does not recognize that a user is logged in. Therefore, we need to watch the state - isReady to make sure it is true before checking for notifications. We also want to watch the length of the notifications
  $scope.$watch('isReady', function isReadyChange(newValue, oldValue) {
    console.log("new value", newValue);
    if ($scope.isReady){
      getInvitations();
      $scope.$watch('numberOfInvitations', function isReadyChange(newValue, oldValue) {
        if (newValue !== 0){
          getInvitations();
        }
      }, true);
    }
  }, true);

  $scope.getInvitations = ()=>{
    getInvitations();
  };

  function getInvitations (){
    let invitationsArr = [];
    TripFactory.getInvitations()
    .then((invitations)=>{
      if(invitations){
        Object.keys(invitations).forEach((key)=>{
          invitations[key].id = key;
          invitationsArr.push(invitations[key]);
        })
        $scope.invitations = invitations
      }
    });
  }

  $scope.acceptOrDecline = (invitation)=>{
    let modalInstance = $uibModal.open({
      templateUrl: 'partials/RespondToInviteModal.html',
      controller: 'RespondToInviteModalCtrl',
      resolve: {
        invitation
      }
    });
  }

  $scope.getTrips = ()=>{
    getTrips();
  };

  function getTrips (){
    let trips = [];
    MemberFactory.getMembers(AuthFactory.getUserId())
    .then((memberData)=>{
      Object.keys(memberData).forEach((key)=>{
        let tripId = memberData[key].tripId
        TripFactory.getSingleTrip(tripId)
        .then((tripData)=>{
          tripData.id = tripId;
          trips.push(tripData);
        });
      });
      $scope.trips = trips;
    });
  }

  $scope.status = {
    isTripOpen: false
  };

  $scope.toggleDropdown = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.status.isopen = !$scope.status.isopen;
  };

  $scope.openCreateTripView = ()=>{
    $window.location.href = '#/parks/trips/create';
  };

});