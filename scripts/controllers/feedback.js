angular.module("houseHunterApp")
.controller("feedbackCtrl", function($scope, $http){
  var _self = this;
  _self.scroll = 0;
  $scope.stars = [{id:1, label: 'Not at all'},{id:2, label: ''},{id:3, label: 'Almost'},{id:4, label: ''},{id:5, label: 'Yeeees!'}];

  $scope.onRating = function(index){
    for(var i = index; i>=0;i--){
      $scope.stars[i].checked = true;
    }
    if(index!==4){
      index++;
      for(i = index; i < $scope.stars.length ;i++){
        $scope.stars[i].checked = false;
      }
    }
  };

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

  $scope.save = function(){
    var i = 0,
    feedback = {};
    while($(".feedback").find(".checked").find(':checkbox')[i]){
      feedback.rating = $(".feedback").find(".checked").find(':checkbox')[i].value;
      i++;
    }

    feedback.rating = parseInt(feedback.rating);
    feedback.suggestion = $(".feedback").find('textarea')[0].value;
    if(feedback.rating){
      data = $.param({

      });
      $http({
        method: 'POST',
        url: 'http://localhost:8888/househunter/config/set-feedback.php/',
        dataType: 'json',
        data: JSON.stringify({"rating": feedback.rating, "suggestion": feedback.suggestion, "user_id": $scope.user.id,}),
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      }).
      success(function(data, status, headers, config) {
        if (data.msg !== '')
        {
          console.warn(data.msg);
        }else{
          console.error(data.error);
        }
      }).error(function(data, status, header, config) { // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.error(status, data, config);
      });
    }else{
      // output error message, rating must be filled
    }
  };
});
