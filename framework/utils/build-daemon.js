const chokidar = require('chokidar');
const build = require('./build-module.js');

console.log("Compiling manifests... (note, you will need to re-run this tool to rebuild these again!)");

build.processManifests();

var scanned = false;
var queued_js = false;
var queued_sass = false;

function onJSChanged(path) {
	if (!scanned || queued_js) return;

	queued_js = true;
	setTimeout(()=>{
		build.compileJS(()=>{
			queued_js=false;
			var d = new Date();
		    d = d.getFullYear() + "-" + ('0' + (d.getMonth() + 1)).slice(-2) + "-" + ('0' + d.getDate()).slice(-2) + " " + ('0' + d.getHours()).slice(-2) + ":" + ('0' + d.getMinutes()).slice(-2) + ":" + ('0' + d.getSeconds()).slice(-2);
			console.log('Compiled JS @ '+d);
		});
	}, 100);
}

function onSASSChanged(path) {
	if (!scanned || queued_sass) return;

	queued_sass = true;
	setTimeout(()=>{
		build.compileCSS(()=>{
			queued_sass=false;
			var d = new Date();
		    d = d.getFullYear() + "-" + ('0' + (d.getMonth() + 1)).slice(-2) + "-" + ('0' + d.getDate()).slice(-2) + " " + ('0' + d.getHours()).slice(-2) + ":" + ('0' + d.getMinutes()).slice(-2) + ":" + ('0' + d.getSeconds()).slice(-2);
			console.log('Compiled CSS @ '+d);
		});
	}, 100);
}

let js_watcher = chokidar.watch(__dirname+"/"+build.js_src, { persistent: true });

js_watcher
  .on('add', onJSChanged)
  .on('change', onJSChanged)
  .on('unlink', onJSChanged)
  .on('unlinkDir', onJSChanged)
;

let sass_watcher = chokidar.watch(__dirname+"/"+build.sass_to_watch, { persistent: true });

sass_watcher
  .on('change', onSASSChanged)
;

console.log("Watching "+__dirname+"/"+build.js_src+" for changes...");
console.log("Watching "+__dirname+"/"+build.sass_to_watch+" for changes...");

setTimeout(()=>{
	scanned = true;
	onJSChanged();
	onSASSChanged();
},500);