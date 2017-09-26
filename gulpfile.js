const fs = require('fs')
const gulp = require('gulp')
const screeps = require('gulp-screeps')
const auth = require('./auth.js')

gulp.task('copy', [], () => gulp.src('src/*.js').pipe(gulp.dest('dist/')))

gulp.task('convert', [], cb => {
	fs.readFile('build/wasmtest.wasm', function(err, data) {
		let mid = []
		for(let i = 0; i < data.length; i++) mid.push(data[i].toString())
		mid = mid.join(',')
		let payload = `module.exports = new Uint8Array([${mid}])`
		fs.writeFile('dist/wasmtest.js', payload, cb)
	})
})

gulp.task('default', ['official'])

gulp.task('sp', ['copy','convert'], () => {
  auth.ptr = auth.ptr || false
  auth.branch = auth.branch || branch
  return gulp.src(`dist/*.js`)
    .pipe(screeps(auth))
})


gulp.task('official', ['copy'], () => {
  auth.ptr = auth.ptr || false
  auth.branch = auth.branch || branch
  return gulp.src(`dist/*.{js,wasm}`)
    .pipe(screeps(auth))
})
