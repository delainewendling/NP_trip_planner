'use strict';

app.controller('AverageTempModalCtrl', function($scope, $uibModalInstance, TripFactory, trip) {

  let startMonth = trip.startMonth;
  let endMonth = trip.endMonth;
  let startMonthId = trip.startMonthId;
  let endMonthId = trip.endMonthId;
  let yosemite = trip.yosemite;
  let glacier = trip.glacier;

  $scope.yosemite = trip.yosemite;
  $scope.glacier = trip.glacier;
  $scope.parkSelected = trip.glacier || trip.yosemite;

  $scope.close = () => {
    $uibModalInstance.close();
  };

  $scope.yosemiteMonths = [];
  $scope.glacierMonths = [];
  $scope.yosemiteKeys = [];
  $scope.glacierKeys = [];

  tripMonths();

  function tripMonths (){
    if (startMonthId === endMonthId){
      if (glacier){
        getAverageGlacierTempForMonth(startMonthId);
      }
      if (yosemite){
        getAverageYosemiteTempForMonth(startMonthId);
      }
    } else {
      var startMonth = parseInt(startMonthId,10);
      var endMonth = parseInt(endMonthId,10);
      if (startMonth < endMonth){
        if (yosemite){
          for (let i=startMonth; i<=endMonth; i++){
            //Need to convert the numbers back to strings to make a call to firebase
            let monthId = ("") + i;
            getAverageYosemiteTempForMonth(monthId);
          }
        }
        if (glacier){
          for (let i=startMonth; i<=endMonth; i++){
            //Need to convert the numbers back to strings to make a call to firebase
            let monthId = ("") + i;
            getAverageGlacierTempForMonth(monthId);
          }
        }
      } else {
        //If the start month number is larger than the end month number then I need to loop through the months before December and then loop the months after January.
        if (yosemite){
          for (let i=startMonth; i<=12; i++){
            let monthId = ("") + i;
            getAverageYosemiteTempForMonth(monthId);
          }
          for (let i=1; i<=endMonth; i++){
            let monthId = ("") + i;
            getAverageYosemiteTempForMonth(monthId);
          }
        }
        if (glacier){
          for (let i=startMonth; i<=12; i++){
            let monthId = ("") + i;
            getAverageGlacierTempForMonth(monthId);
          }
          for (let i=1; i<=endMonth; i++){
            let monthId = ("") + i;
            getAverageGlacierTempForMonth(monthId);
          }
        }
      }
    }
  }

  function getAverageYosemiteTempForMonth (monthId){
    TripFactory.getAverageYosemiteTemp(monthId)
    .then((tempData)=>{
      //tempData is an object within an object. In order to access the weather information one needs to go into the object within the tempData object. The Firebase key is the property needed to access the inner object to I am creating an array of keys and an array of objects and the 0 index of one matches the 0 index of the other. In the partial I use the index and key to access the correct information.
      Object.keys(tempData).forEach((key)=>{
        $scope.yosemiteKeys.push(key);
      });
      $scope.yosemiteMonths.push(tempData);
    });
  }

  function getAverageGlacierTempForMonth (monthId){
    TripFactory.getAverageGlacierTemp(monthId)
    .then((tempData)=>{
      //tempData is an object within an object. In order to access the weather information one needs to go into the object within the tempData object. The Firebase key is the property needed to access the inner object to I am creating an array of keys and an array of objects and the 0 index of one matches the 0 index of the other. In the partial I use the index and key to access the correct information.
      Object.keys(tempData).forEach((key)=>{
        $scope.glacierKeys.push(key);
      });
      $scope.glacierMonths.push(tempData);
    });
  }

});

