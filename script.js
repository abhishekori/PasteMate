var app=angular.module('simpleSave',[]);

app.controller('saveCtrl',function($scope,$http) {
var sub;
var cont;
  $scope.save=function(){
    sub=$scope.subject;
    cont=$scope.content;
    console.log(sub+" "+cont);
    $http.post('http://localhost:3005/save',{subject:sub,content:cont}).success(function(response){
      console.log(response);
    });
  }
});
