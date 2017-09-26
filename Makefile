SHELL := /bin/bash
C := ~/emsdk-portable/emscripten/1.37.21/emcc

all:
	mkdir -p dist
	mkdir -p build
	$C \
		-s BINARYEN_ASYNC_COMPILATION=0 \
		-s EXPORTED_FUNCTIONS='["_main","_setup","_loop"]' \
		-s WASM=1 \
		-s MODULARIZE=1 \
		-s EXPORT_ALL=1 \
		--bind \
		-O0 \
		src/wasmtest.cpp \
		-o build/wasmtest.html
	cp build/wasmtest.wasm dist/
	cp build/wasmtest.js dist/wasmtest-mod.js
	echo ";module.exports = Module" >> dist/wasmtest-mod.js
	gulp
