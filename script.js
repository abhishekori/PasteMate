var app=angular.module('simpleSave',['ngRoute']);

app.config(function($routeProvider){


      $routeProvider
          .when('/',{
                templateUrl: 'paste.html',
                controller:'saveCtrl'

          }).when('/get/:id',{
            templateUrl:'get.html',
            controller:'getCtrl'
          });

// $locationProvider.html5Mode(true);
});

app.controller('cfgController',function($scope){

      //$scope.message="Hello world";

});

app.controller('saveCtrl',function($scope,$http) {
var sub;
var cont;
  $scope.save=function(){
    sub=$scope.subject;
    cont=$scope.content;
    console.log(sub+" "+cont);
    $http.post('http://localhost:3005/save',{subject:sub,content:cont}).success(function(response){

      $scope.link=response.response;
    });
  }
});

app.controller('getCtrl',function($scope,$http,$location,$routeParams){
    $scope.val="yes"
    var id = $routeParams.id;

    $http.get('http://localhost:3005/get/'+id).success(function(response){
      console.log(response);
      $scope.subject=response.subject;
      $scope.content=response.content;
  });
});
