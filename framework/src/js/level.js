/** 
 * class for managing levels 
 */
class PWLevel {

	// ============================== STATIC PROPERTIES ============================== \\

	// the different game modes:

	// game plays normally with rounds of microgames and a boss level
	static MODE_NORMAL = 'normal';

	// game plays with endless microgame cycle, incementing difficulty each playthrough, then incrementing speed and resetting difficulty
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
	 * @type {number} The total number of microgames to play in the current round
	 * @private
	 * @default 0
	 */
	#gamesPerRound = 0;

	/**
	 * @type {number} The total number of microgames to play in the current round
	 * @readonly
	 * @default 0
	 */
	get gamesPerRound() { return this.#gamesPerRound; }

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
		if (!manifest) throw ("Missing required manifest!");
		if (typeof (manifest) !== 'object') throw ("Manifest must be an object!");

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
		if (!manifest.character) throw ("Missing required character!");
		if (!manifest.logo) throw ("Missing required logo!");
		if (!manifest.transition) throw ("Missing required transition!");

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
			if (!manifest.microgames) throw ("Missing required microgame array!");

			// if this is normal mode, we need to make sure we have a bossgame defined
			if (!manifest.bossgame && manifest.mode === PWLevel.MODE_NORMAL) throw ("Missing required bossgame!");

			if (manifest.microgames) {

				if (!Array.isArray(manifest.microgames)) throw ("Microgames must be an array!");
				if (manifest.microgames.length === 0) throw ("Microgames array must have at least one item!");

				manifest.microgames.forEach(function (game, mi) {
					if (!game.numGames) throw ("Microgame manifest[" + mi + "] missing numGames!");
					if (!game.gameList) throw ("Microgame manifest[" + mi + "] missing gameList!");
					if (!Array.isArray(game.gameList)) throw ("Microgame manifest[" + mi + "] gameList is not an array!");
					if (game.gameList.length === 0) throw ("Microgame manifest[" + mi + "] gameList is empty!");

					game.gameList.forEach(function (game, gi) {
						if (!game.team) throw ("Microgame manifest[" + mi + "][" + gi + "] missing team property!");
						if (!game.game) throw ("Microgame manifest[" + mi + "][" + gi + "] missing game property!");
					});
				});
			}

			// Get the number of microgame rounds in this level
			this.#microgameRounds = manifest.microgames.length;
			this.#gamesPerRound = manifest.microgames[0].numGames

			// this is also the same number of games we have left to play in this round, imagine that!
			this.#gamesRemaining = this.#gamesPerRound;

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

		// handle microgame rounds if we're not playing boss rush
		if (this.#mode !== PWLevel.MODE_BOSSRUSH) {

			// record what the last round was for comparisons in our scenes
			this.#lastRound = this.#round;

			let index = this.#round - 1;
			let microgames = typeof (this.#manifest.microgames[index]) !== 'undefined' ? this.#manifest.microgames[index] : null;

			// we're currently in the microgame phase...
			if (index < this.#microgameRounds) {

				// except, we have no microgames...
				if (!microgames || microgames.length === 0) {
					console.error("No microgames!");
					callback('error', "No microgames!");
					return;
				}

				// we haven't played the full number of games for this round yet
				if (this.#gamesRemaining > 0) {

					// count down the games remaining
					this.#gamesRemaining--;
				}

				// we've played all the games for this round, start a new round
				else {

					this.#round++;

					// if we played through all the defined rounds in endless mode, start it all over
					if (this.#round >= this.#microgameRounds && this.#mode === PWLevel.MODE_ENDLESS) {

						// reset the round counter
						this.#round = 1;

						// we need to make this zero so the transition scene can still tell this is a new round
						this.#lastRound = 0;

						// reset the difficulty
						this.__setDifficulty(0, true);
					}

					// get the index for this round's microgames
					index = this.#round - 1;

					// see if we have any microgames defined for this new round number...

					// we do, so start the new round
					if (index < this.#microgameRounds) {

						// grab the manifest info for the current round of microgames
						microgames = this.#manifest.microgames[index];

						// update the number of games this round wants us to play
						this.#gamesRemaining = microgames.numGames;

						callback("newround", "microgame");

						// we're done here
						return;
					}

					// if we get here, we're playing a normal mode game and have reached the boss level
					else {
						// TODO - define the boss game
					}
				}
			}
		}

		// this is a buss rush game
		else {

			this.#lastRound = this.#round;

			// if our unused games list is empty, we'll recycle the used list
			if (this.#bossgameManifests.length < 1) {

				// if we're at the higest difficulty, we'll start a new round at a faster speed
				if (this.difficulty === 2) {

					// reset the round counter
					this.__setDifficulty(0, true);

					// update the round
					this.#round++;

					// fire the callback in newround mode
					callback("newround", "microgame");

					// we're done here
					return;
				}
				// we can increase the difficylty still
				else {

					// reset the manifest lists
					this.#bossgameManifests = this.#bossgameManifestsUsed;
					this.#bossgameManifestsUsed = [];

					// increase the difficulty
					this.__setDifficulty(this.difficulty + 1, false);
				}
			}

			// now, pull a random manifest from the list of boss games
			bossgame = this.#bossgameManifests.splice(Math.floor(Math.random() * this.#bossgameManifests.length), 1)[0];

			// and put it into the used list
			this.#bossgameManifestsUsed.push(bossgame);
		}

		// if we have a boss game, play that
		if (bossgame) {
			this.#bossRound = true;
			callback('bossgame', bossgame);
		}

		// otherwise start the next microgame
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

		if (this.bossRound && this.#mode !== PWLevel.MODE_BOSSRUSH) {
			this.complete = true;
		}
		if (this.game_complete_callback) this.game_complete_callback(success);
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
			this.#manifest.microgames.forEach(function (microgames) {

				microgames.gameList.forEach(function (gameInfo) {

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
		if (this.#microgameManifests.length < 1) throw ("Level has no microgame manifests loaded");

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
		sheet: "sir_reginald_emojiman_sheet.webp",
		icon: "sir_reginald_emojiman_icon.png"
	},
	transition: {
		team: "psychogoldfish",
		name: "emojis"
	},
	microgames: null,
	bossgame: null
};