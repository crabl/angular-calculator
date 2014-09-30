'use strict';

/**
 * @ngdoc function
 * @name angularCalculatorApp.controller:OperatorCtrl
 * @description
 * # OperatorCtrl
 * Controller of the angularCalculatorApp
 */
angular.module('angularCalculatorApp')
  .controller('OperatorCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.keyPressed = function(operator) {
    	console.log("Operator " + operator + " pressed");
    };
  });
