'use strict';

angular.module('houseHunterApp')
.service('groupsSrv', function($http){
  this.getGroups = function(callback){
    $http.get("scripts/mokos/groups.json")
    .then(function(response){
      callback(response);
    });
  };
});
