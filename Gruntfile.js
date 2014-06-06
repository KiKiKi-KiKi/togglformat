module.exports = function(grunt) {
  var pkg = grunt.file.readJSON('package.json');
  grunt.initConfig({
    jshint: {
      options: {
        globals: {
          jQuery: true,
          console: true,
          module: true
        },
        unused: true, // 宣言したきり使っていない変数を検出
        // グローバル変数へのアクセスの管理
        browser: true, // ブラウザ用のやつは許可
        devel: true,   // consoleやalertを許可
        expr: true     // x || (x = 1); とかができるようにする
      },
      files: 'dev/js/*.js'
    },
    removelogging: {
      dist: {
        src: 'dev/js/*.js',
        dest: 'js/toggle-format-clean.js'
      }
    },
    uglify: {
      options: {
        banner: '/*!\n * toggl-format.js <%= grunt.template.today("dd-mm-yyyy") %>\n */\n'
      },
      dist: {
        files: {
          'js/toggle-format.min.js': 'js/toggle-format-clean.js'
        }
      }
    },
    concat: {
      options: {
        eparator: '\n'
      },
      dist: {
        src: [
          'dev/js/lib/*.js',
          'js/toggle-format.min.js'
        ],
        dest: 'js/toggle-format.min.js'
      }
    },
    compress: {
      js: {
        options: {
          mode: 'gzip'
        },
        files: [
          {
            expand: true,
            src: 'js/*.min.js',
            ext: '.min.js.gz'
          }
        ]
      }
    },
    clean: {
      options: {
        force: true
      },
      build: ['js/toggle-format-clean.js']
    },

    watch: {
      // JS
      js: {
        // 監視ファイル
        files: ['dev/js/*.js'],
        // 実行タスク
        tasks: ['js']
      }
    }
  });
  for(var taskName in pkg.devDependencies) {
    if(taskName.substring(0, 6) == 'grunt-') {
      grunt.loadNpmTasks(taskName);
    }
  }
  grunt.registerTask('js', ['jshint', 'removelogging:dist', 'uglify:dist', 'concat:dist', 'compress:js', 'clean:build']);
  grunt.registerTask('default', 'watch');
};
