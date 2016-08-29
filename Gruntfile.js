'use strict'

module.exports = (grunt) => {

    // converts .scss files to .css files
    grunt.loadNpmTasks('grunt-sass')

    // monitors .scss files for changes and runs the sass task if they change
    grunt.loadNpmTasks('grunt-contrib-watch')

    // runs our little express server from grunt
    grunt.loadNpmTasks('grunt-express-server')


    grunt.initConfig({

        express: {
            options: {
                script: 'server.js'
            },
            main: {}
        },

        watch: {
            sass: {
                files: [
                    'sass/*.{scss,sass}'
                ],
                tasks: ['sass:main']
            },
            express: {
                files: [
                    'server.js'
                ],
                tasks: ['express'],
                options: {
                    spawn: false
                }

            }
        },

        sass: {
            options: {
                debugInfo: true,
                noCache: true
            },
            main: {
                files: [{
                    expand: true,
                    cwd: 'sass',
                    src: ['*.scss'],
                    dest: 'css',
                    ext: '.css'
                }]
            }
        }
    })

    grunt.registerTask('serve', [
        'sass',
        'express',
        'watch'
    ])

    grunt.registerTask('default', ['sass','serve'])
}
