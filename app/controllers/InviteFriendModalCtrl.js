'user strict';

app.controller('InviteFriendModalCtrl', function($scope, AuthFactory, TripFactory, $uibModalInstance, $routeParams, trip, members){

  $scope.addedFriends = [];
  $scope.searchMode = false;
  $scope.friendsAdded = false;

  $scope.checkSearchText = ()=>{
    //Friends should only show up once someone starts typing
    if ($scope.searchText){
      $scope.searchMode = true;
    } else {
      $scope.searchMode = false;
    }
  };

  function getAllUsers (){
    $scope.users=[];
    $scope.alreadyMembers = [];
    AuthFactory.getAllUsers()
    .then((userData)=>{
      let userId = AuthFactory.getUserId();
      Object.keys(userData).forEach((key)=>{
        if (userId !== userData[key].uid){
          $scope.users.push(userData[key]);
        }
      });
      members.forEach((member)=>{
        $scope.users.forEach((user, index)=>{
          if(member.uid === user.uid){
            $scope.alreadyMembers.push(user);
            $scope.users.splice(index, 1);
          }
        });
      });
    });
  }
  getAllUsers();


  $scope.addFriend = (event, friend, index)=>{
    //Show the addedFriends view
    $scope.friendsAdded = true;
    //Get rid of the user in the users array
    $scope.users.splice(index, 1);
    //Remove the element from the modal view
    $(event.currentTarget).closest('.userEmail').remove();
    $(event.currentTarget).remove();
    //Clear the input text and focus on it to search for more friends
    $('#searchUsers').val('').focus();
    //Add the added friends to the added friends array
    $scope.addedFriends.push(friend);
  };

  $scope.removeFriend = (event, friend, index)=>{
    //Remove from the addedFriends array
    $scope.addedFriends.splice(index, 1);
    //If there are no more added friends then the added friends view should go away. If there are remaining friends it should stay there
    if ($scope.addedFriends.length === 0) {
      $scope.friendsAdded = false;
    }
    // Remove from the modal view.
    $(event.currentTarget).closest('.friendEmail').remove();
    $(event.currentTarget).remove();
  };

  $scope.sendInvitation = ()=>{
    $scope.addedFriends.forEach((friend)=>{
      let name = '';
      AuthFactory.getUser(AuthFactory.getUserId())
      .then((userData)=>{
        Object.keys(userData).forEach((key)=>{
          name = userData[key].displayName;
        });
        let invitation = {
          uid: friend.uid,
          tripId: $routeParams.tripId,
          tripName: trip.name,
          email: friend.email,
          from: name
        }
        return TripFactory.createInvitation(invitation)
      })
      .then((data)=>{
        console.log("invitation created");
      });
    });
    $scope.close();
  };


  $scope.close = () => {
    $uibModalInstance.close();
  };
});