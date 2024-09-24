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

		/**
		 * alias of this instance that can be used in nested functions
		 * @type {bossgames.psychogoldfish.space-face}
		 */
		let _this = this;

		// set the background to super dark red
		this.cameras.main.setBackgroundColor(this.bgColor);

		this.createBackground();

		this.playerHeight = 0;
		this.playeWidth = 0;

		this.playerSprite = this.createPlayerSprite();

		this.deathSprite = this.createDeathSprite();
		this.deathSprite.setVisible(false);

		this.obstacles = {
			small: [],
			medium: [],
			large: []
		};

		this.obstacleQueue = {
			small: [],
			medium: [],
			large: []
		};

		this.baseObstacleSize = PWGame.level.difficulty;
		this.obstacleSizes = {
			small: this.baseObstacleSize + 1,
			medium: this.baseObstacleSize + 2,
			large: this.baseObstacleSize + 3
		};

		this.obstacleSpeed = 400 * PWGame.gameSpeed;
		this.playerSpeed = 400 * PWGame.gameSpeed;

		this.obstacleGap = this.obstacleSpeed * 60;

		this.obstacleWait = this.obstacleGap;

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

		this.dead = false;
		this.won = false;

		this.deadDelay = 500;
	}

	createBackground() {

		this.stars = [];

		// add stars smattered around the screen. randomly use one of three star sprites
		// and also randomly scale them to a value between 0.6 nd 0.15
		for (let i = 0; i < 100; i++) {
			let key = this.spriteKey['star' + Phaser.Math.Between(1, 3)];
			let star = this.add.sprite(Phaser.Math.Between(0, PWGame.screenSize * 2), Phaser.Math.Between(0, PWGame.screenSize), this.prefix + 'gameSprites', key);
			star.setScale(0.15 + (Math.random() * 0.45));

			// give it a random x velocity between -50 and -100 but disable collisions
			this.physics.world.enable(star);
			star.body.velocity.x = -50 - Math.random() * 50;
			star.body.velocity.y = 0;

			this.stars.push(star);
		}
	}

	createPlayerSprite() {
		let container = this.add.container(100, PWGame.screenSize / 2);

		let ship = this.add.sprite(0, 0, this.prefix + 'gameSprites', this.spriteKey.ship);
		ship.setScale(0.5);

		this.playerHeight = ship.displayHeight;
		this.playerWidth = ship.displayWidth;

		let flame = this.add.sprite(0, 0, this.prefix + 'gameSprites', this.spriteKey.flame + '1');
		flame.setScale(0.5);
		flame.x -= (ship.displayWidth + flame.displayWidth) / 2;

		// create the flame flicker animation
		if (!this.anims.exists(this.prefix + 'flameFlicker')) {

			this.anims.create({
				key: this.prefix + 'flameFlicker',
				frames: this.anims.generateFrameNames(this.prefix + 'gameSprites', { prefix: this.spriteKey.flame, start: 1, end: 3 }),
				frameRate: 10,
				repeat: -1
			});

		}

		flame.anims.play(this.prefix + 'flameFlicker');

		container.add(ship);
		container.add(flame);

		container.setSize(ship.displayWidth - 30, ship.displayHeight - 30);
		this.physics.world.enable(container);

		return container;
	}

	createDeathSprite() {
		let sprite = this.add.sprite(0, 0, this.prefix + 'gameSprites', this.spriteKey.explode + '1');

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

		sprite.setScale(0.5);

		return sprite;
	}

	addObstacle(size) {

		let obstacle = this.getObstacle(size);

		let top = obstacle.displayHeight / 2;
		let bottom = PWGame.screenSize - (obstacle.displayHeight / 2);
		let range = bottom - top;
		let rows = range / obstacle.displayHeight;

		obstacle.y = Math.round(Math.random() * rows) * (obstacle.displayHeight) + top;
		obstacle.x = PWGame.screenSize + (obstacle.displayWidth / 2);

		let yVelocity = this.obstacleSizes[size] * 30;
		obstacle.body.velocity.y = Math.random() > 0.5 ? yVelocity : -yVelocity;

		return obstacle;
	}

	removeObstacle(obstacle, size) {

		obstacle.setActive(false);
		obstacle.setVisible(false);

		this.obstacleQueue[size].push(obstacle);
	}

	getObstacle(size) {

		var obstacle;

		if (this.obstacleQueue[size].length > 0) {
			obstacle = this.obstacleQueue[size].shift();
		}
		else {
			let key = this.spriteKey['rock' + this.obstacleSizes[size]];
			obstacle = this.add.sprite(PWGame.screenSize, 0, this.prefix + 'gameSprites', key);
			obstacle.setScale(0.5);
			this.physics.world.enable(obstacle);
			obstacle.body.velocity.x = -this.obstacleSpeed;

			this.obstacles[size].push(obstacle);
		}

		obstacle.setActive(true);
		obstacle.setVisible(true);


		return obstacle;
	}

	update(timestamp, delta) {

		if (!PWGame.isReady()) return;

		let modifer = PWGame.getDeltaMultiplier(delta);

		this.updateBackground(delta, modifer);

		if (!this.won) {

			if (!this.dead) {
				this.updatePlayer(delta, modifer);
			} else if (this.deadDelay > 0) {
				this.deadDelay -= delta;

				if (this.deadDelay <= 0) {
					PWGame.level.gameCompleted(false);
				}
			}

			this.updateObstacles(delta, modifer);

		} else {
			this.updateWinSequence(delta, modifer);
		}
	}

	updateBackground(delta, modifer) {
		this.stars.forEach(star => {
			if (star.x < -star.displayWidth) {
				star.x = PWGame.screenSize * 2;
			}

			if (this.won) {
				star.displayWidth += modifer * 5;
				star.body.velocity.x -= modifer * 20;
			}
		});
	}

	updateObstacles(delta, modifer) {

		if (this.obstacleMap.length > 0) {
			this.obstacleWait -= this.obstacleSpeed * modifer;

			if (this.obstacleWait <= 0) {
				let obstacle = this.addObstacle(this.obstacleMap.shift());
				this.obstacleWait += this.obstacleGap + obstacle.displayWidth;
			}
		}

		// we have no more obstacles to add
		else {

			// if all of our obstacles have been moved offscreen they will be in the queue
			// so let's see if the counts match up to know if we've won
			let match = true;
			for (let i in this.obstacles) {
				if (this.obstacles[i].length !== this.obstacleQueue[i].length) {
					match = false;
					break;
				}
			}

			if (match) {
				this.startWinSequence();
			}
		}

		if (!this.won) {

			for (let size in this.obstacles) {
				for (let i = 0; i < this.obstacles[size].length; i++) {
					let obstacle = this.obstacles[size][i];

					if (obstacle.active) {

						// bounce opp top and bottom of screen
						if (obstacle.body.velocity.y < 0 && obstacle.y < obstacle.displayHeight / 2) {
							obstacle.y = obstacle.displayHeight / 2;
							obstacle.body.velocity.y *= -1;
						} else if (obstacle.body.velocity.y > 0 && obstacle.y > PWGame.screenSize - obstacle.displayHeight / 2) {
							obstacle.y = PWGame.screenSize - obstacle.displayHeight / 2;
							obstacle.body.velocity.y *= -1;
						}
					}

					if (obstacle.active && obstacle.x < -obstacle.displayWidth / 2) {
						this.removeObstacle(obstacle, size);
					} else if (!this.dead && this.physics.overlap(this.playerSprite, obstacle)) {
						this.killPlayer();
					}
				}
			}
		}
	}

	killPlayer() {
		this.dead = true;
		this.playerSprite.body.velocity.y = 0;
		this.playerSprite.body.velocity.x = -0;
		this.playerSprite.setVisible(false);

		this.deathSprite.x = this.playerSprite.x;
		this.deathSprite.y = this.playerSprite.y;
		this.deathSprite.setVisible(true);
		this.deathSprite.anims.play(this.prefix + 'explode');

		PWGame.lostGame();
	}

	startWinSequence() {
		this.won = true;
		this.playerSprite.body.velocity.y = 0;

		let warp = this.add.sprite(PWGame.screenSize / 2, 0, this.prefix + 'gameSprites', 'warp');
		let speed = this.add.sprite(PWGame.screenSize / 2, 0, this.prefix + 'gameSprites', 'speed');

		warp.setScale(0.5);
		speed.setScale(0.5);

		warp.y = warp.displayHeight * 0.75;
		speed.y = PWGame.screenSize - (speed.displayHeight * 0.75);

		this.warpDelay = 500;
	}

	updateWinSequence(delta, modifer) {

		if (this.warpDelay > 0) {
			this.warpDelay -= delta;
		} else if (this.playerSprite.x < PWGame.screenSize + this.playerWidth) {
			this.playerSprite.body.velocity.x = this.playerSpeed;
		} else {
			PWGame.level.gameCompleted(true);
		}
	}

	updatePlayer(delta, modifer) {

		if (PWGame.input.isDown(PWInput.UP)) {
			this.playerSprite.body.velocity.y = -this.playerSpeed;
		}
		else if (PWGame.input.isDown(PWInput.DOWN)) {
			this.playerSprite.body.velocity.y = this.playerSpeed;
		} else {
			this.playerSprite.body.velocity.y = 0;
		}

		if (this.playerSprite.y < this.playerHeight / 2) {
			this.playerSprite.y = this.playerHeight / 2;
			this.playerSprite.body.velocity.y = 0;
		}

		if (this.playerSprite.y > PWGame.screenSize - this.playerHeight / 2) {
			this.playerSprite.y = PWGame.screenSize - this.playerHeight / 2;
			this.playerSprite.body.velocity.y = 0;
		}
	}
}