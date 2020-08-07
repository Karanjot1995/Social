const gulp = require('gulp');

const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const rev = require('gulp-rev');
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
var minify = require('gulp-minify');
const del = require('del');
var cleanCss = require('gulp-clean-css');



gulp.task('css', function () {
  console.log('minifying css...');
  gulp.src('./assets/sass/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./assets.css'));

  return gulp.src('./assets/**/*.css')
    .pipe(cleanCss())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
      cwd: 'public',
      merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
});

gulp.task('js', function () {
  console.log('minifying js...');
  return gulp.src('./assets/**/*.js')
    .pipe(minify({
      ext: {
        min: '.js'
      },
      noSource: true
    }))
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
      cwd: 'public',
      merge: true
    }))
    .pipe(gulp.dest('./public/assets'));

});
// once uglified then revised the name then put it into public/assets then put details into manifest


// gulp.task('images', function () {
//   console.log('compressing images...');
//   return gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')
//     .pipe(imagemin())
//     .pipe(rev())
//     .pipe(gulp.dest('./public/assets'))
//     .pipe(rev.manifest({
//       cwd: 'public',
//       merge: true
//     }))
//     .pipe(gulp.dest('./public/assets'));
// });

gulp.task('clean:assets', function (done) {
  del.sync('./public/assets');
  done()
});

gulp.task('build', gulp.series('clean:assets', 'css', 'js'), function () {
  console.log('Building assets');
  return
});