/**
 *@class gulpfile.js
 *@description gulp 配置文件
 *@time 2014-11-28 10:12
 *@author StarZou
 **/

var gulp = require('gulp'),
    del = require('del'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    runSequence = require('run-sequence'),
    templateCache = require('gulp-angular-templatecache');


var srcPath = 'src/';
var distPath = 'dist';
var moduleName = 'ngComponents';
var fileName = 'angular-components';


/**
 * 清空 dist目录
 */
gulp.task('clean', function (callback) {
    del(distPath, callback);
});

/**
 * angular-components.tpl.js
 */
gulp.task('mix-templates', function () {
    gulp.src([srcPath + '/**/*.html'])
        .pipe(templateCache({root: moduleName}))
        .pipe(gulp.dest(distPath));
});

/**
 * angular-components.js
 */
gulp.task('mix-js', function () {
    gulp.src(srcPath + '/**/*.js')
        .pipe(concat(fileName + '.js'))
        .pipe(gulp.dest(distPath));
});

/**
 * angular-components.min.js
 */
gulp.task('mix-min-js', function () {
    gulp.src(srcPath + '/**/*.js')
        .pipe(uglify())
        .pipe(concat(fileName + '.min.js'))
        .pipe(gulp.dest(distPath));
});

/**
 * 编译:
 * gulp build
 */
gulp.task('build', function (callback) {
    runSequence('clean', ['mix-js', 'mix-min-js', 'mix-templates'], callback);
});