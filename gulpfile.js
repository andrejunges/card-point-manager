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
    browserify = require('browserify'),
    nodemon = require('gulp-nodemon'),
    livereload = require('gulp-livereload'),
    source = require('vinyl-source-stream'),
    gulpif = require('gulp-if');

gulp.task("clean", function () {
    return rimraf.sync('prod/**');
});

gulp.task("helpers", function () {
    fs.writeFile('src/app/helpers.js', babel.buildExternalHelpers(),
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

gulp.task('bundle', function () {
    //entry point
    var b = browserify(['./dev/app/angularDecorator.js','./dev/app/controllers/entry.js']);
    return b.bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('dev/app/controllers'));
});

gulp.task('build', function () {
    return gulp.src(['src/**', '!src/controllers'])
        .pipe(gulpif(/[.]scss$/, sass()))
        .pipe(gulpif(/[.]es6$/, gulpBabel({
            externalHelpers: true,
            stage: 0
        })))
        .pipe(gulpif(/[.]jsx$/, react()))
        .pipe(gulp.dest('dev'))
        .pipe(livereload());
});

gulp.task('development', ['bassets', 'build'], function () {
    livereload.listen();
    gulp.watch('src/**', ['bassets', 'build']);
    gulp.watch('dev/app/controllers/entry.js', ['bundle'])
});

var env = process.env.NODE_ENV || 'development';
if (env == "development") {
    gulp.task('default', ['development']);
} else {
    gulp.task('default', ['publish']);
}
