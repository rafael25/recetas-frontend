var gulp = require('gulp'),
	watch = require('gulp-watch'),
	handlebars = require('gulp-handlebars'),
	uglify = require('gulp-uglify'),
    wrap = require('gulp-wrap'),
    declare = require('gulp-declare'),
    inject = require('gulp-inject'),
    es = require('event-stream'),
    minifyCSS = require('gulp-minify-css'),
	concat = require('gulp-concat');

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
        bowerDir+'/ember-data/ember-data.prod.js',])
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
        noRedeclare: true
    }))
    .pipe(concat('templates.min.js'))
    .pipe(gulp.dest(buildDir+'/js/'));

/* Tareas */

gulp.task('watch-css', function() {
    return gulp.src([
        bowerDir+'/foundation/css/normalize.css',
        bowerDir+'/foundation/css/foundation.css',
        srcDir+'/css/*.css'
    ])
        .pipe(concat('main.min.css'))
        .pipe(gulp.dest(buildDir+'/css/'));
});

gulp.task('watch', ['index'], function() {
    gulp.watch(srcDir+'/css/*.css', ['watch-css'])
});

gulp.task('index', function() {
    return gulp.src(srcDir+'/index.html')
        .pipe(inject(modernizr, {relative: true, name: 'head'}))
        .pipe(inject(es.merge(css, scripts, templates), {relative: true}))
        .pipe(gulp.dest(buildDir+'/'));
});
