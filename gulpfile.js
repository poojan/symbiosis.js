'use strict';

var gulp = require('gulp');
var clean = require('gulp-clean');
var traceur = require('gulp-traceur');

gulp.task('clean', function () {
  gulp.src('dist/**/*', { read: false })
    .pipe(clean({ force: true }));
});

gulp.task('traceur', function () {
  gulp.src('src/**/*.js')
    .pipe(traceur())
    .pipe(gulp.dest('dist'));
});

gulp.task('build', ['clean', 'traceur']);

gulp.task('watch', ['build'], function () {
  gulp.watch('src/**/*.js', ['build']);
});

gulp.task('default', ['build']);
