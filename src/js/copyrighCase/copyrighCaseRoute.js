/**
 * Created by xiajun on 2017/2/27.
 */
'use strict';
angular.module('charingApp.copyrighCase')
    .config([
        '$stateProvider',
        function ($stateProvider) {
            $stateProvider.state('main.copyrighCase',{
                url: "/copyrighCase",
                templateUrl: "templates/copyrighCase/copyrighCase.html",
                controller : 'copyrighCaseController'
            })
        }
    ]);