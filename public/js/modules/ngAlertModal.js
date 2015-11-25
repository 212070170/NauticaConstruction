require([
    'angular'
],function(angular){
       var app = angular.module("ngAlertModal",[]);
           app.value("appName","ngAlertModal");
        app.directive("ngModal",[function(){
            return{
                restrict:'E',
                scope:{
                  onOk: "=",
                  onCancel: "=",
                  onClose: "=",
                  onOpen: "=",
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

                    // Setting the defaults


                    scope.showModal = function(){
                        document.getElementById("modalBackdrop").style.visibility = "visible";
                        document.getElementById("modalBackdrop").style.opacity = "0.8";
                        document.getElementById("modal_"+scope.id).style.visibility = "visible";
                        document.getElementById("modal_"+scope.id).style.opacity = "1";
                    }


                    scope.dismissModal = function(){
                        document.getElementById("modalBackdrop").style.visibility = "hidden";
                        document.getElementById("modalBackdrop").style.opacity = "0";
                        document.getElementById("modal_"+scope.id).style.visibility = "hidden";
                        document.getElementById("modal_"+scope.id).style.opacity = "0";

                    }


                    createBackdrop();
                    createModal.apply(scope);

                    document.getElementById(scope.trigger).onclick = scope.showModal;

                }
            }
        }])
        .controller("mainCtrlr",["$scope",function($scope){
                $scope.doSomething = function(arg){
                    console.log("I did something for arg: "+ arg);

                }
        }])

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

    function createModal(){
        var scope = this;
        var doc = document;
        var modal = doc.createElement("DIV");
        modal.id = "modal_"+scope.id;
        modal.style.position = "absolute";
        modal.style.width = scope.width || "200px";
        modal.style.height = scope.height || "175px";
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
        modal.style.borderColor = scope.colorScheme || "#347";
        modal.style.boxShadow = "0px 0px 10px #000";
        modal.style.padding = "12px";
        modal.style.fontFamily = "ge-inspira,Verdana";

        var modalTitle = doc.createElement("DIV");
        modalTitle.style.color = scope.colorScheme || "#347";
        modalTitle.style.width = "100%";
        modalTitle.style.textAlign = "center";
        modalTitle.style.fontSize = "2em";
        modalTitle.style.marginBottom = "7px";
        modalTitle.innerHTML = scope.title || "";

        var modalMessage = doc.createElement("DIV");
        modalMessage.style.color = scope.messageColor || "#666";
        modalMessage.innerHTML = scope.message || "";
        modalMessage.style.width = "100%";
        modalMessage.style.fontSize = "1.9em";
        modalMessage.style.textAlign = "center";
        modalMessage.style.lineHeight = "120%";
        modalMessage.style.color = "#AAA";


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
            btnOk.style.backgroundColor = scope.btnOkColor || "#81b63d";
            btnOk.style.borderColor = scope.btnOkColor || "#81b63d";
            btnOk.style.borderRadius = "6px";
            btnOk.style.width = "75px";
            btnOk.style.marginRight = "auto";
            btnOk.style.marginLeft = "auto";
            btnOk.style.boxShadow = "0px 0px 7px #777";
            btnOk.style.fontSize = "0.9em";
            btnOk.style.cursor = "pointer";
            btnOk.style.display = typeof scope.onCancel === "function" ? "inline-block" : "block";
            btnOk.onclick = scope.onOk || {};
            btnOk.onmouseup = scope.dismissModal;

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
            btnCancel.onclick = scope.onCancel|| {};
            btnCancel.onmouseup = scope.dismissModal;


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
            btnClose.onclick = scope.onClose|| {};
            btnClose.onmouseup = scope.dismissModal;




            modalButtonGroup.appendChild(btnOk);
            if(typeof scope.onCancel === "function"){
                modalButtonGroup.appendChild(btnCancel);
                modalButtonGroup.style.width = "160px";
            }


            function resizeModal(){
                if(window.innerWidth < parseInt(modal.style.width)) {
                    console.log("resized");
                    modal.style.width = (window.innerWidth - 50) + "px";
                    modal.style.height = "auto";
                    modal.style.paddingBottom = "70px";
                }else {
                    modal.style.width = scope.width || "200px";
                    modal.style.height = scope.height || "175px";
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


})
