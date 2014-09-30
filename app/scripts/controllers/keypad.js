'use strict';

/**
 * @ngdoc function
 * @name angularCalculatorApp.controller:KeypadCtrl
 * @description
 * # KeypadCtrl
 * Controller of the angularCalculatorApp
 */
angular.module('angularCalculatorApp')
  .controller('KeypadCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.keyPressed = function(value) {
    	console.log("Button " + value + " pressed!");
    };
  });
