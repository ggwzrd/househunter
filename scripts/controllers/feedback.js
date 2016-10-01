angular.module("houseHunterApp")
.controller("feedbackCtrl", function($scope){
  var _self = this;
  _self.scroll = 0;
  $scope.next = function(){
    if($(".feedback").find(".visible").next(".question").hasClass('question')){
      var target = $(".feedback").find(".visible").next();
      _self.scroll+=239;
      $(".feedback").animate({
        scrollTop: _self.scroll
      }, 200);
      setTimeout(function () {
        target.prev().removeClass("visible");
        target.addClass("visible");
      }, 200);
    }
  }.bind(_self);

  $scope.prev = function(){
    if($(".feedback").find(".visible").prev(".question").hasClass('question')){
      var target = $(".feedback").find(".visible").prev();
      this.scroll-=239;
      $(".feedback").animate({
        scrollTop: _self.scroll
      }, 200);
      target.next().removeClass("visible");
      target.addClass("visible");
    }
  }.bind(_self);
});
