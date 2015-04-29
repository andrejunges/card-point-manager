var gulp = require('gulp');
var gulpBabel = require("gulp-babel");
var babel = require("babel");
var rimraf = require('rimraf');
var uglify = require('gulp-uglify');
var fs = require('fs');
var foreach = require('gulp-foreach');
var Path = require('path');


function parsePath(path) {
    var extname = Path.extname(path);
    return {
        dirname: Path.dirname(path),
        basename: Path.basename(path, extname),
        extname: extname
    };
}

gulp.task("clean", function () {
    return rimraf.sync('prod/**');
});

gulp.task("helpers", function () {
    fs.writeFile('prod/js/helpers.js', babel.buildExternalHelpers(),
        function (err) {
            console.log("Helper ja foi criado");
        });
});

gulp.task("es6.es5", function () {
    var files = gulp.src(['dev/**']),
        folderDest = './prod/';

    files.pipe(foreach(function (stream, file) {
        'use strict';
        let ext = parsePath(file.path).extname;

        if (ext == '.es6') {
            return stream
                .pipe(gulpBabel({
                    externalHelpers: true
                }))
                .pipe(uglify());
        } else if (ext == '.js') {
            return stream.pipe(uglify());
        }
        return stream;
    })).pipe(gulp.dest(folderDest));
    //babelFiles
    //    .on('data', function (chunk) {
    //        var src = chunk.relative;
    //        console.log(src);
    //        gulp.src('dev/' + src)
    //            .pipe(gulpBabel({
    //                externalHelpers: true
    //            }))
    //            //.pipe(minify())
    //            .pipe(gulp.dest('prod/' + src))
    //    })
    //    .on('end', function (chunk) {
    //        console.log(chunk, "end of the line here");
    //    });
});

gulp.task('default', ['es6.es5']);
