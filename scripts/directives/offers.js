angular.module("houseHunterApp")
.directive("offers", function(){
  return{
    templateUrl: 'templates/offers.html',
    controller: 'feedCtrl',
    replace: true
  };
});
