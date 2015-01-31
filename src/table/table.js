/**
 * @class table
 * @description table 表格 模块
 * @time 2015-01-30 22:33
 * @author StarZou
 **/
(function (window, document) {
    'use strict';

    var tableModule = angular.module('ngComponents.table', []);

    tableModule.provider('$table', function () {
        var defaults = this.defaults = {
            customClass: '',
            prefixClass: 'table',
            prefixEvent: 'table',
            template   : 'table/table.tpl.html',
            pager      : {
                currentPage: 1,
                pageSize   : 20
            },
            sizeList   : [10, 20, 50, 100, 150]
        };

        this.$get = ['$rootScope', '$$rAF', '$templateRequest', function ($rootScope, $$rAF, $templateRequest) {

            function TableFactory($element, config) {
                var $table = {}; // table 组件
                var options = $table.$options = angular.extend({}, defaults, config); // table 配置
                var scope = $table.$scope = options.scope && options.scope.$new() || $rootScope.$new(); // table组件的 scope

                return $table;
            }

            return TableFactory;
        }];
    });

    tableModule.directive('uiTable', ['$table', function ($table) {
        return {
            restrict: 'EA',
            scope   : true,
            link    : function postLink($scope, $element, $attr) {
                console.log('uiTable link...');

                var options = {scope: $scope};

                angular.forEach(['type', 'url'], function (key) {
                    if (angular.isDefined($attr[key])) {
                        options[key] = $attr[key];
                    }
                });

                var tooltip = $table($element, options);

                $scope.$on('$destroy', function () {
                    options = null;
                    tooltip = null;
                });
            }
        };
    }]);

})(window, document);