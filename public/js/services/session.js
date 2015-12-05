define(['jquery', 'angular', 'services-module'], function($, angular, services){
	'use strict';

	var Session = function() {
/*these keys must match the keys that will be returned by the database*/
	    var data = this.data || {};
        var filter = {refineKnowledge:[],refineParts:[],refine:[]};
        var action = {searchParts:false,searchSysInfo:false,searchLog:false,searchKnowledge:false};
        var show = {parts:true,knowledge:true,experts:true};

        var destroy = function(){
            this.data = {};
        }

        var set = function(key,value){
            this.data[key] = value;
        }

        var get = function(key){
            return this.data[key] || {};
        }

        var del = function(key){
            this.delete(key);
        }

		return {
            destroy: destroy,
            set: set,
            get: get,
            delete:del,
            data:data,
            filter:filter,
            action:action,
            show:show
		};

	};

	services.factory('$Session', [Session]);
	return services;
});

