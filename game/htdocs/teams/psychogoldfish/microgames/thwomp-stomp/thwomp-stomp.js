/** Make sure the namespace object exists */
if (typeof (microgames.psychogoldfish) === 'undefined') microgames.psychogoldfish = {};

/** @var PWFramework PWGame */

/** 
 * A 'push the button' microgame, by PsychoGoldfish 
 * 
 * Difficulty: EASY
 * 
 * A finger will move from side to side, and a player must push down or the action button
 * when the finger is over the on-screen button. 
 * 
 * If the player misses, the finger will move back up so they can try again
 * 
 * @extends microgames.psychogoldfish.push_the_button
 */
microgames.psychogoldfish.thwomp_stomp = class extends microgames.psychogoldfish.push_the_button {

	/**
	 * register this class key with Phaser using microgames.{team_or_author_name}.{game_name} format.
	 * 
	 * @param {object} config - The configuration object for this microgame 
	 * 
	 */
	constructor(config) {

		// Pass the cache key for this scene to the push_the_button class (needs to be in microgames.{team}.{microgame} format).
		// (needs to be called before we can reference 'this' anywhere in the constructor)
		super({ key: 'microgames.psychogoldfish.thwomp_stomp' });

		// ----------- anything after here overrides properties from the parent class -----------\\

		// the background color for the game (overrides the parent class)
		this.bgColor = 0x0000AA;

		// the image keys for the sprites in our texture atlas
		this.spriteKey = {
			button_up: 'goomba',
			button_down: 'goomba_squished',
			finger: 'thwomp',
			finger_fall: 'thwomp_angry'
		};
	}

	/**
	 * @override 
	 * @returns {string} The text to display as a hint to the player
	 */
	getHintText() {
		if (PWGame.level.difficulty === 0) return "SMASH!";
		if (PWGame.level.difficulty === 1) return "SMASH BOTH!";
		if (PWGame.level.difficulty > 1) return "SMASH THEM ALL!";
	}

};