angular.module("houseHunterApp")
.directive("feedbackbtn", function(){
  return{
    templateUrl: 'templates/feedback-btn.html',
    controller: 'mainCtrl',
    replace: true
  };
});
