appControllers.controller('UserFormCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    var user_id = $location.search().id;
    $scope.user = {};
    if (user_id) {

    } else {
        $http.get('user/new').success(function (data, status, headers, config) {
            $scope.user = data;
        }).error(function (data, status, headers, config) {
            //todo
        });
    }

    $scope.save = function () {
        $http.post('user/save', $scope.user).success(function (data, status) {
            $location.path('/users');
        }).error(function (err, status) {
            //todo
        });
    };
}]);
