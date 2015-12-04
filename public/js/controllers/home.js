
'use strict';

define(['angular',
    'controllers-module',

], function(angular, controllers) {

    // Controller definition
    controllers.controller("HomeCtrl", ["$scope", "$rootScope","ngModalService","$form",'dataLoader', function($scope, $rootScope,modalService,$form,dataLoader) {
        $scope.sendRecommendUs = function(recommend){
            dataLoader.post("recommend",recommend).success(function(){
                modalService.create({
                    id:"recommendModal",
                    width:"300px",
                    title:"Thank you for recommending our services!",
                    colorScheme:"#6DA700",
                    btnOkColor:"#6DA700"
                }).open();
                $form.reset.call($scope.recommendus);
            }).error(function(){

            })
        }
        $scope.sendTestimonial = function(testimonial){
                dataLoader.post("testimonial",testimonial).success(function(){
                    modalService.create({
                        id:"testimonialModal",
                        width:"300px",
                        title:"Thank you!",
                        message:"Your testimonial is very important to us",
                        colorScheme:"#6DA700",
                        btnOkColor:"#6DA700"
                    }).open();
                    $scope.getTestimonials();
                    $form.reset.call($scope.frmTestimonial);
                }).error(function(){

                })
        }
        $scope.getTestimonials = function(){
            dataLoader.get("getTestimonial").success(function(data){
                $scope.testimonials = data;
                $scope.randomTest = $scope.getRandomTest();
            }).error(function(){
                $log.error("Could not get testimonials data");
            })
        }();
        $scope.getRandomTest = function(){
            var rand =  Math.floor(Math.random() * $scope.testimonials.length  ) + 0;
            return $scope.testimonials[rand];
        };

    }]);
});