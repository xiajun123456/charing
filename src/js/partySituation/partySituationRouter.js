/**
 * Created by xiajun on 2017/2/27.
 */
/**
 * Created by xiajun on 2017/2/27.
 */
'use strict';
angular.module('charingApp.partySituation')
    .config([
        '$stateProvider',
        function ($stateProvider) {
            $stateProvider.state('main.partySituation',{
                url: "/partySituation",
                templateUrl: "templates/partySituation/partySituation.html",
                controller : 'partySituationController'
            })
        }
    ]);