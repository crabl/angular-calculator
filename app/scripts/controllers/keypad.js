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

    $scope.numberPressed = function(value) {
    	console.log('Number button ' + value + ' pressed');
    	$scope.$emit('pressed.keypad.number', {
    		value: value
    	});
    };

    $scope.decimalPressed = function() {
    	console.log('Decimal button pressed');
    	$scope.$emit('pressed.keypad.decimal');
    };
  });
