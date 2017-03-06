/**
 * Created by xiajun on 2017/3/1.
 */
"use strict";

angular.module('charingApp')
    .service('dealEcharsAdaptation',
        function () {
            //处理canvas适配的问题
            this.resize = function (chart) {
                window.addEventListener('resize', function () {
                    chart.resize();
                });
            }
        });
