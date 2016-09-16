'use strict';

app.controller('AverageTempModalCtrl', function($scope, $uibModalInstance, TripFactory, trip) {

  let startMonth = trip.startMonth;
  let endMonth = trip.endMonth;
  let startMonthId = trip.startMonthId;
  let endMonthId = trip.endMonthId;

  $scope.close = () => {
    $uibModalInstance.close();
  };

  $scope.months = []
  $scope.keys = [];

  tripMonths();

  function tripMonths (){
    if (startMonthId === endMonthId){
      getAverageTempForMonth(startMonthId);
    } else {
      console.log("not the same start and end month")
      let startMonth = parseInt(startMonthId,10);
      let endMonth = parseInt(endMonthId,10);
      console.log("startmonth", startMonth);
      console.log("endmonth", endMonth);
      if (startMonth < endMonth){
        for (var i=startMonth; i<=endMonth; i++){
          let monthId = (i < 10 ? "0" : "") + i;
          getAverageTempForMonth(monthId);
        }
      }
    }
  }

  function getAverageTempForMonth (monthId){
    TripFactory.getAverageTemp(monthId)
    .then((tempData)=>{
      console.log("tempData", tempData);
      Object.keys(tempData).forEach((key)=>{
        $scope.keys.push(key);
      });
      $scope.months.push(tempData);
      console.log("months array", $scope.months);
    });
  }

  // TripFactory.getAverageTemp(month)


});

