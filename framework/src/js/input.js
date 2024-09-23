/** 
 * A class for managing user input 
 * 
 * this is globally accessible as 'PWGame.input'
 */
class PWInput {

	static UP = 'up';
	static DOWN = 'down';
	static LEFT = 'left';
	static RIGHT = 'right';
	static ACTION = 'action';
	static PAUSE = 'pause';

	static inputImages = {
		'wasd': 0,
		'arrows': 1,
		'gamepad': 2,
		'mouse': 3,
		'touch': 4
	};

	static #touchType = 'touch';
	static #gamepadType = 'gamepad';

	constructor() {
		// reference for functions/closures
		let _this = this;

		// initialize input states and callbacks
		this.reset();

		// key maps. All aliases are based on the GBC/GBA button names

		// keymap for people using arrows, A, S, Z & X
		this.keyMap_arrows = {
			up: 'ArrowUp',
			left: 'ArrowLeft',
			down: 'ArrowDown',
			right: 'ArrowRight',
			action: 'Space',
			pause: "Escape"
		};

		// keymap for people using WASD, O, P, K & L
		this.keyMap_wasd = {
			up: 'KeyW',
			left: 'KeyA',
			down: 'KeyS',
			right: 'KeyD',
			action: 'Space',
			pause: "Escape"
		};

		// map keyboard input to arrows by default
		this.setKeyMap('wasd');

		// TODO - check for user-defined keymap

		// handle key press
		function onKeyDown(e) {

			for (const [input, key] of Object.entries(_this.keyMap)) {
				if (e.code == key) {

					PWInput.#gamepadType = _this.keymapName === 'wasd' ? 'wasd' : 'arrows';
					PWInput.#touchType = 'mouse';

					_this.setInputState(input, true, e);
					break;
				}
			};
		}

		// handle key release
		function onKeyUp(e) {
			for (const [input, key] of Object.entries(_this.keyMap)) {
				if (e.code == key) {
					_this.setInputState(input, false, e);
					break;
				}
			};
		}

		// event listeners
		document.addEventListener('keydown', onKeyDown);
		document.addEventListener('keyup', onKeyUp);

		// trigger the action button on mouse clicks (desktop only)
		if (!BrowserHelper.isMobile()) {
			// add listeners for mouse buttons.  map left click to B and right click to A
			document.addEventListener('mousedown', function (e) {

				PWInput.#touchType = 'mouse';
				PWInput.#gamepadType = _this.keymapName === 'wasd' ? 'wasd' : 'arrows';

				if (e.button === 0) _this.setInputState('action', true, e);
			});

			document.addEventListener('mouseup', function (e) {
				if (e.button === 0) _this.setInputState('action', false, e);
			});
		}

		this.axisMap_standard = {
			horiz: 0,
			vert: 1
		};

		this.buttonMap_standard = {
			up: 12,
			right: 15,
			down: 13,
			left: 14,
			action: 0,
			pause: 9
		};

		var deadzone = 0.25;
		var deadRange = 1 - deadzone;
		var activeGamepad = {
			buttons: [],
			axes: []
		}

		function buttonChanged(i, value) {

			PWInput.#gamepadType = 'gamepad';

			for (const [input, key] of Object.entries(_this.buttonMap_standard)) {
				if (i == key) {
					_this.setInputState(input, value > 0);
					break;
				}
			}
		}

		function axisChanged(i, value) {

			PWInput.#gamepadType = 'gamepad';

			if (i === _this.axisMap_standard.horiz) {
				if (!value) {
					_this.setInputState('left', false);
					_this.setInputState('right', false);
					return;
				}
				let input = value > 0 ? 'right' : 'left';
				_this.setInputState(input, true);
			} else if (i === _this.axisMap_standard.vert) {
				if (!value) {
					_this.setInputState('up', false);
					_this.setInputState('down', false);
					return;
				}
				let input = value > 0 ? 'down' : 'up';
				_this.setInputState(input, true);
			}
		}

		function checkGamepad() {

			let gamepads = navigator.getGamepads();
			if (gamepads && gamepads[0]) {
				let gp = gamepads[0];
				let i;
				for (i = 0; i < gp.buttons.length; i++) {
					if (typeof (activeGamepad.buttons[i]) == 'undefined') activeGamepad.buttons[i] = 0;

					let value = Math.abs(gp.buttons[i].value) > deadzone ? gp.buttons[i].value : 0;
					if (value) {
						value = value > 0 ? value - deadzone : value + deadzone;
						value = value / deadRange;
					}

					if (value !== activeGamepad.buttons[i]) {
						buttonChanged(i, value);
						activeGamepad.buttons[i] = value;
					}

				}

				for (i = 0; i < gp.axes.length; i++) {
					if (typeof (activeGamepad.axes[i]) == 'undefined') activeGamepad.axes[i] = 0;

					let value = Math.abs(gp.axes[i]) > deadzone ? gp.axes[i] : 0;
					if (value) {
						value = value > 0 ? value - deadzone : value + deadzone;
						value = value / deadRange;
					}

					if (value !== activeGamepad.axes[i]) {
						axisChanged(i, value);
						activeGamepad.axes[i] = value;
					}
				}
			}
			requestAnimationFrame(checkGamepad);
		}
		requestAnimationFrame(checkGamepad);
	}

	getControlHint(type) {
		type = type === PWInput.TYPE_GAMEPAD ? PWInput.TYPE_GAMEPAD : PWInput.TYPE_TOUCH;

		if (type === PWInput.TYPE_GAMEPAD) {
			return PWInput.#gamepadType;
		}

		return PWInput.#touchType;
	}

