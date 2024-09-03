/** 
 * class for managing levels 
 */
class PWLevel {

	/**
	 * @param {object} manifest - the manifest object containing the level configuration
	 * @param {string} manifest.character - the character animation sheet to use, ie "character_stub/character_sheet.XXX". (XXX = gif, png, webp)
	 * @param {string} manifest.transition - the transition animation sheet to use, ie "transition_stub/transition_sheet.XXX". (XXX = gif, png, webp)
	 * @param {string} manifest.logo - the logo image to use
	 * @param {number} manifest.gamesPerRound - the number of microgames to play in each round
	 * @param {array} manifest.microgames - an array of microgame paths to use
	 * @param {object} manifest.bossgame - the bossgame manifest to use
	 * @param {boolean|string} manifest.devMode - can be false, 'game', 'bossgame' or 'level'. Either string will enable developer mode, but 'game' will allow testing a microgame with no boss level, and 'bossgame' will allow testing a boss level with no microgames.
	 */
	constructor(manifest) {

		if (!manifest) throw ("Missing required manifest!");

		/** 
		 * @type {boolean} if true, level is running in developer mode
		 */
		this.devMode = false;

		if (manifest.devMode) {

			this.devMode = manifest.devMode;

			// while developing, the manifest can be incomplete. But we still need to pull all the defaults
			for (const [key, val] of Object.entries(PWLevel.default_manifest)) {
				if (typeof (manifest[key]) === 'undefined') manifest[key] = val;
			}
		}

		// check for required items
		if (!manifest.character) throw ("Missing required character!");
		if (!manifest.logo) throw ("Missing required logo!");
		if (!manifest.transition) throw ("Missing required transition!");
		if (!manifest.microgames && manifest.devMode !== 'bossgame') throw ("Missing required microgame array!");
		if (!manifest.bossgame && manifest.devMode !== 'game') throw ("Missing required bossgame!");

		/** 
		 * current round (1 = normal speed, 2 & 3 = faster speeds, 4 = boss) 
		 * @type {number}
		 */
		this.round = 1;

		/** 
		 * The number of microgames to play in each non-boss round 
		 * @type {number}
		 */
		this.gamesPerRound = typeof (manifest.gamesPerRound) !== 'undefined' ? manifest.gamesPerRound : 5;

		/** 
		 * The current number of games played  
		 * @type {number}
		 */
		this.currentGame = 0;

		/** 
		 * The number of games remaining in the curren round 
		 * @type {number}
		 */
		this.gamesRemaining = this.gamesPerRound;

		/** 
		 * container for manifests that haven't been used yet 
		 * @type {array}
		 */
		this.microgame_manifests = [];

		/** 
		 * container for manifests that have been used (may be recycled) 
		 * @type {array}
		 */
		this.microgame_manifests_used = [];

		/** 
		 * The level manifest 
		 * @type {object}
		 */
		this.manifest = manifest;

		/** 
		 * Container for wrapper images 
		 * @type {object}
		 * @property {Image} logo - level logo image
		 * @property {Image} character - character animation sheet
		 * @property {Image} transition - transition animation sheet
		 */
		this.imgs = {
			logo: new Image(),
			character: new Image(),
			transition: new Image()
		};
	}

