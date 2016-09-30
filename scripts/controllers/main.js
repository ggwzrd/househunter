'use strict';

angular.module("houseHunterApp")
.controller('mainCtrl', function($scope, groupsSrv){
  groupsSrv.getGroups(function(response){
    $scope.groups = response.data;
  });
});
