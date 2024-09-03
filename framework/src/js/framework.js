/** 
 * Picoware Framework Controller 
 * 
 * An instance of this will be globally accessible as 'PWGame'
 */
class PWFramework {

	/**
	 * Production mode, the game will run normally without any extra console logging or debugging features
	 * @type string
	 * @readonly
	 */
	static USERMODE_PROD = 'prod';

	/**
	 * Debug mode, the game will run with extra console logging and debugging features
	 * @type string
	 * @readonly
	 */
	static USERMODE_DEBUG = 'debug';

	/**
	 * Developer mode, the game will run using the developer interface and allow for loading of custom levels and microgames for quick testing
	 * @type string
	 * @readonly
	 */
	static USERMODE_DEV = 'dev';

	/**
	 * Reference to the Phaser game instance
	 * @type Phaser.Game
	 * @default null
	 */
	phaser = null;

	/**
	 * Create instance of the framework
	 */
	constructor() {

		/** 
		 * The mode the game is running in. Should be one of the USERMODE_ constants
		 * @type string 
		 * @default 'prod'
		 */
		this.usermode = 'prod';

		/**
		 * The width and height of the microgame screen
		 * @type number
		 * @default 524
		 * @readonly
		 */
		this.screensize = 524;					// width and height of the microgame screen

		/**
		 * Will be used to contain screen size information
		 * @type object
		 * @default null
		 */
		this.screen = null;

		/**
		 * Pause state of the game
		 * @type boolean
		 * @default false
		 */
		this.paused = false;

		/**
		 * Used to note when the game is transitioning between scenes/microgames
		 * @type boolean
		 * @default false
		 */
		this.in_transition = false;

		/**
		 * The FPS we are basing all of our timing on (actual fps may be different).
		 * @type number
		 * @default 60
		 */
		this.targetFPS = 60;

		/**
		 * The current speed modifier, used when increasing level difficulty.
		 * @type number
		 * @default 1 - normal speed
		 */
		this.gameSpeed = PWConfig.SPEED_NORMAL;

		/**
		 * The number of ms we expect to happen during a single frame. this will be set when setGameSpeed is called
		 * @type number
		 * @default null
		 */
		this.msPerTargetFrame = null;

		/**
		 * The number of ms we expect to happen during a single step.
		 * @type number
		 */
		this.msPerStep = null;

		/**
		 * tracks the number of ms that have passed since the last step started
		 * @type number
		 */
		this.stepTracker = null;

		/**
		 * Handles input from on-screen gamepad and keyboard
		 * @type PWInput
		 */
		this.input = new PWInput();

		/**
		 * If true, the player wil win the game when the timer runs out
		 * @type boolean
		 * @default false
		 */
		this.winOnTimeUp = false;

		/** 
		 * Handler for when manifest files are loaded
		 * @type function
		 * @default function(){}
		 */
		this.onManifestsLoaded = () => { };

		// set the default BPM for our microgames/music
		this.setGameSpeed(this.gameSpeed);
	}

	/**
	 * Starts the framework (This is called in our index.html file)
	 * @param {string} usermode - The mode the game should start in.  Should be one of the USERMODE_ constants.
	 * @throws {string} - If an invalid usermode is passed
	 * @returns {void}
	 */
	start(usermode = 'prod') {

		if ([PWFramework.USERMODE_PROD, PWFramework.USERMODE_DEBUG, PWFramework.USERMODE_DEV].indexOf(usermode) === -1) {
			throw ("Invalid usermode: " + usermode);
		}

		this.usermode = usermode;

		/**
		 * @type PWFramework
		 * Reference for use in functions/closures
		 */
		let _this = this;

		// initialize the game wrapper (see wrapper.js).  This wrapper handles the game layouts (like the GBA and GBC skins), 
		// fade effects, screen resizes, and on-screen input events.
		GameWrapper.init({
			onScreenUpdated: this.onScreenUpdated,
			onScreenUpdatedThisArg: this,
			onInputChanged: this.input.onLayoutInputChanged,
			onInputChangedThisArg: this.input
		});

		/**
		 * Executes when Phaser is ready to use
		 * @callback
		 * @name PhaserReady
		 * @returns {void}
		 */
		function PhaserReady() {

			// register the generic preloader scene with Phaser(see sceneloader.js)
			_this.phaser.scene.add('PWGameSceneloader', new PWGameSceneloader());

			// start the game in the appropriate mode
			if (_this.usermode === PWFramework.USERMODE_DEV) {
				_this.startDevScreen();
			} else {
				// TODO: start the game in normal mode
				alert("This mode isn't supported yet!");
			}
		}

		// start our Phaser instance

		/**
		 * @type Phaser.Game
		 * Reference to the Phaser game instance
		 */
		this.phaser = new Phaser.Game({
			parent: "screen",
			type: Phaser.AUTO,
			width: this.screensize,
			height: this.screensize,
			id: "PhaserCanvas",
			backgroundColor: '#000000',
			scene: {
				create: PhaserReady
			}
		});
	}

