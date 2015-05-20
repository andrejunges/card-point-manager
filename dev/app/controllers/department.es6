// app is defined in /app/app.js
appControllers.controller('DepartmentCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    $scope.departments_grid = {
        data: [],
        height: 'auto',
        columnDefs: [
            {
                field: "_id",
                displayName: "id"
            },
            {
                field: "Description",
                displayName: "Description"
            }]
    };
    $http.get('/departments/fetch').success(function (data, status, headers, config) {
        $scope.departments_grid.data = data;
    }).
    error(function (data, status, headers, config) {
        console.log(data, 'data users');
    });

    $scope.newDepartment = function () {
        $location.path('/deparment/form');
    };
}]);
