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

    $scope.binaryOperatorPressed = function(operator) {
    	console.log('Binary operator button ' + operator + ' pressed');

    	var mathOperator = '';
    	switch (operator) {
    		case '−':
    			mathOperator = '-';
    			break;
    		case '+':
    			mathOperator = '+';
    			break;
    		case '÷':
    			mathOperator = '/';
    			break;
    		case '×':
    			mathOperator = '*';
    			break;
    		default:
    			mathOperator = operator;
    			break;
    	}

    	$scope.$emit('pressed.keypad.binary_operator', {
    		binary_operator: mathOperator
    	});
    };

    $scope.unaryOperatorPressed = function(operator) {
    	console.log('Unary operator button ' + operator + ' pressed');

    	var unary_operation = function(value) {
    		return value;
    	};

    	switch (operator) {
    		case '1/x':
    			unary_operation = function(x) { return 1 / x; };
    			break;
    		case '+/−':
    			unary_operation = function(x) { return -x; };
    			break;
    		case 'sin':
    			unary_operation = function(x) { return Math.sin(x); };
    			break;
    		case 'cos': 
    			unary_operation = function(x) { return Math.cos(x); };
    			break;
    		case 'tan':
    			unary_operation = function(x) { return Math.tan(x); };
    			break;
    	}

    	$scope.$emit('pressed.keypad.unary_operator', {
    		unary_operation: unary_operation
    	});
    };

    $scope.equalsPressed = function() {
    	console.log('Equals button pressed');
    	$scope.$emit('pressed.keypad.equals');
    };

    $scope.clearPressed = function() {
    	console.log('Clear button pressed');
    	$scope.$emit('pressed.keypad.clear');
    };
  });