	/**
	 * Handles resizing the Phaser canvas on size and orientation changes
	 * @param {object} screen - An object containing information about the user's current screen size
	 * @returns {void}
	 */
	onScreenUpdated(screen) {
		this.screen = screen;
		if (this.phaser && this.phaser.canvas) {
			this.phaser.canvas.style.width = screen.size + "px";
			this.phaser.canvas.style.height = screen.size + "px";
		}
	}

	/**
	 * Starts the developer mode option screen
	 * @returns {void}
	 */
	startDevScreen() {
		/**
		 * @type PWFramework
		 * Reference for use in functions/closures
		 */
		let _this = this;

		/**
		 * @type boolean
		 * Used to prevent multiple clicks from triggering the same action
		 */
		let loading = false;

		// reference our html elements

		/**
		 * @type HTMLElement
		 * The developer interface frame
		 */
		let devFrame = document.getElementById("dev-interface");

		/**
		 * @type HTMLElement
		 * The input for team dir to use when loading a microgame
		 */
		let microgameTeam = document.getElementById("microgame-team");

		/**
		 * @type HTMLElement
		 * The input for microgame dir to use
		 */
		let microgameDir = document.getElementById("microgame-dir");

		/**
		 * @type HTMLElement
		 * The button to load a microgame
		 */
		let microgameBtn = document.getElementById("microgame-btn");

		// show the developer options
		devFrame.style.display = "";

		// hide the Phaser canvas and game overlay until they are needed
		this.phaser.canvas.style.display = "none";
		GameWrapper.gameplaySkin.style.display = "none";

		// start our fade in effect because we are fancy
		GameWrapper.fadeIn();

		/**
		 * Validates load paths. 
		 * Returns path as an array, or false if path is invalid.
		 * @param {string} path - The {devteam}/{item_name} path for games, levels, etc
		 * @return {(Array|boolean)} - The path as an array, or false if the path is invalid
		 */
		function validatePath(path) {
			path = path.split("/");
			if (path.length !== 4) {
				console.error("Invalid path!", path);
				return false;
			}
			return [path[1], path[3]];
		}

		/**
		 * Handle the Load Microgame button
		 * @param {Event} click_event - The click event
		 * @callback
		 * @returns {void}
		 */
		microgameBtn.onclick = function (click_event) {
			if (loading) return; // ignore clicks if we're already loading the game

			// cancel out the click event so nothing else can get triggered
			click_event.preventDefault();
			click_event.stopPropagation();

			// check if user inputed a valid path. Return if it's invalid
			let path = "teams/" + microgameTeam.value + "/microgames/" + microgameDir.value;
			path = validatePath(path);
			if (!path) return;

			// create a fake level manifest that only uses the level we want to test
			// Note: missing properties will be filled in by the PWLevel.default_manifest object
			let manifest = {
				microgames: [
					path
				],
				gamesPerRound: 1,
				devMode: 'game'
			};

			// disable pointer events to loack the developer forms for now
			devFrame.style.pointerEvents = "none";

			// do our fade out/fade in effect, and then...
			GameWrapper.crossFade(function () {

				// hide the developer menu while we're playing.
				devFrame.style.display = "none";

				// turn pointer events back on so the dev menu will work when we go back to it later
				devFrame.style.pointerEvents = "";

				// start our fake level
				_this.startLevel(manifest);
			});
		}
	}

