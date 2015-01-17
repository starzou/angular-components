/**
 * @class dimensions
 * @description 位置计算工具 模块
 * @time 2015-01-17 16:13
 * @author StarZou
 **/
(function (window, document) {
    'use strict';

    angular.module('ngComponents.helpers.dimensions', [])

        .factory('dimensions', ['$document', '$window', function ($document, $window) {

            var jqLite = angular.element;
            var fn = {};

            /**
             * 确定元素 节点名
             * @param element
             * @param nodeName
             */
            var nodeName = fn.nodeName = function (element, name) {
                return element.nodeName && element.nodeName.toLowerCase() === name.toLowerCase();
            };

            /**
             * 根据属性名, 返回元素 计算的属性值
             * @param element
             * @param property
             * @param extra
             */
            fn.css = function (element, property, extra) {
                var value;
                if (element.currentStyle) { //IE
                    value = element.currentStyle[property];
                } else if (window.getComputedStyle) {
                    value = window.getComputedStyle(element)[property];
                } else {
                    value = element.style[property];
                }
                return extra === true ? parseFloat(value) || 0 : value;
            };

            /**
             * 返回元素 偏移量 offset
             * @param element
             * @returns {{width: (Number|number), height: (Number|number), top: number, left: number}}
             */
            fn.offset = function (element) {
                var boxRect = element.getBoundingClientRect();
                var docElement = element.ownerDocument;
                return {
                    width : boxRect.width || element.offsetWidth,
                    height: boxRect.height || element.offsetHeight,
                    top   : boxRect.top + (window.pageYOffset || docElement.documentElement.scrollTop) - (docElement.documentElement.clientTop || 0),
                    left  : boxRect.left + (window.pageXOffset || docElement.documentElement.scrollLeft) - (docElement.documentElement.clientLeft || 0)
                };
            };

            /**
             * 返回元素 位置 position
             * @param element
             * @returns {{width: number, height: number, top: number, left: number}}
             */
            fn.position = function (element) {

                var offsetParentRect = {top: 0, left: 0},
                    offsetParentElement,
                    offset;

                // Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is it's only offset parent
                if (fn.css(element, 'position') === 'fixed') {

                    // We assume that getBoundingClientRect is available when computed position is fixed
                    offset = element.getBoundingClientRect();

                } else {

                    // Get *real* offsetParentElement
                    offsetParentElement = offsetParent(element);

                    // Get correct offsets
                    offset = fn.offset(element);
                    if (!nodeName(offsetParentElement, 'html')) {
                        offsetParentRect = fn.offset(offsetParentElement);
                    }

                    // Add offsetParent borders
                    offsetParentRect.top += fn.css(offsetParentElement, 'borderTopWidth', true);
                    offsetParentRect.left += fn.css(offsetParentElement, 'borderLeftWidth', true);
                }

                // Subtract parent offsets and element margins
                return {
                    width : element.offsetWidth,
                    height: element.offsetHeight,
                    top   : offset.top - offsetParentRect.top - fn.css(element, 'marginTop', true),
                    left  : offset.left - offsetParentRect.left - fn.css(element, 'marginLeft', true)
                };

            };

            /**
             * Returns the closest, non-statically positioned offsetParent of a given element
             * @required-by fn.position
             * @param element
             */
            var offsetParent = function offsetParentElement(element) {
                var docElement = element.ownerDocument;
                var offsetParent = element.offsetParent || docElement;
                if (nodeName(offsetParent, '#document')) return docElement.documentElement;
                while (offsetParent && !nodeName(offsetParent, 'html') && fn.css(offsetParent, 'position') === 'static') {
                    offsetParent = offsetParent.offsetParent;
                }
                return offsetParent || docElement.documentElement;
            };

            /**
             * Provides equivalent of jQuery's height function
             * @required-by bootstrap-affix
             * @url http://api.jquery.com/height/
             * @param element
             * @param outer
             */
            fn.height = function (element, outer) {
                var value = element.offsetHeight;
                if (outer) {
                    value += fn.css(element, 'marginTop', true) + fn.css(element, 'marginBottom', true);
                } else {
                    value -= fn.css(element, 'paddingTop', true) + fn.css(element, 'paddingBottom', true) + fn.css(element, 'borderTopWidth', true) + fn.css(element, 'borderBottomWidth', true);
                }
                return value;
            };

            /**
             * Provides equivalent of jQuery's width function
             * @required-by bootstrap-affix
             * @url http://api.jquery.com/width/
             * @param element
             * @param outer
             */
            fn.width = function (element, outer) {
                var value = element.offsetWidth;
                if (outer) {
                    value += fn.css(element, 'marginLeft', true) + fn.css(element, 'marginRight', true);
                } else {
                    value -= fn.css(element, 'paddingLeft', true) + fn.css(element, 'paddingRight', true) + fn.css(element, 'borderLeftWidth', true) + fn.css(element, 'borderRightWidth', true);
                }
                return value;
            };


            /**
             * 计算 元素 显示的 位置
             * @param placement
             * @param position
             * @param actualWidth
             * @param actualHeight
             * @returns {*}
             */
            fn.getCalculatedOffset = function getCalculatedOffset(placement, position, actualWidth, actualHeight) {
                var offset;
                var split = placement.split('-');

                switch (split[0]) {
                    case 'right':
                        offset = {
                            top : position.top + position.height / 2 - actualHeight / 2,
                            left: position.left + position.width
                        };
                        break;
                    case 'bottom':
                        offset = {
                            top : position.top + position.height,
                            left: position.left + position.width / 2 - actualWidth / 2
                        };
                        break;
                    case 'left':
                        offset = {
                            top : position.top + position.height / 2 - actualHeight / 2,
                            left: position.left - actualWidth
                        };
                        break;
                    default:
                        offset = {
                            top : position.top - actualHeight,
                            left: position.left + position.width / 2 - actualWidth / 2
                        };
                        break;
                }

                if (!split[1]) {
                    return offset;
                }

                // Add support for corners @todo css
                if (split[0] === 'top' || split[0] === 'bottom') {
                    switch (split[1]) {
                        case 'left':
                            offset.left = position.left;
                            break;
                        case 'right':
                            offset.left = position.left + position.width - actualWidth;
                    }
                } else if (split[0] === 'left' || split[0] === 'right') {
                    switch (split[1]) {
                        case 'top':
                            offset.top = position.top - actualHeight;
                            break;
                        case 'bottom':
                            offset.top = position.top + position.height;
                    }
                }

                return offset;
            };

            fn.getPosition = function getPosition(element, options) {
                if (options.container === 'body') {
                    return dimensions.offset(element || options.target);
                } else {
                    return dimensions.position(element || options.target);
                }
            };

            return fn;
        }]);

})(window, document);