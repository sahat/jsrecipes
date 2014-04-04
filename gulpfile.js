var gulp = require('gulp');
var sass = require('gulp-sass');
var csso = require('gulp-csso');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var templates = require('gulp-angular-templatecache');
var minifyHTML = require('gulp-minify-html');

gulp.task('sass', function() {
  gulp.src('./styles/styles.scss')
    .pipe(sass())
    .pipe(csso())
    .pipe(gulp.dest('styles'));
});

gulp.task('templates', function () {
  gulp.src('views/*.html')
    .pipe(minifyHTML({ quotes: true }))
    .pipe(templates('templates.js'))
    .pipe(gulp.dest('tmp'));
});

gulp.task('compress', function() {
  gulp.src(['scripts/**/*.js', '!scripts/lib/**'])
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('dist'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  gulp.watch('./styles/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'watch']);
gulp.task('build', ['compress', 'templates']);