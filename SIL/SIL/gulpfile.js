/// <binding BeforeBuild='compile:sass' ProjectOpened='watch' />
var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require("gulp-uglify");
var watch = require("gulp-watch");
var cssnano = require('gulp-cssnano');
var del = require("del");
var rename = require("gulp-rename");
var concat = require("gulp-concat");
var angularFilesort = require('gulp-angular-filesort');

var paths = {
    distroot: "Static/",
    stylesroot: "Styles/",
    appRoot: "Scripts/"
};

paths.sass = paths.stylesroot + "/sass/style.scss";
paths.sassWatch = paths.stylesroot + "/sass/**/*.scss";
paths.sassDest = paths.distroot + "css/";
paths.appDest = paths.distroot + "app/";
paths.tinymceDest = paths.distroot + "app/skins";

//call back task as needs to run sync
gulp.task("clean", function (cb) {
    del([paths.appDest + "/**/*.*", paths.sassDest + "/**/*.*"], cb);
});

gulp.task("compile:sass", function () {
    return gulp.src(paths.sass)
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest(paths.sassDest));
});

gulp.task("min:sass", function () {
    return gulp.src(paths.sass)
       .pipe(sass().on("error", sass.logError))
       .pipe(cssnano())
       .pipe(rename("style-min.css"))
       .pipe(gulp.dest(paths.sassDest));
});

//tinymce doesn't like being bundled so have to copy some styles to distribution folder
gulp.task("copy:tinymce", function () {
    return gulp.src("node_modules/tinymce/skins/**/*.*")
        .pipe(gulp.dest(paths.tinymceDest));
});

gulp.task('bundle:libs', function () {
    return gulp.src([
        "node_modules/jquery/dist/jquery.min.js",
        "node_modules/angular-file-upload-shim/dist/angular-file-upload-shim.min.js",
        "node_modules/bootstrap/dist/js/bootstrap.min.js",
        "node_modules/bootstrap-select/dist/js/bootstrap-select.min.js",
        "node_modules/angular/angular.min.js",
        "node_modules/angular-messages/angular-messages.min.js",
        "node_modules/angular-animate/angular-animate.min.js",
        "node_modules/angular-sanitize/angular-sanitize.min.js",
        "node_modules/angular-ui-tinymce/dist/tinymce.min.js",
        "node_modules/checklist-model/checklist-model.js",
        "node_modules/ng-file-upload/dist/ng-file-upload.min.js",
        "node_modules/angular-ui-router/release/angular-ui-router.min.js",
        "node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js",
        "node_modules/ng-tags-input/build/ng-tags-input.min.js",
        "node_modules/angular-ivh-treeview/dist/ivh-treeview.min.js",
        "node_modules/timepicker/jquery.timepicker.min.js",
        "node_modules/tinymce/tinymce.min.js",
        "node_modules/tinymce/plugins/wordcount/plugin.min.js",
        "node_modules/tinymce/plugins/fullscreen/plugin.min.js",
        "node_modules/tinymce/plugins/spellchecker/plugin.min.js",
        "node_modules/tinymce/plugins/code/plugin.min.js",
        "node_modules/tinymce/plugins/wordcount/plugin.min.js",
        "node_modules/tinymce/plugins/paste/plugin.min.js",
        "node_modules/tinymce/plugins/charmap/plugin.min.js",
        "node_modules/tinymce/plugins/link/plugin.min.js",
        "node_modules/tinymce/themes/modern/theme.min.js",
        "Scripts/libs/**/*.js"
    ])
        .pipe(concat('vendor.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.appDest));
});


gulp.task("min:app", function () {
    return gulp.src('Scripts/app/**/*.js')
        .pipe(angularFilesort())
        .pipe(concat('app.min.js'))
        .pipe(uglify({ mangle: false }))
        .pipe(gulp.dest(paths.appDest));
});

gulp.task("watch:sass", function () {
    gulp.watch(paths.sassWatch, ["compile:sass"]);
});

gulp.task("watch", ["watch:sass"]);

gulp.task("build", ["clean", "min:sass", "bundle:libs", "copy:tinymce", "min:app"]);

gulp.task("default", ["watch"]);