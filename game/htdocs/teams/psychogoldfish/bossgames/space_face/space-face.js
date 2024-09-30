/** Make sure the namespace object exists */
if (typeof (bossgames.psychogoldfish) === 'undefined') bossgames.psychogoldfish = {};

/** @var PWFramework PWGame */

/** 
 * A 'space avoider' boss game, by PsychoGoldfish 
 * 
 * Difficulty: EASY
 * 
 * Move a ship up and down to avoid asteroids until the area is clear and you win
 * 
 * @extends Phaser.Scene
 */
bossgames.psychogoldfish.space_face = class extends Phaser.Scene {

	/**
	 * register this class key with Phaser using bossgames.{team_or_author_name}.{game_name} format.
	 */
	constructor(config) {

		// if we don't have a config object, create one
		if (!config) config = {};

		// make sure we have a cache key (needs to be in bossgames.{team}.{microgame} format).
		if (!config.key) config.key = 'bossgames.psychogoldfish.space_face';

		// call the Phaser.Scene class constructor
		// (needs to be called before we can reference 'this' anywhere in the constructor)
		super(config);

		// ------ any values below here can be overridden by extended classes. ------ \\

		// prefix for our textures and such
		this.prefix = config.key + '.';

		// the background color of the game
		this.bgColor = 0x000000;

		// the key values for our sprites
		this.spriteKey = {
			ship: 'ship',
			rock1: 'rock1',
			rock2: 'rock2',
			rock3: 'rock3',
			rock4: 'rock4',
			rock5: 'rock5',
			star1: 'star1',
			star2: 'star2',
			star3: 'star3',

			// these are prefixes for animation sequences
			flame: 'flame_',
			explode: 'explode_',
		};
	}

	/**
	 * @returns {string} The text to display as a hint to the player
	 */
	getHintText() {
		return "Don't Crash!";
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

		// a reference to the current scene that can be used in nested functions/closures/etc
		let _this = this;

		// set the background to super dark red
		this.createBackground();

		// Set the world bounds with a bit of padding on the top and bottom.  
		// Also enable world bounds collision on the top and bottom.
		this.physics.world.setBounds(0, 15, PWGame.screenSize, PWGame.screenSize - 30, false, false, true, true);

		// create the player sprite
		this.playerSprite = this.createPlayerSprite();

		// create the player's death sprite and hide it
		this.deathSprite = this.createDeathSprite();
		this.deathSprite.setVisible(false);

		// create a physics-enabled group for our obstacles
		this.obstacleGroup = this.physics.add.group({ collideWorldBounds: true, bounceY: 1 });

		// we'll use this to reference obstacles by their size
		this.obstacles = {
			small: [],
			medium: [],
			large: []
		};

		// when obstacles are removed from the screen, they'll be added to this queue so they can get reused
		this.obstacleQueue = {
			small: [],
			medium: [],
			large: []
		};

		// use the game difficulty to modify what sprites we use for the different sizes of obstacles
		this.baseObstacleSize = PWGame.level.difficulty;
		this.obstacleSizes = {
			small: this.baseObstacleSize + 1,
			medium: this.baseObstacleSize + 2,
			large: this.baseObstacleSize + 3
		};

		// note: Phaser velocity is in pixels per second, relative to the game's stage size

		// the x velocity our obstcales will move at
		this.obstacleSpeed = 400 * PWGame.gameSpeed;

		// how fast the player can move up and down
		this.playerSpeed = 400 * PWGame.gameSpeed;

		// how long to wait (in ms) before adding a new obstacle
		this.obstacleDelay = 1000;

		// this will count down to zero, then we'll add a new obstacle
		this.obstacleWait = this.obstacleDelay;

		// this is the pattern we'll use for generating obstacles
		this.obstacleMap = [
			'small',
			'small',
			'medium',
			'small',
			'medium',
			'small',
			'medium',
			'medium',
			'small',
			'medium',
			'medium',
			'medium',
			'large',
			'medium',
			'medium',
			'large',
			'large',
			'medium',
			'large',
			'large',
			'medium',
			'large',
			'large',
			'medium',
			'large',
			'large',
			'large',
			'large',
			'large',
			'large',
			'large',
			'large',
			'large'
		];

		this.obstacleMap = ['small'];

		// is the player dead?
		this.dead = false;

		// have they won this game?
		this.won = false;

		// how long to show the player's death (in ms) before ending the game
		this.deadDelay = 500;

		// how long to wait (in ms) before ending the game after the player wins
		this.winDelay = 1000;
	}

	//--------------------------------------- Sprite Creation ---------------------------------------\\

	/**
	 * Create the background for the game (sets the color and adds our star sprites)
	 */
	createBackground() {

		// set the background color
		this.cameras.main.setBackgroundColor(this.bgColor);

		// create an array to hold our star sprites
		this.stars = this.physics.add.group();

		// generate 100 stars of varying sizes, colros and speeds
		for (let i = 0; i < 100; i++) {

			// pick a random star sprite key
			let key = this.spriteKey['star' + Phaser.Math.Between(1, 3)];

			// create the star sprite in a random location
			let star = this.stars.create(Phaser.Math.Between(0, PWGame.screenSize * 2), Phaser.Math.Between(0, PWGame.screenSize), this.prefix + 'gameSprites', key);

			// set the star's scale to a random value between 0.15 and 0.6
			star.setScale(0.15 + (Math.random() * 0.45));

			// give the star a random x velocity
			this.physics.world.enable(star);
			star.body.velocity.x = -50 - Math.random() * 50;
		}
	}

	/**
	 * Create the player sprite
	 * @returns {Phaser.GameObjects.Container} The player sprite container
	 */
	createPlayerSprite() {

		// create a container to hold the ship and flame sprites
		let container = this.add.container(100, PWGame.screenSize / 2);

		// create the ship sprite and scale it down
		let ship = this.add.sprite(0, 0, this.prefix + 'gameSprites', this.spriteKey.ship);
		ship.setScale(0.5);

		// create the flame sprite and scale it down
		let flame = this.add.sprite(0, 0, this.prefix + 'gameSprites', this.spriteKey.flame + '1');
		flame.setScale(0.5);

		// position the flame behind the ship
		flame.x -= (ship.displayWidth + flame.displayWidth) / 2;

		// create the flame flicker animation

		// make sure the animation doesn't already exist first, though
		if (!this.anims.exists(this.prefix + 'flameFlicker')) {

			// okay, make the animation for realz
			this.anims.create({
				key: this.prefix + 'flameFlicker',
				frames: this.anims.generateFrameNames(this.prefix + 'gameSprites', { prefix: this.spriteKey.flame, start: 1, end: 3 }),
				frameRate: 10,
				repeat: -1
			});

		}

		// play the flame flicker animation
		flame.anims.play(this.prefix + 'flameFlicker');

		// add the ship and flame to the container
		container.add(ship);
		container.add(flame);

		// set the container's hitbox and enable physics on it
		container.setSize(ship.displayWidth - 30, ship.displayHeight - 30);
		this.physics.world.enable(container);

		// make the player sprite respect the world bounds
		container.body.setCollideWorldBounds(true);

		return container;
	}

	/**
	 * Create the player's death sprite.
	 * @returns {Phaser.GameObjects.Sprite} The death sprite
	 */
	createDeathSprite() {

		// create the death sprite
		let sprite = this.add.sprite(0, 0, this.prefix + 'gameSprites', this.spriteKey.explode + '1');

		// check if the explosion animation exists, and if not, create it now
		if (!this.anims.exists(this.prefix + 'explode')) {

			// create the "explode" animation
			this.anims.create({
				key: this.prefix + 'explode',
				frames: this.anims.generateFrameNames(this.prefix + 'gameSprites', { prefix: this.spriteKey.explode, start: 1, end: 3 }),
				frameRate: 3,
				repeat: 0,
				hideOnComplete: true
			});
		}

		// scale the sprite down
		sprite.setScale(0.5);

		return sprite;
	}

	/**
	 * Gets an obstacle sprite, either from the queue or by creating a new one if the queue is empty
	 * @param {string} size The size of the obstacle to get
	 * @returns {Phaser.GameObjects.Sprite}
	 */
	getObstacle(size) {

		var obstacle;

		// Check the queue for an obstacle of the given size
		if (this.obstacleQueue[size].length > 0) {

			// If we have one, shift it off the queue
			obstacle = this.obstacleQueue[size].shift();
		}
		// Otherwise, create a new one
		else {

			// get the key for the sprite based on the size
			let key = this.spriteKey['rock' + this.obstacleSizes[size]];

			// create the obstacle sprite and scale it down
			obstacle = this.obstacleGroup.create(PWGame.screenSize, 0, this.prefix + 'gameSprites', key);
			obstacle.setScale(0.5);

			// set the obstacle's horizontal velocity
			obstacle.body.velocity.x = -this.obstacleSpeed;

			// add the obstacle to the appropriate size array
			this.obstacles[size].push(obstacle);
		}

		// make sure the obstacle is active and visible
		obstacle.setActive(true);
		obstacle.setVisible(true);

		return obstacle;
	}

	//--------------------------------------- Game Logic ---------------------------------------\\

	/**
	 * Adds an obstacle to the scene
	 * @param {string} size The size of the obstacle to add
	 */
	addObstacle(size) {

		// get the actual sprite
		let obstacle = this.getObstacle(size);

		// figure out where the obstacle can be placed:

		// the highest point the obstacle can be placed
		let top = obstacle.displayHeight / 2;

		// the lowest point the obstacle can be placed
		let bottom = PWGame.screenSize - (obstacle.displayHeight / 2);

		// the range of possible y values the obstacle can be placed in
		let range = bottom - top;

		// based on the obstacle's size, figure out how many rows it can fit into
		let rows = range / obstacle.displayHeight;

		// place the obstacle at a random y value using the rows as a sort of grid
		obstacle.y = Math.round(Math.random() * rows) * (obstacle.displayHeight) + top;

		// make sure the obstacle is offscreen to the right
		obstacle.x = PWGame.screenSize + (obstacle.displayWidth / 2);

		// the larger an obstacle is, the faster it moves horizontally
		let yVelocity = this.obstacleSizes[size] * 45;

		// apply the vertical velocity in a random direction
		obstacle.body.velocity.y = Math.random() > 0.5 ? yVelocity : -yVelocity;
	}

	/**
	 * Removes an obstacle from the scene and adds it to the queue for reuse
	 * @param {Phaser.GameObjects.Sprite} obstacle The obstacle to remove
	 * @param {string} size The size of the obstacle to remove
	 */
	removeObstacle(obstacle, size) {

		// make sure the obstacle is no longer active or visible
		obstacle.setActive(false);
		obstacle.setVisible(false);

		// put the obstacle into the queue for reuse
		this.obstacleQueue[size].push(obstacle);
	}

	/**
	 * Update loop for the game
	 * @param {number} timestamp The current timestamp
	 * @param {number} delta The time since the last update
	 */
	update(timestamp, delta) {

		// if the game isn't ready, don't do anything
		if (!PWGame.isReady()) return;

		// get a multiplier to adjust the various speeds based on the delta time
		// note: this also updates the framework's internal timer
		let modifer = PWGame.getDeltaMultiplier(delta);

		// handle moving out stars in the background
		this.updateBackground(delta, modifer);

		// if the game isn't over, update the player and obstacles
		if (!this.won) {

			// if we're not dead, handle moving the player
			if (!this.dead) {
				this.updatePlayer(delta, modifer);
			}
			// if we are dead, count down the delay before ending the game
			else if (this.deadDelay > 0) {
				this.deadDelay -= delta;

				if (this.deadDelay <= 0) {
					PWGame.level.gameCompleted(false);
				}
			}

			// update the obstacles
			this.updateObstacles(delta, modifer);

		}
		// we won the game, so handle the win sequence
		else {
			this.updateWinSequence(delta, modifer);
		}
	}

	/**
	 * Handle moving the stars in the background
	 * @param {number} delta ms since the last update
	 * @param {number} modifer A number to modify speeds by, based on the delta time and game speed
	 */
	updateBackground(delta, modifer) {

		// if the stars go off-screen, wrap them around to the other side
		this.physics.world.wrap(this.stars, 20);

		// if we won, stretch the stars out and speed them up for a cool warp-speed effect
		if (this.won) {
			this.stars.children.iterate(star => {
				star.displayWidth += modifer * 5;
				star.body.velocity.x -= modifer * 20;
			});
		}
	}

	/**
	 * Handle updating the obstacles and checking for collisions
	 * @param {number} delta ms since the last update
	 * @param {number} modifer A number to modify speeds by, based on the delta time and game speed
	 */
	updateObstacles(delta, modifer) {

		// these don't need to be updated if the player already won
		if (this.won) return;

		// a reference to the current scene that can be used in nested functions/closures/etc
		let _this = this;

		// we still have obstacles to add...
		if (this.obstacleMap.length > 0) {

			// count down to adding a new obstacle
			this.obstacleWait -= delta;
			if (this.obstacleWait <= 0) {

				// add the next obstacle in the map and reset the wait time
				this.addObstacle(this.obstacleMap.shift());
				this.obstacleWait += this.obstacleDelay;
			}
		}

		// we have no more obstacles to add
		else {

			// if we're dead, we don't want to check any of this and accidentally trigger a win
			if (this.dead) return;

			// before we can end the game, we need to check if there are any obstacles left on screen

			// Let's assume they have until we find one that's still active
			let allObstaclesRemoved = true;

			// loop through our different size arrays
			for (let i in this.obstacles) {

				// compare the length of the active obstacles to the length of the queue
				// if they are different, there are still obstacles on screen
				if (this.obstacles[i].length !== this.obstacleQueue[i].length) {
					allObstaclesRemoved = false;
					break;
				}
			}

			// if all the obstacles are gone, start the win sequence
			if (allObstaclesRemoved) {
				this.startWinSequence();
				return;
			}
		}

		// if we get here, we can check for collisions and remove offscreen obstacles

		// loop through our different size arrays
		for (let size in this.obstacles) {

			// loop through each obstacle in the size array
			this.obstacles[size].forEach(obstacle => {

				// first, check if the obstacle is offscreen to the left and remove it if necessary
				if (obstacle.active && obstacle.x < -obstacle.displayWidth / 2) {
					_this.removeObstacle(obstacle, size);

				}
				// otherwise, check for collisions with the player (assuming the player isn't dead)
				else if (!_this.dead && _this.physics.overlap(_this.playerSprite, obstacle)) {
					_this.killPlayer();
				}

			});
		}
	}

	/**
	 * Handle updating the player ship
	 * @param {number} delta ms since the last update
	 * @param {number} modifer A number to modify speeds by, based on the delta time and game speed
	 */
	updatePlayer(delta, modifer) {

		// update the y velocity of the player based on input

		// going up
		if (PWGame.input.isDown(PWInput.UP)) {
			this.playerSprite.body.velocity.y = -this.playerSpeed;
		}
		// going down
		else if (PWGame.input.isDown(PWInput.DOWN)) {
			this.playerSprite.body.velocity.y = this.playerSpeed;
		}
		// standing still
		else {
			this.playerSprite.body.velocity.y = 0;
		}

	}

	/**
	 * Handle updating the win sequence
	 * @param {number} delta ms since the last update
	 * @param {number} modifer A number to modify speeds by, based on the delta time and game speed
	 */
	updateWinSequence(delta, modifer) {

		// count down the delay time before ending the game
		if (this.winDelay > 0) {
			this.winDelay -= delta;

		}
		// if the delay is over, move the sprite to the right until it's offscreen
		else if (this.playerSprite.x < PWGame.screenSize + this.playerWidth) {
			this.playerSprite.body.velocity.x = this.playerSpeed;
		}
		// once the sprite is offscreen, end the game
		else {
			// note: this starts the transition scene, so this scene will still be onscreen for a tad longer
			PWGame.level.gameCompleted(true);
		}
	}

	//--------------------------------------- Game Over ---------------------------------------\\


	/**
	 * Called when the player crashes into an obstacle
	 * Marks the game as lost and show the player's death animation
	 */
	killPlayer() {

		// we are dead.. :(
		this.dead = true;

		// stop the player's vertical movement and hide them
		this.playerSprite.body.velocity.y = 0;
		this.playerSprite.body.velocity.x = -0;
		this.playerSprite.setVisible(false);

		// move the death sprite to the player's location and show it
		this.deathSprite.x = this.playerSprite.x;
		this.deathSprite.y = this.playerSprite.y;
		this.deathSprite.setVisible(true);

		// play the death animation
		this.deathSprite.anims.play(this.prefix + 'explode');

		// tell the framework the player lost the game (this doesn't actually end the game)
		PWGame.lostGame();
	}

	/**
	 * Called when the player wins the game
	 * Marks the game as won and starts the win sequence
	 */
	startWinSequence() {

		// a winner is you!
		this.won = true;

		// stop the player's vertical movement, we're on autopilot now
		this.playerSprite.body.velocity.y = 0;

		// add the "WARP SPEED" text to the center of screen and scale it down
		let warp = this.add.sprite(PWGame.screenSize / 2, 0, this.prefix + 'gameSprites', 'warp');
		let speed = this.add.sprite(PWGame.screenSize / 2, 0, this.prefix + 'gameSprites', 'speed');
		warp.setScale(0.5);
		speed.setScale(0.5);

		// put the WARP part at the top of the screen and the SPEED part at the bottom
		warp.y = warp.displayHeight * 0.75;
		speed.y = PWGame.screenSize - (speed.displayHeight * 0.75);
	}
}