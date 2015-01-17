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
        //console.log($scope);
    }]);


    /**
     * 测试指令
     */
    examplesApp.directive('doTest', ['dimensions', function (dimensions) {
        return {
            restrict: 'EA',
            link    : function ($scope, $element, $attr) {
                var element = $element[0];

                //console.log(dimensions.nodeName(element, 'h1'));
                //console.log(dimensions.css(element, 'margin'));
                //
                //console.log(dimensions.offset(element));
                //console.log(dimensions.position(element));
                //console.log(dimensions.height(element));
                //console.log(dimensions.width(element));

                var elementPosition = dimensions.getPosition(element, true);
                console.log(elementPosition);

                var tipElement = angular.element('<div class="ignored ui popup inverted left top transition visible"><div class="content">Hello. This is an inverted popup</div></div>');

                angular.element(document.body).after(tipElement);

                //$element.after(tipElement);

                var tipWidth = tipElement.prop('offsetWidth'),
                    tipHeight = tipElement.prop('offsetHeight');


                var tipPosition = dimensions.getCalculatedOffset('top', elementPosition, tipWidth, tipHeight);

                tipPosition.top += 'px';
                tipPosition.left += 'px';
                tipElement.css(tipPosition);


                console.log(tipWidth, tipHeight);
            }
        };
    }]);
})(window, document);