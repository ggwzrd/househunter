angular.module('houseHunterApp')
.directive("welcome", function(){
  return{
    templateUrl: 'templates/welcome.html',
    controller: 'mainCtrl',
    replace: true
  };
});
