var app = angular.module('booksInventoryApp', []);

app.controller('booksCtrl', function($scope, $http) {
$scope.data=[];
    var baseUrl=window.location.origin+ "/projectName/";
    
function deleteUndefiendKey(object) {
  for(var property in object) {
    if(!object[property]) {
      delete object[property];
    } else {
      if(object[property] && typeof object[property] == 'object'){
        deleteKey(object[property]);
      }
    }
  }
  return object;
}    

    $scope.addBookDetails= function(){
        console.log("inside addBookDetails");
        var outputData=$scope.book;
        outputData = deleteUndefiendKey(outputData);
        var webUrl=baseUrl+"books/addBook";
    $http.post(webUrl,outputData)
      .then(function(response) {
          console.log(response);
          $scope.fetchAllBookDetails();
      },function() {
          console.log(arguments);
      });
    };
    $scope.updateBookDetails= function(){
        console.log("inside editBookDetails");
        console.log($scope.book);
        var outputData=$scope.book;
        var webUrl=baseUrl+"books/updateBook/"+$scope.book.isbn;
        $http.put(webUrl,outputData)
      .then(function(response) {
          console.log(response);
          $scope.fetchAllBookDetails();
      },function() {
          console.log(arguments);
      });

    };
    $scope.fetchAllBookDetails= function(){
        console.log("inside fetchAllBookDetails");
        var webUrl=baseUrl+"books/getBooks";
        $http.get(webUrl)
          .then(function(response) {
               console.log(response);
            $scope.data = response.data;
          },function() {
               console.log(arguments);
          });

    };
    $scope.getBookDetails= function(){
        console.log("inside getBookDetails : "+$scope.book.isbn);
//          var webUrl="http://ngd11369:3000/projectName/books/getBooks/"+$scope.book.isbn;
        var webUrl=baseUrl+"books/getBooks/"+$scope.book.isbn;
        $http.get(webUrl)
          .then(function(response) {
               console.log(response);
               $scope.book=response.data;
//               $scope.fetchAllBookDetails();
          },function() {
               console.log(arguments);
          });

    };

    $scope.deleteBook = function(book,index){
      console.log("inside deleteBook");
      console.log(book);
      console.log(index);
              console.log("inside fetchAllBookDetails");
//              var webUrl="http://ngd11369:3000/projectName/books/deleteBookDetail/"+book.isbn;
        var webUrl=baseUrl+"books/deleteBookDetail/"+book.isbn;
        $http.delete(webUrl)
          .then(function(response) {
               console.log(response);
               $scope.fetchAllBookDetails();
          },function() {
               console.log(arguments);
          });
    }
    $scope.selectBook = function(book){
        $scope.book=book;
    }
    $scope.clearBookDetails = function(){
        $scope.book={};
    }
    
});