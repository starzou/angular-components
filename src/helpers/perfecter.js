/**
 * @class perfecter
 * @description perfecter 模块, 提供有用的指令, 服务.
 * @time 2015-01-31 14:14
 * @author StarZou
 **/
(function (window, document) {
    'use strict';

    var perfecterModule = angular.module('ngComponents.helpers.perfecter', []);

    perfecterModule.directive('bindHtmlUnsafe', function () {
        return function (scope, element, attr) {
            element.addClass('ng-binding').data('$binding', attr.bindHtmlUnsafe);
            scope.$watch(attr.bindHtmlUnsafe, function bindHtmlUnsafeWatchAction(value) {
                element.html(value || '');
            });
        };
    });

})(window, document);