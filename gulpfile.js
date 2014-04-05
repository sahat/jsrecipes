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
  gulp.src([
    'scripts/lib/jquery-2.1.0.min.js',
    'scripts/lib/angular.min.js',
    'scripts/lib/*.js',
    'scripts/app.js',
    'scripts/constants/*.js',
    'scripts/controllers/*.js',
    'scripts/directives/*.js',
    'scripts/services/*.js'
  ])
    .pipe(concat('compiled.js'))
    .pipe(uglify())
    .pipe(gulp.dest('scripts'));
});

gulp.task('watch', function() {
  gulp.watch('styles/*.scss', ['sass']);
  gulp.watch(['scripts/**/*.js', '!scripts/compiled.js'], ['compress']);
});

gulp.task('default', ['sass', 'compress', 'watch']);
gulp.task('build', ['compress']);