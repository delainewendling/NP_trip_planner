'use strict';

app.controller("RespondToInviteModalCtrl", function($scope, invitation, MemberFactory, $uibModalInstance, TripFactory){

  $scope.invitation = invitation;

  $scope.close = ()=> {
    $uibModalInstance.close();
  };

  $scope.accept = ()=>{
    console.log("invitation", $scope.invitation);
    let memberObj = {
      role: 'member',
      uid: invitation.uid,
      tripId: invitation.tripId,
      email: invitation.email
    }
    MemberFactory.addMember(memberObj)
    .then((data)=>{
      console.log("data", data);
    })
    TripFactory.deleteInvitation($scope.invitation.id);
    $scope.close();
  }

  $scope.decline = ()=>{
    console.log("invitation", $scope.invitation);
    TripFactory.deleteInvitation($scope.invitation.id);
    $scope.close();
  }

});