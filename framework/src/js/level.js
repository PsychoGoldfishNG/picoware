/** 
 * class for managing levels 
 */
class PWLevel {

	// ============================== STATIC PROPERTIES ============================== \\

	// the different game modes:

	// game plays normally with rounds of microgames and a boss level
	static MODE_NORMAL = 'normal';

	// game plays a single microgame over and over, incementing difficulty each playthrough, then incrementing speed and resetting difficulty
	static MODE_ENDLESS = 'endless';

	// same as endless, but uses bossgames in place of microgames
	static MODE_BOSSRUSH = 'bossrush';

	// ============================== INSTANCE PROPERTIES ============================== \\

	/** 
	 * @type {boolean} if true, level is running in developer mode
	 * @default false
	 */
	#devMode = false;

	/**
	 * @type {string} the mode of the game (one of the following: 'normal', 'endless', 'bossrush')
	 * @default 'normal'
	 * @readonly
	 * @private
	 */
	get devMode() { return this.#devMode; }

	/**
	 * @type {object} the level manifest
	 * @private
	 */
	#manifest = {};

	/**
	 * @type {object} the level manifest
	 * @readonly
	 */
	get manifest() { return this.#manifest; }

	/**
	 * @type {string} the mode of the game (one of the PWLevel.MODE_XXXXX values)
	 * @private
	 * @default PWLevel.MODE_NORMAL
	 */
	#mode = PWLevel.MODE_NORMAL;

	/**
	 * @type {string} the mode of the game (one of the PWLevel.MODE_XXXXX values)
	 * @readonly
	 * @default PWLevel.MODE_NORMAL
	 */
	get mode() { return this.#mode; }

	/**
	 * @type {number} The current round of the level (a round is a typically clump of microgames or a boss game that are played between 'faster' messages)
	 * @private
	 * @default 1
	 */
	#round = 1;

	/**
	 * @type {number} The current round of the level (a round is a typically clump of microgames or a boss game that are played between 'faster' messages)
	 * @readonly
	 * @default 1
	 */
	get round() { return this.#round; }

	/**
	 * @type {number} The round value at the start of the last game.  Useful to show round changes in transition scenes
	 * @private
	 * @default 1
	 */
	#lastRound = 1;

	/**
	 * @type {number} The round value at the start of the last game.  Useful to show round changes in transition scenes
	 * @readonly
	 * @default 1
	 */
	get lastRound() { return this.#lastRound; }

	/**
	 * @type {boolean} if true, the current round is a boss game
	 * @private
	 * @default 0
	 */
	#bossRound = false;

	/**
	 * @type {boolean} if true, the current round is a boss game
	 * @readonly
	 * @default 0
	 */
	get bossRound() { return this.#bossRound; }

	/**
	 * @type {boolean} if true, the current level has been completed
	 * @private
	 * @default false
	 */
	#complete = false;

	/**
	 * @type {boolean} if true, the current level has been completed
	 * @readonly
	 * @default false
	 */
	get complete() { return this.#complete; }

	/**
	 * @type {number} The difficulty level of the level (0 = easy, 1 = normal, 2 = hard)
	 * @private
	 * @default 0
	 */
	#difficulty = 0;

	/**
	 * @type {number} The difficulty level of the level (0 = easy, 1 = normal, 2 = hard)
	 * @readonly
	 * @default 0
	 */
	get difficulty() { return this.#difficulty; }

	/**
	 * @type {number} The difficulty level at the start of the last game.  Useful to show difficulty changes in transition scenes
	 * @private
	 * @default 0
	 */
	#lastDifficulty = 0;

	/**
	 * @type {number} The difficulty level at the start of the last game.  Useful to show difficulty changes in transition scenes
	 * @readonly
	 * @default 0
	 */
	get lastDifficulty() { return this.#lastDifficulty; }

	/**
	 * @param {number} difficulty - the difficulty level of the level (0 = easy, 1 = normal, 2 = hard)
	 * @param {boolean} setLast - set to true to set the lastDifficulty value to the current difficulty
	 * @private
	 */
	__setDifficulty(difficulty, setLast = false) {

		// setLast is false, so we'll record the previous difficulty
		if (!setLast) this.#lastDifficulty = this.#difficulty;

		// make sure the difficulty is within bounds
		if (difficulty < 0) difficulty = 0;
		if (difficulty > 2) difficulty = 2;

		this.#difficulty = difficulty;

		// setLast is true so we'll set it the same as the current difficulty
		if (setLast) this.#lastDifficulty = this.#difficulty;
	}

	/**
	 * @type {number} The number of microgames to play in a non-endless level before moving on to the boss game
	 * @private
	 * @default 0
	 */
	#microgameRounds = 0;

	/**
	 * @type {number} The number of microgames to play in a non-endless level before moving on to the boss game
	 * @readonly
	 * @default 0
	 */
	get microgameRounds() { return this.#microgameRounds; }

	/**
	 * @type {number} The total number of microgames left to play in the current round
	 * @private
	 * @default 0
	 */
	#gamesRemaining = 0;

	/**
	 * @type {number} The total number of microgames left to play in the current round
	 * @readonly
	 * @default 0
	 */
	get gamesRemaining() { return this.#gamesRemaining; }

	/**
	 * @type {number} The total number of microgames to play in the current round
	 * @private
	 * @default 0
	 */
	#gamesTotal = 0;

	/**
	 * @type {array} A list of microgames that haven't been used yet (may be recycled when the list is empty)
	 * @private
	 * @default []
	 */
	#microgameManifests = [];

	/**
	 * @type {array} A list of microgames that haven't been used yet (may be recycled when the list is empty)
	 * @readonly
	 * @default []
	 */
	get microgameManifests() { return this.#microgameManifests; }

	/**
	 * @type {array} A list of microgames that have been used (gets copied to microgameManifests when it's empty)
	 * @private
	 * @default []
	 */
	#microgameManifestsUsed = [];

	/**
	 * @type {array} A list of microgames that have been used (gets copied to microgameManifests when it's empty)
	 * @readonly
	 * @default []
	 */
	get microgameManifestsUsed() { return this.#microgameManifestsUsed; }

	/**
	/**
	 * @type {array} A list of bossgames that haven't been used yet (may be recycled when the list is empty)
	 * @private
	 * @default []
	 */
	#bossgameManifests = [];

	/**
	 * @type {array} A list of bossgames that haven't been used yet (may be recycled when the list is empty)
	 * @readonly
	 * @default []
	 */
	get bossgameManifests() { return this.#bossgameManifests; }

	/**
	 * @type {array} A list of bossgames that have been used (gets copied to bossgameManifests when it's empty)
	 * @private
	 * @default []
	 */
	#bossgameManifestsUsed = [];

	/**
	 * @type {array} A list of bossgames that have been used (gets copied to bossgameManifests when it's empty)
	 * @readonly
	 * @default []
	 */
	get bossgameManifestsUsed() { return this.#bossgameManifestsUsed; }

	/**
	 * @type {number} The number of games completed by the player
	 * @private
	 * @default 0
	 */
	#score = 0;

	/**
	 * @type {number} The number of games completed by the player
	 * @readonly
	 * @default 0
	 */
	get score() { return this.#score; }

	/**
	 * @type {number} The score value at the start of the last game.  Compare this to the current score to see if the player won a game
	 * @readonly
	 * @default 0
	 */
	#lastScore = 0;

	/**
	 * @type {number} The score value at the start of the last game.  Useful to show score changes in transition scenes
	 * @readonly
	 * @default 0
	 */
	get lastScore() { return this.#lastScore; }

	/**
	 * @type {number} The number of times the player can fail before losing the level
	 * @private
	 * @default 4
	 */
	#health = 4;

	/**
	 * @type {number} The number of times the player can fail before losing the level
	 * @readonly
	 * @default 4
	 */
	get health() { return this.#health; }

	/**
	 * @type {number} The health value at the start of the last game.  Compare this to the current health to see if the player lost a game
	 * @private
	 * @default 4
	 */
	#lastHealth = 4;

	/**
	 * @type {number} The health value at the start of the last game.  Compare this to the current health to see if the player lost a game
	 * @readonly
	 * @default 4
	 */
	get lastHealth() { return this.#lastHealth; }

	/**
	 * @type {object} A container for images used in the game wrapper, such as the logo and character sheet
	 * @private
	 * @property {Image} logo - level logo image
	 * @property {Image} character - character animation sheet
	 */
	#imgs = { logo: null, character: null };

	/**
	 * @type {object} A container for images used in the game wrapper, such as the logo and character sheet
	 * @readonly
	 * @property {Image} logo - level logo image
	 * @property {Image} character - character animation sheet
	 */
	get imgs() { return this.#imgs; }

	/**
	 * @param {object} manifest - the manifest object containing the level configuration
	 * @param {number} manifest.difficulty - the difficulty level of the level
	 * @param {string} manifest.character - the character animation sheet to use
	 * @param {string} manifest.transition - the transition Scene to use
	 * @param {string} manifest.logo - the logo image to use
	 * @param {array} manifest.microgames - an array of microgame rules
	 * @param {object} manifest.bossgame - the bossgame manifest
	 * @param {boolean} manifest.mode - the mode of the game (one of the following: 'normal', 'endless', 'bossrush')
	 * @param {boolean|string} manifest.devMode - can be false, 'game', 'bossgame' or 'level'. Either string will enable developer mode, but 'game' will allow testing a microgame with no boss level, and 'bossgame' will allow testing a boss level with no microgames.
	 * 
	 * @param {object} overrides - optional object to override any values in the manifest
	 */
	constructor(manifest, overrides) {

		// By default, all levels will start at difficulty 1.
		// This can be changed in the level manifest for games running in normal mode
		this.__setDifficulty(0, true);

		// make sure we have a proper manifest object
		if (!manifest) {
			alert("Missing required manifest!");
			throw ("Missing required manifest!");
		}
		if (typeof (manifest) !== 'object') {
			alert("Manifest must be an object!");
			throw ("Manifest must be an object!");
		}

		// if we have an overrides object, merge it with the manifest (without changing the original)
		if (typeof (overrides) === 'object') {
			let new_manifest = {};
			Object.assign(new_manifest, manifest, overrides);
			manifest = new_manifest;
		}

		// if we're in dev mode, this is probably a test level, so we'll need to fill in some defaults
		if (manifest.devMode) {

			// not what devmode we are in (game, bossgame, or level)
			this.#devMode = manifest.devMode;

			// while developing, the manifest can be incomplete. But we still need to pull all the defaults
			for (const [key, val] of Object.entries(PWLevel.default_manifest)) {
				if (typeof (manifest[key]) === 'undefined') manifest[key] = val;
			}
		}

		// now we can make sure all the required properties are set
		if (!manifest.character) {
			alert("Missing required character!");
			throw ("Missing required character!");
		}
		if (!manifest.logo) {
			alert("Missing required logo!");
			throw ("Missing required logo!");
		}
		if (!manifest.transition) {
			alert("Missing required transition!");
			throw ("Missing required transition!");
		}

		// set the game mode
		if (manifest.mode === PWLevel.MODE_ENDLESS || manifest.mode === PWLevel.MODE_BOSSRUSH) {
			this.#mode = manifest.mode;
		}
		// always fall back to normal mode
		else {
			this.#mode = PWLevel.MODE_NORMAL;

			// we might have a non-default difficulty set in the manifest, check for that
			if (manifest.difficulty && manifest.difficulty > 0 && manifest.difficulty <= 3) this.__setDifficulty(manifest.difficulty, true);
		}

		// If we have a microgame config, validate it (these will never be used in a boss rush game)
		if (this.mode !== PWLevel.MODE_BOSSRUSH) {

			// make sure we have a microgame array
			if (!manifest.microgames) {
				alert("Missing required microgame array!");
				throw ("Missing required microgame array!");
			}

			// if this is normal mode, we need to make sure we have a bossgame defined
			if (!manifest.bossgame && manifest.mode === PWLevel.MODE_NORMAL) {
				alert("Missing required bossgame!");
				throw ("Missing required bossgame!");
			}

			if (manifest.microgames) {

				if (typeof (manifest.microgames) !== 'object') {
					alert("Microgames must be an object!");
					throw ("Microgames must be an object!");
				}

				if (!manifest.microgames.rounds || !Array.isArray(manifest.microgames.rounds)) {
					alert("Microgames missing or empty rounds array!");
					throw ("Microgames missing or empty rounds array!");
				}

				manifest.microgames.rounds.forEach(function (round) {
					if (typeof (round) !== 'number') {
						alert("Microgame round is not a number!");
						throw ("Microgame round is not a number!", round);
					}
				});

				if (!manifest.microgames.games || !Array.isArray(manifest.microgames.games)) {
					alert("Microgames missing or empty games array!");
					throw ("Microgames missing or empty games array!");
				}

				manifest.microgames.games.forEach(function (game, mi) {

					if (!game.team) {
						alert("Microgame at index " + mi + " missing team property!");
						throw ("Microgame at index " + mi + " missing team property!");
					}
					if (!game.game) {
						alert("Microgame at index " + mi + " missing game property!");
						throw ("Microgame at index " + mi + " missing game property!");
					}
				});
			}

			// Get the number of microgame rounds in this level
			this.#microgameRounds = manifest.microgames.rounds.length;

			// Get the number of games in the first round
			this.#gamesTotal = this.#gamesRemaining = manifest.microgames.rounds[0];

		}

		// set our initial game data arrays

		// The available microgames for this round wil be added here
		this.#microgameManifests = [];

		// when a game is pulled from ther above list, it will be moved here to avoid too much repetition
		this.#microgameManifestsUsed = [];


		this.#bossgameManifests = [];
		this.#bossgameManifestsUsed = [];

		// set the score counterw to zero
		this.#score = 0;
		this.#lastScore = 0;

		// assign full health
		this.#health = 4;
		this.#lastHealth = this.#health;

		// add a reference to the manifest the rest of this class can use
		this.#manifest = manifest;

		// set up out skin images for desktop mode
		this.#imgs = {
			logo: new Image(),
			character: new Image()
		};
	}

	/**
	 * Gets the next phase of the level
	 * @param {function} callback - A handler function that will recieve 2 params: mode and data.
	 * @returns {void}
	 */
	getNext(callback) {

		// If we're at a stage where we're laying a boss game we'll update this
		let bossgame = null;

		// Handle whatever round we're in, assuming we're not playing boss rush mode
		if (this.#mode !== PWLevel.MODE_BOSSRUSH) {

			// if we're in the boss round, just use the boss game
			if (this.#bossRound) {
				bossgame = this.#bossgameManifests[0];

				// otherwise, figure out what to do next
			} else {

				// record what the last round was for comparisons in our scenes
				this.#lastRound = this.#round;

				// reference the microgame games list
				let microgames = this.#manifest.microgames.games;
				let rounds = this.#manifest.microgames.rounds;

				// we got here while in a microgame round...
				if (this.#round <= this.#microgameRounds) {

					// we haven't played the full number of games for this round yet
					if (this.#gamesRemaining > 0) {

						// if we're in endless mode, we'll increase the difficulty each time we play all the games, but not on the first game
						if (this.mode === PWLevel.MODE_ENDLESS && this.#gamesTotal !== this.#gamesRemaining) {
							this.__setDifficulty(this.difficulty + 1, false);
						}

						// count down the games remaining
						this.#gamesRemaining--;
					}

					// we've played all the games for this round, start a new round
					else {

						this.#round++;

						// in endless mode, we have to reset things when they hit any sort of limit
						if (this.#mode === PWLevel.MODE_ENDLESS) {

							// The new round will play faster, so we'll reset the difficulty back to zero
							this.__setDifficulty(0, true);

							// we've played all teh defined rounds, so start back at the beginning
							if (this.#round > this.#microgameRounds) {

								// reset the round counter
								this.#round = 1;

								// We're setting this to zero so round comparisons will work in the transition scenes
								this.#lastRound = 0;
							}
						}

						// We still have at least one microgame round to play
						if (this.#round <= this.#microgameRounds) {

							// update the number of games this round wants us to play
							this.#gamesTotal = rounds[this.#round - 1];

							// we're starting a game now, so we'll subtract one from the total
							this.#gamesRemaining = this.#gamesTotal - 1;

							callback("newround", "microgame");

							// we're done here
							return;

							// we are out of microgames, switch to boss mode
						} else {
							this.#bossRound = true;
							this.#lastRound = this.#round;
							bossgame = this.#bossgameManifests[0];
						}
					}
				}
			}
		}

		// this is a buss rush game, we'll have to figure out what boss game to play
		else {

			// note what round we came from
			this.#lastRound = this.#round;

			// We have played every game, so we'll need to mix things up to increase the challenge
			if (this.#bossgameManifests.length < 1) {

				// put all the boss games back into the list
				this.#bossgameManifests = this.#bossgameManifestsUsed;
				this.#bossgameManifestsUsed = [];

				// If the last round was at the highest difficulty, we'll start a new round
				// at difficulty 0, but increase the game speed
				if (this.difficulty === 2) {

					// reset the difficulty level
					this.__setDifficulty(0, true);

					// update the round (will trigger faster game speed)
					this.#round++;

					// fire the callback in newround mode
					callback("newround", "bossgame");

					// We don't need to do anything else until the next time this method is called
					return;
				}
				// otherwise, we'll just increase the difficulty and stay in the same round
				else {
					// increase the difficulty
					this.__setDifficulty(this.difficulty + 1, false);
				}
			}

			// Pull a random game from the bossgame list
			bossgame = this.#bossgameManifests.splice(Math.floor(Math.random() * this.#bossgameManifests.length), 1)[0];

			// Store the game in the used list so we can recycle it later
			this.#bossgameManifestsUsed.push(bossgame);
		}

		// when we get here we'll either have a bossgame, or we'll need to pull a microgame from the list

		// We have a boss game, play that
		if (bossgame) {
			this.#bossRound = true;
			callback('bossgame', bossgame);
		}

		// Grab a random microgame and play that
		else {
			callback('microgame', this.getRandomMicrogameManifest());
		}
	}

	/**
	 * Sets a callback handler for when the current micro/boss game is completed
	 * @param {function} callback
	 */
	onGameComplete(callback) {
		this.game_complete_callback = callback;
	}

	/**
	 * call this when a microgame or boss game is completed
	 * @param {boolean} success - set to true if the player won
	 */
	gameCompleted(success) {
		GameWrapper.characterAnimation = success ? 2 : 3;

		this.#lastScore = this.#score;
		this.#lastHealth = this.#health;

		this.#score++;
		if (!success) this.#health--;

		if (this.bossRound && this.#mode !== PWLevel.MODE_BOSSRUSH && success) {
			this.#complete = true;
		}

		if (this.game_complete_callback) this.game_complete_callback(success, this.complete);
	}

	/**
	 * Loads any assets this level will use
	 * @param {Function} callback - callback to execute when items are preloaded. Will pass a value between 0 and 1.
	 * @param {boolean} force - set to true to ignore cached items
	 */
	preload(callback, force) {
		let _this = this;

		// this will count the number of promises we need to wait for
		// we start with 1 so everything below can run without one item falsely completing
		var promises = 1;

		// run this when all the manifest data has been pulled
		function startPhaserPreload() {
			PWGame.preloadManifests(callback);
		}

		// run this when every promise completes to see if we're done
		function checkPromises() {
			promises--;

			if (promises < 1) {
				startPhaserPreload();
			}
		}

		// run this if something fucks up
		function handleError(err) {
			console.error(err);
			promises--;
			if (promises < 1) {
				console.error("Loaded with errors!");
				alert("Loaded with errors!");
			}
		}

		let loaded = [];

		promises++;
		let loadTransition = new Promise((resolve, reject) => {
			PWGame.loadTransition(
				_this.#manifest.transition,
				function () {
					resolve();
				},
				function (err) {
					console.error(err);
					alert("Transition Scene Failed:\n" + err + "\n\nCheck dev console for more information");
					reject();
				},
				typeof (force) !== 'undefined' ? force : false
			);
		});
		loadTransition.then(checkPromises, handleError);

		// preload all the microgames asynchronously
		if (this.#manifest.microgames) {
			this.#manifest.microgames.games.forEach(function (gameInfo) {

				let path = gameInfo.team + "/microgames/" + gameInfo.game;

				// check if we've started loading this already
				if (loaded.indexOf(path) >= 0) return;

				// if we haven't, make a note that we are now
				loaded.push(path);
				promises++;

				// wrap the microgame loading in a new promise
				let loadMicrogame = new Promise((resolve, reject) => {

					PWGame.loadMicroGame(
						gameInfo,
						function (manifest) {
							_this.#microgameManifests.push(manifest);
							resolve();
						},
						function (err) {
							console.error(err);
							alert("Microgame Failed:\n" + err + "\n\nCheck dev console for more info.");
							reject();
						},
						typeof (force) !== 'undefined' ? force : false
					);

				});

				loadMicrogame.then(checkPromises, handleError);
			});
		}

		// put any boss games in here
		let bossgames = [];

		// normal mode games have one bossgame
		if (this.#manifest.bossgame) bossgames.push(this.#manifest.bossgame);

		// bsoss rush games have a list of bossgames
		else if (this.#manifest.bossgames) bossgames = this.#manifest.bossgames;

		// preload all the bossgames asynchronously
		if (bossgames) {
			bossgames.forEach(function (gameInfo) {

				let path = gameInfo.team + "/bossgames/" + gameInfo.game;

				// check if we've started loading this already
				if (loaded.indexOf(path) >= 0) return;

				// if we haven't, make a note that we are now
				loaded.push(path);
				promises++;

				// wrap the bossgame loading in a new promise
				let loadBossgame = new Promise((resolve, reject) => {

					PWGame.loadBossGame(
						gameInfo,
						function (manifest) {
							_this.#bossgameManifests.push(manifest);
							resolve();
						},
						function (err) {
							console.error(err);
							alert("Boss Game Failed:\n" + err + "\n\nCheck dev console for more info.");
							reject();
						},
						typeof (force) !== 'undefined' ? force : false
					);

				});

				loadBossgame.then(checkPromises, handleError);
			});
		}

		// preload and remember all the images we need for the skin stuff
		promises++;
		this.#imgs.logo = new Image();
		this.#imgs.logo.src = "teams/" + this.#manifest.logo.team + "/logos/" + this.#manifest.logo.image;
		this.#imgs.logo.onload = checkPromises;

		promises++;
		this.#imgs.charsheet = new Image();
		this.#imgs.charsheet.src = "teams/" + this.#manifest.character.team + "/characters/" + this.#manifest.character.sheet;
		this.#imgs.charsheet.onload = checkPromises;

		// we call this here to remove that default promise we started with now that everything else is registered
		checkPromises();
	}

	/**
	 * Returns true if level has an into movie
	 * @return {boolean}
	 */
	hasIntro() {
		return false;
	}

	/**
	 * Returns a random microgame manifest, or false if no microgames exist in the level set 
	 * (Will go through every game before returning a duplicate)
	 * @return {(object|boolean)}
	 */
	getRandomMicrogameManifest() {
		if (!this.#manifest.microgames || this.#manifest.microgames.length === 0) return false;

		var i;

		if (this.#microgameManifests.length < 1) {
			this.#microgameManifests = this.#microgameManifestsUsed;
			this.#microgameManifestsUsed = [];
		}
		if (this.#microgameManifests.length < 1) {
			alert("Level has no microgame manifests loaded");
			throw ("Level has no microgame manifests loaded");
		}

		let used = this.#microgameManifests.splice(Math.floor(Math.random() * this.#microgameManifests.length), 1)[0];

		this.#microgameManifestsUsed.push(used);
		return used;
	}

	/**
	 * Returns the boss game manifest for this level, or false if none exists
	 * @return {(object|boolen)}
	 */
	getBossgameManifest() {
		return this.#manifest.bossgame ? this.#manifest.bossgame : false;
	}
}

/** Default Level Manifest (used when testing) */
PWLevel.default_manifest = {
	difficulty: 0,
	mode: PWLevel.MODE_NORMAL,
	logo: {
		team: "psychogoldfish",
		image: "sir_reginald_emojiman.png"
	},
	character: {
		team: "psychogoldfish",
		sheet: "sir_reginald_emojiman_sheet.webp"
	},
	transition: {
		team: "psychogoldfish",
		name: "emojis"
	},
	microgames: null,
	bossgame: null
};