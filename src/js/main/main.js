/**
 * Created by xiajun on 2017/2/27.
 */
'use strict';
angular.module('charingApp.main',[
    'charingApp.patentCase',
    'charingApp.trademarkCase',
    'charingApp.copyrighCase',
    'charingApp.dashboard',
    'charingApp.expenditure',
    'charingApp.foreign',
    'charingApp.mediation',
    'charingApp.partySituation'
])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('main',{
                abstract:true,
                url: "/main",
                templateUrl: "templates/main/main.html",
                controller : 'mainController'
            })
    }])
    .config(['$urlRouterProvider', function ($urlRouterProvider) {
        $urlRouterProvider.otherwise('/main/dashboard')
    }]);