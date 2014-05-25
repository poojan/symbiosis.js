var gulp = require('gulp'),
  traceur = require('gulp-traceur'),

  path = {
    src: './src/**/*.js',
    pkg: './package.json'
  };


gulp.task('build_source_amd', function () {
  gulp.src(path.src)
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
  gulp.src(path.src)
    .pipe(traceur({
      modules: 'commonjs',
      types: true,
      annotations: true,
      typeAssertions: true,
      typeAssertionModule: 'assert'
    }))
    .pipe(gulp.dest('dist/cjs'));
});

gulp.task('build_dist', ['build_source_cjs', 'build_source_amd']);
gulp.task('build', ['build_dist']);

gulp.task('watch', function () {
  gulp.watch(path.src, ['build']);
});
