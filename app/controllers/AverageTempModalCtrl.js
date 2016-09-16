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
      var startMonth = parseInt(startMonthId,10);
      var endMonth = parseInt(endMonthId,10);
      if (startMonth < endMonth){
        for (var i=startMonth; i<=endMonth; i++){
          let monthId = (i < 10 ? "0" : "") + i;
          getAverageTempForMonth(monthId);
        }
      } else {
        for (var i=startMonth; i<=12; i++){
          let monthId = (i < 10 ? "0" : "") + i;
          getAverageTempForMonth(monthId);
        }
        for (var i=1; i<=endMonth; i++){
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

