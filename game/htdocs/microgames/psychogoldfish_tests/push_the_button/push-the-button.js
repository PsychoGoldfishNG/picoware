/** Make sure the namespace object exists */
if (typeof(microgames.psychogoldfish_tests) === 'undefined') microgames.psychogoldfish_tests = {};

/** A 'push the button' microgame, by PsychoGoldfish */
microgames.psychogoldfish_tests.push_the_button = class extends Phaser.Scene {

	/**
	 * register this class key with Phaser using microgames.{team_or_author_name}.{game_name} format.
	 */
	constructor() 
	{
		// note: this key needs to match the file path to this game's manifest.json file.
		super({key: 'microgames.psychogoldfish_tests.push_the_button'});
	}

	/**
	 * Called when the game is ready to start.
	 */
	create() 
	{
		// alias of this instance that can be used in nested functions
		let _this = this;

		/** 
		 * Assets loaded from this game's manifest.json file will all be imported with this prefix. 
		 * For example, in the images array:
		 * 
		 *   {"key": "button_up",		"image": "button_up.png"}
		 * 
		 * Will be imported as "microgames.psychogoldfish_tests.push_the_button.button_up"
		 */
		this.prefix = 'microgames.psychogoldfish_tests.push_the_button.'; 

		// set the background to super dark red
		this.cameras.main.setBackgroundColor(0x220000);
		
		/** 
		 * current game mode. 
		 * 'wait' = waiting for user input
		 * 'press' = finger is moving down
		 * 'reset' = finger is moving back up
		 * 'pressed' = finger is on buton 
		 */
		this.mode = 'wait';

		/** The button object */
		this.button = {
			/** the button sprite */
			sprite: this.add.sprite(PWGame.screensize/2, 515, this.prefix+'button_up'),

			/** the top of the button's hit box */
			top: 390,

			/** the left side of the button's hit box */
			left: 205,

			/** the right side of the button's hit box */
			right: 365
		};

		/** The finger object */
		this.finger = {

			/** The finger sprite */
			sprite: this.add.sprite(PWGame.screensize/2 + 140, 160, this.prefix+'finger'),

			/** The width of the finger's hitbox */
			width: 84,

			/** The number of pixels the finger would move per frame at 60fps (when going side to side) */
			xspeed: 10,

			/** The number of pixels the finger would move per frame at 60fps (when going up and down) */
			yspeed: 16,

			// ** the horizontal direction the finger is moving (-1 = left, 1 = right) */
			xdir: Math.random() < 0.5 ? 1 : -1,
		};
		
		// set the button's origin to the bottom center
		this.button.sprite.setOrigin(0.5,1);

		// scale the sprites to 50%.  If the overal game gets streteched above 720p, the sprites will still look sharp!
		this.button.sprite.scaleX = 0.5;
		this.button.sprite.scaleY = 0.5;
		this.finger.sprite.scaleX = 0.5;
		this.finger.sprite.scaleY = 0.5;
		
		/** bounding box for the finger */
		this.bounds = {
			left: this.finger.sprite.displayWidth/2,
			right: PWGame.screensize - (this.finger.sprite.displayWidth/2),
			top: this.finger.sprite.y,
			bottom: 420
		};

		// tell the input controller that there are 3 inputs that will work as 'press'
		PWGame.input.setAlias('press',['down','A','B']);

		// when one of the 'press' inputs are pushed...
		PWGame.input.onPress('press', function() 
		{
			// switch the game to 'press' mode if it is currently in wait mode
			if (_this.mode === 'wait') _this.mode = 'press';
		});

		// tell the framework this game is ready to start
	}

	/**
	 * The main game loop
	 * @param {number} timestamp - The current timestamp on the player's local machine
	 * @param {number} delta - The number of microseconds that have elapsed since the last update event
	 */
	update(timestamp, delta)
	{
		// Check with the framework to see if we can actually run the game yet (It may be paused or doing a transition animation)
		if (!PWGame.isReady()) return;

		/**
		 * A value that accounts for what speed the game is running, and how much time has passed between, assuming a target speed of 60fps.
		 * If the game is running at normal speed, and the user's refresh rate is 60fps, this will return 1
		 * If the game is running at normal speed, and the user's refresh rate is 120fps, this will return 0.5
		 * @type {number}
		 */
		var speed_multiplier = PWGame.getDeltaMultiplier(delta);

		// check the game mode and update accordingly...
		switch(this.mode) {

			// finger is moving side to side, waiting for the player to press a button
			case 'wait':

				// move the finger my multiplying it's target x speed by our delta multipler
				// if the user's refresh rate is 120fps, the finger would move 8px at normal speed
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

			// player pressed a button and the finger id moving down now
			case 'press':

				// move the finger my multiplying it's target y speed by our delta multipler
				// if the user's refresh rate is 120fps, the finger would move 15px at normal speed
				this.finger.sprite.y += this.finger.yspeed * speed_multiplier;


				// check if the finger has hit the button
				if (this.finger.sprite.y >= this.button.top && this.finger.sprite.x >= this.button.left && this.finger.sprite.x <= this.button.right) {

					// put the finger sprite at the top of the button, and update the button's texture to the down state
					this.finger.sprite.y = this.button.top;
					this.button.sprite.setTexture(this.prefix+'button_down');

					// update the game mode so it'll trigger the win screen next update
					this.mode = 'pressed';

				// check if the finger has hit the bottom of the screen
				} else if (this.finger.sprite.y >= this.bounds.bottom) {

					// put the finger on the bottom of the screen and set the mode to 'reset' so it will move back up
					this.finger.sprite.y = this.bounds.bottom;
					this.mode = 'reset';
				}

				break;

			// player missed the button and the finger is now moving back up
			case 'reset':

				// move the finger my multiplying it's target y speed by our delta multipler
				this.finger.sprite.y -= this.finger.yspeed * speed_multiplier;

				// check if the finger has made it all the way back up
				if (this.finger.sprite.y <= this.bounds.top) {

					// put the finger at it's original y position and go back to 'wait' mode so the finger can start going side to side again
					this.finger.sprite.y = this.bounds.top;
					this.mode = 'wait';
				}

				break;

			// player has pressed the button!
			case 'pressed':

				// update the mode so nothing happens on the next update and tell the framework that the player won
				this.mode = "endgame"
				PWGame.wonGame();
		}
	}
}