	/**
	 * Starts a level
	 * @param {object} manifest - The manifest assciated with the level
	 * @returns {void}
	 */
	startLevel(manifest) {

		console.log("Starting level", manifest);

		// Levels will always start with either a cutscene or a transition animation
		this.in_transition = true;

		// referenece to self for use in closures and functions
		let _this = this;

		// get our actual level instance (see level.js)
		this.level = new PWLevel(manifest);

		// show the appropriate game layout (a frame on desktop, GBC for mobile in portrait mode, GBA for mobile in landscape)
		this.showGameLayout();

		// show our generic loading screen and set our initial 'loaded' value to zero
		GameWrapper.showLoadScreen();
		GameWrapper.setLoadedValue(0);

		// run this function as our level is preloading all of its required files and assets
		this.level.preload(function (complete) {

			// update the progress bar
			GameWrapper.setLoadedValue(complete);

			// if complete equals 1, we've loaded everything
			if (complete === 1) {

				// do our fade out/fade in effect
				GameWrapper.crossFade(() => {

					// hide the preloader screen
					GameWrapper.hideLoadScreen();

					// tell the wrapper what sprite sheet to use for the between-game transitions
					GameWrapper.setTransitionImage(_this.level.imgs.transsheet);

					// tell the wrapper what character sheet to use
					GameWrapper.setCharacterImage(_this.level.imgs.charsheet);

					// tell the wrapper what character sheet to use
					GameWrapper.setLogoImage(_this.level.imgs.logo);

					// if the level has an intro movie, play it, then start the next phase
					if (_this.level.hasIntro()) {
						_this.level.playIntro(function () {
							_this.nextPhase();
						});

						// if there is no intro movie, start the next phase now
					} else {
						_this.nextPhase();
					}
				});
			}
		}, true);

		// tell the level what to do when a game is completed
		this.level.onGameComplete(function () {

			// and that would be... go to the next phase, and start our transition animation
			_this.nextPhase(true);
		});
	}

	/** 
	 * Switches to the main game layout 
	 * @returns {void}
	 */
	showGameLayout() {
		// check screen size/orientation and display all the game elements
		GameWrapper.updateGameScreenOrientation();
		GameWrapper.gameplaySkin.style.display = "";
		this.phaser.canvas.style.display = "";
	}

	/**
	 * Move to the next phase of the current level
	 * @param {boolean} transition_in - if True, play our transition animation before starting the next phase
	 * @returns {void}
	 */
	nextPhase(transition_in) {
		let _this = this;

		// figure out what the next phase in the level is, and handle it
		let next = this.level.getNext(function (phase, data) {

			// if we're starting a game, we'll reference its manifest with this
			let game_manifest = null;

			// if we're starting a new round (faster games or boss levels), we'll note that with this
			let new_round = null;

			// set that we are starting a new transition
			_this.in_transition = true;

			// check the current phase
			switch (phase) {
				// TODO - add a case for end of level

				// we are still in the same round, and starting another microgame, so we need to record the manifest
				case 'microgame':
					game_manifest = data;
					break;

				// this is a new round
				case 'newround':

					// we are at the boss level 
					if (data === 'bossgame') {
						new_round = "Boss Level!";

						// We need to speed up the game now!
					} else {
						new_round = "Faster!";
						var speeds = [null, PWConfig.SPEED_NORMAL, PWConfig.SPEED_FASTER, PWConfig.SPEED_FASTEST];
						_this.setGameSpeed(speeds[_this.level.round]);
					}
					break;

				// we finished all the games!
				case 'finish':
					new_round = data === 'devmode' ? "Test Complete!" : "You Win!";
					break;
			}

			// we are starting a new micro or boss game
			if (game_manifest) {

				// start the transition animation if it's not already running, then start the game
				if (transition_in) {
					GameWrapper.enterTransition(function () {
						GameWrapper.playTransitionClose(function () {
							_this.nextGame(game_manifest);
						});
					});

					// or, just start the game
				} else {
					_this.nextGame(game_manifest);
				}

				// we are starting a new round and need to show some text (faster, boss level, etc)
			} else if (new_round) {

				// start the transition (zooms the transition frame out)
				GameWrapper.enterTransition(function () {

					// show the new round text
					GameWrapper.setHintText(new_round);

					// continue the transition (covers the hole in the frame) and move to the next phase (which should be a game)
					GameWrapper.playTransitionClose(function () {

						// looks like they won the game?
						if (phase === 'finish') {

							GameWrapper.playTransitionIdle(function () {
								GameWrapper.crossFade(function () {

									GameWrapper.stopCharacterAnimation();

									if (data === 'devmode') {
										_this.startDevScreen();
									} else {
										// TODO - show the win screen
									}
								});
							});
						} else {
							_this.nextPhase(false);
						}
					});
				});
			}

		});
	}

