/**
 * Created by xiajun on 2017/2/27.
 */
'use strict';
angular.module('charingApp.foreign')
    .config([
        '$stateProvider',
        function ($stateProvider) {
            $stateProvider.state('main.foreign',{
                url: "/foreign",
                templateUrl: "templates/foreign/foreign.html",
                controller : 'foreignController'
            })
        }
    ]);