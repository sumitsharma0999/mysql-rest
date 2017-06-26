var gulp = require('gulp');
var babel = require("gulp-babel");
var mocha = require('gulp-mocha');

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task("build", function () {
  return gulp.src(["src/**/*.js"])
    .pipe(babel())
    .pipe(gulp.dest("./dest"));
});

gulp.task("test", function() {
    return gulp.src(["test/**/*.js"])
        .pipe(mocha());
});