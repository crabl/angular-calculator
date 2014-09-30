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
      template: '<div class="display"></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the display directive');
      }
    };
  });
