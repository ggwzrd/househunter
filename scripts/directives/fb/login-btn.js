'use strict';

angular.module("houseHunterApp")
.directive("fbloginbtn", function(){
  return{
    templateUrl: 'templates/fb/login-btn.html',
    controller: 'mainCtrl',
    replace: true
  };
});
