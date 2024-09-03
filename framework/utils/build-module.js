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
		'framework.js',
		'main.js'
	];

	this.teams_src = "../../game/htdocs/teams"; // location of our team folders
	this.microgames_dir = "microgames"; // directory where we'll find our microgames

	this.js_src = "../src/js"; // location of our source JavaScript files
	this.js_bin = "../../game/htdocs/js/framework.js"; // where to save compiled JavaScript 
	this.js_min = "../../game/htdocs/js/framework.min.js"; // where to save minified JavaScript 

	this.sass_src = "../src/sass/framework.scss"; // location of our source SASS files
	this.css_bin = "../../game/htdocs/css/framework.css";
	this.css_min = "../../game/htdocs/css/framework.min.css";

	this.sass_to_watch = "../src/sass/";

	this.processManifests = function () {
		let topdir = __dirname + "/" + _this.teams_src
		let team_dirs = fs.readdirSync(topdir);

		var manifest_obj = {
			microgames: {}
		};

		team_dirs.forEach(creator_dir => {

			manifest_obj.microgames[creator_dir] = manifest_obj.microgames[creator_dir] ?? {};

			let microgames_dir = topdir + "/" + creator_dir + "/" + _this.microgames_dir;
			let microgames_dirs = fs.readdirSync(microgames_dir);
			microgames_dirs.forEach(game_dir => {
				let manifest = microgames_dir + "/" + game_dir + "/manifest.json";
				if (fs.existsSync(manifest)) {
					let raw = fs.readFileSync(manifest);
					let obj;
					try {
						obj = JSON.parse(raw);
						manifest_obj.microgames[creator_dir][game_dir] = obj;
					} catch (e) {
						console.log(" >>>>>>>>> ERROR!!!! Invalid manifest.json for microgame: '" + game_dir + "'' <<<<<<<<<<<<<<<");
					}
				} else {
					console.log(" >>>>>>>>> WARNING!!!! No manifest for microgame: '" + game_dir + "'' <<<<<<<<<<<<<<<");
				}
			});

		});

		let out = "var _Manifests = " + JSON.stringify(manifest_obj, null, 5) + ";\n";

		fs.writeFileSync(this.js_src + "/manifests.js", out);
	};

	this.compileCSS = function (callback) {
		console.log("Compiling CSS");
		sass.render({
			file: __dirname + "/" + _this.sass_src
		}, function (err, result) {
			if (err) {
				console.error(err);
				process.exit(1);
			}

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
		});
	}

	// compiles all of our source js files into a single file, and a single, minified version.
	this.compileJS = function (callback) {
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

	return this;

})();
