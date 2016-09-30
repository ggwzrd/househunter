'use strict';

angular.module("houseHunterApp")
.controller('navCtrl', function($scope){
  $scope.moveTo = function(e, event){
    if(!$(event.target).hasClass("selected")){
      var target = $("."+e+", ."+e+">.fb-post");
      if(e === "home"){
        $('html, body').animate({
          scrollTop: 0
        }, 200);
      }else{
        if(e === "offers"){
          target.fadeIn();
          $('.requests, .requests>.fb-post').fadeOut();
        }else{
          target.fadeIn();
          $('.offers, .offers>.fb-post').fadeOut();
        }
        $('html, body').animate({
          scrollTop: $("#feed").offset().top
        }, 400);
      }
    }
  };

  $(window).scroll(function(){
    var scroll = $(window).scrollTop();
    if(scroll <= 100){
      $('.navbar').css({
        "background-color": "rgba(255,255,255,"+(scroll/100)+")",
        "box-shadow": "1px 1px 15px rgba(0,0,0,"+(scroll/100)+")",
        "color": "rgb(0,0,0)"
      });
      ((scroll === 0))? $('.navbar').find('li').css('color',"white") : $('.navbar').find('li').css('color',"rgba(0,0,0,"+(scroll/10)+")");
    }else{
      $('.navbar').css({
        "background-color": "rgba(255,255,255, 1)",
        "box-shadow": "1px 1px 15px rgba(0,0,0, 1)",
        "color": "rgb(0,0,0)"
      });
      setTimeout(function () {
        $('.navbar').find('li').css("color","rgba(0,0,0,1)");
      }, 10);
    }
  });

});
