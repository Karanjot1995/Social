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


gulp.task('images', function () {
  console.log('compressing images...');
  return gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
      cwd: 'public',
      merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
});




// empty the public/assets directory
// gulp.task('clean-js', function () {
//   return del([
//     './public/js/*.js'
//   ]);
// });

// gulp.task('clean-css', function () {
//   return del([
//     './public/css/*.css'
//   ]);
// });

// gulp.task('clean-images', function () {
//   return del([
//     './public/images/*.+(png|jpg|gif|svg|jpeg)'
//   ]);
// });

// gulp.task('js', ['clean-js'], function () {
//   console.log('Building assets');
//   return
// })
// gulp.task('css', ['clean-css'], function () {
//   console.log('Building assets');
//   return
// })
// gulp.task('images', ['clean-images'], function () {
//   console.log('Building assets');
//   return
// })
gulp.task('clean:assets', function () {
  return del(['./public/assets'])
});

gulp.task('build', gulp.series('clean:assets', 'css', 'images', 'js'), function () {
  console.log('Building assets');
  return
});