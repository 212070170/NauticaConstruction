
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
                    title:"Thank you for recommending our services!"
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
                        colorscheme:"#8D0A00",
                        btnOkColor:"#8D0A00"
                    }).open();
                    $form.reset.call($scope.frmTestimonial);
                }).error(function(){

                })




        }


    }]);
});