const fs = require("fs");
const gulp = require("gulp");
const htmlmin = require("gulp-htmlmin");
const scss = require("gulp-sass");
const css_clean = require("gulp-clean-css");
const css_concat = require("gulp-concat-css");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const imagemin = require("gulp-imagemin");
const del = require("del");

const paths = {
  pages: {
    src: "src/**/*.html",
    dest: "assets/"
  },
  styles: {
    src: "src/**/*.scss",
    dest: "assets/css/"
  },
  scripts: {
    src: "src/**/*.js",
    dest: "assets/js/"
  },
  images: {
    src: "src/img/**/*.{jpg,jpeg,png,svg,gif}",
    dest: "assets/img/"
  },
  jsons: {
    src: "src/**/*.json",
    dest: "assets/jsons/"
  }
};

let clear = () => del(["assets"]);

function pages() {
  return gulp
    .src(paths.pages.src)
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true
      })
    )
    .pipe(gulp.dest(paths.pages.dest));
}

function styles() {
  return gulp
    .src(paths.styles.src)
    .pipe(scss())
    .pipe(css_concat("main.min.css"))
    .pipe(css_clean())
    .pipe(gulp.dest(paths.styles.dest));
}

function images() {
  return gulp
    .src(paths.images.src)
    .pipe(
      imagemin({
        progressive: true
      })
    )
    .pipe(gulp.dest(paths.images.dest));
}

function scripts() {
  return gulp
    .src(paths.scripts.src)
    .pipe(concat("main.min.js"))
    .pipe(
      babel({
        presets: ["@babel/env"]
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.dest));
}

function jsons() {
  return gulp.src(paths.jsons.src).pipe(gulp.dest(paths.jsons.dest));
}

function watch() {
  let w_pg = gulp.watch(paths.pages.src, gulp.series(pages)),
    w_sc = gulp.watch(paths.scripts.src, gulp.series(scripts)),
    w_st = gulp.watch(paths.styles.src, gulp.series(styles)),
    w_im = gulp.watch(paths.images.src, gulp.series(images)),
    w_jn = gulp.watch(paths.jsons.src, gulp.series(jsons));
}

gulp.task("clear", clear);
gulp.task("default", gulp.series(pages, styles, scripts, images, jsons));
gulp.task("watch", gulp.series(watch));