	/**
	 * Prepares the next micro or boss game to start
	 * @param {object} manifest - The manifest for the game we want to start
	 * @returns {void}
	 */
	nextGame(game_manifest) {
		let _this = this;

		// We should always be in the middle of the transition animation here. 
		// This tells the game to play the 'idle' part for a while before we start the actual game
		GameWrapper.playTransitionIdle(function () {
			// start the actual game, and show it's hint text
			_this.startActualGame(game_manifest);
			GameWrapper.setHintText(game_manifest.hint);

			// play the animation to open the hole in our transition frame
			GameWrapper.playTransitionOpen(function () {

				// zoom the frame in so we can see the full game
				GameWrapper.exitTransition(function () {

					// we are no longer in the transition animation!
					_this.in_transition = false;
					GameWrapper.endTransition();

					// reset the step tracker
					_this.msPerStep = _this.msPerTargetFrame * PWConfig.FRAMES_PER_STEP;
					_this.stepTracker = 0;
					GameWrapper.startCharacterAnimation();

					// start the game timer
					GameWrapper.startGameTimer();
				});
			});
		});
	}

	/**
	 * Starts a micro or boss game
	 * @param {object} manifest - The manifest assciated with the micro or boss game
	 * @returns {void}
	 */
	startActualGame(manifest) {
		// clear out any existing input handlers so they don't break the new game
		this.input.reset();

		// start the actual game with Phaser
		this.phaser.scene.start(manifest.sceneClass);
	}

	//============================================ game hooks ================================================//

	/**
	 * Loads a microgame and all of it's assets before starting it.
	 * @param {string} path - The path/key of the micrograme.
	 * @param {function} callback - A callback function to run when the microgame has loaded.
	 * @param {function} error_callback - A callback function to run if there are any problems loading the microgame.
	 * @param {boolean} force - set to true to load all files instead of using cached/compiled data.
	 * @returns {void}
	 */
	loadMicroGame(path, callback, error_callback, force) {
		// reference for functions/closures
		let _this = this;

		// if error callback is set to true, treat it as the 'force' parameter
		if (error_callback === true) {
			force = true;
			error_callback = function () { };
		}

		// if we don't have an error callback, have it do a generic alert
		error_callback = typeof (error_callback) !== 'undefined' ? error_callback : function (error) { alert(error); };

		// start by loading the manifest for this game
		this.loadMicroGameManifest(

			path,

			/**
			 * Handles when the manifest is loaded
			 * @param {object} manifest - The manifest we just loaded. 
			 * @param {string} dir - The directory we'll be loading any assets from.
			 */
			function (manifest, dir) {

				// make sure all the required manifest prperties have been set
				let required = ['name', 'jsFiles', 'sceneClass', 'input', 'hint'];
				let errors = [];
				required.forEach(function (val) {
					if (typeof (manifest[val]) == 'undefined') {
						errors.push("Missing required property in manifest.json: '" + val + "'");
					}
				});

				// if anything is missing, call the error handler and exit
				if (errors.length > 0) {
					error_callback(errors.join("\n"));
					return;
				}

				// get a reference to the scene class for this microgame if it's already been loaded.
				let _sceneClass;

				try {
					_sceneClass = _this.getSceneClass(manifest.sceneClass);
				}
				catch (e) {
					_sceneClass = null;
				}

				// Looks like we'll need to load the js file for this game scene
				if (!_sceneClass) {

					// make a note of how many JS files we need to load
					let scripts_remaining = manifest.jsFiles.length;

					// start loading each js file asynchronously
					manifest.jsFiles.forEach(url => {

						// load the js file in a <script> tag
						loaderScript(dir + url) // see utils.js

							// and after it's loaded...
							.then(() => {

								// knock one off our scripts remaining count
								scripts_remaining--;

								// all the scripts have loaded!!!
								if (scripts_remaining <= 0) {

									// attempt to get a reference to the class and register it
									try {

										// get a reference to the newly loaded scene
										_sceneClass = _this.getSceneClass(manifest.sceneClass);

										// add this to the list of scenes Phaser can currently load
										_this.registerScene(_sceneClass, manifest);

										// get the manifest for the scene, then start it up
										_this.preloadManifests([manifest], () => {
											callback(manifest);
										});
									}
									catch (e) {

										// oh no, something didn't work! (probably a bad js file, invalid class name or path)
										// fire the error callback
										error_callback(e);
									}
								}
							})

							// script failed to load, fire the error callback
							.catch((e) => {
								console.error(e);
								error_callback(e);
							});
					});

					// This game scene was already loaded once, so we can go ahead with registering it and preloading any assets!
				} else {
					_this.registerScene(_sceneClass, manifest);
					_this.preloadManifests([manifest], () => {
						callback(manifest);
					});
				}

			},

			error_callback,
			force
		);
	}

