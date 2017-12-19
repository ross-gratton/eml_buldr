/*//////////////////////////////////////////////////////////////////////////////
|| Setup
//////////////////////////////////////////////////////////////////////////////*/

    /*<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    || Load Config
    >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
    var config = require('./config.json');

    /*<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    || Include Node Files
    >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
    var gulp = require('gulp'),
		fs = require('fs');

    /*<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    || Include Plugins
    >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
    var sass = require('gulp-ruby-sass'),
        livereload = require('gulp-livereload'),
        inlineCss = require('gulp-inline-css'),
        htmlmin = require('gulp-htmlmin'),
        cleanCSS = require('gulp-clean-css'),
        twig = require('gulp-twig'),
        //prettify = require('gulp-html-prettify'),
        replace = require('gulp-replace'),
		purgecss = require('gulp-purgecss');

	/*<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
	|| Helpers
	>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
	var patterns = [];
	gulp.task('get-patterns', function(){
		return fs.readdir('../source/patterns', function(err, files){
			patterns = files;
		});
	});


/*//////////////////////////////////////////////////////////////////////////////
|| Styles
//////////////////////////////////////////////////////////////////////////////*/
gulp.task('sass', ['get-patterns'], function(){
	return sass(config.env.sources.sass + '*', { style:"nested", sourcemap:false })
		.pipe(cleanCSS())
        .pipe(gulp.dest(config.env.processing.css));
});
gulp.task('purgecss', ['pre-build'], function(){
	return gulp.src(config.env.processing.css + 'mobile.css')
		.pipe(purgecss({
			content: [config.env.processing.html + "index__pre-build.html"]
		}))
		.pipe(gulp.dest(config.env.processing.css));
});


/*//////////////////////////////////////////////////////////////////////////////
|| Build
//////////////////////////////////////////////////////////////////////////////*/

    /*<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    || Standard
	>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
    gulp.task('pre-build', ['sass'], function(){

		return gulp.src(config.env.sources.utilities + 'index__pre-build.twig')
			.pipe(twig({
				base: "../source/utilities/",
				data: {
					imagepath: config.image_path,
					spacertype: config.spacer,
					csspath: "../app/tmp/css/",
					patterns: patterns
				}
			}))
			.pipe(replace("[[image-path]]", config.image_path))
			.pipe(replace("[[spacer-type]]", config.spacer))
			.pipe(gulp.dest(config.env.processing.html))
			.pipe(livereload());

    });
	gulp.task('build', ['purgecss'], function(){

		return gulp.src(config.env.sources.utilities + 'index.twig')
			.pipe(twig({
				base: "../source/utilities/",
				data: {
					imagepath: config.image_path,
					spacertype: config.spacer,
					csspath: "../app/tmp/css/",
					patterns: patterns,
					horizontal_spacing: config.horizontal_spacing,
					vertical_spacing: config.vertical_spacing
				}
			}))
			.pipe(replace("[[image-path]]", config.image_path))
			.pipe(replace("[[spacer-type]]", config.spacer))
			.pipe(htmlmin({
				collapseWhitespace: true,
				removeComments: true
			}))
			.pipe(gulp.dest(config.env.build.dev))
			.pipe(inlineCss({
				removeStyleTags: false
			}))
			.pipe(gulp.dest(config.env.build.dev))
			.pipe(livereload());
	});

/*//////////////////////////////////////////////////////////////////////////////
|| Package
||
|| Copy build/index.html into package folder
|| Copy source/images into package folder
|| Copy source/modules into package folder
//////////////////////////////////////////////////////////////////////////////*/
gulp.task('package', function(){

	gulp.src([config.env.build.dev + 'index.html'], { base: '../build/' })
		.pipe(gulp.dest(config.env.build.package + 'email'));

	gulp.src(['../source/thumbnails/*'], { base: '../source/' })
		.pipe(gulp.dest(config.env.build.package + 'email'));

	return gulp.src(['../source/images/*'], { base: '../source/' })
		.pipe(gulp.dest(config.env.build.package + 'email'));

});


/*//////////////////////////////////////////////////////////////////////////////
|| Watches
//////////////////////////////////////////////////////////////////////////////*/
gulp.task('watch', function(){
    
	livereload.listen();
    
    /*<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    || Styles
    >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
	gulp.watch(config.env.sources.sass + '**/*.scss', { debounceDelay: 2000 }, ['build']);
    
    /*<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    || HTML / Utils
    >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
	gulp.watch(config.env.sources.patterns + '*.twig', { debounceDelay: 2000 }, ['build']);
	gulp.watch(config.env.sources.fragments + '*.twig', { debounceDelay: 2000 }, ['build']);
});


/*//////////////////////////////////////////////////////////////////////////////
|| Default task wrapper
//////////////////////////////////////////////////////////////////////////////*/
gulp.task('default', ['watch']);
