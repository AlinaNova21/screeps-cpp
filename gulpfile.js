const gulp = require('gulp')
const screeps = require('gulp-screeps')
const auth = require('./auth.js')

gulp.task('copy', [], () => gulp.src('src/*.js').pipe(gulp.dest('dist/')))

gulp.task('default', ['copy'], () => {
  auth.ptr = auth.ptr || false
  auth.branch = auth.branch || branch
  return gulp.src(`dist/*.{js,wasm}`)
    .pipe(screeps(auth))
})

