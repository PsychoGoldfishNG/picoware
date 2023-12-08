/** 
 * class for managing levels 
 */
class PWLevel {

	/**
	 * @param {object} manifest - the manifest object containing the level configuration
	 * @param {string} manifest.character - the character animation sheet to use
	 * @param {string} manifest.transition - the transition animation sheet to use
	 * @param {string} manifest.logo - the logo image to use
	 * @param {number} manifest.gamesPerRound - the number of microgames to play in each round
	 * @param {array} manifest.microgames - an array of microgame paths to use
	 * @param {object} manifest.bossgame - the bossgame manifest to use
	 * @param {boolean} manifest.devMode - if true, level is running in developer mode
	 */
	constructor(manifest)
	{
		console.log("NEW MANIFEST",manifest);

		if (!manifest) throw("Missing required manifest!");
		
		/** 
		 * @type {boolean} if true, level is running in developer mode
		 */
		this.devMode = false;

		if (manifest.devMode) {
			
			this.devMode = true;

			for(const [key, val] of Object.entries(PWLevel.default_manifest)) {
				if (typeof(manifest[key]) === 'undefined') manifest[key] = val;
			}
		}

		if (!manifest.character) throw("Missing required character!");
		if (!manifest.transition) throw("Missing required transition!");
		if (!manifest.microgames) throw("Missing required microgame array!");

		/** 
		 * current round (1 = normal speed, 2 & 3 = faster speeds, 4 = boss) 
		 * @type {number}
		 */
		this.round = 1;

		/** 
		 * The number of microgames to play in each non-boss round 
		 * @type {number}
		 */
		this.gamesPerRound = typeof(manifest.gamesPerRound) !== 'undefined' ? manifest.gamesPerRound : 5;

		/** The current number of games played  */
		this.currentGame = 0;

		/** The number of games remaining in the curren round */
		this.gamesRemaining = this.gamesPerRound;

		/** container for manifests that haven't been used yet */
		this.microgame_manifests = [];

		/** container for manifests that have been used (may be recycled) */
		this.microgame_manifests_used = [];

		/** The level manifest */
		this.manifest = manifest;

		/** Container for wrapper images */
		this.imgs = {
			
			/** level logo image*/
			logo: new Image(),

			/** character animation sheet */
			character: new Image(),

			/** transition animation sheet */
			transition: new Image()
		};
	}

	/**
	 * Gets the next phase of the level
	 * @param {function} callback - A handler function that will recieve 2 params: mode and data.
	 */
	getNext(callback)
	{
		console.log("round:",this.round);
		console.log('gamesRemaining:',this.gamesRemaining+"/"+this.gamesPerRound);

		if (this.round < 4) {

			if (!this.manifest.microgames || this.manifest.microgames.length === 0) {
				console.log('skip microgames');
				this.round = 4;
			} else if (this.gamesRemaining > 0) {
				console.log(this.gamesRemaining+" games left (--)");
				this.gamesRemaining--;
			} else {
				this.round++;
				this.gamesRemaining = this.gamesPerRound;
				console.log("newround!!!");
				callback("newround", this.round < 4 ? "microgame":"bossgame");
				return;
			}
		}

		if (this.round < 4) {
			console.log("start micro!");
			callback('microgame', this.getRandomMicrogameManifest());
		} else if (this.round === 4 && this.manifest.bossgame) {
			console.log("start boss!");
			callback('bossgame',this.getBossgameManifest());
		} else {
			console.log("winner?");
			callback('finish',null);
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
	gameCompleted(success)
	{
		if (this.game_complete_callback) this.game_complete_callback(success);
	}

	/**
	 * Loads any assets this level will use
	 * @param {Function} callback - callback to execute when items are preloaded. Will pass a value between 0 and 1.
	 * @param {boolean} force - set to true to ignore cached items
	 */
	preload(callback, force)
	{
		let _this = this;

		// logo, transition, character (TODO add skin)
		var promises = 3; 

		// add one for each microgame
		this.manifest.microgames.forEach(function(path) {
			promises++;
		});

		var total_promises = promises;

		// run this when every promise completes to see if we're done
		function checkPromises() {
			promises--;
			callback((total_promises-promises)/total_promises);
		}

		// run this if something fucks up
		function handleError(err) {
			console.error(err);
			promises--;
			if (promises < 1) alert("Loaded with errors!");
		}

		// preload all the microgames asynchronously
		this.manifest.microgames.forEach(function(path) {

			let loadMicrogame = new Promise((resolve,reject) => {

				PWGame.loadMicroGame(
					path, 
					function(manifest) {
						_this.microgame_manifests.push(manifest);
						resolve();
					}, 
					reject,
					typeof(force) !== 'undefined' ? force : false
				);

			});

			loadMicrogame.then(checkPromises, handleError);

		});

		// preload and remember all the images we need for the skin stuff
		this.imgs.logo = new Image();
		this.imgs.logo.src = typeof(this.manifest.logo) !== 'undefined' ? this.manifest.logo : "FIXME!!!";
		this.imgs.logo.onload = checkPromises;

		this.imgs.charsheet = new Image();
		this.imgs.charsheet.src = "characters/"+this.manifest.character;
		this.imgs.charsheet.onload = checkPromises;
		
		this.imgs.transsheet = new Image();
		this.imgs.transsheet.src = "transitions/"+this.manifest.transition;
		this.imgs.transsheet.onload = checkPromises;
	}

	/**
	 * Returns true if level has an into movie
	 * @return {boolean}
	 */
	hasIntro()
	{
		return false;
	}

	/**
	 * Returns a random microgame manifest, or false if no microgames exist in the level set 
	 * (Will go through every game before returning a duplicate)
	 * @return {(object|boolean)}
	 */
	getRandomMicrogameManifest()
	{
		if (!this.manifest.microgames || this.manifest.microgames.length === 0) return false;

		var i;

		if (this.microgame_manifests.length < 1) {
			this.microgame_manifests = this.microgame_manifests_used;
			this.microgame_manifests_used = [];
		}
		if (this.microgame_manifests.length < 1) throw("Level has no microgame manifests loaded");
		
		let used = this.microgame_manifests.splice(Math.floor(Math.random()*this.microgame_manifests.length), 1)[0];

		this.microgame_manifests_used.push(used);
		return used;
	}

	/**
	 * Returns the boss game manifest for this level, or false if none exists
	 * @return {(object|boolen)}
	 */
	getBossgameManifest()
	{
		return this.manifest.bossgame ? this.manifest.bossgame : false;
	}
}

/** Default Manifest, used when testing */
PWLevel.default_manifest = {
	character: "angry_face/psychogoldfish_stickman.webp",
	transition: "angry_face/psychogoldfish_bricks.webp",
	gamesPerRound: 1,
	microgames: null,
	bossgame: null
};