/**
 * @class app
 * @description examples App
 * @time 2014-12-14 14:17
 * @author StarZou
 **/
(function (window, document) {
    'use strict';
    var examplesApp = angular.module('examplesApp', ['ngComponents']);

    examplesApp.controller('AppController', ['$scope', function ($scope) {
        $scope.title = 'Angular-Components Examples';
    }]);
})(window, document);