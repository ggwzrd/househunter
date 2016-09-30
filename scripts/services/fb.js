'use strict';

angular.module("houseHunterApp")
.service("authSrv", function($rootScope){

  this.watchLoginChange = function() {
    var _self = this;
    FB.Event.subscribe('auth.authResponseChange', function(res) {
      if (res.status === 'connected') {
        _self.getUserInfo();
        $rootScope.getGroupsFeed();
      }else{
        $('.feed').innerHTML = 'Please log ' +
        'into this app.';
      }
    });
  };

  this.getUserInfo = function() {
    var _self = this;
    FB.api('/me', function(res) {
      if (!res || res.error) {
        console.error('Error occured');
      } else {
        console.log("completed fetching user info");
        $rootScope.$apply(function() {
          $rootScope.user = _self.user = res;
          $rootScope.user.login = true;
        });
      }
    });

  };

  this.logout = function() {
    var _self = this;
    FB.logout(function(response) {
      $rootScope.$apply(function() {
        $rootScope.user = _self.user = {};
      });
    });
  };

})

.service("feedSrv", function($q){
  return{
    getGroupsFeed: function(group){
      var deferred = $q.defer();
        FB.api("/"+group.id+"/feed?limit=100",
        function(res) {
          if (!res || res.error) {
            deferred.reject('Error occured');
          } else {
            console.log("completed fetching feed for group id: "+group.id);
            deferred.resolve(res);
          }
        });
        return deferred.promise;
    }
  };
})

.service("picSrv", function($q){
  return{
    getGroupsPictures: function(group){
      var deferred = $q.defer();
        FB.api("/"+group.id+"/feed?fields=full_picture&limit=100",
        function(res) {
          if (!res || res.error) {
            deferred.reject('Error occured');
          } else {
            console.log("completed fetching pictures for group id: "+group.id);
            deferred.resolve(res);
          }
        });
        return deferred.promise;
    }
  };
});
