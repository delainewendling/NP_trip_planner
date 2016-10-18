"use strict";

app.controller("NavCtrl", function($scope, AuthFactory, TripFactory, $uibModal, $window, MemberFactory, $timeout){

  $scope.logout = function(){
    AuthFactory.logoutUser();
  };

  firebase.auth().onAuthStateChanged(function(user){
    if (user){
      getTrips();
      getInvitations();
      AuthFactory.getUser(AuthFactory.getUserId())
      .then((userData)=>{
        Object.keys(userData).forEach((key)=>{
          $scope.userName = userData[key].displayName;
        })
      })
    }
  });

  //We cannot grab the invitations for a user if the webpage does not recognize that a user is logged in. Therefore, we need to watch the state - isReady to make sure it is true before checking for notifications. We also want to watch the length of the notifications
  $scope.$watch('isReady', function isReadyChange(newValue, oldValue) {
    console.log("new value", newValue);
    if ($scope.isReady){
      getInvitations();
      // getTrips();
      $scope.$watch('numberOfInvitations', function numberOfInvitationsChange(newValue, oldValue) {
        console.log("new value, oldValue", newValue, oldValue)
        getInvitations();
      }, true);
    }
  }, true);


  $scope.getInvitations = ()=>{
    getInvitations();
  };

  function getInvitations (){
    let invitationsArr = [];
    console.log("get invitations is running");
    TripFactory.getInvitations()
    .then((invitations)=>{
      console.log("invitations to you", invitations);
      if(Object.keys(invitations).length){
        $scope.hasInvitations = true;
        Object.keys(invitations).forEach((key)=>{
          invitations[key].id = key;
          invitationsArr.push(invitations[key]);
        })
        $scope.invitations = invitations
      } else {
        $scope.hasInvitations = false;
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
          if (tripData){
            tripData.id = tripId;
            trips.push(tripData);
          }
        });
      });
      $scope.trips = trips;
    });
  }

  $scope.status = {
    isTripOpen: false
  };

  $scope.openCreateTripView = ()=>{
    $window.location.href = '#/parks/trips/create';
  };

});