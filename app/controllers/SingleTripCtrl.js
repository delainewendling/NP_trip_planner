"use strict";

app.controller('SingleTripCtrl', function($scope, $routeParams, TripFactory, TrailFactory, $route, ActivityFactory, $uibModal, MemberFactory, $q, AuthFactory){

  MemberFactory.getMembersOfTrip($routeParams.tripId)
  .then((memberData)=>{
  $scope.members = [];
    console.log("memberData", memberData);
      return $q.all(
        Object.keys(memberData).map((key)=>{
          return AuthFactory.getUser(memberData[key].uid)
      }))
      .then((memberData)=>{
        console.log("memberData", memberData);
        memberData.forEach((member)=>{
          Object.keys(member).forEach((key)=>{
            console.log(member[key]);
            $scope.members.push(member[key])
          });
        });
        console.log("member names", $scope.members)
      })
  });

  getActivitiesForTrip();
  function getActivitiesForTrip (){
    console.log("running?");
    ActivityFactory.getActivities($routeParams.tripId)
    .then((activityData)=>{
      console.log("activityData", activityData);
      $scope.activities = activityData;
      $scope.$watch('activities', function handleActivityIndexChange(newValue, oldValue) {
        ActivityFactory.updateAllActivitiesInView($scope.activities);
      }, true);
      $scope.$watch('activities.dayId', function handleActivityIndexChange(newValue, oldValue) {
        console.log('newValue', newValue);
        // ActivityFactory.updateAllActivitiesInView($scope.activities);
      }, true);
    });
  }

  $scope.checkDayId = function(day) {
    console.log('day id is:', day.id);
  };


 $scope.addNote = (dayId)=>{
    //Need to create a noteObj to add to Firebase. Even though there is no text in this note the note instance needs to be added so that the user is updating the note when pressing enter rather than creating a whole new note everytime the enter key is pressed.
    var noteObj = {
      text: '',
      dayId,
      tripId: $routeParams.tripId,
      type: 'note'
    };
    //A new note needs to be added to $scope.notes so that the user sees a card show up on the screen. This instance of the note will be replaced with the note in firebase when the user navigates away from this page.
    //The note is added to firebase
    ActivityFactory.addActivity(noteObj)
    .then((note)=>{
      console.log("added note!", note.name);
        let newNote = noteObj;
        newNote.id = note.name;
        $scope.activities.push(newNote);
    });
  };

  TripFactory.getSingleTrip($routeParams.tripId)
  .then((tripData)=>{
    $scope.trip = tripData;
  });

    //Modal Views for invite and user advice
    $scope.openInviteModal = ()=>{
      let modalInstance = $uibModal.open({
        templateUrl: 'partials/InviteFriendModal.html',
        controller: 'InviteFriendModalCtrl',
        resolve: {
          trip: function() {
            return $scope.trip
          },
          members: function (){
            return $scope.members
          }
        }
      });
    };

    $scope.openTempModal = ()=>{
      let modalInstance = $uibModal.open({
      templateUrl: 'partials/AverageTempModal.html',
      controller: 'AverageTempModalCtrl',
      resolve: {
        trip: $scope.trip
      }
      });
    };

    $scope.openPackingModal = ()=>{
      let modalInstance = $uibModal.open({
      templateUrl: 'partials/PackingModal.html',
      controller: 'PackingModalCtrl',
      resolve: {
        trip: $scope.trip
      }
      });
    };

    $scope.openEditTripModal = ()=>{
      let modalInstance = $uibModal.open({
      templateUrl: 'partials/EditTripModal.html',
      controller: 'EditTripModalCtrl',
      resolve: {
        trip: $scope.trip
      }
      });
    };

    //Opens a modal to make sure the user really wants to delete the trip
    $scope.openDeleteModal = ()=>{
      let modalInstance = $uibModal.open({
      templateUrl: 'partials/DeleteTrip.html',
      controller: 'DeleteTripModalCtrl'
      });
    };

    $scope.deleteActivityFromTrip = (activityId)=>{
      ActivityFactory.deleteActivityFromTrip(activityId)
      .then(()=>{
        console.log("successfully deleted");
        //For now, the only way I know how to get rid of the deleted item is to reload the page. Not ideal - want to fix later.
        $route.reload();
      });
    };

    $scope.updateTrailNote = (event, trailId, text)=>{
      let textPatch = { notes: text };
      ActivityFactory.updateActivity(textPatch, trailId)
      .then(()=>{
        console.log("patched!", textPatch);
      });
    };

    $scope.updateNote = (event, noteId, text)=>{
      let textPatch = { text };
      ActivityFactory.updateActivity(textPatch, noteId)
      .then(()=>{
        console.log(textPatch);
      })
    };

    $scope.enterNote = (event, noteId, text)=>{
      let textPatch = { text };
      if (event.charCode == 13) {
        $scope.blurInput(event);
        ActivityFactory.updateActivity(textPatch, noteId)
        .then(()=>{
          console.log(textPatch);
        })
      }
    }

    //This takes the focus off of a note after hitting enter.
    $scope.blurInput = (event)=>{
      if (event.charCode == 13) {
        let target = event.target;
        target.blur();
      }
    };

});


