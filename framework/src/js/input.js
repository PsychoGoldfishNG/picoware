/** 
 * A class for managing user input 
 * 
 * this is globally accessible as 'PWGame.input'
 */
class PWInput {

	constructor() {
		// reference for functions/closures
		let _this = this;

		// initialize input states and callbacks
		this.reset();

		// key maps. All aliases are based on the GBC/GBA button names

		// keymap for people using arrows, A, S, Z & X
		this.keyMap_arrows = {
			up: 'ArrowUp',
			right: 'ArrowRight',
			down: 'ArrowDown',
			left: 'ArrowLeft',
			B: 'KeyS',
			A: 'KeyA',
			select: "KeyZ",
			start: "KeyX"
		};

		// keymap for people using WASD, O, P, K & L
		this.keyMap_wasd = {
			up: 'KeyW',
			right: 'KeyD',
			down: 'KeyS',
			left: 'KeyA',
			B: 'KeyO',
			A: 'KeyP',
			select: "KeyK",
			start: "KeyL"
		};

		// map keyboard input to arrows by default
		this.setKeyMap('arrows');

		// TODO - check for user-defined keymap

		// handle key press
		function onKeyDown(e) {
			for (const [input, key] of Object.entries(_this.keyMap)) {
				if (e.code == key) {
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
	}

	/**
	 * use a pre-set keyboard map
	 * @param {string} map - The name of the map to use ('arrows', 'wasd')
	 */
	setKeyMap(map) {
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
			B: false,
			A: false,
			select: false,
			start: false
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
	 * 		// make A and B buttons both work as an 'action' button
	 * 		PWGame.input.setAlias('action', ['A','B']); 
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

		console.log(this._aliases);
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

PWInput.PLAYMODE_GAMEPAD = 'gamepad';
PWInput.PLAYMODE_TOUCH = 'touch';