// load modules
var gulp = require('gulp');
var del = require('del');
var path = require('path');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');

// load paths
var paths = {
    "src": "./src/",
    "dist": "./dist/",
    "webroot": "../../",

    "scripts": {
        "src": "js",
        "filter": "/**/*.+(js)",
        "dist": "js"
    },

    "css": {
        "src": "scss",
        "filter": "/**/*.+(scss)",
        "dist": "css"
    }
};

var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'compressed'
};

var autoprefixerOptions = {
    browsers: ['last 2 versions', '> 1%', 'IE >= 9'],
    cascade: false,
    supports: false
};

gulp.task('css', ['cleancss'], function() {
    return gulp
        .src(paths.src + paths.css.src + paths.css.filter)
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(sourcemaps.init())
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(cleanCSS())
        .pipe(rename('fluent-rtl.css'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.dist + paths.css.dist));
});

gulp.task('cleancss', function() {
    return del.sync([
        paths.dist + paths.css.dist
    ]);
});

gulp.task('scripts', ['cleanscripts'], function() {
    return gulp
        .src(paths.src + paths.scripts.src + paths.scripts.filter)
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(sourcemaps.init())
        .pipe(concat('fluent-rtl.js'))
        .pipe(stripDebug())
        .pipe(uglify({mangle: false}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.dist + paths.scripts.dist));
});

gulp.task('cleanscripts', function() {
    return del.sync([
        paths.dist + paths.scripts.dist
    ]);
});

gulp.task('watch', function() {
    gulp.watch(paths.src + paths.scripts.src + paths.scripts.filter, ['scripts']);
    gulp.watch(paths.src + paths.css.src + paths.css.filter, ['css']);
});

gulp.task('build', ['css', 'scripts']);

gulp.task('default', ['css', 'scripts', 'watch']);


var onError = function(err) {
    console.log(err);
}