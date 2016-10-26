/**
 * gulp 脚手架
 * @author Jmingzi
 * @time 16/10/26
 * 参数：--env production 打包到线上
 *       --dir caiyun/masheng 打包的文件夹名称 默认为dest 
 * 使用方法：
 *      gulp 测试环境 打包到dest目录 
 *      gulp --env production --dir caiyun 打包线上的彩云
 */

var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var runSequence = require('gulp-run-sequence');
var clean = require('gulp-clean');
var babel = require('gulp-babel');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector'); 
var gulpif = require('gulp-if'); 
var minimist = require('minimist');
var htmlmin = require("gulp-htmlmin");

// 命令行参数
var defaultOptions = {
    string: 'env',
    default: { env: process.env.NODE_ENV || 'dev' }
};
var options = minimist(process.argv.slice(2), defaultOptions);

var src = {
    css: "src/css",
    js: "src/js",
    img: "src/images",
    html: "src/htmls",
    font: "src/fonts",
    lib: "src/lib",
    rev: "src/rev"
};
var destDir = options.dir || "dest";
var dest = {
    css: destDir + "/css",
    js: destDir + "/js",
    img: destDir + "/images",
    html: destDir + "",
    file: destDir + "/files"
};

gulp.task("clean", function(){
    return gulp.src(destDir, {read: false}).pipe(clean());
});

gulp.task("html", function(){
    var opt = {
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        minifyJS: true,
        minifyCSS: true
    };
    console.log(options);
    return gulp.src(src.html + '/**/*.html')
        .pipe(gulpif(options.env === 'production', htmlmin(opt)))
        .pipe(gulp.dest( dest.html ));
});

gulp.task('css', function() {
    return gulp.src([src.css + "/*.scss", src.css + '/**/*.scss'])
        .pipe(plumber())
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer())
        .pipe(plumber.stop())
        .pipe(rev())
        .pipe(gulp.dest(dest.css))
        .pipe( rev.manifest() )
        .pipe( gulp.dest(src.rev + "/css") );
});

gulp.task('js', function(){
    return gulp.src([src.js + "/*.js", src.js + '/**/*.js'])
        .pipe(plumber())
        .pipe(babel({ presets: ['es2015'] }))
        .pipe(gulpif(options.env === 'production', uglify()))
        .pipe(plumber.stop())
        .pipe(gulp.dest(dest.js));
});

// 图片跟字体
gulp.task('file', function(){
    return gulp.src([src.font + "/*", src.img + "/*", src.lib + "/*"])
        .pipe(rev())
        .pipe(gulp.dest(dest.file))
        .pipe( rev.manifest() )
        .pipe( gulp.dest(src.rev + "/files") );
});

gulp.task('rev', function () {
    return gulp.src([src.rev + '/**/*.json', dest.html + '/**/*.html'])
        .pipe( revCollector({
            dirReplacements: {
                '../css': './css',
                '../js': './js',
                '../lib': "./lib",
                'cdn/': function(manifest_value) {
                    return '//cdn' + (Math.floor(Math.random() * 9) + 1) + '.' + 'exsample.dot' + '/img/' + manifest_value;
                }
            }
        }) )
        .pipe( gulp.dest(dest.html) );
});


gulp.task('default', function (cb) {
    runSequence('clean', ['css', 'html', 'js', 'file'], 'rev', cb);
});