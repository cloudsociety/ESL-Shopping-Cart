var gulp = require('gulp');
var directoryMap = require('gulp-directory-map');
var wrap = require('gulp-wrap');

// File paths
var DIST_PATH = 'dist';
var SRC_PATH = 'src';
// var SCRIPTS_PATH = 'public/scripts/**/*.js';
// var STYLES_PATH = 'public/css/**/*.css';

gulp.task('imgjson', function () {
  gulp.src('images/**/*')
  .pipe(directoryMap({
    filename: 'ImagesMixin.js',
    prefix: 'images'
  }))
  .pipe(wrap('export const ImagesMixin = {data(){return <%= contents %> }}', {}, { /*parse: false*/ /* do not parse the JSON file for template data */ }))
  .pipe(gulp.dest(SRC_PATH));
});
