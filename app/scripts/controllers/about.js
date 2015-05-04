'use strict';

/**
 * @ngdoc function
 * @name angulardbApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the angulardbApp
 */
angular.module('angulardbApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
