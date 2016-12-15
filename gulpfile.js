const gulp = require('gulp');
const rollup = require('rollup-stream');
const source = require('vinyl-source-stream');
const buble = require('rollup-plugin-buble');
const svelte = require('rollup-plugin-svelte');

gulp.task('build', () => {
  return rollup({
    entry: './main.js',
    format: 'iife',
    plugins: [svelte(), buble()]
  })
  .pipe(source('app.js'))
  .pipe(gulp.dest('./dist/js'));
});

gulp.task('default', ['build']);