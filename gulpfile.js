'use strict';

var gulp = require('gulp');
var clean = require('gulp-clean');
var traceur = require('gulp-traceur');
var jshint = require('gulp-jshint');

var path = {
  src: './src/**/*.js',
  pkg: './package.json'
};

gulp.task('clean', function () {
  return gulp.src('dist/**/*', { read: false })
    .pipe(clean({ force: true }));
});

gulp.task('jshint', function () {
  return gulp.src(path.src)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('build_source_amd', function () {
  return gulp.src(path.src)
    .pipe(traceur({
      modules: 'amd',
      types: true,
      annotations: true,
      typeAssertions: true,
      typeAssertionModule: 'assert'
    }))
    .pipe(gulp.dest('dist/amd'));
});

gulp.task('build_source_cjs', function () {
  return gulp.src(path.src)
    .pipe(traceur({
      modules: 'commonjs',
      types: true,
      annotations: true,
      typeAssertions: true,
      typeAssertionModule: 'assert'
    }))
    .pipe(gulp.dest('dist/cjs'));
});

gulp.task('build', ['build_source_cjs', 'build_source_amd']);

gulp.task('watch', function () {
  gulp.watch(path.src, ['build']);
});

gulp.task('default', ['jshint', 'build']);
