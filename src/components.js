/**
 * @class components
 * @description ngComponents 模块, 引入所有组件
 * @time 2014-12-10 14:09
 * @author StarZou
 **/
(function (window, document, angular) {
    'use strict';

    var ngComponents = angular.module('ngComponents', ['ngComponents.helpers', 'ngComponents.templates', 'ngComponents.alert']);

})(window, document, angular);