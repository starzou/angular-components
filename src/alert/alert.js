/**
 * @class alert
 * @description 提醒框控件
 * @time 2014-12-14 13:47
 * @author StarZou
 **/
(function (window, document) {
    'use strict';

    var alert = angular.module('ngComponents.alert', []);

    alert.directive('acAlert', [function () {
        return {
            restrict   : 'A',
            scope      : true,
            replace    : true,
            templateUrl: 'alert/alert.tpl.html',
            compile    : function ($element, $attr) {
                return function ($scope, $element, $attr) {
                    $scope.title = $attr.acAlert;
                };
            }
        };
    }]);

})(window, document);