module.exports = (grunt) ->  
  grunt.initConfig
    rubyHaml:
      app:
        files: grunt.file.expandMapping(['haml/*.haml'], '',
          rename: (base, path) ->
            base + path.replace(/\.haml$/, '.html').replace('haml/', '')
        )
    sass:
      app:
        files:
          'css/style.css': 'sass/style.sass'
    coffeelint:
      app:
        files:
          src: ['coffee/*.coffee']
    coffee:
      options:
        sourceMap: true
      app:
        files:
          'js/main.js': ['coffee/*.coffee']
    watch:
      haml:
        files: ['haml/*.haml']
        tasks: ['rubyHaml', 'notify:watch']
      coffee:
        files: ['coffee/*.coffee']
        tasks: ['coffeelint', 'coffee', 'notify:watch']
      sass:
        files: ['sass/*.sass']
        tasks: ['sass', 'notify:watch']
      build:
        files: ['css/*.css', '*.html', 'js/*.js']
        options:
          livereload: true
    connect:
      server:
        options:
          port: 3333
          base: ''
    open:
      dev:
        path: 'http://localhost:3333/'
        app: 'Google Chrome'
    notify_hooks:
      enabled: true
    notify:
      watch:
        options:
          title: 'Task complete'
          message: 'Build files successfully updated'

      server:
        options:
          title: 'Server started'
          message: 'Server started at http://localhost:3333'

  grunt.loadNpmTasks 'grunt-notify'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-ruby-haml'
  grunt.loadNpmTasks 'grunt-contrib-sass'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-connect'
  grunt.loadNpmTasks 'grunt-open'
  grunt.loadNpmTasks 'grunt-coffeelint'

  grunt.registerTask 'default', ['rubyHaml', 'sass', 'coffeelint', 'coffee']
  grunt.registerTask 'server', ['default', 'connect', 'notify:server', 'open:dev', 'watch']
