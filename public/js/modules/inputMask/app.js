require(['angular','string-mask'],function(a,StringMask){

    var app = angular.module("fa.input.mask",[]);
    app.value('appName',"fa.input.mask");

    // Locale Configs
    var us = {
        date : translate.call("MM/DD/YYYY",'[YMD]','0','g'),
        ccexp : translate.call("MM/YYYY",'[YM]','0','g'),
        phone : translate.call("(999)999-9999",'9','0','g'),
        zip : translate.call("00000-9999",'9','0','g'),
        money : translate.call("US$0,000.00",'0','0','g')
    }
    var br = {
        date : translate.call("YYYY/MM/DD",'[YMD]','0','g'),
        ccexp : translate.call("MM/YYYY",'[YM]','0','g'),
        phone : translate.call("(99)9999-9999",'9','0','g'),
        zip : translate.call("00000-999",'9','0','g'),
        money : translate.call("R$#.##0,00",'0','0','g')

    }

    var mask_locale = us;
    var masks = mask_locale || us;

    // Supporting Functions
    function translate(regex,repl,flag){
        var flag = flag || "";
        var regex = new RegExp(regex,flag);
        var translated = this.replace(regex,repl);
        
        return translated;
    }
    function clean(){
        return this.replace(/[^0-9]/g, '');
    }
    function trim(){
        return this.replace(/[^0-9]$/, '');
    }


    // Moule directives
    app.directive("faInputMaskPhone",[function(){
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ctrl) {
                function formatter(value) {

                    var mask = new StringMask(masks.phone);

                    // Handles the input value before it is passed to he model value
                    if (ctrl.$isEmpty(value)) {
                        return value;
                    }

                    // Removes the non numeric digits before it is passed to the model
                    var formattedValue = clean.call(value);
                        // Applied the mask
                        formattedValue = mask.apply(formattedValue) || "";

                    // Trims the extra trailing spaces before it is passed to the model

                    formattedValue = trim.call(formattedValue);

                    // Returns the formated value
                    // This value (the return of the $formatters) is now passed to the parser (as an input to $parsers) automatically
                    return formattedValue;
                }

                function parser(value){
                    if(ctrl.$isEmpty(value)){
                        return value;
                    }

                    // Calls the formatter method to properly format the input
                    var formattedValue = formatter(value);

                    // Checks if the value in the view is different than the formatted value
                    // if it is, then set the view value to the formatted value
                    if (ctrl.$viewValue !== formattedValue){
                        ctrl.$setViewValue(formattedValue);
                        ctrl.$render();
                    }
                    return clean.call(value);;

                }

                // Adding to $formatters pipeline in case the change is initiated not from the ui but rather from the ng-model value
                // Once all the $formatters are executed the value is then displayed in the DOM
                ctrl.$formatters.push(formatter);
                ctrl.$parsers.push(parser);


                ctrl.$validators.phone = function validator(modelValue, viewValue) {
                    // The ng-model variable only gets set when the validator returns true
                    if (ctrl.$isEmpty(modelValue)) {
                        return true;
                    }

                    // Checks if what i am displaying in the view has the same number of characters as the expected mask
                    return viewValue.length === masks.phone.length;
                };
            }
        };
    }])
    app.directive("faInputMaskZip",[function(){
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ctrl) {
                function formatter(value) {

                    var mask = new StringMask(masks.zip);

                    // Handles the input value before it is passed to he model value
                    if (ctrl.$isEmpty(value)) {
                        return value;
                    }

                    // Removes the non numeric digits before it is passed to the model
                    var formattedValue = clean.call(value);
                        // Applied the mask
                        formattedValue = mask.apply(formattedValue) || "";

                    // Trims the extra trailing spaces before it is passed to the model

                    formattedValue = trim.call(formattedValue);

                    // Returns the formated value
                    // This value (the return of the $formatters) is now passed to the parser (as an input to $parsers) automatically
                    return formattedValue;
                }

                function parser(value){
                    if(ctrl.$isEmpty(value)){
                        return value;
                    }

                    // Calls the formatter method to properly format the input
                    var formattedValue = formatter(value);

                    // Checks if the value in the view is different than the formatted value
                    // if it is, then set the view value to the formatted value
                    if (ctrl.$viewValue !== formattedValue){
                        ctrl.$setViewValue(formattedValue);
                        ctrl.$render();
                    }
                    return clean.call(value);;

                }

                // Adding to $formatters pipeline in case the change is initiated not from the ui but rather from the ng-model value
                // Once all the $formatters are executed the value is then displayed in the DOM
                ctrl.$formatters.push(formatter);
                ctrl.$parsers.push(parser);


                ctrl.$validators.zip = function validator(modelValue, viewValue) {
                    // The ng-model variable only gets set when the validator returns true
                    if (ctrl.$isEmpty(modelValue)) {
                        return true;
                    }

                    // Checks if what i am displaying in the view has the same number of characters as the expected mask
                    return viewValue.length === masks.phone.length;
                };
            }
        };
    }])
    app.directive("faInputMaskDate",[function(){
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ctrl) {
                function formatter(value) {

                    var mask = new StringMask(masks.date);

                    // Handles the input value before it is passed to he model value
                    if (ctrl.$isEmpty(value)) {
                        return value;
                    }

                    // Removes the non numeric digits before it is passed to the model
                    var formattedValue = clean.call(value);
                    // Applied the mask
                    formattedValue = mask.apply(formattedValue) || "";

                    // Trims the extra trailing spaces before it is passed to the model

                    formattedValue = trim.call(formattedValue);

                    // Returns the formated value
                    // This value (the return of the $formatters) is now passed to the parser (as an input to $parsers) automatically
                    return formattedValue;
                }

                function parser(value){
                    if(ctrl.$isEmpty(value)){
                        return value;
                    }

                    // Calls the formatter method to properly format the input
                    var formattedValue = formatter(value);

                    // Checks if the value in the view is different than the formatted value
                    // if it is, then set the view value to the formatted value
                    if (ctrl.$viewValue !== formattedValue){
                        ctrl.$setViewValue(formattedValue);
                        ctrl.$render();
                    }
                    return clean.call(value);;

                }

                // Adding to $formatters pipeline in case the change is initiated not from the ui but rather from the ng-model value
                // Once all the $formatters are executed the value is then displayed in the DOM
                ctrl.$formatters.push(formatter);
                ctrl.$parsers.push(parser);


                ctrl.$validators.date = function validator(modelValue, viewValue) {
                    // The ng-model variable only gets set when the validator returns true
                    if (ctrl.$isEmpty(modelValue)) {
                        return true;
                    }

                    // Checks if what i am displaying in the view has the same number of characters as the expected mask
                    return viewValue.length === masks.date.length;
                };
            }
        };
    }])
    app.directive("faInputMaskCcExp",[function(){
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ctrl) {
                function formatter(value) {

                    var mask = new StringMask(masks.ccexp);

                    // Handles the input value before it is passed to he model value
                    if (ctrl.$isEmpty(value)) {
                        return value;
                    }

                    // Removes the non numeric digits before it is passed to the model
                    var formattedValue = clean.call(value);
                    // Applied the mask
                    formattedValue = mask.apply(formattedValue) || "";

                    // Trims the extra trailing spaces before it is passed to the model

                    formattedValue = trim.call(formattedValue);

                    // Returns the formated value
                    // This value (the return of the $formatters) is now passed to the parser (as an input to $parsers) automatically
                    return formattedValue;
                }

                function parser(value){
                    if(ctrl.$isEmpty(value)){
                        return value;
                    }

                    // Calls the formatter method to properly format the input
                    var formattedValue = formatter(value);

                    // Checks if the value in the view is different than the formatted value
                    // if it is, then set the view value to the formatted value
                    if (ctrl.$viewValue !== formattedValue){
                        ctrl.$setViewValue(formattedValue);
                        ctrl.$render();
                    }
                    return clean.call(value);;

                }

                // Adding to $formatters pipeline in case the change is initiated not from the ui but rather from the ng-model value
                // Once all the $formatters are executed the value is then displayed in the DOM
                ctrl.$formatters.push(formatter);
                ctrl.$parsers.push(parser);


                ctrl.$validators.date = function validator(modelValue, viewValue) {
                    // The ng-model variable only gets set when the validator returns true
                    if (ctrl.$isEmpty(modelValue)) {
                        return true;
                    }

                    // Checks if what i am displaying in the view has the same number of characters as the expected mask
                    return viewValue.length === masks.ccexp.length;
                };
            }
        };
    }])
    app.directive("faInputMaskMoney",[function(){
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ctrl) {
                function formatter(value) {

                    var mask = new StringMask(masks.money,{reverse:true});

                    // Handles the input value before it is passed to he model value
                    if (ctrl.$isEmpty(value)) {
                        return value;
                    }

                    // Removes the non numeric digits before it is passed to the model
                    var formattedValue = clean.call(value);
                    // Applied the mask
                    formattedValue = mask.apply(formattedValue) || "";

                    // Trims the extra trailing spaces before it is passed to the model

                    formattedValue = trim.call(formattedValue);

                    // Returns the formated value
                    // This value (the return of the $formatters) is now passed to the parser (as an input to $parsers) automatically
                    return formattedValue;
                }

                function parser(value){
                    if(ctrl.$isEmpty(value)){
                        return value;
                    }

                    // Calls the formatter method to properly format the input
                    var formattedValue = formatter(value);

                    // Checks if the value in the view is different than the formatted value
                    // if it is, then set the view value to the formatted value
                    if (ctrl.$viewValue !== formattedValue){
                        ctrl.$setViewValue(formattedValue);
                        ctrl.$render();
                    }
                    return clean.call(value);

                }

                // Adding to $formatters pipeline in case the change is initiated not from the ui but rather from the ng-model value
                // Once all the $formatters are executed the value is then displayed in the DOM
                ctrl.$formatters.push(formatter);
                ctrl.$parsers.push(parser);


                ctrl.$validators.date = function validator(modelValue, viewValue) {
                    // The ng-model variable only gets set when the validator returns true
                    if (ctrl.$isEmpty(modelValue)) {
                        return true;
                    }
                    
                    // Checks if what i am displaying in the view has the same number of characters as the expected mask
                    return viewValue.length === masks.money.length;
                };
            }
        };
    }])

})


