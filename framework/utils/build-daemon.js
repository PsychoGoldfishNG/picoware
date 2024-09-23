"use strict";

const chokidar = require('chokidar');
const build = require('./build-module.js');
const http = require('http');
const fs = require('fs');
const path = require('path');

const www_root = "../../game/htdocs";

let manifestTimeout = null;

// listen for changes to compiled manifests
function watchManifests() {
	build.manifests_compiled.forEach(manifest => {

		fs.watch(manifest, (eventType, filename) => {
			if (manifestTimeout) return
			manifestTimeout = setTimeout(() => {
				manifestTimeout = null;
				processManifests();
			}, 200);
		});
	});
}

function processManifests() {
	console.log("Compiling manifests...");
	build.processManifests(function () {
		watchManifests();
	});
}
processManifests();

var scanned = false;
var queued_js = false;
var queued_sass = false;
var queued_html = false;

function onJSChanged(path) {
	if (!scanned || queued_js) return;

	queued_js = true;
	setTimeout(() => {
		build.compileJS(() => {
			queued_js = false;
			var d = new Date();
			d = d.getFullYear() + "-" + ('0' + (d.getMonth() + 1)).slice(-2) + "-" + ('0' + d.getDate()).slice(-2) + " " + ('0' + d.getHours()).slice(-2) + ":" + ('0' + d.getMinutes()).slice(-2) + ":" + ('0' + d.getSeconds()).slice(-2);
			console.log('Compiled JS @ ' + d);
		});
	}, 100);
}

function onSASSChanged(path) {
	if (!scanned || queued_sass) return;

	queued_sass = true;
	setTimeout(() => {
		build.compileCSS(() => {
			queued_sass = false;
			var d = new Date();
			d = d.getFullYear() + "-" + ('0' + (d.getMonth() + 1)).slice(-2) + "-" + ('0' + d.getDate()).slice(-2) + " " + ('0' + d.getHours()).slice(-2) + ":" + ('0' + d.getMinutes()).slice(-2) + ":" + ('0' + d.getSeconds()).slice(-2);
			console.log('Compiled CSS @ ' + d);
		});
	}, 100);
}

function onHTMLChanged(path) {
	if (!scanned || queued_html) return;

	queued_html = true;
	setTimeout(() => {
		build.compileHTML(() => {
			queued_html = false;
			var d = new Date();
			d = d.getFullYear() + "-" + ('0' + (d.getMonth() + 1)).slice(-2) + "-" + ('0' + d.getDate()).slice(-2) + " " + ('0' + d.getHours()).slice(-2) + ":" + ('0' + d.getMinutes()).slice(-2) + ":" + ('0' + d.getSeconds()).slice(-2);
			console.log('Compiled HTML @ ' + d);
		});
	}, 100);
}

let js_watcher = chokidar.watch(__dirname + "/" + build.js_src, { persistent: true });

js_watcher
	.on('add', onJSChanged)
	.on('change', onJSChanged)
	.on('unlink', onJSChanged)
	.on('unlinkDir', onJSChanged)
	;

let sass_watcher = chokidar.watch(__dirname + "/" + build.sass_to_watch, { persistent: true });

sass_watcher
	.on('change', onSASSChanged)
	;

let html_watcher = chokidar.watch(__dirname + "/" + build.html_src, { persistent: true });

html_watcher
	.on('change', onHTMLChanged)
	;

console.log("Watching " + __dirname + "/" + build.js_src + " for changes...");
console.log("Watching " + __dirname + "/" + build.sass_to_watch + " for changes...");
console.log("Watching " + __dirname + "/" + build.html_src + " for changes...");

setTimeout(() => {
	scanned = true;
	onJSChanged();
	onSASSChanged();
	onHTMLChanged();
}, 500);

// serve the game
http.createServer(function (req, res) {
	var filename = path.join(www_root, req.url);
	// if this is a directory, add index.html
	try {
		if (fs.statSync(filename).isDirectory()) filename += '/index.html';
	} catch (e) {
		res.writeHead(404, { 'Content-Type': 'text/html' });
		return res.end("404 Not Found: " + filename);
	}
	fs.readFile(filename, function (err, data) {
		if (err) {
			res.writeHead(404, { 'Content-Type': 'text/html' });
			return res.end("404 Not Found: " + filename + " " + err);
		}

		// figure out what type of file we're serving
		let ext = path.extname(filename).toLowerCase();
		let mime = 'text/html';
		switch (ext) {
			case '.js':
				mime = 'text/javascript';
				break;
			case '.css':
				mime = 'text/css';
				break;
			case '.json':
				mime = 'application/json';
				break;
			case '.png':
				mime = 'image/png';
				break;
			case '.jpg':
				mime = 'image/jpg';
				break;
			case '.gif':
				mime = 'image/gif';
				break;
			case '.webp':
				mime = 'image/webp';
				break;
			case '.wav':
				mime = 'audio/wav';
				break;
			case '.mp3':
				mime = 'audio/mpeg';
				break;
			case '.svg':
				mime = 'image/svg+xml';
				break;
			case '.ttf':
				mime = 'application/x-font-ttf';
				break;
			case '.woff':
				mime = 'application/font-woff';
				break;
			case '.woff2':
				mime = 'application/font-woff2';
				break;
			case '.otf':
				mime = 'application/x-font-opentype';
				break;
			case '.ico':
				mime = 'image/x-icon';
				break;
			case '.html':
				mime = 'text/html';
				break;
			case '.txt':
				mime = 'text/plain';
				break;
			case '.webm':
				mime = 'video/webm';
				break;
			case '.mp4':
				mime = 'video/mp4';
				break;
			case '.ogg':
				mime = 'video/ogg';
				break;

		}

		res.write(data);
		return res.end();
	});
}).listen(8080);

console.log("Serving game at http://localhost:8080/");

let watch_core = [__filename, __dirname + "/build-module.js"];

watch_core.forEach(watch => {
	fs.watch(watch, (eventType, filename) => {
		console.log("Core script changed: " + filename);
		console.log("Exiting...");
		process.exit(0);
	});
});
