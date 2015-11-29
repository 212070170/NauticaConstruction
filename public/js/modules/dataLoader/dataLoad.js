// Load the module via require
// add as a dependency in the app
// use the services in the app

require([
    'angular',
    'underscore'
],function(a,_){
    var app = angular.module("dataFactory",[]);
    app.value("appName","dataFactory");

    /**
     * @author Sandeep Prasad
     *
     * The data source module is responsible for communication with the server around the
     * same origin policy.
     *
     * Example Usage
     * =============
     *
     * var sampleDS = DS('http://host:8080/service/posts/:id');
     *
     * sampleDS.get().success(onSuccess); // Returns all instances of the resource.
     * sampleDS.post({ title: "Hello World" }); // CREATE
     * sampleDS.get({ id: 1 }); // RETRIEVE
     * sampleDS.put({ id: 1 }, { title: "Another Title" }); // UPDATE
     * sampleDS.remove({ id: 1 }); // DELETE
     *
     *
     * You can also specify default values while creating the data source.
     *
     * var userSearchDS = DS('http://host:8080/service/userSearch?source=:source&&sso=:sso', { source: 'ldap' });
     *
     * Can be used for RESTful resources as described above as well as for just a simple web service call.
     *
     * var serviceDS = DS('http://host:8080/service/getCatalogue/:systemId?page=:page', { page: -1 });
     * serviceDS.post();
     **/

    var FactoryDataSource = function($http) {
        // The regex used for parsing dynamic parts in the URL.
        var regex = /[a-zA-Z]+/;
        // Regex for path params.
        var path = /\/:[a-zA-Z]+/g;
        // Regex for query params.
        var query = /[^\/]:[a-zA-Z]+/g;

        // The data source constructor. Supports RESTful communication.
        // The url supports path param and query params.
        // http://localhost:9090/services/projects/:id
        // http://localhost:9090/services/projects?:season&&:active
        var DataSource = function(url, defaults) {
            // use the ge proxy?
            var useProxy = false;

            // The generic function for making an AJAX request.
            var invoke = function(url, method, data) {
                return $http({
//					url: url,
                    url: useProxy ? "/api/v2/proxy" : url,
                    method: method,
                    headers: {
                        "Service-End-Point": url
                    },
                    data: data
                }).success(function(data) {
                    // Unwrap the data before returning it.
                    if(typeof data.data !== 'undefined')
                        data = data.data;

                    // Fire that event.
                    trigger(method, data);

                    // Return the unwrapped data.
                    return data;
                });
            };

            // The function for processing the params within the URL.
            var processParams = function(params) {
                // Initialize the params object if undefined.
                params = params || {};
                // Initialize some defaults.
                _.defaults(params, defaults);

                // First let's replace all the dynamic params. For that we will create a placeholder for the new URL created.
                var newUrl = url;

                // Let's start with path params.
                var pathParams = url.match(path);

                // Iterate over the path params matched.
                _.each(pathParams, function(param) {
                    var matches = param.match(regex)

                    if(matches.length !== 0) {
                        var attr = matches[0];

                        if(typeof attr !== 'undefined') {
                            if(typeof params[attr] !== 'undefined')
                                newUrl = newUrl.replace(param, "/" + params[attr]);
                            else
                                newUrl = newUrl.replace(param, "");
                        }
                    }
                });

                // Let's do query params now.
                var queryParams = url.match(query);

                // Iterate over the query params matched.
                _.each(queryParams, function(param) {
                    var matches = param.match(regex);

                    if(matches.length !== 0) {
                        var attr = matches[0];

                        if(typeof attr !== 'undefined') {
                            if(typeof params[attr] !== 'undefined')
                                newUrl = newUrl.replace(param, param[0] + attr + "=" + params[attr]);
                            else
                                newUrl = newUrl.replace(param, param[0] + attr + "=");
                        }
                    }
                });

                // Return the new URL.
                return newUrl;
            };

            // Method for sending out a GET request. If no params are specified,
            // the request goes out to fetch the whole resource collection.
            var get = function(params,callback) {
                if(typeof params === "function"){
                    callback = params;
                    params = null;
                }
                var url = processParams(params);

                return invoke(url, "GET", {})
                    .success(function(data){
                        var response = {"error":false,"message":"","data":data,"dlength":data.length};
                        if(typeof callback === "function"){
                            return callback(response);
                        } else {
                            return response;
                        }
                    })
                    .error(function(message){
                        var response = {"error":true,"message":message, data:[],"dlength":0};
                        if(typeof callback === "function"){
                            return callback(response);
                        } else {
                            return response;
                        }
                    });

            };

            // Method for sending out a POST request. If the params are not specified,
            // the request goes out to the URL without the params.
            var post = function(params, data, callback) {
                if(typeof data === "function"){
                    callback = data;
                    data = undefined;
                }
                if(typeof data === 'undefined') {
                    data = params;
                    params = undefined;
                }

                var url = processParams(params);

                return invoke(url, "POST", data)
                    .success(function(data){
                        var response = {"error":false,"message":"","data":data,"dlength":data.length};
                        if(typeof callback === "function"){
                            return callback(response);
                        } else {
                            return response;
                        }
                    })
                    .error(function(message){
                        var response = {"error":true,"message":message, data:[],"dlength":0};
                        if(typeof callback === "function"){
                            return callback(response);
                        } else {
                            return response;
                        }
                    });
            };

            // Method for sending out a PUT request.
            var put = function(params, data) {
                var url = processParams(params);

                return invoke(url, "PUT", data);
            };

            // Method for sending out a DELETE request.
            var remove = function(params) {
                var url = processParams(params);

                return invoke(url, "DELETE", {});
            };

            var callbacks = {};
            var errorCallbacks = {};

            var on = function(event, callback) {
                callbacks[event] = callbacks[event] || [];

                callbacks[event].push(callback);
            };

            var trigger = function(event, data) {
                callbacks[event] = callbacks[event] || [];

                _.each(callbacks[event], function(callback) {
                    callback.call(null, data);
                });
            };

            // Return the closure.
            return {
                get: get,
                post: post,
                put: put,
                remove: remove,
                on: on,
                trigger: trigger
            };
        };

        // Sneaky sneaky... Sshhhh...
        var _m = function() {
            return DataSource.apply(null, arguments);
        }

        // Put it on the browser's global scope.
        if(typeof window !== 'undefined')
            window.DS = _m;

        // Return the data source constructor.
        return _m;
    };
    app.service("dataSource",["$http",FactoryDataSource]);

    var dataLoader = function(DS) {

        var data = [];

        var endpoint = {};
            endpoint.store = {};

            endpoint.add = function(name,url){
                console.log("added");
                endpoint.store[name] = DS(url);
                return endpoint.store;
            }

            endpoint.delete = function(name){
                delete endpoint.store[name];
                return endpoint.store;
            }

            endpoint.clearAll = function(){
                endpoint.store = {};
            }


        var get = function(ep,params,callback) {
            return endpoint.store[ep].get(params,callback)
        };

        var post = function(ep,params,callback) {
            return endpoint.store[ep].post(params,callback)
        };

        return {
            endpoint: endpoint,
            get: get,
            post:post,
            data: data
        };
    };
    // Factory function. Generate an instance of the parts loader.
    var FactoryDataLoader = function() {
        var loader = dataLoader.apply(null, arguments);

        window.loader = loader;
        return loader;
    };
    app.service("dataLoader",['dataSource', FactoryDataLoader]);
})
