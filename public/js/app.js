/**
 * Created by 212070170 on 8/11/2014.
 */
define([
    'require',
    'jquery',
    'angular',
    'angular-resource',
    'directives/main',
    'filters/main',
    'services/main',
    'controllers/main',
    'routes',
    'interceptors',
    'ngAlertModal',
    'inputMask'
], function (require, $, angular, ngResource, directives, filters, services, controllers, routes, interceptors,alertmodal, inputMask ) {
    'use strict';

    /**
     * Application definition
     * This is where the AngularJS application is defined and all application dependencies declared.
     * @type {module}
     */
    var myApp = angular.module('myApp', [
        'ngResource',
        'app.controllers',
        'app.directives',
        'app.services',
        'app.filters',
        'app.routes',
        'app.interceptors',
        'ngAlertModal',
        'fa.input.mask'

    ]);

    myApp.run(['$location', '$rootScope', function($location, $rootScope) {
   /* this is the app run module*/

    }]);


    myApp.controller('MainCtrl',['$scope','$rootScope','Session_factory','$timeout', function($scope,$rootScope,session,$timeout){
        //Global application object
        window.App = $rootScope.App = {
            version: '1.0',
            name: 'Nautica Construction',
            session: {},
            tabs: [
                {state: 'photos', label: "photos", icon:"fa fa-camera"},
                {state: 'about', label: "about", icon:"fa fa-lightbulb-o"}
//                {state: '.', label: "payments", icon:"fa fa-credit-card"}
            ]
        };


        $timeout(function(){
            $scope.stats = [1,2,3];
        },2000);
        //Unbind all widgets from datasources and widgets when page changes
        $rootScope.$on('$routeChangeStart', function () {
            //vRuntime.binder.unbindAll();
        });

        $rootScope.logout = function (event) {
            event.preventDefault();
            location.replace('logout');
        };



    }])
    //Set on window for debugging
    window.myApp = myApp;


    require(['jquery','bootstrap-3.2.0'],function(){
        $('.dropdown-toggle').dropdown();
    });

    //Return the application  object
    return myApp;
});