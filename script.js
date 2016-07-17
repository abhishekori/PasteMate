var app=angular.module('simpleSave',['ngRoute','colorpicker.module', 'wysiwyg.module']);

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

app.service('myFunc',function(){

  this.isEmpty=function(data){
    if(data==null)
    {
      return true;
    }else{
      return false;
    }

  }


})


app.controller('saveCtrl',function($scope,$http,$window,myFunc) {
var sub=null;
var cont=null;
var pass=null;



  $scope.save=function(){


    sub=$scope.subject;
    cont=$scope.content;
    console.log(cont);
    if(!myFunc.isEmpty($scope.pass))
    {
      pass=$scope.pass;
      pass=pass.trim();
    }


//    console.log(sub+" "+cont);

if(myFunc.isEmpty(sub))
{
    alert("Please enter the data");
}else{
if(myFunc.isEmpty())

$scope.disable=true;
$scope.saver='Please wait...';
$http.post('http://localhost:3005/save',{subject:sub,content:cont,pass:pass}).success(function(response){
//  console.log(response);

         $scope.disable=false;
       $window.location.href = 'index.html#/get/'+response.response;
        });
}
  }

});

app.controller('getCtrl',function($scope,$http,$location,$routeParams,myFunc){
    $scope.val="yes"
    var id = $routeParams.id;
    var inputPass=null;
    var got=null;
    //var img=null;
//console.log("getisPass");
    $http.get('http://localhost:3005/getIsPass/'+id).success(function(response){
  //    console.log(response);

      if(response.isPass==0){

        console.log("get");
        $http.get('http://localhost:3005/get/'+id).success(function(response){
          console.log(response);

    $scope.subject=response.subject;
    $scope.content=response.content;
    $scope.id=response._id;

    $scope.shareUrlFb="https://www.facebook.com/sharer/sharer.php?u=http://localhost/simple_website/index.html/get/"+response._id;

    $scope.shareUrlTwitter="https://twitter.com/home?status=http://localhost/simple_website/index.html/get/"+response._id;

    $scope.shareUrlGplus="https://plus.google.com/share?url=http://localhost/simple_website/index.html/get/"+response._id;

        });

      }else{

          inputPass=prompt("This content is password secured. Please enter the password");
          if(inputPass!="" || inputPass==null)
          {
      //      console.log("verifyPass");
            $http.post('http://localhost:3005/verifyPass',{inputPass:inputPass,id:id}).success(function(response){
          //  console.log(response);
        if(response.status!=0)
        {
          got=response.message;
          console.log(got);
          $scope.subject=got.subject;
          $scope.content=got.content;
          //$scope.id=got._id;


$scope.shareUrlFb="https://www.facebook.com/sharer/sharer.php?u=http://localhost/simple_website/index.html/get/"+got._id;

$scope.shareUrlTwitter="https://twitter.com/home?status=http://localhost/simple_website/index.html/get/"+got._id;

$scope.shareUrlGplus="https://plus.google.com/share?url=http://localhost/simple_website/index.html/get/"+got._id;

        }else{
          $scope.subject="Please verify your password";
        }
            });
          }

        }
  });


});

app.controller('myCtrl', function(ngToast) {

});
