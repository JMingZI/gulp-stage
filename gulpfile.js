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
// var sass = require('gulp-sass');
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
var fileinclude = require('gulp-file-include');
var sass = require('gulp-ruby-sass');

var watch = require('gulp-watch');

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
    html: destDir + "/html",
    font: destDir + "/fonts",
    lib: destDir + "/lib"
};

gulp.task("clean", function(){
    // 打印参数
    console.log(options);
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
    return gulp.src([src.html + '/**/*.html', src.html + '/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        // .pipe(gulpif(options.env === 'production', htmlmin(opt)))
        .pipe(gulp.dest( dest.html ));
});
// 本机安装gulp-sass 报错，
gulp.task('css', function() {
    return gulp.src([src.css + "/*.scss", src.css + '/**/*.scss'])
        // .pipe(plumber())
        .pipe(gulpif(options.env === 'production', sass({outputStyle: 'compressed'}), sass()))
        // .pipe(autoprefixer())
        // .pipe(plumber.stop())
        // .pipe(rev())
        .pipe(gulp.dest(dest.css))
        // .pipe( rev.manifest() )
        // .pipe( gulp.dest(src.rev + "/css") );
});
// 替换为gulp-ruby-sass
gulp.task('ruby-sass', function() {
    return sass([src.css + "/*.scss", src.css + '/**/*.scss'], gulpif(options.env === 'production', {style: 'compressed'}, {}))
        // .pipe(plumber())
        // .pipe(autoprefixer())
        // .pipe(plumber.stop())
        // .pipe(rev())

        .on('error', sass.logError)
        .pipe(gulp.dest(dest.css))
        // .pipe( rev.manifest() )
        // .pipe( gulp.dest(src.rev + "/css") );
});

gulp.task('js', function(){
    return gulp.src([src.js + '/**/*.js'])
        // .pipe(plumber())
        .pipe(babel({ presets: ['es2015'] }))
        // .pipe(gulpif(options.env === 'production', uglify()))
        // .pipe(plumber.stop())
        // .pipe(rev())
        .pipe(gulp.dest(dest.js))
        // .pipe( rev.manifest() )
        // .pipe( gulp.dest(src.rev + "/js") );
});

// 图片
gulp.task('images', function(){
    return gulp.src(src.img + "/*")
        // .pipe(rev())
        .pipe(gulp.dest(dest.img))
        // .pipe( rev.manifest() )
        // .pipe( gulp.dest(src.rev + "/img") );
});

// 字体
gulp.task('font', function(){
    return gulp.src(src.font + "/*")
        .pipe(rev())
        .pipe(gulp.dest(dest.font))
        .pipe( rev.manifest() )
        .pipe( gulp.dest(src.rev + "/font") );
});

// 其它文件 库
gulp.task('files', function(){
    return gulp.src([src.lib + "/*", src.lib + "/**/*"])
        // .pipe(rev())
        .pipe(gulp.dest(dest.lib))
        // .pipe( rev.manifest() )
        // .pipe( gulp.dest(src.rev + "/lib") );
});

gulp.task('revhtml', function () {
    return gulp.src([src.rev + '/**/*.json', dest.html + '/**/*.html'])
        .pipe( revCollector({
                dirReplacements: {
                    '../css': './css',
                    '../js': './js',
                    '../lib': "./lib",
                    '../images': './images',
                    'cdn/': function(manifest_value) {
                        return '//cdn' + (Math.floor(Math.random() * 9) + 1) + '.' + 'exsample.dot' + '/img/' + manifest_value;
                    }
                }
            }))
        .pipe( gulp.dest(dest.html) );
});
gulp.task('revcss', function () {
    return gulp.src([src.rev + '/**/*.json', dest.css + "/*.css"])
        .pipe( revCollector())
        .pipe( gulp.dest(dest.css) );
});

gulp.task('default', function (cb) {
    // runSequence('clean', ['ruby-sass', 'html', 'js', 'images', "font", "files"], 'revhtml', "revcss", cb);
    runSequence('clean', 'ruby-sass', 'js', 'images', "files", 'html', cb);
});

gulp.task('watch', function () {
    gulp.watch([src.html + '/*.html', src.html + '/**/*.html', "src/template/*.tpl"], ['html']);
    gulp.watch([src.css + "/*.scss", src.css + '/**/*.scss'], ['ruby-sass']);
    gulp.watch(src.js + '/**/*.js', ['js']);
});
