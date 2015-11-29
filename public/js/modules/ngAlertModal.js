require([
    'angular'
],function(a){
    var app = angular.module("ngAlertModal",[]);
    app.value("appName","ngAlertModal");
    app.service("ngModalService",[function(){
        var self = this;
            self.options = {};
        var service = {};
        service.create = function(options){
          /*

           options = {
           id:"modal001",
           width:"500px",
           height:"400px",
           colorScheme:"#FF0000",
           btnOkColor:"#347",
           trigger:"btnContact",
           condition:"",
           onOk:"",
           onCancel:"",
           onOpen:"",
           onClose:""
           }

           */
            createBackdrop();
            createModal(options);
            if(options.trigger !== undefined) document.getElementById(options.trigger).onclick = service.open;
            return service;

        }

        service.open = function(){
                    document.getElementById("modalBackdrop").style.visibility = "visible";
                    document.getElementById("modalBackdrop").style.opacity = "0.8";
                    document.getElementById("modal_"+ self.options.id).style.visibility = "visible";
                    document.getElementById("modal_"+ self.options.id).style.opacity = "1";
            }

        service.close = function(){
            document.getElementById("modalBackdrop").style.visibility = "hidden";
            document.getElementById("modalBackdrop").style.opacity = "0";
            document.getElementById("modal_"+self.options.id).style.visibility = "hidden";
            document.getElementById("modal_"+self.options.id).style.opacity = "0";
        }

        service.destroy = function(){

        }


        /***************** SUPPORTING FUNCTIONS *********************/
        function createBackdrop(){
            var doc = document;
            var backdrop;

            if(doc.getElementById("modalBackdrop") === undefined || doc.getElementById("modalBackdrop") === null ){
                backdrop = doc.createElement("DIV");
                backdrop.id = "modalBackdrop";
                backdrop.style.position = "absolute";
                backdrop.style.backgroundColor = "#000";
                backdrop.style.height = "100%";
                backdrop.style.width = "100%";
                backdrop.style.top = "0px";
                backdrop.style.left = "0px";
                backdrop.style.opacity = "0.8";
                backdrop.style.zIndex = "1001";
                // backdrop.style.display = "none";

                backdrop.style.visibility = "hidden";
                backdrop.style.opacity = "0";
                backdrop.style.transition = "opacity 0.5s linear";
                backdrop.style.webkitTransition = "opacity 0.5s linear";
                backdrop.style.mozTransition = "opacity 0.3s linear";
                doc.body.appendChild(backdrop);

            }
        }
        function createModal(options){
            self.options = options;

            var doc = document;
            var modal = doc.createElement("DIV");
            modal.id = "modal_"+options.id;
            modal.style.position = "absolute";
            modal.style.width = options.width || "200px";
            modal.style.height = options.height || "175px";
            modal.style.top = "50%";
            modal.style.left = "50%";
            modal.style.transform = "translate(-50%,-50%)";
            modal.style.webkitTransform = "translate(-50%,-50%)";
            modal.style.msTransform = "translate(-50%,-50%)";
            modal.style.display = "block";
            modal.style.backgroundColor = "#FFF";
            modal.style.zIndex = "1002";
            modal.style.borderRadius = "20px";
            modal.style.borderWidth = "6px";
            modal.style.borderStyle = "solid";
            modal.style.borderColor = options.colorScheme || "#347";
            modal.style.boxShadow = "0px 0px 10px #000";
            modal.style.padding = "15px";
            modal.style.fontFamily = "ge-inspira,Verdana";

            var modalTitle = doc.createElement("DIV");
            modalTitle.style.color = options.colorScheme || "#347";
            modalTitle.style.width = "100%";
            modalTitle.style.textAlign = "center";
            modalTitle.style.fontSize = "1.5em";
            modalTitle.style.marginBottom = "10px";
            modalTitle.innerHTML = options.title || "";

            var modalMessage = doc.createElement("DIV");
            modalMessage.style.color = options.messageColor || "#666";
            modalMessage.innerHTML = options.message || "";
            modalMessage.style.width = "100%";
            modalMessage.style.fontSize = "1.2em";
            modalMessage.style.textAlign = "center";
            modalMessage.style.lineHeight = "140%";


            var modalButtonGroup = doc.createElement("DIV");
            modalButtonGroup.style.padding = "10px";
            modalButtonGroup.style.position = "absolute";
            modalButtonGroup.style.bottom = "0px";
            modalButtonGroup.style.marginLeft = "auto";
            modalButtonGroup.style.marginRight = "auto";
            modalButtonGroup.style.width = "75px";
            modalButtonGroup.style.left = "50%";
            modalButtonGroup.style.transform = "translate(-50%)";
            modalButtonGroup.style.webkitTransform = "translate(-50%)";
            modalButtonGroup.style.msTransform = "translate(-50%)";
            modalButtonGroup.style.display = "block";

            var btnOk = doc.createElement("BUTTON");
            btnOk.innerHTML = "ok";
            btnOk.style.padding = "10px";
            btnOk.style.color = "#FFF";
            btnOk.style.border = "2px solid #81b63d";
            btnOk.style.backgroundColor = options.btnOkColor || "#81b63d";
            btnOk.style.borderColor = options.btnOkColor || "#81b63d";
            btnOk.style.borderRadius = "6px";
            btnOk.style.width = "75px";
            btnOk.style.marginRight = "auto";
            btnOk.style.marginLeft = "auto";
            btnOk.style.boxShadow = "0px 0px 7px #777";
            btnOk.style.fontSize = "0.9em";
            btnOk.style.cursor = "pointer";
            btnOk.style.display = typeof options.onCancel === "function" ? "inline-block" : "block";
            btnOk.onclick = options.onOk || {};
            btnOk.onmouseup = service.close;

            var btnCancel = doc.createElement("BUTTON");
            btnCancel.innerHTML = "cancel";
            btnCancel.style.padding = "10px";
            btnCancel.style.color = "#FFF";
            btnCancel.style.backgroundColor = "#FF4941";
            btnCancel.style.border = "2px solid #FF4941";
            btnCancel.style.borderRadius = "6px";
            btnCancel.style.width = "75px";
            btnCancel.style.marginLeft = "10px";
            btnCancel.style.boxShadow = "0px 0px 7px #777";
            btnCancel.style.fontSize = "0.9em";
            btnCancel.style.display = "inline-block";
            btnCancel.style.cursor = "pointer";
            btnCancel.onclick = options.onCancel|| {};
            btnCancel.onmouseup = service.close;


            var btnClose = doc.createElement("BUTTON");
            btnClose.innerHTML = "x";
            btnClose.style.position = "absolute";
            btnClose.style.top = "0px";
            btnClose.style.right = "0px";
            btnClose.style.border = "none";
            btnClose.style.fontSize = "1.3em";
            btnClose.style.fontWeight = "bold";
            btnClose.style.color = this.colorScheme || "#347";
            btnClose.style.padding = "2px 10px";
            btnClose.style.backgroundColor = "transparent";
            btnClose.style.cursor = "pointer";
            btnClose.onclick = options.onClose|| {};
            btnClose.onmouseup = service.close;




            modalButtonGroup.appendChild(btnOk);
            if(typeof options.onCancel === "function"){
                modalButtonGroup.appendChild(btnCancel);
                modalButtonGroup.style.width = "180px";
            }


            function resizeModal(){
                if(window.innerWidth < parseInt(modal.style.width)) {
                    console.log("resized");
                    modal.style.width = (window.innerWidth - 50) + "px";
                    modal.style.height = "auto";
                    modal.style.paddingBottom = "70px";
                }else {
                    modal.style.width = options.width || "200px";
                    modal.style.height = options.height || "175px";
                    modal.style.paddingBottom = "15px";
                }
            }
            resizeModal();
            window.onresize = resizeModal;

            modal.appendChild(btnClose);

            modal.appendChild(modalTitle);
            modal.appendChild(modalMessage);
            modal.appendChild(modalButtonGroup);

            modal.style.visibility = "hidden";
            modal.style.opacity = "0";
            modal.style.transition = "opacity 0.5s linear";
            modal.style.webkitTransition = "opacity 0.5s linear";
            modal.style.mozTransition = "opacity 0.3s linear";

            document.body.appendChild(modal);

        }

        return service;
    }])
    app.service("$form",["$log",function($log){

        var reset = function(){
                if(this.$name !== undefined){
                    $("[name="+this.$name+"]").find("input,textarea").each(function(i,e){
                        var el = $(this);
                        if(el.attr("type") !== "submit")
                            el.val("");
                    })
                    this.$setPristine();
                }else{
                    $log.error("Please set the attribute name on the form before calling the reset method");
                }

        }
        return {
            reset: reset
        }
    }])
    app.directive("ngModal",["ngModalService",function(modalService){
        return{
            restrict:'E',
            scope:{
                onOk: "&",
                onCancel: "&",
                onClose: "&",
                onOpen: "&",
                id: "@",
                colorScheme: "@",
                btnOkColor: "@",
                width: "@",
                height: "@",
                title: "@",
                message: "@",
                trigger: "@"

            },
            link: function(scope,element,attrs){
                modalService.create({
                    id:scope.id,
                    title:scope.title,
                    message:scope.message,
                    width:scope.width,
                    height:scope.height,
                    colorScheme:scope.colorScheme,
                    btnOkColor:scope.btnOkColor,
                    trigger:scope.trigger,
                    condition:"",
                    onOk:scope.onOk,
                    onCancel:scope.onCancel,
                    onOpen:scope.onOpen,
                    onClose:scope.onClose
                });





            }
        }
    }])
    app.directive("ngSlide",[
        '$timeout',
        function($timeout) {
            return {
                restrict: 'E',
                replace: true,
                require: '?ngModel',
                transclude: true,
                scope: {
                    slide_id : "@id",
                    dir : "@from",
                    bhvr: "@behavior",
                    trigger: "@",
                    width: "@",
                    onClose: "="
                },
                template:
                    '<div class="slidingPanel">' +
                    '<div ng-transclude></div>' +
                    '</div>',

                link: function (scope, element, attr) {
                    scope.show = false;
                    element = element[0];
                    var parentCoord = element.parentElement.getBoundingClientRect();
                    var es = element.style;
                    es.backgroundColor = "#000";
                    es.height = window.innerHeight;
                    es.width = scope.width || "290px";
                    es.position = "absolute";
                    es.top = "0px";
                    es.zIndex = "1001";
                    es.color = "#FFF";
                    es.padding = "25px";
                    es.fontFamily = "Georgia, Verdana";
                    es[scope.dir]= "-" + ( parentCoord.left + parseInt(es.width) + parseInt(es.padding) * 2) + "px";
                    es.transition = scope.dir + " 0.3s linear";
                    es.webkitTransition = scope.dir + " 0.3s linear";
                    es.mozTransition = scope.dir + " 0.3s linear";
                    es.opacity = "0.94";


                    var btnClose = document.createElement("BUTTON");
                    var bcs = btnClose.style;
                    btnClose.innerHTML = "x";
                    bcs.position = "absolute";
                    bcs.top = "0px";
                    if(scope.dir === "left")
                        bcs.right = "0px";
                    else
                        bcs.left = "0px";
                    bcs.border = "none";
                    bcs.fontSize = "1.3em";
                    bcs.fontWeight = "bold";
                    bcs.color = this.colorScheme || "#347";
                    bcs.padding = "2px 10px";
                    bcs.backgroundColor = "transparent";
                    bcs.cursor = "pointer";
                    btnClose.onclick = scope.onClose|| {};
                    btnClose.onmouseup = function(){
                        es[scope.dir]= "-" + ( parentCoord.left + parseInt(es.width) + parseInt(es.padding) * 2) + "px";
                    };

                    element.appendChild(btnClose);

                    var trigger = document.getElementById(scope.trigger);
                    trigger.onclick = function(){
                        if(scope.show === false){
                            es[scope.dir] = - parentCoord.left + "px";
                            scope.show = true;
                        }else{
                            es[scope.dir]= "-" + ( parentCoord.left + parseInt(es.width) + parseInt(es.padding) * 2) + "px";
                            scope.show = false;
                        }
                    }
                }
            }

        }])
        .controller("mainCtrlr",["$scope",function($scope){
            $scope.doSomething = function(arg){
                console.log("I did something for arg: "+ arg);

            }
        }])




})
