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
 * @extends Phaser.Scene
 */
microgames.psychogoldfish.push_the_button = class extends Phaser.Scene {

	/**
	 * register this class key with Phaser using microgames.{team_or_author_name}.{game_name} format.
	 */
	constructor(config) {

		// if we don't have a config object, create one
		if (!config) config = {};

		// make sure we have a cache key (needs to be in microgames.{team}.{microgame} format).
		if (!config.key) config.key = 'microgames.psychogoldfish.push_the_button';

		// call the Phaser.Scene class constructor
		// (needs to be called before we can reference 'this' anywhere in the constructor)
		super(config);

		// ------ any values below here can be overridden by extended classes. see thwomp-stomp.js for an example ------ \\

		/** 
		 * Assets loaded from manifest files will be prefixed with the sceneClass value.
		 * This is to prevent naming collisions between different teams/games/transitions/etc.
		 * 
		 * For example, the manifest for this game has an image named "button_up.png"
		 * that is defined ad follows:
		 * 
		 *   {"key": "button_up", "image": "button_up.png"}
		 * 
		 * This gets imported with the cache key "microgames.psychogoldfish.push_the_button.button_up"
		 * 
		 * To make it easier to reference these assets, we'll set the prefix to a property.
		 */


		/** The prefix all our assets are using in their cache keys */
		this.prefix = config.key + "."; // just so happens to be the same as the key with a . added to the end

		/** The background color for the game */
		this.bgColor = 0x220000;

		// the image keys for the sprites in our texture atlas
		this.spriteKey = {
			button_up: 'button_up',
			button_down: 'button_down',
			finger: 'finger',
			finger_fall: 'finger'
		};
	}

	/**
	 * @returns {string} The text to display as a hint to the player
	 */
	getHintText() {
		if (PWGame.level.difficulty === 0) return "Push the button!";
		if (PWGame.level.difficulty === 1) return "Push TWO buttons!";
		if (PWGame.level.difficulty > 1) return "Push THREE buttons!";
	}

	/**
	 * This can be either PWInput.TYPE_TOUCH or PWInput.TYPE_GAMEPAD
	 * @returns {string} The type of controls this game uses
	 */
	getControls() {
		return PWInput.TYPE_GAMEPAD;
	}

	/**
	 * Called when the game is ready to start.
	 */
	create() {

		/**
		 * alias of this instance that can be used in nested functions
		 * @type {microgames.psychogoldfish.push_the_button}
		 */
		let _this = this;

		// set the background to super dark red
		this.cameras.main.setBackgroundColor(this.bgColor);

		/** 
		 * current game mode. 
		 * 'wait' = waiting for user input
		 * 'drop' = finger is moving down
		 * 'reset' = finger is moving back up
		 * 'pressed_all' = finger has hit all the buttons
		 */
		this.mode = 'wait';

		// the main x position for our button(s)
		let buttonX = (PWGame.screenSize / 2);

		// the y position for our button(s)
		let buttonY = 415;

		// the modify the main x poistion for each button based on difficulty
		let diffMods = [
			[0],			// difficulty 0 has 1 button
			[-120, 120],	// difficulty 1 has 2 buttons
			[-170, 0, 170]	// difficulty 2 has 3 buttons
		];

		/** 
		 * The button object 
		 * @type Phaser.GameObjects.Sprite[]
		 */
		this.buttons = [];

		// use the array that goes with the difficulty to figure out how many buttons to make and where to put them
		diffMods[PWGame.level.difficulty].forEach(mod => {

			let button = {
				/** adds the actual button sprite to the scene */
				sprite: _this.add.sprite(buttonX + mod, buttonY, this.prefix + 'gameSprites', _this.spriteKey.button_up),

				/** the top of the button's hit box */
				top: buttonY - 125,

				/** the distiance from the button center to each edge of the hitbox */
				hitWidth: 80,

				/** if the button has been pressed */
				pressed: false
			};

			// set the button sprite's origin to the bottom center
			button.sprite.setOrigin(0.5, 1);

			// scale the sprites to 50%.  
			// (If the overall game gets streteched above 720p, the sprites will still look sharp!)
			button.sprite.scaleX = 0.5;
			button.sprite.scaleY = 0.5;

			// add the button to the array
			_this.buttons.push(button);
		});

		/** The finger object */
		this.finger = {

			/** The finger sprite */
			sprite: this.add.sprite(PWGame.screenSize / 2 + 140, 160, this.prefix + 'gameSprites', this.spriteKey.finger),

			/** The width of the finger's hitbox */
			width: 84,

			/** The number of pixels the finger would move per frame at 60fps (when going side to side) */
			xspeed: 10,

			/** The number of pixels the finger would move per frame at 60fps (when going up and down) */
			yspeed: 16,

			// ** the horizontal direction the finger is moving (-1 = left, 1 = right) */
			xdir: Math.random() < 0.5 ? 1 : -1,
		};

		// scale the sprites to 50%, just like the buttons
		this.finger.sprite.scaleX = 0.5;
		this.finger.sprite.scaleY = 0.5;

		/** bounding box for the finger */
		this.bounds = {
			// this is how far it can move to the left
			left: 40,

			// and to the right
			right: PWGame.screenSize - 40,

			// this is how high it can go
			top: this.finger.sprite.y,

			// this is how low it can go
			bottom: 320
		};

		// tell the input controller that there are 3 inputs that will work as 'drop'
		PWGame.input.setAlias('drop', ['down', 'action']);

		// when one of the 'drop' inputs are pushed...
		PWGame.input.onPress('drop', function () {

			// check with the framework to see if we can actually run the game yet (It may be paused or doing a transition animation)
			if (!PWGame.isReady()) return;

			// switch the game to 'drop' mode if it is currently in wait mode
			if (_this.mode === 'wait') {
				_this.mode = 'drop';

				// set the finger sprite to the falling sprite
				// Note: in this game it's the same as the side-to-side, but in 
				// the thwomp-stomp game (that is extended from this game), it's different!
				_this.finger.sprite.setTexture(_this.prefix + 'gameSprites', _this.spriteKey.finger_fall);
			}
		});

		// the game is currently lost until the player hits all the buttons
		// the false tells the wrapper not to play the lose animation early
		PWGame.lostGame(false);
	}

	/**
	 * The main game loop
	 * @param {number} timestamp - The current timestamp on the player's local machine (not used in this game)
	 * @param {number} delta - The number of microseconds that have elapsed since the last update event
	 */
	update(timestamp, delta) {
		// Check with the framework to see if we can actually run the game yet (It may be paused or doing a transition animation)
		if (!PWGame.isReady()) return;

		/**
		 * A value that accounts for what speed the game is running, and how much time has passed between, assuming a target speed of 60fps.
		 * If the game is running at normal speed, and the user's refresh rate is 60fps, this will return 1
		 * If the game is running at normal speed, and the user's refresh rate is 120fps, this will return 0.5
		 * @type {number}
		 */
		var speed_multiplier = PWGame.getDeltaMultiplier(delta); // it is necessary to call this to make the game framework update!

		// check the game mode and update accordingly...
		switch (this.mode) {

			// finger is moving side to side, waiting for the player to press a button
			case 'wait':

				// multiplying the speed by the xDir will make it go left or right
				// multiplying by the speed_modifier will make it move based on the monitor's refresh rate
				// (if we only use the xspeed, the finger would move faster on a 120fps monitor than a 60fps monitor)
				this.finger.sprite.x += this.finger.xspeed * this.finger.xdir * speed_multiplier;

				// check if the finger has reached either screen edge and have it switch directions if needed
				if (this.finger.sprite.x >= this.bounds.right) {
					this.finger.sprite.x = this.bounds.right;
					this.finger.xdir *= -1;
				} else if (this.finger.sprite.x <= this.bounds.left) {
					this.finger.sprite.x = this.bounds.left;
					this.finger.xdir *= -1;
				}

				break;

			// player pressed a button and the finger is moving down now...
			case 'drop':

				// move the finger down
				// multiplying by the speed_modifier will make it move based on the monitor's refresh rate
				// (if we only use the ypeed, the finger would move faster on a 120fps monitor than a 60fps monitor)
				this.finger.sprite.y += this.finger.yspeed * speed_multiplier;

				// assume we hit all the buttons for now
				let hit_all = true;

				// check the state of all out buttons
				this.buttons.forEach(button => {

					// looks like the finger is touching this one!
					if (
						this.finger.sprite.y >= button.top
						&& this.finger.sprite.x >= button.sprite.x - button.hitWidth
						&& this.finger.sprite.x <= button.sprite.x + button.hitWidth
					) {


						// put the finger sprite at the top of the button, and update the button's texture to the down state
						this.finger.sprite.y = button.top;
						button.sprite.setTexture(this.prefix + 'gameSprites', this.spriteKey.button_down);

						// note that the button has been pressed
						button.pressed = true;

						// tell the game it can move the finger back up now if we haven't hit all the buttons
						this.mode = 'reset';

					}

					// this button is currently not being touched, and hasn't been previously pressed
					else if (!button.pressed) {

						// let the game know we actually haven't hit all the buttons after all
						hit_all = false;
					}
				});


				// if we have hit all the buttons, change the game mode to 'pressed_all' so we know we've won on the next update
				if (hit_all) {
					this.mode = 'pressed_all';
				}

				// otherwise, if we didn't hit anything, check if we touched the bottom of the bounding box
				else if (this.mode === 'drop' && this.finger.sprite.y >= this.bounds.bottom) {

					// looks like we did, so lets tell the finger to reset
					this.finger.sprite.y = this.bounds.bottom;
					this.mode = 'reset';
				}

				break;

			// the finger either hit a button, or the bottom of the screen, and is moving back up...
			case 'reset':

				// move the finger up
				// multiplying by the speed_modifier will make it move based on the monitor's refresh rate
				// (if we only use the ypeed, the finger would move faster on a 120fps monitor than a 60fps monitor)
				this.finger.sprite.y -= this.finger.yspeed * speed_multiplier;

				// check if the finger has made it all the way back up
				if (this.finger.sprite.y <= this.bounds.top) {

					// We're back at the top, go back to wait mode so it can start roaming again
					this.finger.sprite.y = this.bounds.top;
					this.mode = 'wait';

					// reset the finger sprite
					this.finger.sprite.setTexture(this.prefix + 'gameSprites', this.spriteKey.finger);
				}

				break;

			// player has pressed the final button!
			case 'pressed_all':

				// update the mode so nothing happens on the next update (TODO: make the hand do a thumbs up or something)
				this.mode = "endgame"

				// tell the framework that the player will win the game when the timer runs out
				// (the true tells the game to play the win animation early)
				PWGame.wonGame(true);
		}
	}
}