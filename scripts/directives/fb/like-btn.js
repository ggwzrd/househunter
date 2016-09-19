angular.module("houseHunterApp")
.directive("fblikebtn", function(){
  return{
    templateUrl: 'templates/fb/like-btn.html',
    controller: 'mainCtrl',
    replace: true
  };
});