	/**
	 * use a pre-set keyboard map
	 * @param {string} map - The name of the map to use ('arrows', 'wasd')
	 */
	setKeyMap(map) {
		this.keymapName = map;
		this.keyMap = {};
		for (const [input, key] of Object.entries(this['keyMap_' + map])) {
			this.mapKey(key, input);
		}
	}

	/**
	 * maps a key to an input
	 * @param {string} key - The keyboard key name
	 * @param {string} input - The input to map the key to
	 */
	mapKey(key, input) {
		this.keyMap[input] = key;
	}

	/**
	 * resets input states and callback events
	 */
	reset() {
		this.inputs = {
			up: false,
			right: false,
			down: false,
			left: false,
			action: false,
			pause: false
		};

		this.justChanged = {
			up: 0,
			right: 0,
			down: 0,
			left: 0,
			action: 0,
			pause: 0
		};

		this._onPress = {};
		this._onPressThisArg = {};

		this._onRelease = {};
		this._onReleaseThisArg = {};

		this._aliases = {};
		this._alias_map = {};
	}

	/**
	 * set an alias for multiple inputs. For example: 
	 * 
	 * 		// make up and and buttons both work as a 'jump' button
	 * 		PWGame.input.setAlias('jump', ['up','action']); 
	 * 
	 * @param {string} alias - The alias name
	 * @param {(Array.<string>|string)} inputs - The inputs you want to associate with the alias
	 */
	setAlias(alias, inputs) {
		if (typeof (inputs) == 'string') inputs = [inputs];
		let _this = this;

		inputs.forEach((input) => {
			if (!_this._aliases[input]) _this._aliases[input] = [];
			if (_this._aliases[input].indexOf(alias) < 0) {
				_this._aliases[input].push(alias);
			}
		});

		this._alias_map[alias] = inputs;
	}

	/**
	 * returns true if the provided input is down
	 * @param {string} input - The input to check
	 */
	isDown(input) {
		if (this._alias_map[input]) {

			for (var i in this._alias_map[input]) {
				if (this.inputs[this._alias_map[input][i]]) return true;
			}
			return false;
		}
		return typeof (this.inputs[input]) !== 'undefined' ? this.inputs[input] : false;
	}

	/**
	 * returns true if the provided input was just pressed
	 * @param {string} input - The input to check
	 * @returns {boolean}
	 */
	justPressed(input) {
		if (this._alias_map[input]) {
			for (var i in this._alias_map[input]) {
				if (this.justPressed(this._alias_map[input][i])) return true;
			}
			return false;
		}
		let was = this.isDown(input) && this.justChanged[input];
		if (this.justChanged[input]) clearTimeout(this.justChanged[input]);
		return was;
	}

	/**
	 * returns true if the provided input was just released
	 * @param {string} input - The input to check
	 * @returns {boolean}
	 */
	justReleased(input) {
		if (this._alias_map[input]) {
			for (var i in this._alias_map[input]) {
				if (this.justReleased(this._alias_map[input][i])) return true;
			}
			return false;
		}
		let was = !this.isDown(input) && this.justChanged[input];
		if (this.justChanged[input]) clearTimeout(this.justChanged[input]);
		return was;
	}

	/**
	 * triggers a callback function when an input is pressed
	 * @param {string} input - The input to check
	 * @param {function} callback - The callback function to trigger
	 * @param {object} thisarg - The object that will have the 'this' context in your callback
	 */
	onPress(input, callback, thisarg) {
		this._onPressThisArg[input] = typeof (thisarg) !== 'undefined' ? thisarg : this;
		this._onPress[input] = callback;
	}

	/**
	 * triggers a callback function when an input is released
	 * @param {string} input - The input to check
	 * @param {function} callback - The callback function to trigger
	 * @param {object} thisarg - The object that will have the 'this' context in your callback
	 */
	onRelease(input, callback, thisarg) {
		this._onReleaseThisArg[input] = typeof (thisarg) !== 'undefined' ? thisarg : this;
		this._onRelease[input] = callback;
	}

	/**
	 * sets the state of an input
	 * @param {string} input - The input to set
	 * @param {boolean} state - Set to true if input is down
	 * @param {event} event - Any input events used to trigger this
	 */
	setInputState(input, state, event) {

		this.checkInputState(input, state, event);

		if (this._aliases[input]) {
			let _this = this;
			this._aliases[input].forEach(function (k) {
				_this.checkInputState(k, state, event);
			});
		}
	}

	/**
	 * Checks for changes to input state and fires any events needed
	 * @param {string} input - The input to check
	 * @param {boolean} state - Set to true if input is down
	 * @param {event} event - Any input events used to trigger this
	 */
	checkInputState(input, state, event) {
		if (this.inputs[input] === state) return;

		this.inputs[input] = state;
		if (this.justChanged[input]) clearTimeout(this.justChanged[input]);
		this.justChanged[input] = setTimeout(() => { }, 100);

		if (state && this._onPress[input]) this._onPress[input].call(this._onPressThisArg[input], input, event);
		else if (!state && this._onRelease[input]) this._onRelease[input].call(this._onReleaseThisArg[input], input, event);
	}


	/**
	 * Update input states when triggered by touch UI
	 * @param {object} states - An object of input names and their states in touchscreen context
	 */
	onLayoutInputChanged(states) {
		let _this = this;

		// go through each input state from the touch controls and update the state data in this class
		for (const [key, state] of Object.entries(states)) {
			if (state !== _this.inputs[key]) {
				_this.setInputState(key, state, null);
			}
		};
	}

}

PWInput.TYPE_GAMEPAD = 'gamepad';
PWInput.TYPE_TOUCH = 'touch';