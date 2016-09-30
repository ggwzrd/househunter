angular.module("houseHunterApp")
.directive("requests", function(){
  return{
    templateUrl: 'templates/requests.html',
    controller: 'feedCtrl',
    replace: true
  };
});
