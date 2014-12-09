var gulp = require('gulp'),
	watch = require('gulp-watch'),
	handlebars = require('gulp-handlebars'),
	uglify = require('gulp-uglify'),
    wrap = require('gulp-wrap'),
    declare = require('gulp-declare'),
    inject = require('gulp-inject'),
    es = require('event-stream'),
    minifyCSS = require('gulp-minify-css'),
    browserSync = require('browser-sync'),
	concat = require('gulp-concat');

var reload = browserSync.reload;
var srcDir = './src',
    bowerDir = srcDir+'/bower_components',
    buildDir = './build';

var css = gulp.src([
        bowerDir+'/foundation/css/normalize.css',
        bowerDir+'/foundation/css/foundation.css',
        srcDir+'/css/*.css'
    ])
    .pipe(minifyCSS())
    .pipe(concat('main.min.css'))
    .pipe(gulp.dest(buildDir+'/css/'));

var images = gulp.src(srcDir+'/img/*')
    .pipe(gulp.dest(buildDir+'/img/'));

var modernizr = gulp.src(bowerDir+'/modernizr/modernizr.js')
    .pipe(uglify({mangle: false}))
    .pipe(gulp.dest(buildDir+'/js/'));

var scripts = gulp.src([
        bowerDir+'/jquery/dist/jquery.min.js',
        bowerDir+'/jquery-placeholder/jquery.placeholder.js',
        bowerDir+'/jquery.cookie/jquery.cookie.js',
        bowerDir+'/fastclick/lib/fastclick.js',
        bowerDir+'/foundation/js/foundation.min.js',
        bowerDir+'/handlebars/handlebars.runtime.min.js',
        bowerDir+'/ember/ember.prod.js',
        bowerDir+'/ember-data/ember-data.prod.js',
        srcDir+'/js/app.js',
        srcDir+'/js/router.js',
        srcDir+'/js/store.js',
        srcDir+'/js/**/*.js'
    ])
    .pipe(uglify({mangle: false}))
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest(buildDir+'/js/'));

var templates = gulp.src(srcDir+'/templates/*.hbs')
    .pipe(handlebars({
        handlebars: require('ember-handlebars')
    }))
    .pipe(wrap('Ember.Handlebars.template(<%= contents %>)'))
    .pipe(declare({
        namespace: 'Ember.TEMPLATES',
        noRedeclare: true,
        processName: function(filePath) {
            // Convert dots to slashes and drop the first two folders
            return declare.processNameByPath(filePath).split('.').slice(2).join('/');
        }
    }))
    .pipe(concat('templates.min.js'))
    .pipe(gulp.dest(buildDir+'/js/'));

/* Tareas */

gulp.task('watch-templates', function() {
    return gulp.src(srcDir+'/templates/*.hbs')
        .pipe(handlebars({
            handlebars: require('ember-handlebars')
        }))
        .pipe(wrap('Ember.Handlebars.template(<%= contents %>)'))
        .pipe(declare({
            namespace: 'Ember.TEMPLATES',
            noRedeclare: true,
            processName: function(filePath) {
            // Convert dots to slashes and drop the first two folders
            return declare.processNameByPath(filePath).split('.').slice(2).join('/');
        }
        }))
        .pipe(concat('templates.min.js'))
        .pipe(gulp.dest(buildDir+'/js/'))
        .pipe(reload({stream:true}));
});

gulp.task('watch-css', function() {
    return gulp.src([
        bowerDir+'/foundation/css/normalize.css',
        bowerDir+'/foundation/css/foundation.css',
        srcDir+'/css/*.css'
    ])
        .pipe(concat('main.min.css'))
        .pipe(gulp.dest(buildDir+'/css/'))
        .pipe(reload({stream:true}));
});

gulp.task('watch-js', function() {
    return gulp.src([
        bowerDir+'/jquery/dist/jquery.min.js',
        bowerDir+'/jquery-placeholder/jquery.placeholder.js',
        bowerDir+'/jquery.cookie/jquery.cookie.js',
        bowerDir+'/fastclick/lib/fastclick.js',
        bowerDir+'/foundation/js/foundation.min.js',
        bowerDir+'/handlebars/handlebars.runtime.min.js',
        bowerDir+'/ember/ember.prod.js',
        bowerDir+'/ember-data/ember-data.prod.js',
        srcDir+'/js/app.js',
        srcDir+'/js/router.js',
        srcDir+'/js/store.js',
        srcDir+'/js/**/*.js'
    ])
        .pipe(concat('main.min.js'))
        .pipe(gulp.dest(buildDir+'/js/'))
        .pipe(reload({stream:true}));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: buildDir
        }
    });
});

gulp.task('watch', ['index', 'browser-sync'], function() {
    gulp.watch(srcDir+'/css/*.css', ['watch-css']);
    gulp.watch(srcDir+'/js/*.js',['watch-js']);
    gulp.watch(srcDir+'/js/**/*.js',['watch-js']);
    gulp.watch(srcDir+'/templates/*.hbs', ['watch-templates']);
});

gulp.task('index', function() {
    return gulp.src(srcDir+'/index.html')
        .pipe(inject(modernizr, {relative: false, ignorePath: 'build', addRootSlash: false, name: 'head'}))
        .pipe(inject(es.merge(css, scripts), {relative: false, ignorePath: 'build', addRootSlash: false}))
        .pipe(inject(templates, {relative: false, ignorePath: 'build', addRootSlash: false, name: 'templates'}))
        .pipe(gulp.dest(buildDir+'/'));
});