	/**
	 * preloads a list of manifest.json files so their data can be read before attempting to start a game.
	 * @param {Array.<object>} manifests - An array of manifest paths to load.
	 * @param {function} callback - A callback function to run when manifests have finished loading.
	 */
	preloadManifests(manifests, callback) {
		// sets our callback in a property that PWGameSceneloader can call
		this.onManifestsLoaded = typeof (callback) !== 'undefined' ? callback : function () { };

		// add all the manifests to the PWGameSceneloader.manifests queue
		manifests.forEach(manifest => {
			PWGameSceneloader.manifests.push(manifest);
		});

		// run the PWGameSceneloader scene.  When it's done, it'll trigger our callback
		this.phaser.scene.start('PWGameSceneloader');
	}

	/**
	 * Loads the manifest.json data for a microgame
	 * @param {Array.<string>} path - An arry of path data pointing to the microgame, ie ['microgames','user_or_team','game_name'].
	 * @param {function} callback - A callback function to run when the microgame has loaded.
	 * @param {function} error_callback - A callback function to run if there are any problems loading the microgame.
	 * @param {boolean} force - set to true to load all files instead of using cached/compiled data.
	 */
	loadMicroGameManifest(path, callback, error_callback, force) {
		// make sure we have a container for the microgame's parent path
		_Manifests.microgames[path[0]] = typeof (_Manifests.microgames[path[0]]) !== 'undefined' ? _Manifests.microgames[path[0]] : {};

		// if error_callback is true, use that as the force property
		if (error_callback === true) {
			force = true;
			error_callback = function () { };
		}

		// if no error callback is defined, have it use a generic alert
		error_callback = typeof (error_callback) !== 'undefined' ? error_callback : function (error) { alert(error); };

		// this is the directory that the manifest file should be in
		let dir = 'teams/' + path[0] + '/microgames/' + path[1] + '/';

		// if the manifest hasn't been loaded yet, or we're forcing a fresh load....
		if (force || !_Manifests.microgames[path[0]][path[1]]) {

			// load the manifest file into a javascript object
			this.getJSON(dir + 'manifest.json', function (data) {

				// update the manifest so it has a reference to our directory.
				data.path = dir;

				// cache the manifest so we don't have to reload it again later, and fire the callback
				_Manifests.microgames[path[0]][path[1]] = data;
				callback(_Manifests.microgames[path[0]][path[1]], dir);

				// error handling
			}, function (e) {

				// manifest failed to load or decode
				console.error(e);
				console.error("Couldn't find file: " + dir + '/manifest.json');
				error_callback("Could not load game at " + path[0] + '/' + path[1]);
			});

			// The manifest has already been loaded and cached
		} else {

			// set a reference to our directory just in case the manifest hasn't actually been used yet (may have been compiled)
			_Manifests.microgames[path[0]][path[1]].path = dir;

			// fire the callback
			callback(_Manifests.microgames[path[0]][path[1]], dir);
		}
	}

