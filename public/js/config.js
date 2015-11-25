/**
 * Created by 212070170 on 8/11/2014.
 */
require.config({
    enforceDefine : false,
    
    paths:{
        app:'./app',
        angular: '../components/angular/angular',
        lessjs: './less.min',
        'angular-resource': '../components/angular-resource/angular-resource',
        'angular-route': '../components/angular-route/angular-route',
        require: '../components/requirejs/require',
        jquery: '../components/jquery-dist/jquery',
        'angular-ui-router': '../components/angular-ui-router/release/angular-ui-router',
        'angular-mocks': '../components/angular-mocks/angular-mocks',
        'bootstrap-3.2.0':'../components/Bootstrap.3.2.0/js/bootstrap.min',
        'spin':'../components/spinjs/spin.min',


        // Named References
        config: './config',

        //Angular App Modules
        'controllers-module': 'controllers/module',
        'directives-module': 'directives/module',
        'filters-module': 'filters/module',
        'services-module': 'services/module',
        'ngAlertModal':'modules/ngAlertModal'


    },
    priority: [
        'jquery',
        'angular',
        'angular-resource',
        'angular-route'
    ],
    shim : {
        'angular' : {
            deps: ['jquery'],
            exports : 'angular'
        },
        'angular-route': ['angular'],
        'angular-resource': ['angular', 'angular-route', 'angular-ui-router'],
        'angular-mocks': {
            deps:['angular', 'angular-route', 'angular-resource', 'angular-ui-router'],
            exports: 'mock'
        },
        'angular-ui-router' : ['angular'],

        knockout : {
            exports : 'ko'
        },
        underscore : {
            exports : '_'
        },
        'jquery.form' : {
            deps : [ 'jquery' ]
        },



        //Add depends to bootstrapper to load the angular app
        bootstrapper: {
            deps: [
                'app',
                'lessjs',
                'directives-module',
                'filters-module',
                'services-module',
                'controllers-module',
                'routes'
            ]
        }
    }
});