/**
 * Created by xiajun on 2017/2/27.
 */
'use strict';
angular.module('charingApp.dashboard')
    .config([
        '$stateProvider',
        function ($stateProvider) {
            $stateProvider.state('main.dashboard',{
                url: "/dashboard",
                templateUrl: "templates/dashboard/dashboard.html",
                controller : 'dashboardController'
            })
        }
    ]);