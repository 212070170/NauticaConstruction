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
    'inputMask',
    'dataFactory'
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
        'fa.input.mask',
        'dataFactory'

    ]);

    myApp.run(['$location', '$rootScope', function($location, $rootScope) {
   /* this is the app run module*/

    }]);


    myApp.controller('MainCtrl',['$scope','$log','$rootScope','Session_factory','$timeout',"ngModalService","$form",'dataLoader','$Session', function($scope,$log,$rootScope,session,$timeout,modalService,$form,dataLoader,$session){
        // Set up session variables to share data between controllers
        var sess = $scope.session = $session;

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



        dataLoader.endpoint.add("info","http://www.eliteinsite.com/api/nautica/comment/?apiKey=localhost:63342");
        dataLoader.endpoint.add("stats","http://www.eliteinsite.com/api/nautica/stats/?apiKey=localhost:63342");
        dataLoader.endpoint.add("comment","http://www.eliteinsite.com/api/nautica/comment/?apiKey=eliteinsite.com");
        dataLoader.endpoint.add("recommend","http://www.eliteinsite.com/api/nautica/recommend/?apiKey=localhost:63342");
        dataLoader.endpoint.add("payment","http://www.eliteinsite.com/api/nautica/getPayments/?apiKey=localhost:63342&:email&:phone");
        dataLoader.endpoint.add("testimonial","http://www.eliteinsite.com/api/nautica/testimonial/?apiKey=localhost:63342");
        dataLoader.endpoint.add("getTestimonial","http://www.eliteinsite.com/api/nautica/getTestimonial/?apiKey=localhost:63342");

        $scope.getStats = function(){
            dataLoader.get("stats").success(function(data){
                $scope.stats = data;
            }).error(function(){
                $log.error("Could not get stats data");
            })
        }();

        $scope.sendContactMessage = function(contact){
            dataLoader.post("comment",contact).success(function(){
                modalService.create({
                    id:"contactModal",
                    width:"300px",
                    title:"Thank you!",
                    message:"We will be contacting you shortly",
                    colorScheme:"#6DA700",
                    btnOkColor:"#6DA700"
                }).open();
                $form.reset.call($scope.contactform);
            }).error(function(){

            })

        }








    }])
    //Set on window for debugging
    window.myApp = myApp;


    //Return the application  object
    return myApp;
});