	/**
	 * Gets the next phase of the level
	 * @param {function} callback - A handler function that will recieve 2 params: mode and data.
	 * @returns {void}
	 */
	getNext(callback) {

		// we're currently in the microgame phase...
		if (this.round < 4) {

			// except, we have no microgames...
			if (!this.manifest.microgames || this.manifest.microgames.length === 0) {

				// if we're testing a biss game, just jump ahead
				if (this.manifest.devMode === 'bossgame') {
					console.log('skipping microgames');
					this.round = 4;

					// in any other case, this is an error
				} else {
					console.error("No microgames!");
					callback('error', "No microgames!");
					return;
				}

				// we haven't played the full number of games for this round yet
			} else if (this.gamesRemaining > 0) {
				console.log("next micro!");
				this.gamesRemaining--;

				// we've played all the games for this round, start a new round
			} else {
				this.round++;
				this.gamesRemaining = this.gamesPerRound;
				console.log("newround!!!");

				// trigger the callback to show the proper message text before starting the next thing

				// it's a micro-game round, show the 'faster' message
				if (this.round < 4) {

					callback("newround", "microgame");

					// we're just testing a microgame, so we can be a winner now
				} else if (this.manifest.devMode === 'game') {

					callback("finish", 'devmode');

					// show the 'boss level' message
				} else {

					callback("newround", "bossgame");
				}
				return;
			}
		}

		if (this.round < 4) {
			console.log("start micro!");
			callback('microgame', this.getRandomMicrogameManifest());
		} else if (this.round === 4) {
			if (this.manifest.bossgame) {
				console.log("start boss!");
				callback('bossgame', this.getBossgameManifest());
			} else if (this.manifest.devMode === 'game') {
				console.log('skip bossgame');
				this.round = 5;
				callback('finish', null);
			} else {
				console.error("No bossgame!");
				callback('error', "No bossgame!");
			}
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
		if (this.game_complete_callback) this.game_complete_callback(success);
	}

	/**
	 * Loads any assets this level will use
	 * @param {Function} callback - callback to execute when items are preloaded. Will pass a value between 0 and 1.
	 * @param {boolean} force - set to true to ignore cached items
	 */
	preload(callback, force) {
		let _this = this;

		// logo, transition, character (TODO add skin)
		var promises = 3;

		// add one for each microgame
		this.manifest.microgames.forEach(function (path) {
			promises++;
		});

		var total_promises = promises;

		// run this when every promise completes to see if we're done
		function checkPromises() {
			promises--;
			callback((total_promises - promises) / total_promises);
		}

		// run this if something fucks up
		function handleError(err) {
			console.error(err);
			promises--;
			if (promises < 1) alert("Loaded with errors!");
		}

		// preload all the microgames asynchronously
		this.manifest.microgames.forEach(function (path) {

			let loadMicrogame = new Promise((resolve, reject) => {

				PWGame.loadMicroGame(
					path,
					function (manifest) {
						_this.microgame_manifests.push(manifest);
						resolve();
					},
					function (err) {
						alert("Microgame Failed:\n" + err + "\n\nDid you use the correct path?");
						reject();
					},
					typeof (force) !== 'undefined' ? force : false
				);

			});

			loadMicrogame.then(checkPromises, handleError);

		});

		// preload and remember all the images we need for the skin stuff
		this.imgs.logo = new Image();
		this.imgs.logo.src = "teams/" + this.manifest.logo.team + "/logos/" + this.manifest.logo.image;
		this.imgs.logo.onload = checkPromises;

		this.imgs.charsheet = new Image();
		this.imgs.charsheet.src = "teams/" + this.manifest.character.team + "/characters/" + this.manifest.character.sheet;
		this.imgs.charsheet.onload = checkPromises;

		this.imgs.transsheet = new Image();
		this.imgs.transsheet.src = "teams/" + this.manifest.transition.team + "/transitions/" + this.manifest.transition.sheet;
		this.imgs.transsheet.onload = checkPromises;
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
		if (!this.manifest.microgames || this.manifest.microgames.length === 0) return false;

		var i;

		if (this.microgame_manifests.length < 1) {
			this.microgame_manifests = this.microgame_manifests_used;
			this.microgame_manifests_used = [];
		}
		if (this.microgame_manifests.length < 1) throw ("Level has no microgame manifests loaded");

		let used = this.microgame_manifests.splice(Math.floor(Math.random() * this.microgame_manifests.length), 1)[0];

		this.microgame_manifests_used.push(used);
		return used;
	}

	/**
	 * Returns the boss game manifest for this level, or false if none exists
	 * @return {(object|boolen)}
	 */
	getBossgameManifest() {
		return this.manifest.bossgame ? this.manifest.bossgame : false;
	}
}

/** Default Level Manifest (used when testing) */
PWLevel.default_manifest = {
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
		sheet: "yellow_bricks.webp"
	},
	gamesPerRound: 1,
	microgames: null,
	bossgame: null
};