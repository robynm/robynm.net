module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            options: {
                style: "compressed",
            },
            build: {
                src: "stylesheets/style.scss",
                dest: "stylesheets/style.css"
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
                src: "stylesheets/style.css",
                dest: "stylesheets/style.min.css"
            }
        },
        watch: {
            options: {
                livereload: 'true'
            },
            build: {
                files: [
                    'js/*.js',
                    'stylesheets/*.scss'
                ],
                tasks: [
                    'sass:build',
                    'postcss:build'
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('develop', ['sass', 'postcss', 'watch']);
    grunt.registerTask('default', ['sass', 'postcss']);
}
