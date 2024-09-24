/** Make sure the namespace object exists */
if (typeof (transitions.psychogoldfish) === 'undefined') transitions.psychogoldfish = {};

/** @var PWFramework PWGame */

/** 
 * An emojis themed tranisition scene, by PsychoGoldfish
 * 
 * @extends PWTransitionScene
 */
transitions.psychogoldfish.emojis = class extends PWTransitionScene {

	constructor(config) {

		// note: this key needs to be in transitions.{team}.{transition} format.
		if (!config) config = {};
		if (!config.key) config.key = 'transitions.psychogoldfish.emojis';

		// needs to be called before we can reference 'this' anywhere in the constructor
		super(config);

		// ------ any values below here can be overridden by extended classes. see thwomp-stomp.js for an example ------ \\

		/** 
		 * Assets loaded from manifest files will be prefixed with the sceneClass value.
		 * This is to prevent naming collisions between different teams/games/transitions/etc.
		 * 
		 * For example, the manifest for this game has an image named "happyface.png"
		 * that is defined ad follows:
		 * 
		 *   {"key": "happyface", "image": "happyface.png"}
		 * 
		 * This gets imported with the cache key "transitions.psychogoldfish.emojis.happyface"
		 * 
		 * To make it easier to reference these assets, we'll set the prefix to a property.
		 */


		/** The prefix all our assets are using in their cache keys */
		this.prefix = config.key + ".";

		this.score = 0;

		this.setupComplete = false;
	}

	/**
	 * Set up everything we need when the scene starts
	 */
	create() {

		// This is half the screen size, used to center things easier
		var screenOffset = PWGame.screenSize / 2;

		// put our background container in the center of the screen
		this.bgContainer = this.add.container(screenOffset, screenOffset);

		// add all our sprites to the container, in the order we want them to display
		// Note: we're scaling most of our art to 50% of it's original size
		// This lets the game run at higher resolutions without making the art look super blurry

		// add the background brick image
		this.bricks = this.add.sprite(0, 0, this.prefix + 'emojiSprites', "brickhole");
		this.bgContainer.add(this.bricks);
		this.bricks.setScale(0.5);

		// add the "game over" text
		this.gameOver = this.add.sprite(0, 0, this.prefix + 'emojiSprites', "gameOver");
		this.bgContainer.add(this.gameOver);
		this.gameOver.setScale(0.5);
		this.gameOver.visible = false; // hide it until we need it

		// add the big emoji face -- he's gonna be happy by default :)
		this.face = this.add.sprite(0, 0, this.prefix + 'emojiSprites', "happyface");
		this.bgContainer.add(this.face);
		this.faceScale = 0.5;	// we'll use this value to reset the face to it's normal scale
		this.face.setScale(this.faceScale);
		this.faceWidth = this.face.displayWidth; // we'll use this value to reset the face to it's normal width

		// For the health bar, we need to get some information from the level object

		// positional info for rendering our health hearts
		let healthSize = 60;	// size to render hearts (it's 50% of the actual art size)
		let healthSpace = 2;	// space between hearts
		let margin = 42;		// margin from the edge of the screen

		// heart sprites will go here
		this.hearts = [];

		// we'll set this to true if we lost a health point since the last game
		// this will trigger the broken heart animation
		this.broken_heart = false;

		// render a heart for each health point we had at the start of the last game
		for (let i = 0; i < PWGame.level.lastHealth; i++) {

			// This is the default frame for the heart
			let frame = 'heart';

			// if we have less health now, render the last heart as broken, and note that we have a broken heart
			if (PWGame.level.lastHealth !== PWGame.level.health && i === PWGame.level.lastHealth - 1) {

				// This will render the broken heart frame
				frame = 'broken_heart';

				// note that we have a broken heart so the game loop can animate it later
				this.broken_heart = true;

				// Since we lost health, let's also make the emoji face angry
				this.face.setTexture(this.prefix + 'emojiSprites', (PWGame.level.health > 0 ? "angryface" : "sadface"));
			}

			// add the heart sprite to the scene
			let sprite = this.add.sprite(
				(margin + ((healthSize + healthSpace) * i)) - screenOffset, // the x position of the heart
				(margin) - screenOffset, 	// the y position of the heart
				this.prefix + "emojiSprites",  	// the spritesheet key
				frame						// the frame to display
			);
			this.bgContainer.add(sprite);

			// set the size of the heart
			sprite.displayWidth = healthSize;
			sprite.displayHeight = healthSize;

			// add the sprite to our hearts array so we can reference it later
			this.hearts.push(sprite);
		}

		// For the score counter, we also need to pull a bit of info from the level object

		// this is the actual, current score
		this.score = PWGame.level.score;

		// this is the score as it was before the last game started
		this.lastScore = PWGame.level.lastScore;

		// positional info for rendering our score numbers
		margin = 20;
		let numWidth = 45;  // these are 50% of the actual art size
		let numHeight = 70;
		let bottom = screenOffset - margin;
		let left = bottom - 10 - (numWidth * 2);

		// You could just use text to show the score, but I'm using a spritesheet here.
		// The advantage is that you could animate the numbers changing, which is a nice bit of visual feedback.
		// In this game, however, there is no fancy animaton happening
		this.scoreFrames = this.score.toString().split('');
		this.lastScoreFrames = this.lastScore.toString().split('');

		while (this.scoreFrames.length < 3) this.scoreFrames.unshift('0');
		while (this.lastScoreFrames.length < 3) this.lastScoreFrames.unshift('0');

		// our number sprites will go here
		this.numbers = [];

		// add the 3 number sprites to the scene
		for (let i = 0; i < 3; i++) {

			// When we add the numbers, we're using the lastScore value.
			// When startInfoView() is called, we'll switch to the current score, so there's a visual change
			// You could do a fancy animaton there as well (I am not)

			// add the sprite 
			let sprite = this.add.sprite(
				left + (numWidth * i),
				bottom - margin,
				this.prefix + "numberStrip",
				parseInt(this.lastScoreFrames[i])
			);
			this.bgContainer.add(sprite);

			// scale the art
			sprite.displayWidth = numWidth;
			sprite.displayHeight = numHeight;

			// add the sprite to our numbers array so we can reference it later
			this.numbers.push(sprite);
		}

		// add the sprite sheet with all the level phrases ("faster", "level up", etc...)
		this.levelPhrases = this.add.sprite(screenOffset, screenOffset);
		this.levelPhrases.setScale(0.5);
		this.levelPhrases.visible = false; // hide it for now

		// add the animations for the level phrases
		// (these are all in one spritesheet, with 2 frames each, to create a flashing text effect)

		// first, see if they've already been created, so we can avoid annoying console warnings
		if (!this.anims.exists(this.prefix + 'faster')) {

			// create the "faster" animation
			this.anims.create({
				key: this.prefix + 'faster',
				frames: this.anims.generateFrameNames(this.prefix + 'emojiSprites', { prefix: 'faster_', start: 1, end: 2 }),
				frameRate: 12,
				repeat: -1
			});

			// create the "level up" animation
			this.anims.create({
				key: this.prefix + 'levelUp',
				frames: this.anims.generateFrameNames(this.prefix + 'emojiSprites', { prefix: 'level_up_', start: 1, end: 2 }),
				frameRate: 12,
				repeat: -1
			});

			// create the "boss battle" animation
			this.anims.create({
				key: this.prefix + 'bossGame',
				frames: this.anims.generateFrameNames(this.prefix + 'emojiSprites', { prefix: 'boss_battle_', start: 1, end: 2 }),
				frameRate: 12,
				repeat: -1
			});
		}
	}

	/**
	 * Tell the scene what view to start at
	 * @param {string} transition_phase Will be one of the PHASE_ constants from PWTransitionScene
	 */
	enter(transition_phase) {

		let _this = this;

		transition_phase = PWTransitionScene.PHASE_ENTER;

		// let the update function know it can do stuff now
		this.active = true;

		// store the transition phase for our update method to refer to
		this.transition_phase = transition_phase;

		switch (transition_phase) {

			// we're comning in from a previous game, so we need a proper transition in.
			case PWTransitionScene.PHASE_ENTER:

				return this.startEnterView();

			// the level is starting from the beginning...
			case PWTransitionScene.PHASE_START:

				// the main game has a fade-from-black effect, so I'm gonna put a short delay here to account for that

				setTimeout(() => {
					// start the info view
					_this.startInfoView();
				}, 200);

				return;


			// the above cases are really the only ones that would ever be set by the framework directly
			// so if we get any other value, we'll just throw an error
			default:
				throw ("Unknown transition name: " + transition_phase);
		}
	}

	/**
	 * he main game loop for this scene
	 * @param {number} time      The timestamp when this update was called 
	 * @param {number} delta     The amount of time, in ms, since the last scene update
	 * @returns 
	 */
	update(time, delta) {

		// don't do anything until the framework calls our enter() method
		if (!this.active) return;

		/**
		 * This update function is called every time the player's monitor/screen refreshes.
		 * Most of the values in this game are based on a 60fps refresh rate, but because all
		 * screens can vary, we use this multiplier value to adjust various values so things
		 * all happen at the same pace we'd expect on a 60fps screen.
		 * 
		 * If the monitor IS running at exactly 60fps, this value will be 1
		 * If the monitor is running at 30fps, this value will be 0.5
		 * If the monitor is running at 120fps, this value will be 2, etc...
		 * 
		 * This value is also effected by even the smallest amounts of latency, so it will usually fluxuate a bit.
		 */
		let multiplier = PWGame.getDeltaMultiplier(delta, false);

		// run the correct update function based on the current transition phase
		switch (this.transition_phase) {

			// update the enter view
			case PWTransitionScene.PHASE_ENTER:
				return this.updateEnterView(delta, multiplier);

			// update the info view
			case PWTransitionScene.PHASE_INFO:
				return this.updateInfoView(delta, multiplier);

			// update the exit view
			case PWTransitionScene.PHASE_EXIT:
				return this.updateExitView(delta, multiplier);

			// update the exit view
			case PWTransitionScene.PHASE_GAME_OVER:
				return this.updateGameOverView(delta, multiplier);

			default:
				throw ("Unknown transition name: " + this.transition_phase);
		}
	}

	// ----------------- ENTER VIEW IS WHERE WE ZOOM THE BRICK BACKGROUND OVER THE LAST GAME ----------------- \\

	startEnterView() {
		// zoom way in so the bricks are mostly off-screen
		this.bgContainer.setScale(2);
		this.container_scale = 2.5;
		this.face.visible = false;
		this.face.displayWidth = 0;
		this.flipSpeed = this.faceWidth / 4;

		// if there's a game still being displayed behind this transition, we can have the framework stop it now
		PWGame.stopGame();
	}

	updateEnterView(delta, multiplier) {

		// the container are still zooming out...
		if (this.container_scale > 1) {

			// set the speed to move the container, using the multiplier to keep the speed consistent on any screen
			let zoom_speed = 0.125 * multiplier;
			this.container_scale -= zoom_speed;

			// make sure we don't overshoot the scale value
			if (this.container_scale <= 1) {
				this.container_scale = 1;

				// if we've reached the end of the zoom, we can show the face and let it start being animated
				this.face.visible = true;
			}

			// update the container scale
			this.bgContainer.setScale(this.container_scale);
		}

		else if (this.face.displayWidth < this.faceWidth) {

			// the face is still flipping back to the normal size
			this.face.displayWidth += this.flipSpeed * multiplier;

			// make sure we don't overshoot the size
			if (this.face.displayWidth >= this.faceWidth) {
				this.face.displayWidth = this.faceWidth;

				// and we are now good to start the next phase!
				this.startInfoView();
			}
		}
	}

	// ----------------- INFO VIEW IS WHERE WE SHOW/UPDATE THE SCORE COUNTER AND HEALTH HEARTS ----------------- \\

	/**
	 * Get everything set up for the info view
	 */
	startInfoView() {

		// this can be called from other views, so lets explicitly set the phase
		this.transition_phase = PWTransitionScene.PHASE_INFO;

		// make sure the face is the normal width and scale
		this.face.setScale(this.faceScale);
		this.face.displayWidth = this.faceWidth;

		// we may be coming here from a win or lose state, where we have a catface or angry face
		// we'll wait this many ms before we reset to the basic happy face
		this.face_reset_time = 1000;

		// when we're in this view, we want to do a little pulsing effect with the face.

		// we'll toggle the size of the face after this many ms
		this.pulse_at = 125;

		// these are the scales we'll be pulsing between
		this.puleses = [0.48, 0.5];

		// this will kep track of how many ms have passed in our pulse tracking
		this.pulse_time = 0;

		// if we cam in here from a lose state, the last heart in the health bar is going to fall off the screen
		// this is the starting movement speed for the heart (it's negative so it will jump up a tiny bit at first)
		this.heartSpeed = -5;

		// When we set up the score counter numbers, we used the value from the last game.
		// We'll switch to the current score now.  If the player got here from another phase
		// this will let them see the number change, which is nice bit of visual feedback.
		// You could do some fancy animation here to make it even more obvious, but I'm just doing a flat update.
		for (let i = 0; i < 3; i++) {
			this.numbers[i].setFrame(parseInt(this.scoreFrames[i]));
		}

		// if we have no health, we'll be moving to the game over view and on't need any of this...
		if (PWGame.level.health > 0) {

			// this is a new round, throw up the "faster" text
			if (PWGame.level.round !== PWGame.level.lastRound) {
				this.levelPhrases.visible = true;
				this.levelPhrases.anims.play(this.prefix + 'faster');
			}
			// the difficulty has increased, show the "level up" text
			else if (PWGame.level.difficulty > PWGame.level.lastDifficulty) {
				this.levelPhrases.visible = true;
				this.levelPhrases.anims.play(this.prefix + 'levelUp');
			}
		}
	}

	/**
	 * Upfates every frame while in the info view
	 * @param {number} delta 		The amount of time, in ms, since the last scene update
	 * @param {number} multiplier 	The number to multiply all time-effected values by
	 */
	updateInfoView(delta, multiplier) {

		let _this = this;

		// -------------------------------- PULSE EFFECT -------------------------------- \\

		// increase the timer for the pulse effect
		this.pulse_time += delta;

		// if the timer has exceeded the time we update the pulse effect, go ahead and handle that
		if (this.pulse_time > this.pulse_at) {

			// reset the pulse timer.  We're keeping any overflow ms to keep the pulse effect perfectly timed
			this.pulse_time -= this.pulse_at;

			// pull the first scale value from our pulses array
			let pulse_scale = this.puleses.shift();

			// update the scale of the face to the value we just pulled
			this.face.setScale(pulse_scale);

			// add the value back to the end of the array so we eventually cycle back to it
			this.puleses.push(pulse_scale);
		}

		// -------------------------------- ANIMATE HEALTH LOSS -------------------------------- \\

		// if the create function noted we have a broken heart, we need to animate it
		if (this.broken_heart) {

			// the heart we're animating will be the last one in the hearts array
			let heart = this.hearts[this.hearts.length - 1];

			// move the heart.  Note that we are multiplying the speed by the multiplier value so it moves just as fast on any screen
			heart.y += this.heartSpeed * multiplier;

			// if the heart is off the screen, we can say we don't have a broken heart anymore, wich will skip doing this animation next update.
			if (heart.y - 100 > PWGame.screenSize / 2) {
				this.broken_heart = false;
			}

			// get a gravity value.  (I want the heart to fall faster if it's moving down, and slower if it's moving up)
			let gravity = this.heartSpeed < 0 ? 0.5 : 1;

			// apply the gravity to the heart's speed. Again, we're using the multiplier to keep the changes consistent on any screen
			this.heartSpeed += gravity * multiplier;
		}

		// -------------------------------- RESET TO HAPPY FACE -------------------------------- \\

		// if we have time remaining on the face reset timer, we need to count it down
		if (this.face_reset_time > 0) {
			this.face_reset_time -= delta;

			// if the timer has expired, we can reset the face to the happy face!
			if (this.face_reset_time <= 0) {

				// we have no more health, this is game over folks....
				if (PWGame.level.health < 1) {
					this.startGameOverView();
				}

				// looks like we're ready to just play a new game!
				else {

					// the face can be happy again
					this.face.setTexture(this.prefix + 'emojiSprites', "happyface");

					// this will start the next game scene so we can see it behind our transition scene
					// if the game is coded properly, it won't start updating until PWGame.endTransition() is called
					// This needs to happen before the hint text is started, because the game scene
					// has the method the text is pulled from
					PWGame.startGame();

					// hide any level phrases we were showing
					this.levelPhrases.visible = false;

					// this is a great place to start the hint text for the next game too!
					PWGame.showHints(function () {
						_this.startExitView();
					});
				}
			}
		}
	}

	// ----------------- EXIT VIEW IS WHERE WE ZOOM THE BRICK BACKGROUND OUT TO THE NEXT GAME ----------------- \\

	startExitView() {

		this.transition_phase = PWTransitionScene.PHASE_EXIT;

		// we're going to zoom the bricks in so the hole fills the screen
		this.container_scale = 1;

		// set the face to the normal size
		this.face.setScale(this.faceScale);

		// this is the speed we'll be flipping the face width to zero
		this.flipSpeed = this.faceWidth / 4;

		// keep track of what size our face is being scaled to 
		// (can't rely on the displayWidth property for this since it can't be less than zero)
		this.faceResize = this.faceWidth;
	}

	updateExitView(delta, multiplier) {

		// the face is still visible...
		if (this.face.visible) {

			// squish the face down toward zero width
			this.faceResize -= this.flipSpeed * multiplier;

			// if we've reached the end of the flip, we can hide the face
			if (this.faceResize <= 0) {
				this.face.visible = false;
			}
			// otherwise, update the face width
			else {
				this.face.displayWidth = this.faceResize;
			}
		}
		// now we can soom the container in so the hole in the brickes fills the screen
		else if (this.container_scale < 2) {

			// set the speed to move the container, using the multiplier to keep the speed consistent on any screen
			let zoom_speed = 0.125 * multiplier;
			this.container_scale += zoom_speed;

			// make sure we don't overshoot the scale value
			if (this.container_scale >= 2) {
				this.container_scale = 2;

				PWGame.endTransition();
			}

			// update the container scale
			this.bgContainer.setScale(this.container_scale);
		}
	}

	// ----------------- GAME OVER VIEW IS ... GAME OVER VIEW... ----------------- \\

	startGameOverView() {

		this.transition_phase = PWTransitionScene.PHASE_GAME_OVER;

		// set the face to the sad face
		this.face.setTexture(this.prefix + 'emojiSprites', "sadface");

		this.gameOver.visible = true;

		this.faceFall = -20;
	}

	updateGameOverView(delta, multiplier) {

		// if the face is still visible, we need to make it fall off the screen
		if (this.face.y < PWGame.screenSize) {
			this.faceFall += 1 * multiplier;

			this.face.y += this.faceFall * multiplier;
		}
	}

}