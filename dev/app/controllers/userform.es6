appControllers.controller('UserFormCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    var user_id = $location.search().id;
    $scope.user = {};
    if (user_id) {

    } else {
        $http.get('user/new').success(function (data, status, headers, config) {
            $scope.use = data;
        }).error(function (data, status, headers, config) {
            //todo
        });
    }
}]);
