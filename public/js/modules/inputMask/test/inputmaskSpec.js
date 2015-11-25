describe(":: Input Mask Angular Module :: ", function(){
    beforeEach(module('fa.input.mask'));

    var scope,element,$viewValue;

    beforeEach(inject(function($rootScope, $compile, $controller){
        scope = $rootScope;
        element = angular.element('<input type="text" ng-model="myValue" fa-input-mask-phone/>');
        $compile(element)(scope);
        scope.myValue = "5164932813";
        scope.$digest();
        $viewValue = $(element).val();

        //myController = $controller('MyController',{$scope:scope});
    }));

    it('US Phone Mask (999)999-9999: ', function(){
        expect($viewValue.search(/\([0-9]{3}\)[0-9]{3}\-[0-9]{4}/)).toBeGreaterThan(-1);
    })
    it('ng-model value to contains only numbers [0,10] ', function(){
        expect(scope.myValue.search(/[0-9]{0,10}/)).toBeGreaterThan(-1);

    })
});