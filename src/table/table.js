/**
 * @class table
 * @description table 表格 模块
 * @time 2015-01-30 22:33
 * @author StarZou
 **/
(function (window, document) {
    'use strict';

    var tableModule = angular.module('ngComponents.table', []);

    tableModule.directive('uiTable', [function () {
        return {
            restrict   : 'EA',
            scope      : true,
            replace    : true,
            templateUrl: 'table/table.tpl.html',
            compile    : function ($element, $attr) {
                return function ($scope, $element, $attr) {
                    console.log('uiTable link...');
                };
            }
        };
    }]);

})(window, document);