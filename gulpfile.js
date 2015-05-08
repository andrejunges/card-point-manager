var gulp = require('gulp'),
    gulpBabel = require("gulp-babel"),
    babel = require("babel"),
    rimraf = require('rimraf'),
    uglify = require('gulp-uglify'),
    fs = require('fs'),
    foreach = require('gulp-foreach'),
    path = require('path'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    gulpFilter = require('gulp-filter'),
    mainBowerFiles = require('main-bower-files'),
    nodemon = require('gulp-nodemon');

gulp.task("clean", function () {
    return rimraf.sync('prod/**');
});

gulp.task("helpers", function () {
    fs.writeFile('prod/js/helpers.js', babel.buildExternalHelpers(),
        function (err) {
            console.log("Helper ja foi criado");
        });
});

gulp.task("publish", function () {
    var files = gulp.src(['dev/**', '!dev/**/*.es6', '!dev/**/*.scss']),
        folderDest = './prod/';

    files.pipe(foreach(function (stream, file) {
        'use strict';
        var ext = path.extname(file.path);

        if (ext == '.js' || ext == '.css') {
            return stream.pipe(uglify());
        }
        return stream;
    })).pipe(gulp.dest(folderDest));
});

gulp.task('bassets', function () {
    var dest = 'dev/public/';
    gulp.src(mainBowerFiles({
            includeDev: true
        }))
        .pipe(gulpFilter('*.js'))
        .pipe(gulp.dest(dest + 'js'));

    gulp.src(mainBowerFiles({
            includeDev: true
        }))
        .pipe(gulpFilter('*.css'))
        .pipe(gulp.dest(dest + 'css'));
});

gulp.task('forceDevEnv', function () {
    gulp.src('dev/app/css/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dev/app/css/'));

    gulp.src('dev/app/**/*.es6')
        .pipe(gulpBabel({
            externalHelpers: true
        }))
        .pipe(gulp.dest('dev/app/'));
});

gulp.task('devEnv', function () {
    watch('dev/app/css/*.scss', function () {
        gulp.src('dev/app/css/*.scss')
            .pipe(sass())
            .pipe(gulp.dest('dev/app/css/'));
    });

    watch('dev/app/**/*.es6', function () {
        gulp.src('dev/app/**/*.es6')
            .pipe(gulpBabel({
                externalHelpers: true
            }))
            .pipe(gulp.dest('dev/app/'));
    });
});

var env = process.env.NODE_ENV || 'development';
if (env == "development") {
    gulp.task('default', ['devEnv']);
} else {
    gulp.task('default', ['publish']);
}
