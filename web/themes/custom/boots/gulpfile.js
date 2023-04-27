const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const flatten = require('gulp-flatten');
const browserSync = require('browser-sync').create();

// compile scss to css
function subthemeStyle() {
  return gulp.src('src/scss/**/*.scss', { base: '.'})
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(flatten({ includeParents: 0 }))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
}

// watcher
function watch() {
  browserSync.init({
    proxy: 'http://127.0.0.1:50774',
    host: 'http://127.0.0.1',
    open: false,
    port: 3000,
  });
  gulp.watch('src/scss/**/*.scss', subthemeStyle);
  gulp.watch('./js/**/*.js').on('change', browserSync.reload);
}

exports.subthemeStyle = subthemeStyle;
exports.watch = watch;
