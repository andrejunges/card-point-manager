// app is defined in /app/app.js
appControllers.controller('UserCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    $scope.users_grid = {
        data: [],
        height: 'auto',
        columnDefs: [
            {
                field: "Name",
                displayName: "Nome"
                    },
            {
                field: "Login",
                displayName: "Login"
                    }]
    };
    $http.get('/users/fetch').success(function (data, status, headers, config) {
        $scope.users_grid.data = data;
    }).
    error(function (data, status, headers, config) {
        console.log(data, 'data users');
    });

    $scope.newuser = function () {
        alert(1);
        $location.path('/users/form');
    };
}]);
