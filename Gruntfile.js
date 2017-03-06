/**
 * Created by xiajun on 2017/2/22.
 */
'use strict';

module.exports = function (grunt) {
    var serverStatic = require('serve-static');
    var url = require('url');
    var _ = require('lodash');
    var proxyMiddleware = require('proxy-middleware');
    var target = grunt.option('target') || 'release';

    //配置代理 通过proxy-middleware插件
    var proxyTo1 = function () {
        //服务器地址
        var serverAddress = 'http://127.0.0.1:8081/compen/';
        //代理路径
        var route = '/compen/';
        var serverOptions = url.parse(serverAddress);
        serverOptions.route = route;
        return proxyMiddleware(serverOptions);
    };

    //配置usemin的目标文件
    var settarget = function (context, block,isScript) {
        var generated = context.options.generated;
        var length = generated.files.length - 1;
        generated.files[length].dest = 'src/' + block.dest;
        if(isScript){
            generated.options = { mangle: false };
        }
    };

    require('load-grunt-config')(grunt);

    grunt.initConfig({
        dist:target,
        compass: {
            dist:{
                options: {
                    sassDir: 'src/styles/',
                    cssDir: 'src/styles/',
                    debugInfo: false,
                    environment :'production',
                    outputStyle:'compressed',
                    specify: ['src/styles/main.scss']
                }
            }
        },
        copy:{
            templates: {
                files: [
                    {expand: true, cwd: 'src/', src: ['index.html'], dest: 'dist/<%= dist %>/'},
                    {expand: true, cwd: 'src/', src: ['templates/**/*.html'], dest: 'dist/<%= dist %>/'}
                ]
            },
            images: {
                expand: true,
                cwd: 'src/',
                src: ['images/**/*'],
                dest: 'dist/<%= dist %>/'
            },
            fonts: {
                expand: true,
                cwd: 'src/js/libs/bootstrap-sass/assets/fonts/',
                src: ['bootstrap/*'],
                dest: 'dist/<%= dist %>/fonts/'
            },
            js: {
                expand: true,
                cwd: 'src/js/',
                src: ['**/*.js','!libs/**/*'],
                dest: 'dist/<%= dist %>/js/'
            },
            prod: {
                expand: true,
                cwd: 'src/js/',
                src: ['ie.js','app.min.*','vendor.js'],
                dest: 'dist/<%= dist %>/js/'
            },
            css: {
                expand: true,
                cwd: 'src/styles/',
                src: ['main*.css'],
                dest: 'dist/<%= dist %>/styles/'
            }
        },
        watch:{
                options:{
                    livereload:false
                },
                images:{
                    files:['src/images/**/*'],
                    tasks:['copy:images']
                },
                templates:{
                    files:['src/templates/**/*.html','src/index.html'],
                    tasks:['copy:templates']
                },
                js:{
                    files:['src/js/**/*.js','!src/js/libs/**/*'],
                    tasks:['copy:js']
                },
                fonts:{
                    files:['src/js/libs/bootstrap-sass/assets/fonts/bootstrap/*'],
                    tasks:['copy:fonts']
                },
                css:{
                    files:['src/styles/**/*.scss'],
                    tasks:['compass','copy:css']
                }
            },
        clean:{
            dist:{
                src: ["dist/<%= dist %>", "src/js/app.min.*.js", "src/js/ie.js", "src/js/vendor.js", "src/styles/main*.css"],
                options:{
                    force:true
                }
            }
        },
        symlink:{
            options: {
                overwrite: false
            },
            js: {
                src: ['src/js/libs/'],
                dest: 'dist/<%= dist %>/js/libs'
            },
            bootstrap: {
                src: ['src/js/libs/bootstrap-sass/assets/'],
                dest: 'src/styles/bootstrap-vendor/'
            }
        },
        prism:{
            options:{
                mode:'mock',
                host:'loaclhost',
                port:8083,
                context:'/compen',
                https: true,
                delay: '200',
                ignoreParameters: true,
                useApi: true,
                mockFilenameGenerator: function (config, request) {
                    var httpVerb = request.method;
                    var parsedUrl = request._parsedUrl;
                    var urlPath = parsedUrl.pathname;
                    var newMockFileName = urlPath.replace(/\//g, '_');
                    newMockFileName = httpVerb + "_" + newMockFileName + ".json";

                    return newMockFileName;
                }
            }
        },
        connect: {
            release:{
                options:{
                    port:8082,
                    middleware: function (connect) {
                        return [
                            require('grunt-connect-prism/middleware'),
                            connect().use(serverStatic('dist/' + target))
                        ];
                    }
                }
            },
            proxy: {
                options: {
                    port: 8080,
                    middleware: function (connect) {
                        return [
                            proxyTo1(),
                            connect().use(serverStatic('dist/' + target))
                        ];
                    }
                }
            },
        },
        useminPrepare:{
            html:'./src/index.html',
            options:{
                flow:{
                    steps:{
                        css:['cssmin'],
                        js:['concat', 'uglify']
                    },
                    post:{
                        css:[{
                            name:'cssmin',
                            createConfig: function (context, block) {
                                settarget(context, block,false)
                            }
                        }],
                        js:[{
                            name:'uglify',
                            createConfig: function (context, block) {
                                settarget(context, block,true)
                            }
                        }]
                    }
                }
            }
        },
        usemin: {
            html: './src/index.html'
        },
        filerev:{
            options:{
                algorithm: 'md5',
                length: 8
            },
            js:{
                src:'src/js/app.min.js'
            },
            css:{
                src:'src/styles/main.min.css'
            }
        }
    });

    grunt.registerTask('ci',[
        'clean',
        'symlink:bootstrap',
        'compass',
        'useminPrepare',
        'cssmin',
        'concat',
        'uglify',
        'filerev',
        'usemin',
        'copy:templates',
        'copy:images',
        'copy:fonts',
        'copy:prod',
        'copy:css'
    ]);

    grunt.registerTask('devBuild',['clean','symlink','compass','copy']);

    //SERVE
    grunt.registerTask('serve', function () {
        var tasks = ['devBuild'];

        if (target === 'release') {
            tasks = tasks.concat(['prism', 'connect:'+ target, 'watch']);
        }

        if (target === 'proxy') {
            tasks = tasks.concat(['connect:'+ target, 'watch']);
        }
        grunt.task.run(tasks);
    });
};
