"use strict";

const build = require('./build-module.js');
build.processManifests(() => { console.log("Manifests Done!") });
build.compileCSS(() => { console.log("CSS Done!") });
build.compileJS(() => { console.log("JS Done!") });
build.compileHTML(() => { console.log("HTML Done!") });