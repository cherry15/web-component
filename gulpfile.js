var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  sass = require('gulp-ruby-sass'),
  server = require('gulp-server-livereload'),
  inject = require('gulp-inject'),
  del = require('del'),
  jasmine = require('gulp-jasmine'),
  gulpif = require('gulp-if');
  // source and destination folders
  src = 'app/',
  dest = 'dist/',
  karma = require('karma').server,
  cssDestFolder = src,
  cssStyle = 'compressed',
  serverSrc = dest;

/**
 * Set distribution environment
 */
gulp.task('set-env-dist', function () {
    cssDestFolder = dest;
    cssStyle = 'compressed';
    serverSrc = dest;
});

/**
 * Set development environment
 */
gulp.task('set-env-dev', function () {
    cssDestFolder = src;
    cssStyle = 'expanded';
    serverSrc = src;
});


/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
    karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done);
});

/**
 * Run server
 */
gulp.task('webServer', function () {
    gulp.src(serverSrc)
      .pipe(server({
          livereload: true,
          log: 'debug',
          open: true
      }));
});

/**
 * Compress sass
 */
gulp.task('sass', function () {
    return sass(src + 'app.scss', {style: cssStyle})
      .pipe(gulp.dest(cssDestFolder));
});

/**
 * Concatenate and compress js
 */
gulp.task('scripts', function () {
    return gulp.src([
        src + 'app.js',
        src + 'components/**/*.js',
        src + '**/*.js',
        '!' + src + 'components/**/*.spec.js',
        '!' + src + '**/*.spec.js'
    ])
      .pipe(concat('main.js'))
      .pipe(rename({suffix: '.min'}))
      .pipe(uglify())
      .pipe(gulp.dest(dest));
});

// Delete everything in destination folder
/*gulp.task('clean', function (cb) {
 del([
 dest
 ], cb);
 });*/
// Copy all the files
//gulp.task('copy', function () {return gulp.src([src + '**/*'], { base: src }).pipe(gulp.dest(dest));});

gulp.task('build-dist', ['set-env-dist', 'scripts', 'sass']);
gulp.task('serve-dist', ['set-env-dist', 'webServer']);
gulp.task('serve', ['set-env-dev', 'sass', 'webServer']);
