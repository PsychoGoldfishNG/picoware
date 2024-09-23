"use strict";

module.exports = (() => {

	const uglifyJS = require("uglify-js");
	const sass = require('sass');
	const uglifycss = require('uglifycss');
	const concat = require("concat");
	const vm = require("vm");
	const fs = require("fs");
	const path = require("path");
	var _this = this;

	// these files need to be included first, and in this order
	const priority_js = [
		'manifests.js',
		'utils.js',
		'browser.js',
		'wrapper.js',
		'input.js',
		'level.js',
		'transitionscene.js',
		'sceneloader.js',
		'framework.js',
		'main.js'
	];

	this.teams_src = "../../game/htdocs/teams"; // location of our team folders
	this.levels_dir = "levels"; // directory where we'll find our levels
	this.microgames_dir = "microgames"; // directory where we'll find our microgames
	this.bossgames_dir = "bossgames"; // directory where we'll find our bossgames
	this.transitions_dir = "transitions"; // directory where we'll find our transitions

	this.js_src = "../src/js"; // location of our source JavaScript files
	this.js_bin = "../../game/htdocs/js/framework.js"; // where to save compiled JavaScript 
	this.js_min = "../../game/htdocs/js/framework.min.js"; // where to save minified JavaScript 

	this.sass_src = "../src/sass/framework.scss"; // location of our source SASS files
	this.css_bin = "../../game/htdocs/css/framework.css";
	this.css_min = "../../game/htdocs/css/framework.min.css";

	this.html_src = "../src/html/index_template.html";
	this.html_dev = "../../game/htdocs/dev.html";
	this.html_prod = "../../game/htdocs/index.html";

	this.sass_to_watch = "../src/sass/";

	this.manifests_compiled = [];

	// This will pull in all the manifest files from the different teams, and compile them into a single file for faster loading.
	this.processManifests = function (callback) {

		console.log("Processing manifests");
		_this.manifests_compiled = [];

		let topdir = __dirname + "/" + _this.teams_src
		let team_dirs = fs.readdirSync(topdir);

		var manifest_obj = {
			levels: {},
			microgames: {},
			bossgames: {},
			transitions: {}
		};

		team_dirs.forEach(creator_dir => {

			for (var key in manifest_obj) {
				manifest_obj[key][creator_dir] = manifest_obj[key][creator_dir] ?? {};

				let dir_var = key + "_dir";

				let _dir = topdir + "/" + creator_dir + "/" + _this[dir_var];

				if (fs.existsSync(_dir)) {
					let _dirs = fs.readdirSync(_dir);
					_dirs.forEach(item_dir => {

						// if item_dir is not a directory, skip it
						if (!fs.lstatSync(_dir + "/" + item_dir).isDirectory()) return;

						let manifest = _dir + "/" + item_dir + "/manifest.json";
						if (fs.existsSync(manifest)) {
							let raw = fs.readFileSync(manifest);
							let obj;
							try {
								obj = JSON.parse(raw);
								manifest_obj[key][creator_dir][item_dir] = obj;

								_this.manifests_compiled.push(manifest);

							} catch (e) {
								console.log(" >>>>>>>>> ERROR!!!! Invalid manifest.json for " + key + ": '" + item_dir + "'' <<<<<<<<<<<<<<<");
							}
						} else {
							console.log(" >>>>>>>>> WARNING!!!! No manifest for " + key + ": '" + item_dir + "'' <<<<<<<<<<<<<<<");
						}
					});
				}
			}

		});

		let out = "var _Manifests = " + JSON.stringify(manifest_obj, null, 5) + ";\n";

		fs.writeFileSync(this.js_src + "/manifests.js", out);

		if (callback) callback();
	};

	this.compileCSS = function (callback) {

		console.log("Compiling CSS");

		let result = sass.compile(__dirname + "/" + _this.sass_src);

		try {
			// save the compiled file
			fs.writeFileSync(__dirname + "/" + _this.css_bin, result.css);

			// minify and save
			var uglified = uglifycss.processFiles(
				[__dirname + "/" + _this.css_bin],
				{ maxLineLen: 500, expandVars: true }
			);
			fs.writeFileSync(__dirname + "/" + _this.css_min, uglified);

			// execute callback
			if (callback) callback();
		}
		catch (err) {
			console.error(err);
			process.exit(1);
		}
	}

	// compiles all of our source js files into a single file, and a single, minified version.
	this.compileJS = function (callback) {

		console.log("Compiling JS");

		// hold a list of all our files here
		let js_files = [];

		// add all the priority files (with full path) first
		priority_js.forEach(file => {
			js_files.push(__dirname + "/" + _this.js_src + "/" + file);
		});

		// scan our source director for any other files and add them
		let allfiles = fs.readdirSync(__dirname + "/" + _this.js_src);
		allfiles.forEach(file => {
			if (priority_js.indexOf(file) < 0 && path.extname(file) == ".js")
				js_files.push(__dirname + "/" + _this.js_src + "/" + file);

			try {
				var code = fs.readFileSync(__dirname + "/" + _this.js_src + "/" + file);
				var script = new vm.Script(code);
			}

			catch (err) {
				console.error("ERROR IN SOURCE FILE: " + __dirname + "/" + _this.js_src + "/" + file);
				console.error(err);
				process.exit(1);
			}
		});

		// concatenate all the js code
		concat(js_files)
			.then(result => {

				// save the compiled file
				fs.writeFileSync(__dirname + "/" + _this.js_bin, result);

				// minify and save
				result = uglifyJS.minify(result);
				fs.writeFileSync(__dirname + "/" + _this.js_min, result.code);

				// execute callback
				if (callback) callback();
			})
			.catch(function (err) {
				console.log(err);

				// Try executing the compiled file.  Odds are something broke when minifying, so this will find your error
				try {
					var code = fs.readFileSync(__dirname + "/" + _this.js_bin);
					var script = new vm.Script(code);
				}
				catch (err) {
					console.error(err);
					process.exit(1);
				}
			});
	};

	this.compileHTML = function (callback) {
		console.log("Compiling HTML");

		let create = [
			{ mode: 'dev', file: _this.html_dev },
			{ mode: 'prod', file: _this.html_prod }
		];

		create.forEach((obj) => {

			let mode = obj.mode;

			// read html source line by line
			// if a line has <!-- IF DEV --> or <!-- IF PROD -->, we'll include or exclude it based on the mode, and end at <!-- ENDIF -->
			let lines = fs.readFileSync(__dirname + "/" + _this.html_src).toString().split("\n");
			let out = "";
			let include = true;

			lines.forEach(line => {
				// include if blocks that are for our current type
				if (line.indexOf("<!-- IF " + mode.toUpperCase() + " -->") >= 0) {
					include = true;
				}
				// exclude if blocks that are for the another type
				else if (line.indexOf("<!-- IF") >= 0) {
					include = false;
				}
				// on endif, start including everything again
				else if (line.indexOf("<!-- ENDIF -->") >= 0) {
					include = true;
				}
				// add included lines to the buffer 
				else if (include) {
					out += line + "\n";
				}
			});

			// save the compiled file
			fs.writeFileSync(__dirname + "/" + obj.file, out);

		});

		// execute callback
		if (callback) callback();
	};

	return this;
})();
