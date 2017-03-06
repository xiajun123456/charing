/**
 * Created by xiajun on 2017/2/27.
 */
angular.module('charingApp.trademarkCase')
       .config([
        '$stateProvider',
        function ($stateProvider) {
            $stateProvider.state('main.trademarkCase',{
                url: "/trademarkCase",
                templateUrl: "templates/trademarkCase/trademarkCase.html",
                controller : 'trademarkCaseController'
            })
        }
    ]);