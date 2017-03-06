/**
 * Created by xiajun on 2017/3/1.
 */
angular.module('charingApp')
        .directive('lineEchars', function () {
        return{
            restrict: 'EA',
            scope: {},
            replace: true,
            require:'?ngModel',
            templateUrl: 'templates/directives/line-echar.html',
            link: function ($scope,ele,attr,ngModel) {
                var option = ngModel.$viewValue;
                console.log(ngModel)

            }
        }
    });