import pkg from 'gulp';
const {src, dest, series, watch} = pkg;
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import csso from 'gulp-csso';
import autoprefixer from 'gulp-autoprefixer';
import concat from 'gulp-concat';
import del from 'del';
import include from 'gulp-file-include';
import sync from 'browser-sync';
import htmlmin from 'gulp-htmlmin';

const compileHtml = () => {
  return src('src/html/**.html')
  .pipe(
    include({
      prefix: '@@'
    })
  )
  .pipe(htmlmin({
    collapseWhitespace: true
  }))
  .pipe(dest('dist'));
};

const compileScss = () =>{
  return src('src/scss/**.scss')
  .pipe(sass())
  // .pipe(autoprefixer({
  //   browsers: ['last 2 versions']
  // }))
  .pipe(csso())
  .pipe(concat('index.css'))
  .pipe(dest('dist'));
};

const collectImg = () =>{
  return src('src/assets/**')
  .pipe(dest('dist/assets'));
};

const compileJs = () =>{
  return src('src/js/**.js')
  .pipe(concat('index.js'))
  .pipe(dest('dist'));
};


const deleteDist = () =>{
  return del('dist');
};

const browserSync = () => {
  sync.init({
    server: './dist'
  });
  watch('src/html/**.html', series(compileHtml)).on('change', sync.reload);
  watch('src/scss/**.scss', series(compileScss)).on('change', sync.reload);
  watch('src/js/**.js', series(compileJs)).on('change', sync.reload);
  watch('src/assets/img/**', series(collectImg)).on('change', sync.reload);

};

export const build = series(deleteDist, collectImg, compileScss, compileHtml, compileJs);

export const dev = series(deleteDist, collectImg, compileScss, compileHtml, compileJs, browserSync);