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
module.exports.loop = function(){
	mod.ccall('loop')
	console.log(`${Game.cpu.getUsed().toFixed(3)}/${Game.cpu.limit} ${Game.cpu.bucket}`)
	let intents = _.size(Game.creeps) +  _.size(Game.spawns)
	let intentCost = intents * 0.2
	let overhead = Game.cpu.getUsed() - intentCost
	console.log(intents, intentCost, overhead)
}
