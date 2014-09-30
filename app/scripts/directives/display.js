'use strict';

/**
 * @ngdoc directive
 * @name angularCalculatorApp.directive:display
 * @description
 * # display
 */
angular.module('angularCalculatorApp')
  .directive('display', function () {
    return {
    	scope: {
    		contents: '@'
    	},
      template: '<material-input type="text" value="{{contents}}" disabled></material-input>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        //element.text('this is the display directive');
      }
    };
  });
