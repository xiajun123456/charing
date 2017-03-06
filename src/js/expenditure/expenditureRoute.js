/**
 * Created by xiajun on 2017/2/27.
 */
'use strict';
angular.module('charingApp.expenditure')
    .config([
        '$stateProvider',
        function ($stateProvider) {
            $stateProvider.state('main.expenditure',{
                url: "/expenditure",
                templateUrl: "templates/expenditure/expenditure.html",
                controller : 'expenditureController'
            })
        }
    ]);