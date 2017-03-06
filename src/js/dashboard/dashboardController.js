/**
 * Created by xiajun on 2017/2/27.
 */
"use strict";

angular.module('charingApp.dashboard',[])
    .controller('dashboardController',[
        '$scope',
        'dashboardServices',
        'typeMap',
        'dealEcharsAdaptation',
        function ($scope,dashboardServices,typeMap,dealEcharsAdaptation) {
            var vm = $scope.vm = {};
            vm.caseList = ['全部','专利','商标','著作权','不正当竞争'];
            vm.nowCases = '全部';
            var receiveCase = [];
            var colseCase = [];
            vm.area = '黄埔';


            var getAmount = function () {
                dashboardServices.getAmount().then(
                    function (data) {
                       vm.amount = data.rows;
                        console.log(data)
                    }, function (err) {
                    }
                )
            };

            var getTrend = function (area,trendtype) {
                dashboardServices.getTrend(area,trendtype).then(function (data) {
                    caseOption.series[0].data = data.receiveCase;
                    caseOption.series[1].data = data.colseCase;
                    caseChart.setOption(caseOption);
                });
            };

            //结案方式分析
            var getClosedWay = function (area) {
                dashboardServices.getClosedWay('area').then(function (data) {
                    analysisCaseOption.series[0].data = data.judgment;
                    analysisCaseOption.series[1].data = data.mediation;
                    analysisCaseOption.series[2].data = data.infringement;
                    analysisCaseOption.series[3].data = data.other;
                    console.log(data);
                    analysisChart.setOption(analysisCaseOption);
                })
            };

            //结案方案占比
            var getCountCase = function (area) {
                dashboardServices.getCountCase(area).then(function (data) {
                    closingData = {
                        other:0.7,
                        judgment:0.55,
                        Infringement:0.67,
                        mediation:0.85
                    };
                    var closingCaseCharOption = {
                        title:{
                            text:'结案方案占比',
                            textStyle:{
                                color:'#6D6D6D',
                                fontSize:15
                            },
                            left:15,
                            top:0
                        },
                        series : [
                            {
                                name:'其他',
                                type:'pie',
                                radius : [30,43],
                                hoverAnimation: false,
                                startAngle:270,
                                data:[
                                    {
                                        value:closingData.other*100,
                                        name:'其他'+closingData.other,
                                        itemStyle : {
                                            normal: {
                                                label: {show:true},
                                                labelLine: {show:true},
                                                color: '#BF4949'
                                            }
                                        },
                                        label:commLabel,
                                        labelLine:{
                                            normal:{
                                                show:true,
                                                length:50,
                                                length2:20,
                                                lineStyle:{
                                                    color:'#828283'
                                                }
                                            }
                                        }
                                    },
                                    {
                                        value:100-closingData.other*100,
                                        name:'invisible',
                                        itemStyle :falseDataItemStyle
                                    }
                                ]
                            },
                            {
                                name:'判决',
                                type:'pie',
                                radius : [53,66],
                                hoverAnimation: false,
                                startAngle:270,
                                data:[
                                    {
                                        value:closingData.judgment*100,
                                        name:'判决'+closingData.judgment,
                                        itemStyle : {
                                            normal: {
                                                label: {show:true},
                                                labelLine: {show:true},
                                                color: '#4BB4D7'
                                            }
                                        },
                                        label:commLabel,
                                        labelLine:{
                                            normal:{
                                                show:true,
                                                length:50,
                                                length2:20,
                                                lineStyle:{
                                                    color:'#828283'
                                                }
                                            }
                                        }
                                    },
                                    {
                                        value:100-closingData.judgment*100,
                                        name:'invisible',
                                        itemStyle :falseDataItemStyle
                                    }
                                ]
                            },{
                                name:'侵权',
                                type:'pie',
                                radius : [76,89],
                                hoverAnimation: false,
                                startAngle:270,
                                data:[
                                    {
                                        value:closingData.Infringement*100,
                                        name:'侵权'+closingData.Infringement,
                                        itemStyle : {
                                            normal: {
                                                label: {show:true},
                                                labelLine: {show:true},
                                                color: '#DE9B35'
                                            }
                                        },
                                        label:commLabel,
                                        labelLine:{
                                            normal:{
                                                show:true,
                                                length:30,
                                                length2:35,
                                                lineStyle:{
                                                    color:'#828283'
                                                }
                                            }
                                        }
                                    },
                                    {
                                        value:100-closingData.Infringement*100,
                                        name:'invisible',
                                        itemStyle :falseDataItemStyle
                                    }
                                ]
                            },{
                                name:'调解',
                                type:'pie',
                                radius : [99,112],
                                hoverAnimation: false,
                                startAngle:270,
                                data:[
                                    {
                                        value:closingData.mediation*100,
                                        name:'调解'+closingData.mediation,
                                        itemStyle : {
                                            normal: {
                                                label: {show:true},
                                                labelLine: {show:true},
                                                color: '#83B15A'
                                            }
                                        },
                                        label:commLabel,
                                        labelLine:{
                                            normal:{
                                                show:true,
                                                length:25,
                                                length2:20,
                                                lineStyle:{
                                                    color:'#828283'
                                                }
                                            }
                                        }
                                    },
                                    {
                                        value:100-closingData.mediation*100,
                                        name:'invisible',
                                        itemStyle :falseDataItemStyle
                                    }
                                ]
                            }
                        ]
                    };
                    closingCaseChar.setOption(closingCaseCharOption);
                })
            };

            vm.selectCasesClass = function (cases,$index) {
                vm.nowCases = cases;
                getTrend(vm.area,$index);
            };

            //上海地图
            var myChart = echarts.init(document.getElementById('sh-map'));
            var option = {
                tooltip : {
                    trigger: 'item',
                    formatter: function(a){

                    }
                },
                series : [
                    {
                        name: '0',
                        type: 'map',
                        map: '上海',
                        aspectScale:1.1,
                        selectedMode:'single',
                        itemStyle:{
                            normal:{
                                label:{show:true},
                                opacity:0.9
                            },
                            emphasis:{label:{show:true}}
                        },
                        data:[
                            {
                                name:'松江',
                                itemStyle:{
                                    normal:{
                                        areaColor:'#D5D36B'
                                    }
                                }
                            },
                            {
                                name:'金山',
                                itemStyle:{
                                    normal:{
                                        areaColor:'#D58FA9'
                                    }
                                }
                            },
                            {
                                name:'奉贤',
                                itemStyle:{
                                    normal:{
                                        areaColor:'#7FA5C5'
                                    }
                                }
                            },{
                                name:'浦东',
                                itemStyle:{
                                    normal:{
                                        areaColor:'#D5D36B'
                                    }
                                }
                            },{
                                name:'闵行',
                                itemStyle:{
                                    normal:{
                                        areaColor:'#C3839B'
                                    }
                                }
                            },{
                                name:'宝山',
                                itemStyle:{
                                    normal:{
                                        areaColor:'#DB93AD'
                                    }
                                }
                            },{
                                name:'青浦',
                                itemStyle:{
                                    normal:{
                                        areaColor:'#8FC3A8'
                                    }
                                }
                            },{
                                name:'崇明',
                                itemStyle:{
                                    normal:{
                                        areaColor:'#D5D36B'
                                    }
                                }
                            },{
                                name:'嘉定',
                                itemStyle:{
                                    normal:{
                                        areaColor:'#D5D36B'
                                    }
                                }
                            }
                        ],
                        left:'45%'
                    },
                    {
                        name: '1',
                        type: 'map',
                        map: '上海其他',
                        aspectScale:1,
                        selectedMode:'single',
                        itemStyle:{
                            normal:{
                                label:{show:true},
                                opacity:0.9
                            },
                            emphasis:{label:{show:true}}
                        },
                        data:[
                            {
                                name:'黄浦',
                                itemStyle:{
                                    normal:{
                                        areaColor:'#D5D36B'
                                    }
                                }
                            },
                            {
                                name:'徐汇',
                                itemStyle:{
                                    normal:{
                                        areaColor:'#D58FA9'
                                    }
                                }
                            },
                            {
                                name:'长宁',
                                itemStyle:{
                                    normal:{
                                        areaColor:'#7FA5C5'
                                    }
                                }
                            },{
                                name:'静安',
                                itemStyle:{
                                    normal:{
                                        areaColor:'#8FC3A8'
                                    }
                                }
                            },{
                                name:'普陀',
                                itemStyle:{
                                    normal:{
                                        areaColor:'#8FC3A8'
                                    }
                                }
                            },{
                                name:'闸北',
                                itemStyle:{
                                    normal:{
                                        areaColor:'#DB93AD'
                                    }
                                }
                            },{
                                name:'虹口',
                                itemStyle:{
                                    normal:{
                                        areaColor:'#8FC3A8'
                                    }
                                }
                            },{
                                name:'杨浦',
                                itemStyle:{
                                    normal:{
                                        areaColor:'#D5D36B'
                                    }
                                }
                            }
                        ],
                        left:"10%"

                    }
                ]
            };
            myChart.setOption(option);
            myChart.on('click', function (params) {
                //option.series[params.seriesName].data[params.dataIndex].itemStyle.normal.areaColor = '#f00'
                //myChart.setOption(option);

            });

            //结案趋势
            var caseOption  = {
                title:{
                    text:'知识产权民事侵权案件趋势',
                    textStyle:{
                        color:'#6D6D6D',
                        fontSize:15
                    },
                    left:'center',
                    top:20
                },
                xAxis:{
                    type:'category',
                    boundaryGap : false,
                    axisLine:{
                        lineStyle:{
                            color:'#83B15A',
                            width:2,
                            type:'dashed'
                        }
                    },
                    axisTick:{
                        alignWithLabel:true,
                        lineStyle:{
                            color:'#83B15A',
                            width:2,
                            type:'dashed'
                        }
                    },
                    data:[{value:1,textStyle:{color:'#777777'}},2,3,4,5,6,7,8,9,10,11,12]
                },
                yAxis:{
                    type:'value',
                    min:0,
                    max:500,
                    splitNumber:5,
                    axisLine:{
                        show:false,
                        onZero:false,
                        lineStyle:{
                            color:'#777777'
                        }
                    },
                    axisTick:{
                        show:false
                    },
                    splitLine:{
                        lineStyle:{
                            color:'#1B1D1F'
                        }
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        lineStyle: {
                            color: '#57617B'
                        }
                    }
                },
                legend:{
                    show:true,
                    right:'10%',
                    top:20,
                    textStyle: {
                        color: '#6D6D6D'
                    },
                    data:[
                        {
                            name: '收案',
                            icon: 'circle'
                        },
                        {
                            name: '结案',
                            icon: 'circle'
                        }
                    ]
                },
                series:[
                    {
                        name:'收案',
                        type:'line',
                        smooth:true,
                        smoothMonotone:'x',
                        symbol:'circle',
                        showSymbol: false,
                        itemStyle: {
                            normal: {
                                color: '#14506A',
                                borderColor: '#14506A',
                                borderWidth:0
                            }
                        },
                        areaStyle:{
                            normal:{
                                color:'#943234'
                            }
                        },
                        lineStyle:{
                            normal:{
                                color:'Transparent'
                            }
                        },
                        data:receiveCase
                    },
                    {
                        name:'结案',
                        type:'line',
                        smooth:true,
                        showSymbol: false,
                        symbol:'circle',
                        smoothMonotone:'x',
                        itemStyle: {
                            normal: {
                                color: '#902F30',
                                borderColor: '#902F30',
                                borderWidth: 0

                            }
                        },
                        areaStyle:{
                            normal:{
                                color:'#3C6F82'
                            }
                        },
                        lineStyle:{
                            normal:{
                                color:'Transparent'
                            }
                        },
                        data:colseCase
                    }
                ]
            };
            var caseChart = echarts.init(document.getElementById('cases-chart'));
            dealEcharsAdaptation.resize(myChart);
            dealEcharsAdaptation.resize(caseChart);

           //结案方式分析
            var analysisCaseOption = {
                title:{
                    text:'结案方式分析',
                    textStyle:{
                        color:'#6D6D6D',
                        fontSize:15
                    },
                    left:15,
                    top:0
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type:'shadow',
                        lineStyle: {
                            color: '#57617B'
                        }
                    }
                },
                xAxis:{
                    type:'category',

                    axisLine:{
                        show:false,
                        lineStyle:{
                            color:'#777777',
                            width:2,
                            type:'dashed'
                        }
                    },
                    axisTick:{
                        show:false
                    },
                    data:['专利','商标','著作权','不正当竞争','其他']
                },
                yAxis:{
                    type:'value',
                    min:0,
                    max:700,
                    splitNumber:7,
                    axisLine:{
                        show:false,
                        onZero:false,
                        lineStyle:{
                            color:'#777777'
                        }
                    },
                    axisTick:{
                        show:false
                    },
                    splitLine:{
                        lineStyle:{
                            color:'#1B1D1F'
                        }
                    }
                }
                ,
                legend:{
                    show:true,
                    right:'10%',
                    top:0,
                    textStyle: {
                        color: '#6D6D6D'
                    },
                    data:[
                        {
                            name: '判决',
                            icon: 'circle'
                        },
                        {
                            name: '调解',
                            icon: 'circle'
                        },
                        {
                            name: '侵权',
                            icon: 'circle'
                        },
                        {
                            name: '其他',
                            icon: 'circle'
                        }
                    ]
                },
                series:[
                    {
                        type:'bar',
                        barWidth:12,
                        z:20,
                        itemStyle:{
                            normal:{
                                barBorderRadius :6
                            }
                        },
                        name:'判决',
                        data:[]
                    },
                    {
                        type:'bar',
                        barWidth:12,
                        z:20,
                        itemStyle:{
                            normal:{
                                barBorderRadius :6
                            }
                        },
                        name:'调解',
                        data:[]
                    },
                    {
                        type:'bar',
                        barWidth:12,
                        z:20,
                        itemStyle:{
                            normal:{
                                barBorderRadius :6
                            }
                        },
                        name:'侵权',
                        data:[]
                    },{
                        type:'bar',
                        barWidth:12,
                        z:20,
                        itemStyle:{
                            normal:{
                                barBorderRadius :6
                            }
                        },
                        name:'其他',
                        data:[]
                    }
                ]
            };
            var analysisChart = echarts.init(document.getElementById('case-analysis'));
            dealEcharsAdaptation.resize(analysisChart);

        //    结案方案占比
            var  closingCaseChar = echarts.init(document.getElementById('closing-case'));
            var commLabel = {
                normal:{
                    textStyle:{
                        color:'#C5C5C5'
                    }
                }
            };
            var falseDataItemStyle = {
                normal: {
                    label: {show:false},
                    labelLine: {show:false},
                    color: '#1A1A1A'
                }
            };
            var closingData = {
                other:0,
                judgment:0,
                Infringement:0,
                mediation:0
            };

        //    结案标的额占比
            var closingStandardChar = echarts.init(document.getElementById('closing-standard'));
            var closingStandardOption = {
                title:{
                    text:'结案标的额占比',
                    textStyle:{
                        color:'#6D6D6D',
                        fontSize:15
                    },
                    left:15,
                    top:0
                },
                series:[{
                    type:'gauge',
                    name:'Unit:million',
                    min:0,
                    max:2000,
                    splitNumber:5,
                    axisLine:{
                        lineStyle:{
                            color:[['0.2','#83B15A'],['0.4','#DE9B35'],['0.6','#51CDF6'],['0.8','#1D9FF2'],['1','#BF4949']],
                            width:10
                        }
                    },
                    splitLine:{
                        show:false
                    },
                    axisTick:{
                        show:false
                    },
                    axisLabel:{
                        distance:-10,
                        textStyle:{
                            color:'#676767'
                        }
                    },
                    pointer:{
                        length:'70%',
                        width:5
                    },
                    itemStyle:{
                        normal:{
                            color:'#16171A'
                        }
                    },
                    title:{
                        offsetCenter:[0,'-50%']
                    },
                    detail:{
                        offsetCenter:[5,'15%'],
                        backgroundColor:'#16171A',
                        width:60,
                        height:20,
                        formatter: function (value) {
                           if(0<value<=400){
                                return '0~400'
                           }else if(400<value<=800){
                               return '400~800'
                           }else if(800<value<=1200){
                               return '800~1200'
                           }else if(1200<value<=1600){
                               return '1200~1600'
                           }else if(1600<value<=2000){
                               return '1600~2000'
                           }
                        },
                        textStyle:{
                            color:'#E2E2E2',
                            fontSize:12
                        }
                    },
                    //markPoint:{
                    //    symbol:'rect',
                    //    symbolSize:[60,20],
                    //    data: [
                    //        {
                    //            name: '占比30%',
                    //            value: '占比30%',
                    //            x: '50%',
                    //            y: '50%'
                    //        }
                    //    ]
                    //},
                    data: [{
                        value: 500,
                        name: "Unit:million"
                    }]
                }]
            };
            closingStandardChar.setOption(closingStandardOption);

            //初始化
            var init = function () {
                getAmount();
                getTrend(vm.area,0);
                getClosedWay(vm.area);
                getCountCase(vm.area)
            };
            init();
        }
    ]);