var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task('sass', function() {
  gulp.src('./styles/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./styles'));
});

gulp.task('compress', function() {
  gulp.src('scripts/**/*.js')
    .pipe(uglify({ mangle: false }))
    .pipe(gulp.dest('dist'))
});

gulp.task('watch', function() {
  gulp.watch('./styles/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'watch']);
gulp.task('build', ['compress']);