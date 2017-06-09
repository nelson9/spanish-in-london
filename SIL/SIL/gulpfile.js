/// <binding BeforeBuild='compile:sass' ProjectOpened='watch' />
var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require("gulp-uglify");
var watch = require("gulp-watch");
var concat = require("gulp-concat");


var paths = {
    distroot: "dist",
    stylesroot: "Styles",
    appRoot: "app"
};

paths.sass = paths.stylesroot + "/styles.scss";
paths.sassWatch = paths.stylesroot + "/**/*.scss";
paths.sass_dest = paths.appRoot + "/assets/css/";

//paths.sassDest = paths.distroot + "css/";
//paths.appDest = paths.distroot + "app/";


//call back task as needs to run sync
gulp.task("clean", function (cb) {
    del([paths.appDest + "/**/*.*", paths.sassDest + "/**/*.*"], cb);
});

gulp.task("compile:sass", function () {
    return gulp.src(paths.sass)
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest(paths.sass_dest));
});


gulp.task("watch:sass", function () {
    gulp.watch(paths.sassWatch, ["compile:sass"]);
});

gulp.task("watch", ["watch:sass"]);

gulp.task("default", ["watch"]);