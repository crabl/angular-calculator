'use strict';

/**
 * @ngdoc directive
 * @name angularCalculatorApp.directive:calculatorButton
 * @description
 * # calculatorButton
 */
angular.module('angularCalculatorApp')
  .directive('calculatorButton', function () {
    return {
    	scope: { 
    		'value': '@',
    		'action': '&'
    	},
      template: '<button>{{ value }}</button>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        var button = element.find('button');
        button.bind('click', function() {
        	scope.action({
        		value: scope.value
        	});
        });
      }
    };
  });
