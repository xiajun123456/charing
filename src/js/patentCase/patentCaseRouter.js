/**
 * Created by xiajun on 2017/2/27.
 */
angular.module('charingApp.patentCase')
    .config([
        '$stateProvider',
        function ($stateProvider) {
            $stateProvider.state('main.patentCase',{
                url: "/patentCase",
                templateUrl: "templates/patentCase/patentCase.html",
                controller : 'patentCaseController'
            })
        }
    ]);