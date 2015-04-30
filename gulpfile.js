var gulp = require('gulp'),
    gulpBabel = require("gulp-babel"),
    babel = require("babel"),
    rimraf = require('rimraf'),
    uglify = require('gulp-uglify'),
    fs = require('fs'),
    foreach = require('gulp-foreach'),
    path = require('path'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass');


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
    var files = gulp.src(['dev/**', '!dev/**.es6', '!dev/**.scss']),
        folderDest = './prod/';

    files.pipe(foreach(function (stream, file) {
        'use strict';
        let ext = path.extname(file.path);

        if (ext == '.js' || ext == '.css') {
            return stream.pipe(uglify());
        }
        return stream;
    })).pipe(gulp.dest(folderDest));
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

gulp.task('default', ['publish']);
