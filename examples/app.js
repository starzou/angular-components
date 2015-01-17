/**
 * @class app
 * @description examples App, 示例APP
 * @time 2014-12-14 14:17
 * @author StarZou
 **/
(function (window, document) {
    'use strict';

    var examplesApp = angular.module('examplesApp', ['ui.router', 'ngComponents']);

    /**
     * config $urlRouter
     */
    examplesApp.config(['$urlRouterProvider', function ($urlRouterProvider) {
        $urlRouterProvider.otherwise('/app');
    }]);

    /**
     * config $state
     */
    examplesApp.config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('app', {
            url        : '/app',
            templateUrl: 'tpl/app.tpl.html',
            controller : 'IndexController'
        });
    }]);

    /**
     * run setup
     */
    examplesApp.run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }]);

    /**
     * AppController
     */
    examplesApp.controller('AppController', ['$scope', function ($scope) {
        $scope.title = 'Angular-Components Examples';
    }]);

    /**
     * IndexController
     */
    examplesApp.controller('IndexController', ['$scope', function ($scope) {
        console.log($scope);
    }]);
})(window, document);