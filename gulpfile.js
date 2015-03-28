var gulp = require('gulp'),
  gutil = require('gulp-util'),
  rename = require('gulp-rename'),
  transform = require('vinyl-transform'),
  reactify = require('reactify'),
  browserify = require('browserify'),
  watchify = require('watchify'),
  uglify = require('gulp-uglify'),
  minify = require('gulp-minify-css'),
  concat = require('gulp-concat'),
  livereload = require('gulp-livereload'),
  path = require('path');

gulp.task('bundle', function(){
  var filename = path.join(__dirname, './src/client.js'),
    bundler = watchify(browserify(filename, watchify.args)) 
      .transform(reactify)
      .on('update', bundle)
      .on('log', gutil.log);

  function bundle(){
    var bundle = transform(function(){
      return bundler.bundle()
        .on('error', gutil.log.bind(gutil, 'Browserify Error'));
    });

    return gulp.src(filename)
      .pipe(bundle)
      .pipe(uglify())
      .pipe(rename('common.js'))
      .pipe(gulp.dest('./build/'));
  };

  return bundle();
});

gulp.task('livereload', function(){
  gulp.src('./build/*')
    .pipe(livereload());
});

gulp.task('cssmin', function(){
	return gulp.src(['./static/reset.css', './static/common.css'])
		.pipe(concat('common.css'))
		.pipe(minify())
		.pipe(gulp.dest('./build/'));
});

gulp.task('static', ['cssmin'], function(){
	return gulp.src(['./static/**', '!./static/*.css'])
		.pipe(gulp.dest('./build/'));
});

gulp.task('default', ['bundle', 'static'], function(){
  require('./src/server.js');
});
gulp.task('dev', ['bundle', 'static'], function(){
  require('./src/server.js');
  livereload.listen();
  gulp.watch('./build/*', ['livereload']);
  gulp.watch('./static/*', ['cssmin', 'static']);
});
