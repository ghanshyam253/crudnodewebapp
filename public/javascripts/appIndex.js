var app = angular.module('booksInventoryApp', []);

app.controller('booksCtrl', function($scope, $http) {
$scope.data=[];


    $scope.addBookDetails= function(){
        console.log("inside addBookDetails");
        var outputData=$scope.book;
    $http.post("http://ngd11369:3000/projectName/books/addBook",outputData)
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
        var webUrl="http://ngd11369:3000/projectName/books/updateBook/"+$scope.book.isbn;
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
        $http.get("http://ngd11369:3000/projectName/books/getBooks")
          .then(function(response) {
               console.log(response);
            $scope.data = response.data;
          },function() {
               console.log(arguments);
          });

    };
    $scope.getBookDetails= function(){
        console.log("inside getBookDetails : "+$scope.book.isbn);
          var webUrl="http://ngd11369:3000/projectName/books/getBooks/"+$scope.book.isbn;
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
              var webUrl="http://ngd11369:3000/projectName/books/deleteBookDetail/"+book.isbn;
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