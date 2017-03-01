'use strict';

// Load plugins
const gulp        = require('gulp'),
      babel       = require('gulp-babel'),
      browserSync = require('browser-sync'),
      concat      = require('gulp-concat'),
      clean       = require('gulp-clean'),
      source      = require('vinyl-source-stream'),
      browserify  = require('browserify'),
      sass        = require('gulp-sass'),
      sourceMaps  = require('gulp-sourcemaps');

const OUTPUT_PATH = "dist/";
let bundler;

/* tasks */

gulp.task('clean', function () {
    return gulp.src( OUTPUT_PATH, {read: false})
        .pipe(clean());
});

gulp.task('dev', ['browserSync', 'html', 'scripts', 'styles'], () => {
    //a list of watchers, so it will watch all of the following files waiting for changes
    gulp.watch('app/js/**', ['scripts']);
    gulp.watch('app/css/**', ['styles']);
    gulp.watch('app/*.html', ['html']);
});

/* watchers */

gulp.task('html', () => {
    //watch any and all HTML files and refresh when something changes
    return gulp.src('app/*.html')
        //catch errors
        .pipe(gulp.dest(OUTPUT_PATH))
        .pipe(browserSync.reload({stream: true}))
        .on('error', function( e ) {
            logError( e );
            this.emit('end');
        });
});

/* internal handlers */

gulp.task('browserSync', () => {
    browserSync({
        server: {
            baseDir: "dist/"
        },
        options: {
            reloadDelay: 250
        },
        notify: false
    });
});

gulp.task('styles', () => {
    //the initializer / master SCSS file, which will just be a file that imports everything
    return gulp.src('app/css/main.scss')
        //get sourceMaps ready
        .pipe(sourceMaps.init())
        //include SCSS and list every "include" folder
        .pipe(sass({
            errLogToConsole: true,
            includePaths: [
                'app/css/'
            ]
        }))
        //catch errors
        .on('error', function( e ) {
            logError( e );
            this.emit('end');
        })
        //the final filename of our combined css file
        .pipe(concat('styles.css'))
        //get our sources via sourceMaps
        .pipe(sourceMaps.write())
        //where to save our final, compressed css file
        .pipe(gulp.dest('dist/app/css'))
        //notify browserSync to refresh
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('scripts', ['browserify', 'js']);

gulp.task('js', () => {
    return bundler.bundle()
        .on('error', function( e ) {
            logError( e );
            this.emit('end');
        })
        .pipe(source('app/js/main.js'))
        .pipe(gulp.dest(OUTPUT_PATH))
                //notify browserSync to refresh
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('browserify', function () {
    bundler = browserify({
        debug: true,
        entries: ['./app/js/main.js'],
        cache: {},
        packageCache: {},
        fullPaths: true
    });
});


/* error handler */

function logError( e ) {
    console.log( `Error ${e.message} occurred` );
}
