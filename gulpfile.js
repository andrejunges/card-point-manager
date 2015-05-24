var gulp = require('gulp'),
    gulpBabel = require("gulp-babel"),
    babel = require("babel"),
    rimraf = require('rimraf'),
    uglify = require('gulp-uglify'),
    fs = require('fs'),
    foreach = require('gulp-foreach'),
    path = require('path'),
    sass = require('gulp-sass'),
    gulpFilter = require('gulp-filter'),
    mainBowerFiles = require('main-bower-files'),
    react = require('gulp-react'),
    browserify = require('gulp-browserify'),
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

gulp.task('build', function () {

    gulp.src('src/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dev'));

    gulp.src(['src/**/*es6', '!src/controllers'])
        .pipe(gulpBabel({
            externalHelpers: true
        }))
        .pipe(gulp.dest('dev'));

    //compile jsx to js
    gulp.src('src/public/react-ui/**')
        .pipe(react())
        .pipe(gulp.dest('dev/public/react-ui'));

    //entry point
    gulp.src('dev/app/controllers/entry.js')
        .pipe(browserify({
            insertGlobals: false,
            debug: false
        }))
        .pipe(gulp.dest('dev/app/controllers'));

    gulp.src('src/controllers/**').pipe(gulp.dest('dev/controllers'));
    gulp.src('src/views/**').pipe(gulp.dest('dev/views'));
    gulp.src('src/app/img/**').pipe(gulp.dest('dev/app/img'));
    gulp.src(['src/public/**', '!src/public/react-ui']).pipe(gulp.dest('dev/public'));
});

gulp.task('development', ['bassets', 'build'], function () {
    gulp.watch('src/**', ['bassets', 'build']);
});

var env = process.env.NODE_ENV || 'development';
if (env == "development") {
    gulp.task('default', ['development']);
} else {
    gulp.task('default', ['publish']);
}
