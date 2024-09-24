/** 
 * Picoware Framework Controller 
 * 
 * An instance of this will be globally accessible as 'PWGame'
 */
class PWFramework {

	//============================================ static properties ================================================//

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


	//============================================ instance properties ================================================//

	/**
	 * Reference to the Phaser game instance
	 * @type Phaser.Game
	 * @default null
	 * @private
	 */
	#phaser = null;

	/**
	 * Reference to the Phaser game instance
	 * @type Phaser.Game
	 * @default null
	 * @readonly
	 */
	get phaser() { return this.#phaser; }

	/**
	 * stores what type of texture each key is attached to
	 * @type object
	 * @default {}
	 * @public
	 */
	textureTypes = {};

	/** 
	 * The mode the game is running in. Should be one of the USERMODE_ constants
	 * @type {string} 
	 * @default 'prod'
	 * @private
	 */
	#usermode = PWFramework.USERMODE_PROD;

	get usermode() { return this.#usermode; }

	/**
	 * The width and height of the microgame screen
	 * @type {number}
	 * @default 524
	 * @private
	 */
	#screenSize = 524;					// width and height of the microgame screen

	/**
	 * The width and height of the microgame screen
	 * @type {number}
	 * @default 524
	 * @readonly
	 */
	get screenSize() { return this.#screenSize; }

	/**
	 * Will be used to contain screen size information
	 * @type {object}
	 * @default null
	 * @private
	 */
	#screen = null;

	/**
	 * The screen size object
	 * @type {object}
	 * @default null
	 * @readonly
	 */
	get screen() { return this.#screen; }

	/**
	 * Pause state of the game
	 * @type {boolean}
	 * @default false
	 * @private
	 */
	#paused = false;

	/**
	 * Pause state of the game
	 * @type {boolean}
	 * @default false
	 * @readonly
	 */
	get paused() { return this.#paused; }

	/**
	 * Used to note when the game is transitioning between scenes/microgames
	 * @type {boolean}
	 * @default false
	 */
	#inTransition = false;

	/**
	 * Used to note when the game is transitioning between scenes/microgames
	 * @type {boolean}
	 * @default false
	 * @readonly
	 */
	get inTransition() { return this.#inTransition; }

	/**
	 * The FPS we are basing all of our timing on (actual fps may be different).
	 * @type {number}
	 * @default 60
	 * @private
	 */
	#targetFPS = 60;

	/**
	 * The FPS we are basing all of our timing on (actual fps may be different).
	 * @type {number}
	 * @default 60
	 * @readonly
	 */
	get targetFPS() { return this.#targetFPS; }

	/**
	 * The current speed modifier, used when increasing level difficulty.
	 * @type {number}
	 * @default 1 - normal speed
	 * @private
	 */
	#gameSpeed = 1;

	/**
	 * The current speed modifier, used when increasing level difficulty.
	 * @type {number}
	 * @default 1 - normal speed
	 * @readonly
	 */
	get gameSpeed() { return this.#gameSpeed; }

	/**
	 * If true, this game has just started
	 * @type boolean
	 * @default true
	 * @private
	 */
	#newGame = true;

	/**
	 * If true, this game has just started
	 * @type {boolean}
	 * @default true
	 * @readonly
	 */
	get newGame() { return this.#newGame; }

	/**
	 * If true, this is a new level
	 * @type {boolean}
	 * @default true
	 * @private
	 */
	#newLevel = true;

	/**
	 * If true, this is a new level
	 * @type {boolean}
	 * @default true
	 * @readonly
	 */
	get newLevel() { return this.#newLevel; }

	/**
	 * The number of ms we expect to happen during a single frame. this will be set when increaseGameSpeed is called
	 * @type {number}
	 * @default 0
	 * @private
	 */
	#msPerTargetFrame = 0;

	/**
	 * The number of ms we expect to happen during a single frame. this will be set when increaseGameSpeed is called
	 * @type {number}
	 * @default 0
	 * @readonly
	 */
	get msPerTargetFrame() { return this.#msPerTargetFrame; }

	/**
	 * The number of ms we expect to happen during a single step.
	 * @type {number}
	 * @default 0
	 * @private
	 */
	#msPerStep = 0;

	/**
	 * The number of ms we expect to happen during a single step.
	 * @type {number}
	 * @default 0
	 * @readonly
	 */
	get msPerStep() { return this.#msPerStep; }

	/**
	 * tracks the number of ms that have passed since the last step started
	 * @type {number}
	 * @default 0
	 * @private
	 */
	#stepTracker = 0;

	/**
	 * tracks the number of ms that have passed since the last step started
	 * @type {number}
	 * @default 0
	 * @readonly
	 */
	get stepTracker() { return this.#stepTracker; }

	/**
	 * Handles input from on-screen gamepad and keyboard
	 * @type {PWInput}
	 * @private
	 */
	#input = new PWInput();

	/**
	 * Handles input from on-screen gamepad and keyboard
	 * @type {PWInput}
	 * @readonly
	 */
	get input() { return this.#input; }

	/**
	 * The key name of the active micro/boss game scene
	 * @type {string}
	 * @private
	 * @default null
	 */
	#activeGameScene = null;

	/**
	 * The key name of the active micro/boss game scene
	 * @type {string}
	 * @default null
	 * @readonly
	 */
	get activeGameScene() { return this.#activeGameScene; }

	/**
	 * the key name of the active transition scene
	 * @type {string}
	 * @default null
	 * @private
	 */
	#activeTransition = null;

	/**
	 * the key name of the active transition scene
	 * @type {string}
	 * @default null
	 * @readonly
	 */
	get activeTransition() { return this.#activeTransition; }

	/**
	 * If true, the player wil win the game when the timer runs out
	 * @type {boolean}
	 * @default false
	 * @private
	 */
	#winOnTimeUp = false;

	/**
	 * If true, the player wil win the game when the timer runs out
	 * @type {boolean}
	 * @default false
	 * @readonly
	 */
	get winOnTimeUp() { return this.#winOnTimeUp; }


	//============================================ instance methods ================================================//

	/**
	 * Create instance of the framework
	 */
	constructor() {

		/** 
		 * Handler for when manifest files are loaded
		 * @type function
		 * @default function(){}
		 */
		this.onManifestsLoaded = () => { };

		// set the default speed for our microgames/music (1=normal speed, 2=double speed, etc)
		this.setGameSpeed(this.gameSpeed);
	}

	/**
	 * Starts the framework (This is called in our index.html file)
	 * @param {string} usermode - The mode the game should start in.  Should be one of the USERMODE_ constants.
	 * @throws {string} - If an invalid usermode is passed
	 * @returns {void}
	 */
	start(usermode = PWFramework.USERMODE_PROD) {

		if ([PWFramework.USERMODE_PROD, PWFramework.USERMODE_DEBUG, PWFramework.USERMODE_DEV].indexOf(usermode) === -1) {
			throw ("Invalid usermode: " + usermode);
		}

		this.#usermode = usermode;

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
			onInputChanged: this.#input.onLayoutInputChanged,
			onInputChangedThisArg: this.#input
		});

		/**
		 * Executes when Phaser is ready to use
		 * @callback
		 * @name PhaserReady
		 * @returns {void}
		 */
		function PhaserReady() {

			// add the generic preloading scene
			_this.phaser.scene.add('___loaderScene___', _this.loaderScene);

			// start the game in the appropriate mode
			if (_this.#usermode === PWFramework.USERMODE_DEV) {
				_this.startDevScreen();
			} else {
				// TODO: start the game in normal mode
				console.error("This mode isn't supported yet!");
				alert("This mode isn't supported yet!");
			}
		}

		// create a base scene to start the game with
		this.baseScene = new Phaser.Scene('___baseScene___');
		this.baseScene.create = function () {
			PhaserReady();
		};

		this.loaderScene = new PWGameSceneloader('___loaderScene___');

		/**
		 * @type Phaser.Game
		 * Reference to the Phaser game instance
		 */
		this.#phaser = new Phaser.Game({
			parent: "screen",
			type: Phaser.AUTO,
			width: this.#screenSize,
			height: this.#screenSize,
			id: "PhaserCanvas",
			backgroundColor: '#000000',
			scene: [this.baseScene], // we're only adding the baseScene right now so Phaser is ready without preloading anything
			physics: {
				default: 'arcade',
				arcade: {
					gravity: { y: 0 },
					debug: localStorage.getItem("debug-physics") ? true : false
				}
			},
		});
	}

	/**
	 * Handles resizing the Phaser canvas on size and orientation changes
	 * @param {object} screen - An object containing information about the user's current screen size
	 * @returns {void}
	 */
	onScreenUpdated(screen) {
		this.#screen = screen;
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

		// we'll use this for localStorage values
		let lsVal;

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

		// stop mouse clicks from rickling to the body, where they get cancelled
		devFrame.onclick = function (e) {
			e.stopPropagation();
		}

		let debugPhysics = document.getElementById("debug-physics");
		lsVal = localStorage.getItem("debug-physics");
		if (lsVal) debugPhysics.checked = true;

		debugPhysics.onchange = function () {
			if (debugPhysics.checked) {
				localStorage.setItem("debug-physics", "true");
			} else {
				localStorage.removeItem("debug-physics");
			}

			// refresh page
			location.reload();
		}

		/**
		 * @type HTMLElement
		 * The input for team dir to use when loading a microgame
		 */
		let microgameTeam = document.getElementById("microgame-team");

		// check if there is a team in local storage and set it as the default value
		lsVal = localStorage.getItem("microgame-team");
		if (lsVal) microgameTeam.value = lsVal;

		/**
		 * @type HTMLElement
		 * The input for microgame dir to use
		 */
		let microgameDir = document.getElementById("microgame-dir");

		// check if there is a dir in local storage and set it as the default value
		lsVal = localStorage.getItem("microgame-dir");
		if (lsVal) microgameDir.value = lsVal;


		/**
		 * @type HTMLElement
		 * The button to load a microgame
		 */
		let microgameBtn = document.getElementById("microgame-btn");

		/**
		 * @type HTMLElement
		 * The input for team dir to use when loading a boss game
		 */
		let bossgameTeam = document.getElementById("bossgame-team");

		// check if there is a team in local storage and set it as the default value
		lsVal = localStorage.getItem("bossgame-team");
		if (lsVal) bossgameTeam.value = lsVal;

		/**
		 * @type HTMLElement
		 * The input for boss game dir to use
		 */
		let bossgameDir = document.getElementById("bossgame-dir");

		// check if there is a dir in local storage and set it as the default value
		lsVal = localStorage.getItem("bossgame-dir");
		if (lsVal) bossgameDir.value = lsVal;

		/**
		 * @type HTMLElement
		 * The button to load a boss game
		 */
		let bossgameBtn = document.getElementById("bossgame-btn");

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

			// save the team and microgame so we can quickly use them next time
			localStorage.setItem("microgame-team", microgameTeam.value);
			localStorage.setItem("microgame-dir", microgameDir.value);


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
				mode: PWLevel.MODE_ENDLESS,
				microgames: [
					{
						numGames: 3,
						gameList: [
							{ team: microgameTeam.value, game: microgameDir.value }
						]
					}
				],
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

		/**
		 * Handle the Load Microgame button
		 * @param {Event} click_event - The click event
		 * @callback
		 * @returns {void}
		 */
		bossgameBtn.onclick = function (click_event) {
			if (loading) return; // ignore clicks if we're already loading the game

			// save the team and bossgame so we can quickly use them next time
			localStorage.setItem("bossgame-team", bossgameTeam.value);
			localStorage.setItem("bossgame-dir", bossgameDir.value);

			// cancel out the click event so nothing else can get triggered
			click_event.preventDefault();
			click_event.stopPropagation();

			// check if user inputed a valid path. Return if it's invalid
			let path = "teams/" + bossgameTeam.value + "/bossgames/" + bossgameDir.value;
			path = validatePath(path);
			if (!path) return;
			// create a fake level manifest that only uses the level we want to test
			// Note: missing properties will be filled in by the PWLevel.default_manifest object
			let manifest = {
				mode: PWLevel.MODE_BOSSRUSH,
				bossgames: [
					{ team: bossgameTeam.value, game: bossgameDir.value }
				],
				devMode: 'bossgame'
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

		// Levels will always start with either a cutscene or a transition animation
		this.#inTransition = true;

		// referenece to self for use in closures and functions
		let _this = this;

		// get our actual level instance (see level.js)
		this.level = new PWLevel(manifest);

		this.#newLevel = true;

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

					// tell the wrapper what character sheet to use
					GameWrapper.setCharacterImage(_this.level.imgs.charsheet);

					// tell the wrapper what character sheet to use
					GameWrapper.setLogoImage(_this.level.imgs.logo);

					_this.#activeTransition = 'transitions.' + manifest.transition.team + '.' + manifest.transition.name;

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

	transitionIn(transition_in, callback) {
		if (transition_in) {
			setTimeout(callback, 3000);
		} else {
			callback();
		}
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

			// set that we are transitioning between phases
			_this.#inTransition = true;

			// check the current phase
			switch (phase) {
				// TODO - add a case for end of level

				case 'bossgame':
					new_round = "Boss Level!";
					game_manifest = data;
					break;

				// we are still in the same round, and starting another microgame, so we need to record the manifest
				case 'microgame':

					// if we're in endless mode, we need to increase the difficulty on each play
					// (we can skip this for the very first game, since the difficulty is already set)
					if (_this.level.mode === PWLevel.MODE_ENDLESS && !_this.newLevel) {
						_this.level.__setDifficulty(_this.level.difficulty + 1);
					}
					game_manifest = data;
					break;

				// this is a new round
				case 'newround':

					_this.increaseGameSpeed();
					new_round = "Faster!";
					break;

				// we finished all the games!
				case 'finish':
					new_round = data === 'devmode' ? "Test Complete!" : "You Win!";
					break;
			}

			// If we have a manifest, we are starting a new microgame or bossgame
			if (game_manifest) {
				_this.nextGame(game_manifest, transition_in);
			}

			// we are starting a new round and need to show some text (faster, boss level, etc)
			else if (new_round) {

				// start the transition
				_this.showTransactionScene(PWTransitionScene.PHASE_NEXT_GAME);


				/**
				// looks like they won the game?
				if (phase === 'finish') {
	
					// TODO - wrap this in a transition?
	
					GameWrapper.crossFade(function () {
	
						GameWrapper.stopCharacterAnimation();
	
						if (data === 'devmode') {
							_this.startDevScreen();
						} else {
							// TODO - show the win screen
						}
					});
				} else {
					_this.nextPhase(false);
				}
				*/

			}

			_this.#newGame = false;
		});

		_this.#newLevel = false;
	}

	/**
	 * Prepares the next micro or boss game to start
	 * @param {object} manifest - The manifest for the game we want to start
	 * @param {boolean} transition_in - If true, play the transition-in animation before starting the game
	 * @returns {void}
	 */
	nextGame(game_manifest, transition_in) {
		let _this = this;
		this.activeManifest = game_manifest;
		this.showTransactionScene(transition_in ? PWTransitionScene.PHASE_NEXT_GAME : PWTransitionScene.PHASE_START);
	}

	stopGame() {

		let _this = this;

		if (this.#activeGameScene) {
			this.phaser.scene.pause(this.#activeGameScene);
			setTimeout(() => {
				_this.phaser.scene.stop(_this.#activeGameScene);
			}, 20);
		}
	}

	endTransition() {

		let _this = this;

		this.#inTransition = false;

		if (this.#activeTransition) {
			_this.phaser.scene.pause(_this.#activeTransition);
			setTimeout(() => {
				this.phaser.scene.stop(this.#activeTransition);
			}, 20);
		}

		// start the game timer if we're playing microgames
		if (!this.level.bossRound) GameWrapper.startGameTimer();
	}

	showHints(hintDisplayedCallback, hintCompleteCallback) {

		let hint = "Get Ready!";
		let controls = "gamepad";

		let scene = this.phaser.scene.getScene(this.#activeGameScene);

		if (scene) {
			if (scene.getHintText) {
				hint = scene.getHintText();
			}
			if (scene.getControls) {
				controls = scene.getControls();
			}
		}

		GameWrapper.setHintText(hint, controls, hintDisplayedCallback, hintCompleteCallback);
	}

	startGame() {

		let _this = this;

		// start the actual game, and show it's hint text
		this.startActualGame(this.activeManifest);

		// TODO - do we need to completely end the transition now?

		// reset the step tracker
		this.#msPerStep = this.msPerTargetFrame * PWConfig.FRAMES_PER_STEP;

		_this.#stepTracker = 0;
		GameWrapper.startCharacterAnimation();
	}

	showTransactionScene(transition_name) {

		if (!this.phaser.scene.isActive(this.#activeTransition)) {
			this.phaser.scene.start(this.#activeTransition);
		}
		this.phaser.scene.bringToTop(this.#activeTransition);

		let scene = this.phaser.scene.getScene(this.#activeTransition);
		scene.enter(transition_name);
	}

	/**
	 * Starts a micro or boss game
	 * @param {object} manifest - The manifest assciated with the micro or boss game
	 * @returns {void}
	 */
	startActualGame(manifest) {

		let _this = this;

		this.#newGame = true;

		// clear out any existing input handlers so they don't break the new game
		this.#input.reset();

		this.#activeGameScene = manifest.sceneClass;
		this.phaser.scene.start(this.#activeGameScene);
	}

	//============================================ game hooks ================================================//

	/**
	 * Queues an array of manifests for preloading
	 * @param {Array.<object>} manifests - An array of manifest objects to preload
	 * @returns {void}
	 */
	queuePreloadManifests(manifests, prepend = false) {
		let _this = this;
		manifests.forEach(manifest => {
			PWGameSceneloader.manifests.push(manifest);
		});
	}

	/**
	 * loads a manifest and registeres any scenes withhin
	 * @param array required_properties - An array of properties that must be present in the manifest
	 * @param object manifest - The manifest object to load
	 * @param string dir - The directory the manifest is in
	 * @param function callback - A callback function to run when the manifest has loaded
	 * @param function error_callback - A callback function to run if there are any problems loading the manifest
	 * @returns {void}
	 */
	doLoadManifest(required_properties, manifest, dir, callback, error_callback) {

		var _this = this;

		let finishLoad = function () {

			// make sure all the required manifest properties have been set
			let errors = [];
			required_properties.forEach(function (val) {
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

									// get the manifest for the scene
									_this.queuePreloadManifests([manifest]);

									callback(manifest);
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

			}
			// This game scene was already loaded once, so we can go ahead with registering it and preloading any assets!
			else {
				_this.registerScene(_sceneClass, manifest);
				_this.queuePreloadManifests([manifest]);
				callback(manifest);
			}
		};

		if (manifest.parent) {
			let parent = _Manifests[manifest.type][manifest.parent.team][manifest.parent.name];
			this.doLoadManifest(required_properties, parent, parent.path, finishLoad, error_callback);
		} else {
			finishLoad();
		}

	}

	loadTransition(info, callback, error_callback, force) {
		let _this = this;

		this.loadTransitionManifest(
			info,
			function (manifest, dir) {
				_this.doLoadManifest(['name', 'jsFiles', 'sceneClass'], manifest, dir, callback, error_callback);
			},
			error_callback,
			force
		);
	}

	/**
	 * Loads a microgame and all of it's assets before starting it.
	 * @param {object} gameInfo - An object with a team and game key to identify the microgame..
	 * @param {function} callback - A callback function to run when the microgame has loaded.
	 * @param {function} error_callback - A callback function to run if there are any problems loading the microgame.
	 * @param {boolean} force - set to true to load all files instead of using cached/compiled data.
	 * @returns {void}
	 */
	loadMicroGame(gameInfo, callback, error_callback, force) {

		// reference for functions/closures
		let _this = this;

		// if error callback is set to true, treat it as the 'force' parameter
		if (error_callback === true) {
			force = true;
			error_callback = function () { };
		}

		// if we don't have an error callback, have it do a generic alert
		error_callback = typeof (error_callback) !== 'undefined' ? error_callback : function (error) {
			console.error(error);
			alert(error);
		};

		// start by loading the manifest for this game
		this.loadMicroGameManifest(

			gameInfo,

			/**
			 * Handles when the manifest is loaded
			 * @param {object} manifest - The manifest we just loaded. 
			 * @param {string} dir - The directory we'll be loading any assets from.
			 */
			function (manifest, dir) {
				_this.doLoadManifest(['name', 'jsFiles', 'sceneClass'], manifest, dir, callback, error_callback);
			},

			error_callback,
			force
		);
	}

	/**
	 * Loads a bossgame and all of it's assets before starting it.
	 * @param {object} gameInfo - An object with a team and game key to identify the bossgame..
	 * @param {function} callback - A callback function to run when the bossgame has loaded.
	 * @param {function} error_callback - A callback function to run if there are any problems loading the bossgame.
	 * @param {boolean} force - set to true to load all files instead of using cached/compiled data.
	 * @returns {void}
	 */
	loadBossGame(gameInfo, callback, error_callback, force) {

		// reference for functions/closures
		let _this = this;

		// if error callback is set to true, treat it as the 'force' parameter
		if (error_callback === true) {
			force = true;
			error_callback = function () { };
		}

		// if we don't have an error callback, have it do a generic alert
		error_callback = typeof (error_callback) !== 'undefined' ? error_callback : function (error) {
			console.error(error);
			alert(error);
		};

		// start by loading the manifest for this game
		this.loadBossGameManifest(

			gameInfo,

			/**
			 * Handles when the manifest is loaded
			 * @param {object} manifest - The manifest we just loaded. 
			 * @param {string} dir - The directory we'll be loading any assets from.
			 */
			function (manifest, dir) {
				_this.doLoadManifest(['name', 'jsFiles', 'sceneClass'], manifest, dir, callback, error_callback);
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
	preloadManifests(callback) {
		// sets our callback in a property that PWGameSceneloader can call
		this.onManifestsLoaded = typeof (callback) !== 'undefined' ? callback : function () { };

		this.manifestPreloadQueue = [];

		// run the PWGameSceneloader scene.  When it's done, it'll trigger our callback
		this.phaser.scene.start('___loaderScene___');
	}

	loadTransitionManifest(info, callback, error_callback, force) {

		let _this = this;

		// make sure we have a container for the transition's parent path
		_Manifests.transitions[info.team] = typeof (_Manifests.transitions[info.team]) !== 'undefined' ? _Manifests.transitions[info.team] : {};

		// if error_callback is true, use that as the force property
		if (error_callback === true) {
			force = true;
			error_callback = function () { };
		}

		// if no error callback is defined, have it use a generic alert
		error_callback = typeof (error_callback) !== 'undefined' ? error_callback : function (error) {
			console.error(error);
			alert(error);
		};

		// this is the directory that the manifest file should be in
		let dir = 'teams/' + info.team + '/transitions/' + info.name + '/';

		// if the manifest hasn't been loaded yet, or we're forcing a fresh load....
		if (force || !_Manifests.transitions[info.team][info.name]) {

			// load the manifest file into a javascript object
			this.getJSON(dir + 'manifest.json', function (data) {

				// update the manifest so it has a reference to our directory.
				data.path = dir;
				data.type = "transitions";

				let onLoaded = function () {
					// cache the manifest so we don't have to reload it again later, and fire the callback
					_Manifests.transitions[info.team][info.name] = data;
					callback(_Manifests.transitions[info.team][info.name], dir);
				}

				if (data.parent && data.parent.team && data.parent.name) {
					_this.loadTransitionManifest({ team: data.parent.team, name: data.parent.name }, onLoaded, error_callback, force);
				} else {
					onLoaded();
				}

				// error handling
			}, function (e) {

				// manifest failed to load or decode
				console.error(e);
				console.error("Couldn't find file: " + dir + '/manifest.json');
				error_callback("Could not load transition at team: " + info.team + ', name: ' + info.name);
			});

			// The manifest has already been loaded and cached
		} else {

			let onLoaded = function () {
				// cache the manifest so we don't have to reload it again later, and fire the callback
				_Manifests.transitions[info.team][info.name].path = dir;
				_Manifests.transitions[info.team][info.name].type = "transitions";
				callback(_Manifests.transitions[info.team][info.name], dir);
			}

			// there's a parent manifest here, lets get that loaded first
			if (data.parent && data.parent.team && data.parent.name) {
				_this.loadTransitionManifest({ team: data.parent.team, name: data.parent.name }, onLoaded, error_callback, force);
			} else {
				onLoaded();
			}
		}
	}

	/**
	 * Loads the manifest.json data for a microgame
	 * @param {object} gameInfo - An object with a team and game key to identify the microgame.
	 * @param {function} callback - A callback function to run when the microgame has loaded.
	 * @param {function} error_callback - A callback function to run if there are any problems loading the microgame.
	 * @param {boolean} force - set to true to load all files instead of using cached/compiled data.
	 */
	loadMicroGameManifest(gameInfo, callback, error_callback, force) {
		let _this = this;

		// make sure we have a container for the microgame's parent path
		_Manifests.microgames[gameInfo.team] = typeof (_Manifests.microgames[gameInfo.team]) !== 'undefined' ? _Manifests.microgames[gameInfo.team] : {};

		// if error_callback is true, use that as the force property
		if (error_callback === true) {
			force = true;
			error_callback = function () { };
		}

		// if no error callback is defined, have it use a generic alert
		error_callback = typeof (error_callback) !== 'undefined' ? error_callback : function (error) {
			console.error(error);
			alert(error);
		};

		// this is the directory that the manifest file should be in
		let dir = 'teams/' + gameInfo.team + '/microgames/' + gameInfo.game + '/';

		// if the manifest hasn't been loaded yet, or we're forcing a fresh load....
		if (force || !_Manifests.microgames[gameInfo.team][gameInfo.game]) {

			// load the manifest file into a javascript object
			this.getJSON(dir + 'manifest.json', function (data) {

				// update the manifest so it has a reference to our directory.
				data.path = dir;
				data.type = "microgames";

				let onLoaded = function () {
					// cache the manifest so we don't have to reload it again later, and fire the callback
					_Manifests.microgames[gameInfo.team][gameInfo.game] = data;
					callback(_Manifests.microgames[gameInfo.team][gameInfo.game], dir);
				}

				if (data.parent && data.parent.team && data.parent.name) {
					_this.loadMicroGameManifest({ team: data.parent.team, game: data.parent.name }, onLoaded, error_callback, force);
				} else {
					onLoaded();
				}

				// error handling
			}, function (e) {

				// manifest failed to load or decode
				console.error(e);
				console.error("Couldn't find file: " + dir + '/manifest.json');
				error_callback("Could not load game at team: " + gameInfo.team + ', game: ' + gameInfo.game);
			});

			// The manifest has already been loaded and cached
		} else {

			let onLoaded = function () {
				// set a reference to our directory just in case the manifest hasn't actually been used yet (may have been compiled)
				_Manifests.microgames[gameInfo.team][gameInfo.game].path = dir;
				_Manifests.microgames[gameInfo.team][gameInfo.game].type = "microgames";

				// fire the callback
				callback(_Manifests.microgames[gameInfo.team][gameInfo.game], dir);
			}

			if (data.parent && data.parent.team && data.parent.name) {
				_this.loadMicroGameManifest({ team: data.parent.team, game: data.parent.name }, onLoaded, error_callback, force);
			} else {
				onLoaded();
			}
		}
	}

	/**
	 * Loads the manifest.json data for a bossgame
	 * @param {object} gameInfo - An object with a team and game key to identify the bossgame.
	 * @param {function} callback - A callback function to run when the bossgame has loaded.
	 * @param {function} error_callback - A callback function to run if there are any problems loading the bossgame.
	 * @param {boolean} force - set to true to load all files instead of using cached/compiled data.
	 */
	loadBossGameManifest(gameInfo, callback, error_callback, force) {
		let _this = this;

		// make sure we have a container for the bossgame's parent path
		_Manifests.bossgames[gameInfo.team] = typeof (_Manifests.bossgames[gameInfo.team]) !== 'undefined' ? _Manifests.bossgames[gameInfo.team] : {};

		// if error_callback is true, use that as the force property
		if (error_callback === true) {
			force = true;
			error_callback = function () { };
		}

		// if no error callback is defined, have it use a generic alert
		error_callback = typeof (error_callback) !== 'undefined' ? error_callback : function (error) {
			console.error(error);
			alert(error);
		};

		// this is the directory that the manifest file should be in
		let dir = 'teams/' + gameInfo.team + '/bossgames/' + gameInfo.game + '/';

		// if the manifest hasn't been loaded yet, or we're forcing a fresh load....
		if (force || !_Manifests.bossgames[gameInfo.team][gameInfo.game]) {

			// load the manifest file into a javascript object
			this.getJSON(dir + 'manifest.json', function (data) {

				// update the manifest so it has a reference to our directory.
				data.path = dir;
				data.type = "bossgames";

				let onLoaded = function () {
					// cache the manifest so we don't have to reload it again later, and fire the callback
					_Manifests.bossgames[gameInfo.team][gameInfo.game] = data;
					callback(_Manifests.bossgames[gameInfo.team][gameInfo.game], dir);
				}

				if (data.parent && data.parent.team && data.parent.name) {
					_this.loadBossGameManifest({ team: data.parent.team, game: data.parent.name }, onLoaded, error_callback, force);
				} else {
					onLoaded();
				}

				// error handling
			}, function (e) {

				// manifest failed to load or decode
				console.error(e);
				console.error("Couldn't find file: " + dir + '/manifest.json');
				error_callback("Could not load game at team: " + gameInfo.team + ', game: ' + gameInfo.game);
			});

			// The manifest has already been loaded and cached
		} else {

			let onLoaded = function () {
				// set a reference to our directory just in case the manifest hasn't actually been used yet (may have been compiled)
				_Manifests.bossgames[gameInfo.team][gameInfo.game].path = dir;
				_Manifests.bossgames[gameInfo.team][gameInfo.game].type = "bossgames";

				// fire the callback
				callback(_Manifests.bossgames[gameInfo.team][gameInfo.game], dir);
			}

			if (data.parent && data.parent.team && data.parent.name) {
				_this.loadBossGameManifest({ team: data.parent.team, game: data.parent.name }, onLoaded, error_callback, force);
			} else {
				onLoaded();
			}
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
		} else if (top === 'transitions') {
			current_object = transitions;
		} else {
			throw ("Scene class must be namespaced to transitions, microgames or bossgames!");
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
		let activeScene = this.phaser.scene.getScene(this.#activeGameScene);
		return activeScene.scene.isActive() && !this.inTransition && !this.paused;
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
		this.#paused = true;
		this.phaser.pause();
	}

	/**
	 * Resumes the game
	 * @return {void}
	 */
	resume() {
		this.#paused = false;
		this.phaser.resume();
	}

	/**
	 * Set the current speed modifier for microgames (happens in nextPhase() during new rounds).
	 * @param {number} speed - Our speed modifier, where 1 = normal speed, 2 = 2x speed, etc.
	 */
	setGameSpeed(speed) {
		this.#gameSpeed = speed;
		this.#msPerTargetFrame = 1000 / (this.targetFPS * speed);
		this.#msPerStep = this.msPerTargetFrame * PWConfig.FRAMES_PER_STEP;
	}

	/**
	 * Increases the game speed by the SPEED_MODIFIER constant
	 * @return {void}
	 * @see PWConfig.SPEED_MODIFIER
	 */
	increaseGameSpeed() {
		this.setGameSpeed(this.gameSpeed + PWConfig.SPEED_MODIFIER);
	}
	/**
	 * Call this in your game loop to get a number you can multiply any movement by so it runs with the correct timing
	 * regardless of the end user's actual on-screen FPS. This will trigger tge sendDelta() function to update the overall game timer.
	 * @param {number} delta - The number of ms that have lapsed since the last update (comes from Phaser.Scene update function)
	 * @return {number} - The multiplier you should use to adjust your game's timing
	 */
	getDeltaMultiplier(delta, updateGameTicker = true) {

		// bossrounds do not use the main game ticker
		if (updateGameTicker && !this.level.bossRound) this.sendDelta(delta);

		let modifier = delta / this.msPerTargetFrame;
		return modifier;
	}

	/**
	 * Updates the game timer and checks if the game is over
	 * @param {number} delta - The number of ms that have lapsed since the last update (comes from Phaser.Scene update function)
	 * @return {void}
	 */
	sendDelta(delta) {
		// check the game's delta time to see if we need to update the game timer
		if (GameWrapper.gameTimerStep < GameWrapper.gameTimerSteps + 1) {

			// see if we've hit the next step in the game timer
			this.#stepTracker += delta;
			if (this.#stepTracker >= this.#msPerStep) {

				// we hit the next step, but lets keep any overflow delta time for the next step
				this.#stepTracker -= this.#msPerStep;
				GameWrapper.gameTimerStep++;

				// the microgame ran out of time, but we want the visual of it running out to stay for a tick
				if (GameWrapper.gameTimerStep === GameWrapper.gameTimerSteps) {
					GameWrapper.stopGameTimer();
				}

				// now we can actually end the game
				else if (GameWrapper.gameTimerStep > GameWrapper.gameTimerSteps) {
					this.level.gameCompleted(this.#winOnTimeUp);
				}

				// otherwise, just tick down the timer graphic
				else {
					GameWrapper.updateGameTimerFrame();
				}
			}
		}
	}

	/**
	 * Call this if the player will lose the game when the timer runs out.
	 * This could be at the start of the game if they need to accomplish something to win, or at the end if they need to survive.
	 * 
	 * @param {boolean} play_lose_animation - If true, the character will play the lose animation instantly
	 * @return {void}
	 */
	lostGame(play_lose_animation = false) {
		if (play_lose_animation === true) GameWrapper.characterAnimation = 3;
		this.#winOnTimeUp = false;
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
		this.#winOnTimeUp = true;
	}
}