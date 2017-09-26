const Module = require('wasmtest-mod')

const opts = {
  ENVIRONMENT: 'SHELL', // This works, NODE does not
  print: function(text){ console.log(`[STDOUT] ${text}`); },
  printErr: function(text){ console.log(`[STDERR] ${text}`); },
  onAbort: function(){ console.log(`[ABORT] WASM Aborted!`); },
  noInitialRun: true,
  noExitRuntime: true,
  wasmBinary: require('wasmtest')
};

const mod = Module(opts);
mod.ccall('setup');
module.exports.loop = mod.cwrap('loop')
