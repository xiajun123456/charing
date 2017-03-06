/**
 * Created by xiajun on 2017/2/27.
 */
"use strict";

angular.module('charingApp.dashboard')
    .service('dashboardServices',[
        'asyncRequest',
        '$http',
        function (asyncRequest,$http) {

            //
            this.getAmount = function () {
                return asyncRequest.deferWrap(
                    $http.post('./compen/litigation/getAmount')
                )
            };

            this.getTrend = function (area,trendtype) {
                return asyncRequest.deferWrap(
                    $http.post('./compen/litigation/getTrend',{
                            area:area,
                            trendtype:trendtype
                    })
                )
            };

            this.getClosedWay = function (area) {
                return asyncRequest.deferWrap(
                    $http.post('./compen/litigation/getClosedWay',{
                        area:area
                    })
                )
            };

            this.getCountCase = function (area) {
                return asyncRequest.deferWrap(
                    $http.post('./compen/litigation/getCountCase',{
                        area:area
                    })
                )
            }
        }]);