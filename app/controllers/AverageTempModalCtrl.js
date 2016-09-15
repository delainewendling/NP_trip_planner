'use strict';

app.controller('AverageTempModalCtrl', function($scope, $uibModalInstance, AuthFactory, TripFactory, $route, $window, trip) {

  console.log("trip", trip);

  let startMonth = trip.startMonth;
  let endMonth = trip.endMonth;

  $scope.close = () => {
    $uibModalInstance.close();
  };

  tripMonths();

  function tripMonths (){
    if (startMonth === endMonth){
      console.log("same start and end month");
      TripFactory.getAverageTemp(startMonth)
      .then((tempData)=>{
        console.log("temp data", tempData);
        $scope.months = tempData;
      })
    } else {
      console.log("not the same start and end month")
    }
  }

  // TripFactory.getAverageTemp(month)


});

