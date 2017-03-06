/**
 * Created by xiajun on 2017/2/27.
 */
'use strict';
angular.module('charingApp.mediation')
    .config([
        '$stateProvider',
        function ($stateProvider) {
            $stateProvider.state('main.mediation',{
                url: "/mediation",
                templateUrl: "templates/mediation/mediation.html",
                controller : 'mediationController'
            })
        }
    ]);