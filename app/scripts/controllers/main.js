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
  		buffer: [],
  		display: '0'
  	};

  	$scope.decimalPressed = false;
  	$scope.equalsPressed = false;
  	$scope.memoryRegister = 0;

    var buffer = {
    	push: function(value) {
    		$scope.model.buffer.push(value);
    		return this.display();
    	},
    	eval: function() {
    		var buf = $scope.model.buffer.join('');
    		if (buf === '.' || buf === '') {
    			return 0;
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
    		$scope.model.buffer = [];
    		return this.display();
    	},
    	isEmpty: function() {
    		return $scope.model.buffer.length == 0;
    	}
    };

    var expression = {
    	push: function(item) {
    		$scope.model.expression.push(item);
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
    	},
    	isEmpty: function() {
    		return $scope.model.expression.length == 0;
    	}
    };

    $scope.model.display = buffer.clear().eval();

    $scope.decimalAllowed = true;
    $scope.tokenAllowed = true;

    $scope.$on('pressed.keypad.number', function(event, obj) {
    	// if the previous operation was unary or expression evaluation
    	// then clear the buffer and register
    	if(!$scope.tokenAllowed) {
    		expression.clear()
    		buffer.clear();
    		$scope.tokenAllowed = true;
    	}

    	buffer.push(obj.value);
    });

    $scope.$on('pressed.keypad.decimal', function() {
    	// if the previous operation was unary or expression evaluation
    	// then clear the buffer and register
    	if(!$scope.tokenAllowed) {
    		expression.clear();
    		buffer.clear();
    		$scope.tokenAllowed = true;
    	}

    	// if the buffer already is a decimal number, we cannot add more decimals
    	if($scope.decimalAllowed) {
    		buffer.push('.');
    		$scope.decimalAllowed = false;
    	}
    });

    $scope.$on('pressed.keypad.binary_operator', function(event, obj) {
    	// if buffer is empty and expression ends with another operator
    	// replace that operator with the current one, but don't push an empty buffer
    	if(buffer.isEmpty() && !expression.valid()) {
    		expression.pop();
    	} else {
    		expression.push(buffer.eval());
    	}

    	expression.push(obj.binary_operator); // push binary operator onto expression stack
    	buffer.clear(); // clear the buffer
    	
    	$scope.decimalAllowed = true;
    	$scope.tokenAllowed = true;
    });

    $scope.$on('pressed.keypad.unary_operator', function(event, obj) {
    	var result = obj.unary_operation(buffer.eval()); // apply unary operation to contents of buffer
    	buffer.clear().push(result); // clear the buffer and push the result

    	$scope.tokenAllowed = false;
    });

    $scope.$on('pressed.keypad.equals', function(event, obj) {
    	expression.push(buffer.eval()); // evaluate the expression and push onto stack

    	buffer.clear().push(expression.eval()); // replace the buffer with the evaluated expression
    	expression.clear(); // clear the expression stack

    	$scope.decimalAllowed = true;
    	$scope.tokenAllowed = false; // have to clear the buffer before we do anything involving numbers
    });

    $scope.$on('pressed.keypad.clear', function() {
    	expression.clear();
    	buffer.clear();

    	$scope.decimalAllowed = true;
    	$scope.tokenAllowed = true;
    });

    $scope.$on('pressed.keypad.m+', function() {
    	// add buffer amount to register value
    	$scope.memoryRegister += buffer.eval();
    });

    $scope.$on('pressed.keypad.m-', function() {
    	// subtract value of memory register by buffer amount
    	$scope.memoryRegister -= buffer.eval();
    });

    $scope.$on('pressed.keypad.mc', function() {
    	// clear register value
    	$scope.memoryRegister = 0;
    });

    $scope.$on('pressed.keypad.mr', function() {
    	// replace contents of buffer with register value
    	buffer.clear().push($scope.memoryRegister);
    });
  });
