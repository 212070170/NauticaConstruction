/*

SSO: 212070170  |  EMAIL: fabioalmeida@ge.com   |   Date: 07/28/2015

*/

/*global define */
define(['jquery', 'angular', 'directives-module','spin'], function ($, angular, directives, Spinner) {
    'use strict';
    var waitFor = function($log, $timeout) {
        return {
            restrict: 'A',
            link: function($scope, element, attrs) {
             	var $element = $(element);
                  $element.children().hide(); 
                  $element.addClass("waitfor");
                  $element.css("position","relative");
			    var options = {
			        lines: 11, // The number of lines to draw
			        length: 7, // The length of each line
			        width: 3, // The line thickness
			        radius: 6, // The radius of the inner circle
			        corners: 1, // Corner roundness (0..1)
			        rotate: 0, // The rotation offset
			        direction: 1, // 1: clockwise, -1: counterclockwise
			        color: '#666', // #rgb or #rrggbb or array of colors
			        speed: 1.7, // Rounds per second
			        trail: 100, // Afterglow percentage
			        shadow: false, // Whether to render a shadow
			        hwaccel: true, // Whether to use hardware acceleration
			        className: 'spinner', // The CSS class to assign to the spinner

			    };

           	attrs.$observe('waitFor',function(val){
            		// This directive requires that $scope.$apply be called in the parent scole when the variable changes
                var spinElement = element[0];
                if(val == "true"){
                    $(spinElement).find(".spinner").remove();
                    $element.children().show();
                }else{
                    console.log("SPINNER");
                  $element.children().hide();
                    var spinner = new Spinner(options).spin(spinElement);

                    if(attrs.waitForMessage != "" && attrs.waitForMessage != null && attrs.waitForMessage != undefined){
                    var spinner = $(element).find(".spinner")[0];
                        $(spinner).append("<div class='waitforlabel'>"+ attrs.waitForMessage +"</div>");
                  }
                }
            	}); 
  
            }
        };
    };

    /* Directives  */
    directives.directive('waitFor', [ '$log', '$timeout', waitFor ]);

    return directives;
});
