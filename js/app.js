(function(angular, _, moment) {
  'use strict';

  angular.module('app', [])
  .controller('controller', ['$scope','$interval', function($scope, $interval) {
    console.log('Got here!: ' + $scope);
  }]);

})(window.angular, window._, window.moment);
