// app is defined in /app/app.js
appControllers.controller('EmployeeCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.employees_grid = {
        data: [],
        height: 'auto',
        columnDefs: [
            {
                field: "Name",
                displayName: "Nome"
                    },
            {
                field: "Department",
                displayName: "Department"
                    }]
    };
    $http.get('/employees/fetch').success(function (data, status, headers, config) {
        $scope.employees_grid.data = data;
    }).
    error(function (data, status, headers, config) {
        console.log(data, 'data employees');
    });
}]);
