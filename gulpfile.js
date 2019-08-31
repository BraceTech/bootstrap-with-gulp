var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');

// BrowserSync Reload
function browserSyncReload(done) {
    browsersync.reload();
    done();
  }

// Compile sass into CSS & auto-inject into browsers
function scss() {
    return gulp
    .src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
}

// Move the javascript files into our /src/js folder
function scripts() {
    return gulp
    .src(['node_modules/bootstrap/dist/js/bootstrap.bundle.min.js', 'node_modules/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest("src/js"))
        .pipe(browserSync.stream());
}

// Static Server + watching scss/html files
function watchfiles() {

    browserSync.init({
        server: "./src"  
    });

    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], scss);
    gulp.watch("src/*.html").on('change', browserSync.reload);
}

const build = gulp.series(scripts, watchfiles);

exports.default = build;