/**
 * Created by xiajun on 2017/2/28.
 */
"use strict";

angular.module('charingApp')
    .service('asyncRequest',[
            '$q','$http',function ($q,$http) {

            //封装请求的promise
            this.deferWrap = function (request) {
                var defer = $q.defer();
                request.success(function (data) {
                   var data = angular.fromJson(data);
                    if(data.resultCode == '0000'){
                        defer.resolve(data);
                    }else{
                        defer.reject(data);
                    }
                }).error(function (error) {
                    defer.reject(error);
                });
                return defer.promise;
            }
        }]);
