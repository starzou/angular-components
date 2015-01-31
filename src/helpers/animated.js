/**
 * @class animated
 * @description 动画模块, 实现动画
 * @time 2015-01-31 20:18
 * @author StarZou
 **/
(function (window, document) {
    'use strict';

    var animatedModule = angular.module('ngComponents.helpers.animated', []);

    animatedModule.provider('$animated', function () {
        var defaults = this.defaults = {
            baseClass     : 'animated',
            animationStart: 'webkitAnimationStart mozAnimationStart MSAnimationStart oanimationstart animationstart',
            animationEnd  : 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend'
        };

        this.$get = [function () {
            var self = {};

            return self;
        }];
    });

})(window, document);