const build = require('./build-module.js');
build.processManifests();
build.compileJS(()=>{console.log("Done!")});