'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');

gulp.task('clean-js', function () {
  return gulp.src(['./scripts/main.min.js', './scripts/main.js'], {read: false})
    .pipe(clean());
});

gulp.task('sass', function() {
    return gulp.src('./style/scss/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('./style'));
});

gulp.task('sass-watch', function() {
    gulp.watch('./style/scss/**/*.scss', ['sass']);
});

gulp.task('js', ['clean-js'], function() {
    return gulp.src('./scripts/**/*.js')
        .pipe(concat('main.js'))
        .pipe(rename('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./scripts'));
});

gulp.task('js-watch', function() {
    gulp.watch('./scripts/**/*.js', ['sass']);
});

gulp.task('watch', ['js', 'js-watch', 'sass', 'sass-watch']);
