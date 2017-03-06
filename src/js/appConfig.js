/**
 * Created by xiajun on 2017/2/27.
 */
//设置全局变量 用来储存信息
'use strict';
angular.module('appConfig',[])
    .constant('typeMap',{
        sideMenu: {
            list:[
                {
                    name:"基本情况",
                    menu_url:"/dashboard"
                },
                {
                    name:"判决赔偿调解",
                    menu_url:"/mediation"
                },
                {
                    name:"涉外分析",
                    menu_url:"/foreign"
                },
                {
                    name:"合理开支分析",
                    menu_url:"/expenditure"
                },
                {
                    name:"当事人基本情况",
                    menu_url:"/partySituation"
                },
                {
                    name:"专利案件",
                    menu_url:"/patentCase"
                },
                {
                    name:"商标案件",
                    menu_url:"/trademarkCase"
                },
                {
                    name:"著作权案件",
                    menu_url:"/copyrighCase"
                }
            ]
        },
        quantityName:{
            "0":'诉讼标的总额',
            "1":'诉讼标的平均额',
            "2":"收案案件数",
            "3":"案件数量",
            "4":'存案案件数'
        }
    })
    .filter('typeMapFilter', function (typeMap) {
        //filter
        return function (input, type) {
            if (typeMap[type].hasOwnProperty(input)) {
                return typeMap[type][input];
            }
            return "";
        }
    });