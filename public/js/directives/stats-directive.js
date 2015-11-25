/*global define */
define(['angular', 'directives-module'], function(angular, directives) {
    'use strict';

    /* Directives  */
    directives.directive('statsDirective', ['version', function(version) {
        return {
            restrict: 'E',
            transclude:true,
            scope:{
                mainTitle:"@",
                subTitle:"@",
                value: "@",
                color: "@"
            },
            template:"" +
                "<div class='stats-container'>" +
                "<div class='stats-title-1'>{{mainTitle}}</div>" +
                "<div class='stats-title-2'>{{subTitle}}</div>" +
                "<div class='stats-value' style='color:{{color}}'>{{value}}</div>" +
                "<div class='' ng-transclude></div>" +

                "</div>",

            link: function(scope, elm, attrs) {
            }
        }
    }]);

    return directives;
});