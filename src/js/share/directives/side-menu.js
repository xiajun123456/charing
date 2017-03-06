/**
 * Created by xiajun on 2017/2/27.
 */
"use strict";
angular.module('charingApp')
    .directive('sideMenu',[
        'typeMap',
        '$location',
        function (typeMap,$location) {
            return{
                restrict: 'EA',
                scope: {},
                replace: true,
                templateUrl: 'templates/directives/side-menu.html',
                controller:['typeMap','$scope','$location',function (typeMap,$scope,$location) {
                    var vm = $scope.vm = {};
                    vm.menus = typeMap.sideMenu.list;
                    vm.activeUrl = '';

                    //导航点击事件
                    $scope.activeNav = function (data) {
                        //设置样式
                        vm.activeUrl = data.menu_url;
                        //路由跳转
                        $location.path('/main'+data.menu_url);
                    };

                    //刷新页面导航未显示的bug
                    vm.activeUrl = $location.path().slice(5);
                    console.log($location.path())
                }]
            }
        }
    ])