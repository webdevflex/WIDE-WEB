let project_folder = "dist";
let source_folder = "#src";


let path = {
    build: {
        html: project_folder + "/",
        css:  project_folder + "/",
        js:  project_folder + "/js/",
        img:  project_folder + "/img/",
        fonts:  project_folder + "/fonts/",
    },
    src: {
        html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"],
        css:  source_folder + "/*.{css,less}",
        js:  source_folder + "/js/**/*.js",
        img:  source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp,mp4}",
        fonts:  source_folder + "/fonts/*.{ttf,eot,woff,css}",
    },
    watch: {
        html: source_folder + "/**/*.html",
        css:  source_folder + "/mainCss.less",
        js:  source_folder + "/js/**/*.js",
        img:  source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp,mp4}",
    },
    clean:"./" + project_folder + "/"
}


let {src, dest} = require('gulp'),
    gulp = require('gulp'),
    browsersync = require("browser-sync").create();
    fileinclude = require("gulp-file-include");
    del = require("del");
    less = require("gulp-less");
    autoprefixer = require("gulp-autoprefixer");
    group_media = require("gulp-group-css-media-queries");
    clean_css = require("gulp-clean-css");
    rename = require("gulp-rename");
    uglify = require("gulp-uglify-es").default;
    imagemin = require("gulp-imagemin");
    webp = require("gulp-webp");
    webphtml = require("gulp-webp-html");



function browserSync(params) {
    browsersync.init({
      server: {
          baseDir: "./" + project_folder + "/"
      },
      port: 3000,
      notify: false
    })
}
function fonts() {
    return src(path.src.fonts)
        .pipe(dest(path.build.fonts))
}
function html() {
    return src(path.src.html)
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(webphtml())
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
}


function css() {
    return src(path.src.css)
        .pipe(
            less({
                outputStyle: "expanded"
            })
        )

        .pipe(
            autoprefixer({
                overrideBrowserslist:  ['last 5 versions'],
                cascade: true
            })
        )
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())
}

function js() {
    return src(path.src.js)
        .pipe(fileinclude())
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream())
}

function images() {
    return src(path.src.img)
        .pipe(
            webp({
                quality: 70
            })
        )
        .pipe(dest(path.build.img))
        .pipe(src(path.src.img))
        .pipe(
            imagemin({
                progressive:true,
                svgoPlugins: [{ removeViewBox: false }],
                interlaced: true,
                optimizationLevel: 3
            })
        )
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream())
}




function watchfiles(params) {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img], images);

}

function clean(params) {
    return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(js, css , html, images), fonts);
let watch = gulp.parallel(build, watchfiles, browserSync);

exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;