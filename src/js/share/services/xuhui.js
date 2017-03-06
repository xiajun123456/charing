(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['exports', 'echarts'], factory);
    } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        // CommonJS
        factory(exports, require('echarts'));
    } else {
        // Browser globals
        factory({}, root.echarts);
    }
}(this, function (exports, echarts) {
    var log = function (msg) {
        if (typeof console !== 'undefined') {
            console && console.error && console.error(msg);
        }
    }
    if (!echarts) {
        log('ECharts is not Loaded');
        return;
    }
    if (!echarts.registerMap) {
        log('ECharts Map is not loaded')
        return;
    }
    echarts.registerMap('上海其他', {
        "type": "FeatureCollection",
        "features": [ {
            "id": "310101",
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    "@@AE@GDEVSHMAGOYKKCCcGCDGBALCPIAAPIV@DV@BDCPEPLENFHCJHFB"
                ],
                "encodeOffsets": [
                    [
                        124411,
                        31993
                    ]
                ]
            },
            "properties": {
                "cp": [
                    121.490317,
                    31.222771
                ],
                "name": "黄浦",
                "childNum": 1
            }
        },
            {
                "id": "310104",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [
                        "@@FOBOJBDOBKHADCOGCEAE@EFOBMAEUW@GBEHILMBE@KKSAMMAE@AFA@@BC@ABC@@BD@@BH@@BB@EHDDCBECADGEEAEBFNET]CMRELQjOEGRFBAHDBAHH@@B@BDA`H@F@BC@AB@FD@DD@@@CH@DDAFDD^LEPF@DFTDLHD@@A"
                    ],
                    "encodeOffsets": [
                        [
                            124374,
                            31969
                        ]
                    ]
                },
                "properties": {
                    "cp": [
                        121.43752,
                        31.179973
                    ],
                    "name": "徐汇",
                    "childNum": 1
                }
            },
            {
                "id": "310105",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [
                        "@@CEE@FO]KCCBECCG@@D@@CCmBSAcKG@EBAEGC@DC@QE@CA@@BEBMTNFAFDBA`D@BDA@AA@FFBBLD@@@IBDBABDB@@DBADB@CHA@@DC@C@@@BBABFDH@AHD@ACDA@FD@BCA@@CJCNWJ@BCHAFEF@XCV@DFH@VFBBCFLEFFFBB@@IDAJFBABIFK"
                    ],
                    "encodeOffsets": [
                        [
                            124355,
                            31964
                        ]
                    ]
                },
                "properties": {
                    "cp": [
                        121.4222,
                        31.218123
                    ],
                    "name": "长宁",
                    "childNum": 1
                }
            },
            {
                "id": "310106",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [
                        "@@DOACU@BGSGQCELAJABIECBBNFHJB\\PNKD@JHFM"
                    ],
                    "encodeOffsets": [
                        [
                            124382,
                            31984
                        ]
                    ]
                },
                "properties": {
                    "cp": [
                        121.448224,
                        31.229003
                    ],
                    "name": "静安",
                    "childNum": 1
                }
            },
            {
                "id": "310107",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [
                        "@@DB@DHBBCDBB@A@DF@@DFDDHGBDDALZIDA@ACQ@@DGBEFBB@FD@J@BFMBCCCDID@AODAEIDBDEBABBB@DC@AF@@AFGACBADBB@@NFADD@@BB@B@BAB@BBDA@HBB@AJ@@AD@@BB@AFHBDCJFHBGQAAJA@ALCBBF@@AB@@BD@@@JABDABD@@BHBBBNACEJA@ADAAA@B@ADAAAJBIQB@FCBBD@AGJ@@EJA@EHADDAB@BFANNDEVIPUAGD@@CA@@ECCBC@AGASKIAEGACA@EAEEA@EFC@DEAAUEG@CEU@WDE@EFGBADI@IP"
                    ],
                    "encodeOffsets": [
                        [
                            124267,
                            31987
                        ]
                    ]
                },
                "properties": {
                    "cp": [
                        121.392499,
                        31.241701
                    ],
                    "name": "普陀",
                    "childNum": 1
                }
            },
            {
                "id": "310108",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [
                        "@@ASG@BOCKCEBA@G@KBEDCLMVQ@EACDECABCDKECGDMEKFIGC@ONDF@FB@@DC@BHOVUJCFIGA@@RCJBNG@ABBDBB@DNBAJJ@@FB@@H@@@DF@ENB@BDD@BAT@BENDFDPB@AF@@G"
                    ],
                    "encodeOffsets": [
                        [
                            124384,
                            32068
                        ]
                    ]
                },
                "properties": {
                    "cp": [
                        121.465689,
                        31.25318
                    ],
                    "name": "闸北",
                    "childNum": 1
                }
            },
            {
                "id": "310109",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [
                        "@@VCNB@UHWVFBABIKK@MJCJGBKV[C@@I[AOEODCACCCLADDBCFBD@FURKNCDAF@L@HABDFDLAPH@BR"
                    ],
                    "encodeOffsets": [
                        [
                            124384,
                            32068
                        ]
                    ]
                },
                "properties": {
                    "cp": [
                        121.491832,
                        31.26097
                    ],
                    "name": "虹口",
                    "childNum": 1
                }
            },
            {
                "id": "310110",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [
                        "@@pSNGDCDGDM@cBGL[BKAGEGMOcY[GWA@JD@U\\ALIHID@NLLAJABUEGX@PVA@ZDDADGFX`ZKDHFA"
                    ],
                    "encodeOffsets": [
                        [
                            124443,
                            32100
                        ]
                    ]
                },
                "properties": {
                    "cp": [
                        121.522797,
                        31.270755
                    ],
                    "name": "杨浦",
                    "childNum": 1
                }
            }],
        "UTF8Encoding": true
    });
}));