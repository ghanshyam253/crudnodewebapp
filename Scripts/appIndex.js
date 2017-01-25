var app = angular.module('booksInventoryApp', []);

app.controller('booksCtrl', function($scope, $http) {
$scope.data=[];
  $http.get("http://127.0.0.1:3000/projectName/usercollection")
    .then(function(response) {
console.log(response);
      $scope.data = response.data;
    });
});