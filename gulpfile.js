var gulp = require('gulp');
var sass = require('gulp-sass');
var csso = require('gulp-csso');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task('sass', function() {
  gulp.src('./styles/styles.scss')
    .pipe(sass())
    .pipe(csso())
    .pipe(gulp.dest('styles'));
});

gulp.task('compress', function() {
  gulp.src(['scripts/**/*.js', '!scripts/lib/**'])
    .pipe(concat('compiled.js'))
    .pipe(gulp.dest('scripts'))
    .pipe(uglify())
    .pipe(gulp.dest('scripts'));
});

gulp.task('watch', function() {
  gulp.watch('./styles/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'watch']);
gulp.task('build', ['compress']);