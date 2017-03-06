/**
 * Created by xiajun on 2017/2/27.
 */
"use strict";

angular.module('charingApp.main')
    .controller('mainController',[
        '$scope',
        'typeMap',
        function ($scope,typeMap) {
            var vm = $scope.vm = {};
            vm.menus = typeMap.sideMenu.list;

    }]);