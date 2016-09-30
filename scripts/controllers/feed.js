'use strict';

angular.module('houseHunterApp')
.controller('feedCtrl', function($scope, groupsSrv, feedSrv, picSrv, $compile, $rootScope){
  var _self = this;
  _self.x = 0;

  $scope.attachFeedTo = function(node){
      var feed = angular.element(document.createElement('offers'));
      var e = $compile( feed )( $scope );

      $('.'+node).append(feed);
      $scope.insertHere = e;
  };

  $scope.loadMorePosts = function(){
    if($scope.user.login){
      var chunk = $scope.offers.length + 5;
      if(!_self.offers[$scope.offers.length+5]) chunk = _self.offers.length;
        $scope.offers = $scope.offers.concat( _self.offers.slice($scope.offers.length, chunk));
        $scope.requests = $scope.requests.concat(_self.requests.slice($scope.requests.length, $scope.requests.length+5));
        if($scope.offers.length > _self.x){
          setTimeout(function () {
            _self.render();
          }.bind(_self), 200);
          _self.x = $scope.offers.length;
          console.log("Rendering new posts...");
        }
    }
  }.bind(_self);

  $rootScope.getGroupsFeed = function(){
    var res = {};
    $scope.offers = [];
    $scope.requests = [];
    $scope.groups.map(function(group){
      picSrv.getGroupsPictures(group)
      .then(function(response){
        (!_self.pictures) ? _self.pictures = response.data : _self.pictures = _self.pictures.concat(response.data);
        feedSrv.getGroupsFeed(group)
        .then(function(response){
          (!_self.feedData) ? _self.feedData = response.data : _self.feedData = _self.feedData.concat(response.data);
          res = _self.filterByCategory(response.data);
          (!_self.offers) ? _self.offers = res.offers :  _self.offers = _self.offers.concat(res.offers);
          (!_self.requests) ? _self.requests = res.requests :  _self.requests = _self.requests.concat(res.requests);
          (!$scope.offers) ? $scope.offers =  _self.offers.slice($scope.offers.length, $scope.offers.length+2) :  $scope.offers = $scope.offers.concat( _self.offers.slice($scope.offers.length, $scope.offers.length+2));
          (!$scope.requests) ? $scope.requests = _self.requests.slice($scope.requests.length, $scope.requests.length+2) :  $scope.requests = $scope.requests.concat(_self.requests.slice($scope.requests.length, $scope.requests.length+2));
          if($scope.offers.length >= 5) _self.render();
        }.bind(_self));
      }.bind(_self));
    }.bind(_self));
    return(false);
}.bind(_self);

  _self.filterByCategory = function(array){
    var scope = $scope;
    if(array){
      var offers = [], requests = [];
         var index = 0;
         var res = {};
         angular.forEach(array, function(item) {
             if(item.message){
               res = _self.checkMessage(item.message);
               var ids = item.id.split("_");
               item.group_id = ids[0];
               item.post_id = ids[1];
               if(res.rating<res.maxRating){
                 item.rating = res.rating;
                 item.maxRating = res.maxRating;
                 item.words = res.words;
                 item.picture = _self.pictures[index];
                 // offers[item.id] = item;
                 offers.push(item);
               }else{
                 item.rating = res.rating;
                 item.maxRating = res.maxRating;
                 item.words = res.words;
                 item.picture = _self.pictures[index];
                 // requests[item.id]= item;
                 requests.push(item);
               }
             }else{
               _self.feedData.splice(index, 1);
               _self.pictures.splice(index, 1);
             }
             index ++;
           });
         console.log("filtration Compleated");
         return{
           "offers": offers,
           "requests": requests
         };
       }else{
         console.log("Empty array");
         return false;
       }
  }.bind(_self);





  _self.checkMessage = function(message){
    var words = message.split(" "), word="";
    var rating = 0, counter = 0, i=0, maxRating = words.length/10;  // percentuage of possibility that the post is a request
    var w = [];
    do{
      word = words[i];
      if((word[word.length-1]==="?")||(word[word.length-1]=== ".")||(word[word.length-1]=== ":")||(word[word.length-1]=== "!")){
        word = word.slice(0, -1);
        counter=0;
      }else if(word[word.length-1]===","){
        word = word.slice(0, -1);
      }
      word = word.toLowerCase();
      switch(word){
        case "i":
          (counter>0) ? rating+=2 : rating ++;
          w.push(word)
        break;
        case "im":
          (counter>0) ? rating+=2 : rating ++;
          w.push(word);
        break;
        case "i'm":
          (counter>0) ? rating+=2 : rating ++;
          w.push(word);
        break;
        case "am":
          (counter>0) ? rating+=2 : rating ++;
          w.push(word);
        break;
        case "iam":
          (counter>0) ? rating+=2 : rating ++;
          w.push(word);
        break;
        case "afford":
          if(words[i-2] !== "you") rating +=2;
          w.push(word);
        break;
        case "looking":
          if(counter>0){
            if(words[i+1] === "forward")
              rating+=0;
            else
              if(rating >= 3) rating *=(maxRating/2); else rating+=3;
          }else{
            rating ++;
          }
          w.push(word);
        break;
        case "searching":
          if(counter>0){
            if(rating >= 3) rating *=(maxRating/2); else rating+=3;
          }else{
            rating ++;
          }
          w.push(word);
        break;
        case "finding":
          if(counter>0){
            if(rating >= 3) rating *=(maxRating/2); else rating+=3;
          }else{
            rating ++;
          }
          w.push(word);
        break;
        case "lookout":
          if(counter>0){
            if(rating >= 3) rating *=(maxRating/2); else rating+=3;
          }else{
            rating ++;
          }
          w.push(word);
        break;
        case "seeking":
          if(counter>0){
            if(rating >= 3) rating *=2; else rating+=3;
          }else{
            rating ++;
          }
          w.push(word);
        break;
        case "budget":
          if(words[i-1] === "your") rating -= 2; else rating +=(maxRating-rating);
          w.push(word);
        break;
        case "help": rating ++;
          w.push(word);
        break;
        case "renting": rating=0;
          w.push(word);
        break;
        case "rent":
          if((words[i+1] === "out")||((words[i-1] === "for"))) rating = 0;
          else if(words[i-1] === "to") rating+=2;
          w.push(word);
        break;
        case "new":
          if(counter>0){ if(rating > 0) rating +=2; else rating ++; }
          w.push(word);
        break;
        case "moved":
          (counter>0) ? rating+=4 : rating ++;
          w.push(word);
        break;
        case "desperate":
          if(counter>0){ if(rating > 0) rating +=2; else rating ++; }
          w.push(word);
        break;
        case "studying":
          if(counter>0){ if(rating > 0) rating +=2; else rating ++; }
          w.push(word);
        break;
        case "tenant": rating=0;
          w.push(word);
        break;
      }
      counter++;
      i++;
    }while((rating<maxRating)&&(words.length > i));
    return {
      "words": w,
      "rating": rating,
      "maxRating":maxRating,

    };
  };


  _self.render = function(){
    setTimeout(function () {
      FB.XFBML.parse();
    }, 10);
  };


});
