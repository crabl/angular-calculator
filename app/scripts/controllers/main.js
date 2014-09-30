'use strict';

/**
 * @ngdoc function
 * @name angularCalculatorApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularCalculatorApp
 */
angular.module('angularCalculatorApp')
  .controller('MainCtrl', function ($scope) {
  	$scope.model = {
  		expression: [],
  		buffer: [0],
  		display: '0'
  	};

  	$scope.decimalPressed = false;
  	$scope.equalsPressed = false;

    var buffer = {
    	push: function(value) {
    		if ($scope.model.buffer[0] == 0) {
    			$scope.model.buffer = [value];
    		} else {
    			$scope.model.buffer.push(value);
    		}
    		console.log('Buffer is:');
    		console.log($scope.model.buffer);
    		
    		return this.display();
    	},
    	eval: function() {
    		var buf = $scope.model.buffer.join('');
    		if (buf === '.') {
    			return '.';
    		} else {
    			return eval(buf);
    		}
    	},
    	display: function() {
				$scope.model.display = this.eval().toString();
				if(!$scope.$$phase) {
					$scope.$apply(); // prevent $apply if phase is executing
				}

    		return this;
    	},
    	clear: function() {
    		$scope.model.buffer = [0];
    		return this.display();
    	}
    };

    var expression = {
    	push: function(item) {
    		$scope.model.expression.push(item);
    		console.log('Expression stack: ');
    		console.log($scope.model.expression);
    		return this;
    	},
    	pop: function() {
    		return $scope.model.expression.pop();
    	},
    	endsWith: function(token) {
    		var expression = $scope.model.expression;
    		return expression[expression.length - 1] == token;
    	},
    	valid: function() {
    		// if expression does not end with a binary operator, it is valid
    		return !(this.endsWith('+') || this.endsWith('-') || this.endsWith('*') || this.endsWith('/'));
    	},
    	eval: function() {
    		if (this.valid()) {
    			return eval($scope.model.expression.join(''));
    		} else {
    			this.pop();
    			return this.eval();
    		}
    	},
    	clear: function() {
    		$scope.model.expression = [];
    		return this;
    	}
    };

    $scope.model.display = buffer.clear().eval();

    $scope.$on('pressed.keypad.number', function(event, obj) {
    	// push the number to the display buffer
    	if ($scope.equalsPressed) {
    		buffer.clear(); // clear the buffer if the last thing pressed was equals
    		$scope.equalsPressed = false;
    	}

    	buffer.push(obj.value);
    });

    $scope.$on('pressed.keypad.decimal', function() {
    	if ($scope.equalsPressed) {
    		buffer.clear(); // clear the buffer if the last thing pressed was equals
    		$scope.equalsPressed = false;
    	}

    	// If decimal has not been pressed, then push into the buffer
    	if(! $scope.decimalPressed) {
    		buffer.push('.');
    		$scope.decimalPressed = true;
    	}
    	// Otherwise, do nothing since we don't want multiple decimals in the buffer
    });

    $scope.$on('pressed.keypad.binary_operator', function(event, obj) {
			$scope.decimalPressed = false;

    	var operator = obj.binary_operator;
    	var result = buffer.eval();
    	if (result) {
    		expression.push(result); // push the evaluated buffer if it isn't zero
    	}

    	if (expression.valid()) {
    		expression.push(operator);
    	} else {
    		// If another operator has been pressed
    		expression.pop(); // pop that operator from the expression
    		expression.push(operator); // replace it with the current operator
    	}

    	buffer.clear(); // clear the buffer
    });

    $scope.$on('pressed.keypad.unary_operator', function(event, obj) {
    	var operation = obj.unary_operation; // this is a function
    	var result = operation(buffer.eval());

    	buffer.clear().push(result); // clear buffer and push the result back on
    });

    $scope.$on('pressed.keypad.equals', function(event, obj) {
    	if ($scope.equalsPressed) {
    		expression.clear();
    	}

    	var result = expression.push(buffer.eval()).eval(); // push the evaluated buffer to the expression stack and evaluate it
    	buffer.clear(); // clear the buffer
    	expression.clear().push(result); // clear the expression stack and push the result of the evaluated expression
    	
    	// display the result without saving it in the buffer
    	if (! $scope.equalsPressed) {
    		buffer.push(result);
    	}

    	$scope.decimalPressed = false; // allow decimals to be pressed
    	$scope.equalsPressed = true;
    });

    $scope.$on('pressed.keypad.clear', function() {
    	$scope.decimalPressed = false;
    	expression.clear(); // clear the expression stack
    	buffer.clear(); // clear the buffer
    });
  });
