let gulp = require('gulp');
let clean = require('gulp-clean');
let webpack = require('webpack-stream');
let path = require('path');
let browserSync = require('browser-sync').create();

const DIST_DIRECTORY = path.resolve(__dirname, 'dist');
const paths = {
  scripts: ['src/*.js', 'src/**/*.js'],
  styles: ['src/*.css', 'src/**/*.css'],
  pages: ['index.html', 'src/*.vue', 'src/**/*.vue']
};

gulp.task('clean', () => {
  console.log(`Action : clean the directory '${DIST_DIRECTORY}'`);
  return gulp.src(path.join(DIST_DIRECTORY, '*'), { read: false })
    .pipe(clean({ force: true }));
});

gulp.task('build', ['clean'], () => {
  // TODO : find a way to get the first js file no matter what in the source directory
  return gulp.src('src/main.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest(DIST_DIRECTORY));
});

gulp.task('watch', ['clean', 'build'], () => {

  browserSync.init({
    server: {
      baseDir: DIST_DIRECTORY
    }
  });

  gulp.watch([...paths.scripts, ...paths.styles, ...paths.pages], ['clean', 'build'])
    .on('change', browserSync.reload);
});