"use strict";
@window.AngularController('EmployeeTableTimeCtrl', '$http')
class EmployeeTableTimeController {
    constructor($scope, $http) {
        this.scope = $scope;
        this.http = $http;

        this.http.get('/employees/' + '2304323215' + '/getemployeetabletime')
          .success(function (data, status, headers, config) {
            data = data.map(function(x){ return { Period: x.Period, Entry: new Date(x.Entry), Exit: new Date(x.Exit)  } });
            $scope.movimentations = data;

            //$('.clockpicker').clockpicker();
          })
          .error(function (data, status, headers, config) {
              console.log(data, 'movimentation data');
          });
    }
}
