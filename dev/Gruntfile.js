module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    grunt.initConfig({
        connect: {
            server: {
                options: {
                    port: 8000,
                    protocol: 'http',
                    hostname: 'localhost',
                    base: '../web/'
                }
            }
        },

        cssmin: {
            dist: {
                files: {
                    '../web/css/main.min.css': ['css/vendor/*.css', 'css/*.css']
                }
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true
                },
                files: {
                    '../web/index.html': 'index.html'
                }
            }
        },

        uglify: {
            dist: {
                files: {
                    '../web/js/main.min.js': ['js/vendor/*.js', 'js/*.js']
                }
            }
        },

        watch: {
            options: {
                livereload: true
            },

            scripts: {
                files: ['js/**/*.js', 'js/**/*.html'],
                tasks: ['uglify'],
                options: {
                    interrupt: true
                }
            },

            css: {
                files: ['css/**/*.css'],
                tasks: ['cssmin'],
                options: {
                    interrupt: true
                }
            },

            html: {
                files: ['**/*.html'],
                tasks: ['htmlmin'],
                options: {
                    interrupt: true
                }
            }
        }
    });

    grunt.registerTask('default', ['connect', 'watch']);
    grunt.registerTask('build', ['uglify', 'cssmin', 'htmlmin']);

};
