/**
 * Task runner script for building the theme assets (JS + SCSS).
 */

const gulp = require('gulp');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const size = require('gulp-size');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');

const Fiber = require('fibers');
sass.compiler = require('sass');

const paths = {
  scss: './theme/scss/[!_]*.scss',
  js: './theme/js/*.js',
  dest: './theme/napari/static/dist',
};

function scss() {
  return gulp
    .src(paths.scss, { since: gulp.lastRun(scss) })
    .pipe(sourcemaps.init())
    .pipe(sass({ fiber: Fiber }).on('error', sass.logError))
    .pipe(postcss())
    .pipe(rename({ extname: '.css' }))
    .pipe(sourcemaps.write())
    .pipe(size({ title: 'CSS' }))
    .pipe(gulp.dest(paths.dest));
}

function javascript() {
  return gulp
    .src(paths.js, { since: gulp.lastRun(javascript) })
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(rename({ extname: '.js' }))
    .pipe(sourcemaps.write())
    .pipe(size({ title: 'JS' }))
    .pipe(gulp.dest(paths.dest));
}

// Gulp tasks

const build = gulp.parallel(javascript, scss);

function watch() {
  gulp.watch(paths.scss, scss);
  gulp.watch(paths.js, javascript);
}

module.exports = {
  build,
  watch,
};