	/**
	 * Load a JSON document by url or relative path and pass the de-coded result to a callback function. Used for loading manifests.
	 * @param {string} url - The url (or relative path) of the file you want to load.
	 * @param {(object|string)} params - An object of key/value pairs, or pre-formatted query string to send to the server (optional)
	 * @param {function} callback - A function to call when the url/file has loaded.
	 * @param {function} error - A function to call if the url/file fails to load.
	 */
	getJSON(url, params, callback, error) {

		// if the 2nd param is a function, assume it's the callback, and param 3 is the error handler
		if (typeof (params) === 'function') {
			error = callback;
			callback = params;
			params = null;
		}

		// make sure callback is an actual function
		callback = typeof (callback) !== 'undefined' ? callback : function () { };

		// if error isn't defined, have it do a generic alert
		error = typeof (error) !== 'undefined' ? error : function (e) { console.error(e); alert(e); };

		// load the URL
		this.get(url, params,

			// url loaded okay, try decoding it
			function (json) {
				try {
					let obj = JSON.parse(json);

					// success...
					callback(obj);
				}
				catch (e) {

					// failed to decode
					error(e);
				}
			},

			// failed to load
			error
		);
	}

	/**
	 * Loads a url via XHR, and passes the result to a callback function (primarily used by getJSON())
	 * @param {string} url - The url (or relative path) of the file you want to load.
	 * @param {(object|string)} params - An object of key/value pairs, or pre-formatted query string to send to the server (optional)
	 * @param {function} callback - A function to call when the url/file has loaded.
	 * @param {function} error - A function to call if the url/file fails to load.
	 */
	get(url, params, callback, error) {

		// if the 2nd param is a function, assume it's the callback, and param 3 is the error handler
		if (typeof (params) == 'function') {
			error = callback;
			callback = params;
			params = null
		}

		// make sure callback is an actual function
		callback = typeof (callback) === 'function' ? callback : function () { };

		// if the error handler isn't defined, have it do a generic alert
		error = typeof (error) !== 'undefined' ? error : function (e) { console.error(e); alert(e); };

		// format our params into a query string
		if (params && typeof (params) === 'object') {
			let p = [];
			for (const [key, val] of Object.entries(params)) {
				p.push(encodeURIComponent(key) + "=" + encodeURIComponent(val));
			};
			params = "?" + p.join("&");
		} else {
			params = "";
		}

		// load the URL
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function () {
			// we have a result...
			if (this.readyState == 4) {

				// success...
				if (this.status == 200) {
					callback(this.responseText);

					// failed...
				} else {
					error(this.responseText, this.status);
				}
			}
		};
		xhr.open("GET", url + params, true);
		xhr.send();
	}

	/**
	 * Registers a scene class using a manifest.
	 * @param {Function.<Phaser.scene>} sceneClass - Reference to the class we're registering
	 * @param {object} manifest - The decoded manifest object associated with the class 
	 */
	registerScene(sceneClass, manifest) {
		// scene is already registered...
		if (PWGameSceneloader.loaded[manifest.sceneClass]) return;

		// record the class as loaded, and register it with Phaser
		PWGameSceneloader.loaded[manifest.sceneClass] = sceneClass;
		this.phaser.scene.add(manifest.sceneClass, new sceneClass());
	}

