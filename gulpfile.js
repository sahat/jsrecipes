var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');

gulp.task('sass', function () {
  gulp.src('./styles/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./styles'));
});

gulp.task('compress', function() {
  gulp.src('lib/*.js')
    .pipe(uglify({outSourceMap: true}))
    .pipe(gulp.dest('dist'))
});

gulp.task('watch', function() {
  gulp.watch('./styles/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'watch']);