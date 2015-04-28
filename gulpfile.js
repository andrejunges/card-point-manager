var gulp = require('gulp');
var gulpBabel = require("gulp-babel");
var babel = require("babel");
var rimraf = require('rimraf');
var fs = require('fs');
var path = require('path');
var foreach = require('gulp-foreach');


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

    files.pipe(foreach(function(stream, file){
        console.log(file.relative);
        if(file.relative.indexOf('.es6') > 0){
            return stream
                .pipe(gulpBabel({ externalHelpers: true }))
                .pipe(gulp.dest(folderDest + file.relative));
        }

        return stream.pipe(gulp.dest(folderDest + file.relative));
    }));
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
