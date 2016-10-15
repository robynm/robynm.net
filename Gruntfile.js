module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        browserify: {
            options: {
                transform: [["babelify", {"presets": ["es2015"]}]]
            },
            build: {
                files: {
                    'js/bundle.js': 'js/source/app.js'
                }
            }
        },
        uglify: {
            build: {
                options: {
                    mangle: false
                },
                files: {
                    'js/bundle.min.js': 'js/bundle.js'
                }
            }
        },
        sass: {
            options: {
                style: "compressed",
            },
            build: {
                src: "css/styles.scss",
                dest: "css/styles.css"
            }
        },
        postcss: {
            options: {
                processors: [
                    require('autoprefixer')({browsers: 'last 2 versions'}),
                    require('cssnano')()
                ]
            },
            build: {
                src: "css/styles.css",
                dest: "css/styles.min.css"
            }
        },
        watch: {
            options: {
                livereload: 'true'
            },
            build: {
                files: [
                    'js/source/**/*.js',
                    'css/**/*.scss'
                ],
                tasks: [
                    'browserify:build',
                    'uglify:build',
                    'sass:build',
                    'postcss:build'
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('develop', ['browserify', 'uglify', 'sass', 'postcss', 'watch']);
    grunt.registerTask('default', ['browserify', 'uglify', 'sass', 'postcss']);
}
