angular.module('houseHunterApp')
.directive("navbar", function(){
  return{
    templateUrl: 'templates/navbar.html',
    controller: 'mainCtrl',
    replace: true
  };
});