	/**
	 * Returns reference to a Phaser.Scene class for a boss or micro game. Class must be loaded already!
	 * @param {string} classname - The name of the class, including the namespace path, eg microgames.bacun.ButtPlugGame
	 * @return {Function.<Phaser.scene>}
	 */
	getSceneClass(classname) {
		let current_object = null;
		let at = []; // keeps track of what namespace object we are in when looking for classes for error reporting

		// convert the class path to an array, and grab the top-level so we know what type of game it is.
		let path = classname.split(".");
		let top = path.shift();

		// figure out which cache object to pull from
		if (top === 'microgames') {
			current_object = microgames;
		} else if (top === 'bossgames') {
			current_object = bossgames;
		} else {
			throw ("Scene class must be namespaced to microgames or bossgames!");
		}

		// record the top level path
		at.push(top);

		// check the rest of the namespace path
		while (path.length > 0) {

			// get the next object name in the path and add it to the 'at' array
			let top = path.shift();
			at.push(top);

			// check if this object exists
			current_object = typeof (current_object[top]) !== 'undefined' ? current_object[top] : null;

			// it does not, throw an error!
			if (!current_object) {
				throw (at.join(".") + " is undefined.");
			}
		}

		// check if the final object in the path is a Phaser.Scene subclass..
		if (current_object.prototype instanceof Phaser.Scene) {

			// yep, we can return the reference now!
			return current_object;
		}

		// looks like the path is bad, or the object isn't a proper Phaser.scene subclass
		throw (classname + " is either not an extension of Phaser.Scene, or there are errors in the class file.");

	}

	//============================================ public methods ================================================//

	/**
	 * Returns false if the game is paused or any transition animations are going on
	 * @return {boolean}
	 */
	isReady() {
		return !this.in_transition && !this.paused;
	}

	/**
	 * Toggle the pause state of the game
	 * @return {boolean} - True if paused.
	 */
	togglePause() {
		if (this.paused) {
			this.resume();
		} else {
			this.pause();
		}
		return this.paused;
	}

	/**
	 * Pauses the game
	 * @return {void}
	 */
	pause() {
		this.paused = true;
		this.phaser.pause();
	}

	/**
	 * Resumes the game
	 * @return {void}
	 */
	resume() {
		this.paused = false;
		this.phaser.resume();
	}

	/**
	 * Set the current speed modifier for microgames (happens in nextPhase() during new rounds).
	 * @param {number} speed - Our speed modifier, where 1 = normal speed, 2 = 2x speed, etc.
	 */
	setGameSpeed(speed) {
		this.gameSpeed = speed;
		this.msPerTargetFrame = 1000 / (this.targetFPS * speed);
	}

	/**
	 * Call this in your game loop to get a number you can multiply any movement by so it runs with the correct timing
	 * regardless of the end user's actual on-screen FPS.
	 * @param {number} delta - The number of ms that have lapsed since the last update (comes from Phaser.Scene update function)
	 * @return {number} - The multiplier you should use to adjust your game's timing
	 */
	getDeltaMultiplier(delta) {

		// check the game's delta time to see if we need to update the game timer
		if (GameWrapper.gameTimerStep < GameWrapper.gameTimerSteps + 1) {
			this.stepTracker += delta;
			if (this.stepTracker >= this.msPerStep) {
				this.stepTracker -= this.msPerStep;
				GameWrapper.gameTimerStep++;

				if (GameWrapper.gameTimerStep === GameWrapper.gameTimerSteps) {
					console.log("Time Up!", GameWrapper.gameTimerStep);
					GameWrapper.stopGameTimer();
				} else if (GameWrapper.gameTimerStep > GameWrapper.gameTimerSteps) {
					console.log("Game over!", GameWrapper.gameTimerStep);
					this.level.gameCompleted(this.winOnTimeUp);
				} else {
					GameWrapper.updateGameTimerFrame();
				}
			}
		}

		let modifier = delta / this.msPerTargetFrame;
		return modifier;
	}

	/**
	 * Call this if the player will lose the game when the timer runs out.
	 * This could be at the start of the game if they need to accomplish something to win, or at the end if they need to survive.
	 * 
	 * @param {boolean} play_win_animation - If true, the character will play the lose animation instantly
	 * @return {void}
	 */
	lostGame(play_win_animation = false) {
		if (play_win_animation === true) GameWrapper.characterAnimation = 3;
		this.winOnTimeUp = false;
	}

	/**
	 * Call this if the player will win the game when the timer runs out.
	 * This could be at the start of the game if they need to survive, or at the end if they need to accomplish something to win.
	 * 
	 * @param {boolean} play_win_animation - If true, the character will play the win animation instantly
	 * @return {void}
	 */
	wonGame(play_win_animation = false) {
		if (play_win_animation === true) GameWrapper.characterAnimation = 2;
		this.winOnTimeUp = true;
	}
}