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
      template: '<input type="text" value="{{contents}}" class="col-md-12"></input>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        //element.text('this is the display directive');
      }
    };
  });
