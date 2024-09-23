/** Handles setting up the layout for different devices and orientations, and on-screen inputs **/
const GameWrapper = {

	/**
	 * Used when current view is the game
	 * @type {string}
	 * @constant
	 */
	VIEW_GAME: 'game',

	/** 
	 * Current layout view, should match one of the VIEW_ constants 
	 * @type {string}
	 */
	view: 'game',

	/** 
	 * size of the gameplay screen when scales to 100% 
	 * @type {number}
	 */
	screenSize: 524,

	/** 
	 * Config for desktop view 
	 * @type {object}
	 */
	layoutDesktop: {

		/** 
		 * width of layout at 100% 
		 * @type {number}
		 */
		baseWidth: 960,

		/** 
		 * height of layout at 100% 
		 * @type {number}
		 */
		baseHeight: 540,

		/** 
		 * distance of screen from top of page 100% 
		 * @type {number}
		 */
		screenTop: 8,

		/**
		 * The width of each frame in the character spritesheet
		 * @type {number}
		*/
		characterFrameWidth: 320,

		/**
		 * The height of each frame in the character spritesheet
		 * @type {number}
		 */
		characterFrameHeight: 580,

		/**
		 * The width of the character sprite
		 * @type {number}
		 */
		characterWidth: 160,

		/**
		 * The height of the character sprite
		 * @type {number}
		 */
		characterHeight: 290,

		/**
		 * The width of the level logo 
		 * @type {number}
		 */
		logoWidth: 320,

		/**
		 * The height of the level logo 
		 * @type {number}
		 */
		logoHeight: 180
	},

	/** 
	 * config for mobile portrait view (inspired by the Gameboy Color)
	 * @type {object}
	 */
	layoutGBC: {

		/** 
		 * width of the full GBC at 100% 
		 * @type {number}
		 */
		baseWidth: 720,

		/** 
		 * height of the full GBC at 100% 
		 * @type {number}
		 */
		baseHeight: 1280,

		/** 
		 * distance of screen from top of the GBC at 100% 
		 * @type {number}
		*/
		screenTop: 64,

		/**
		 * width of the frame around the screen at 100% 
		 * @type {number}
		 */
		screenFrameWidth: 662,

		/** 
		 * height of the frame around the screen at 100% 
		 * @type {number}
		 */
		screenFrameHeight: 714,

		/** 
		 * distance of frame from top of the GBC at 100% 
		 * @type {number}
		 */
		screenFrameTop: 29,

		/** 
		 * distance of main controls from top of GBC at 100% 
		 * @type {number}
		 */
		mainButtonFrameTop: 775,

		/** 
		 * height of main control frame at 100% 
		 * @type {number}
		 */
		mainButtonFrameHeight: 212,

		/** 
		 * size of individual A/B buttons at 100% 
		 * @type {number}
		 */
		mainButtonSize: 140,

		/** 
		 * whitespace/shadow margin of the button image 
		 * @type {number}
		 */
		mainButtonMargin: -7,

		/** 
		 * distance of small controls and speaker from top of GBC at 100% 
		 * @type {number}
		 */
		smallButtonFrameTop: 1058,

		/** 
		 * width of the start/select button image at 100% 
		 * @type {number}
		 */
		smallButtonWidth: 212,

		/** 
		 * height of the start/select button image at 100% 
		 * @type {number}
		 */
		smallButtonHeight: 55,

		/** 
		 * touch area size of start/select buttons 
		 * @type {number}
		 */
		smallButtonSize: 92,

		/** 
		 * space around input containers at 100% 
		 * @type {number}
		 */
		inputMarginX: 40,

		/** 
		 * size of actual d-pad at 100% 
		 * @type {number}
		 */
		dPadSize: 192,

		/** 
		 * deadzone for dpad at 100% (touch distance from center before it does anything) 
		 * @type {number}
		 */
		dPadDeadzone: 10,

		/** 
		 * width of the a/b button image at 100% 
		 * @type {number}
		 */
		AbButtonWidth: 239,

		/** 
		 * height of the a/b button image at 100% 
		 * @type {number}
		 */
		AbButtonHeight: 162,

		/** 
		 * width of speaker image at 100% 
		 * @type {number}
		 */
		speakerWidth: 154,

		/** 
		 * height of speaker image at 100% 
		 * @type {number}
		 */
		speakerHeight: 162
	},

	/**
	 * Config for mobile landscape view
	 * @type {object}
	 * @constant
	 */
	layoutGBA: {

		/** 
		 * width of the full GBA at 100% 
		 * @type {number}
		 */
		baseWidth: 1280,

		/** 
		 * height of the full GBA at 100% 
		 * @type {number}
		 */
		baseHeight: 720,

		/** 
		 * distance of screen from top of the GBA at 100% 
		 * @type {number}
		 */
		screenTop: 52,

		/** 
		 * width of the frame around the screen at 100% 
		 * @type {number}
		 */
		screenFrameWidth: 654,

		/** 
		 * height of the frame around the screen at 100% 
		 * @type {number}
		 */
		screenFrameHeight: 666,

		/** 
		 * distance of frame from top of the GBA at 100% 
		 * @type {number}
		 */
		screenFrameTop: 18,

		/** 
		 * width of input (and speaker) containers at 100% 
		 * @type {number}
		 */
		inputWidth: 261,

		/** 
		 * space around input containers at 100% 
		 * @type {number}
		 */
		inputMarginX: 46,

		/** 
		 * to position of input containers at 100% 
		 * @type {number}
		 */
		inputTop: 158,

		/** 
		 * height of container for d-pad and a/b buttons at 100% 
		 * @type {number}
		 */
		topInputHeight: 236,

		/** 
		 * height of container for start/select buttons and speaker 
		 * @type {number}
		 */
		bottomInputHeight: 243,

		/** 
		 * size of actual d-pad at 100% 
		 * @type {number}
		 */
		dPadSize: 192,

		/** 
		 * deadzone for dpad at 100% (touch distance from center before it does anything) 
		 * @type {number}
		 */
		dPadDeadzone: 10,

		/** 
		 * width of the a/b button image at 100% 
		 * @type {number}
		 */
		AbButtonWidth: 239,

		/** 
		 * height of the a/b button image at 100% 
		 * @type {number}
		 */
		AbButtonHeight: 162,

		/** 
		 * size of individual A/B buttons at 100% 
		 * @type {number}
		 */
		mainButtonSize: 140,

		/** 
		 * whitespace/shadow margin of the button image 
		 * @type {number}
		 */
		mainButtonMargin: -7,

		/** 
		 * width of the start/select button image at 100% 
		 * @type {number}
		 */
		smallButtonWidth: 193,

		/** 
		 * height of the start/select button image at 100% 
		 * @type {number}
		 */
		smallButtonHeight: 144,

		/** 
		 * size of start/select buttons at 100% 
		 * @type {number}
		 */
		smallButtonSize: 59,

		/** 
		 * relative left postition of the buttons within the image, at 100% 
		 * @type {number}
		 */
		smallButtonLeft: 129,

		/** 
		 * relative top postition of the start button, at 100% 
		 * @type {number}
		 */
		startButtonTop: 17,

		/** 
		 * relative top postition of the select button, at 100% 
		 * @type {number}
		 */
		selectButtonTop: 81,

		/** 
		 * top position of led image 
		 * @type {number}
		 */
		ledTop: 89,

		/** 
		 * size of led image 
		 * @type {number}
		 */
		ledSize: 56,

		/** 
		 * width of speaker at 100% 
		 * @type {number}
		 */
		speakerWidth: 167,

		/** 
		 * width of speaker at 100% 
		 * @type {number}
		 */
		speakerHeight: 134
	},

	/**
	 * Number of frames in the bomb/fuse animation
	 * @type {number}
	 */
	gameTimerFrames: 16,

	/**
	 * Number of steps in the game timer fuse reduction/countdown
	 * @type {number}
	 */
	gameTimerSteps: 8,

	/**
	 * number of frames to toggle between during each step of the game timer
	 * @type {number}
	 */
	gameTimerFlickerFrames: 2,

	/**
	 * current frame of the current timer step
	 * @type {number}
	 */
	gameTimerFlickerFrame: 0,

	/**
	 * current step of the game timer
	 * @type {number}
	 */
	gameTimerStep: 0,

	/**
	 * width of the bomb/fuse animation element
	 * @type {number}
	 */
	gameTimerWidth: 0,

	/**
	 * height of the bomb/fuse animation element
	 * @type {number}
	 */
	gameTimerHeight: 0,

	/**
	 * timeout for the game timer's step animation (the fuse burning)
	 * @type {number}
	 */
	gameTimerInterval: null,

	/**
	 * Gets the offest of an element on the screen
	 * @param {HTMLElement} elem - The element to check
	 * @returns {object} - The offset of the element, with top & left properties
	 */
	getOffset: function (elem) {
		var offset = { top: 0, left: 0 };
		do {
			if (!isNaN(elem.offsetLeft)) offset.left += elem.offsetLeft;
			if (!isNaN(elem.offsetTop)) offset.top += elem.offsetTop;
		} while (elem = elem.offsetParent);

		return offset;
	},

	/** 
	 * Initialize the layout controller
	 * @param {object} config - object of config values
	 * @returns {void}
	 */
	init: function (config) {
		var _this = this;

		// reference all the main screen elements

		/**
		 * The main viewport element
		 * @type {HTMLElement}
		 */
		this.viewport = document.getElementById('viewport');

		/**
		 * A black overlay that can be used to fade the screen
		 * @type {HTMLElement}
		 */
		this.fader = document.getElementById('fader');

		/**
		 * An element that gets overlayed when loading skins, microgames, etc
		 * @type {HTMLElement}
		 */
		this.loadingSkin = document.getElementById('loading-skin');

		/**
		 * The progress bar inside loadingSkin
		 * @type {HTMLElement}
		 */
		this.loaderBar = document.getElementById('loader-bar');

		/**
		 * The outer wrapper for the game view
		 * @type {HTMLElement}
		 */
		this.gameplaySkin = document.getElementById('gameplay-skin');

		/**
		 * The outer wrapper for the touch UI elements
		 * @type {HTMLElement}
		 */
		this.uiElements = document.getElementById('ui-elements');

		/**
		 * I'm not sure what this was used for. I think debugging stuff over the screen area?
		 * TODO: Remove this if it's not used
		 * @type {HTMLElement}
		 */
		this.screenframe = document.getElementById('screenframe');

		/**
		 * The container element for the gameplay screen
		 * @type {HTMLElement}
		 */
		this.screen = document.getElementById('screen');

		/**
		 * The elment used to show transitions between microgames.
		 * @type {HTMLElement}
		 */
		this.screenTransition = document.getElementById('screenTransition');

		/**
		 * The LED light that shows when the game is running in one of the Gameboy skins
		 * @type {HTMLElement}
		 */
		this.led = document.getElementById('led');

		/**
		 * The container for the d-pad when the game is running in one of the Gameboy skins
		 * @type {HTMLElement}
		 */
		this.dPadFrame = document.getElementById('dpad-frame');

		/**
		 * The d-pad element, used for touch input
		 * @type {HTMLElement}
		 */
		this.dPad = document.getElementById('dpad');

		/**
		 * The highlight that shows which direction the player is pressing on the d-pad
		 * @type {HTMLElement}
		 */
		this.dPadHighlight = document.getElementById('dpad-highlight');

		/**
		 * The outer container for the A/B buttons when the game is running in one of the Gameboy skins
		 * @type {HTMLElement}
		 */
		this.AbButtonsFrame = document.getElementById('ab-buttons-frame');

		/**
		 * The inner container for the A/B buttons when the game is running in one of the Gameboy skins
		 * @type {HTMLElement}
		 */
		this.AbButtons = document.getElementById('ab-buttons');

		/**
		 * The A button element, used for touch input
		 * @type {HTMLElement}
		 */
		this.aButton = document.getElementById('a-button');

		/**
		 * The B button element, used for touch input
		 * @type {HTMLElement}
		 */
		this.bButton = document.getElementById('b-button');

		/**
		 * The outer container for the start/select buttons when the game is running in one of the Gameboy skins
		 * @type {HTMLElement}
		 */
		this.startSelectButtonsFrame = document.getElementById('start-select-buttons-frame');

		/**
		 * The inner container for the start/select buttons when the game is running in one of the Gameboy skins
		 * @type {HTMLElement}
		 */
		this.startSelectButtons = document.getElementById('start-select-buttons');

		/**
		 * The start button element, used for touch input
		 * @type {HTMLElement}
		 */
		this.startButton = document.getElementById('start-button');

		/**
		 * The select button element, used for touch input
		 * @type {HTMLElement}
		 */
		this.selectButton = document.getElementById('select-button');

		/**
		 * The outer container for the speaker when the game is running in one of the Gameboy skins
		 * @type {HTMLElement}
		 */
		this.speakerFrame = document.getElementById('speaker-frame');

		/**
		 * The speaker element when the game is running in one of the Gameboy skins
		 * @type {HTMLElement}
		 */
		this.speaker = document.getElementById('speaker');

		/**
		 * The container for the level character art when the game is running in PC mode
		 * @type {HTMLElement}
		 */
		this.character = document.getElementById('character');

		/**
		 * The container for the level logo when the game is running in PC mode
		 * @type {HTMLElement}
		 */
		this.logo = document.getElementById('logo');

		/**
		 * The element that holds the hint text and shadow
		 * @type {HTMLElement}
		 */
		this.screenHint = document.getElementById('screenHint');

		/**
		 * The hint text element
		 * @type {HTMLElement}
		 */
		this.hintText = document.getElementById('hintText');

		/**
		 * The hint text shadow element
		 * @type {HTMLElement}
		 */
		this.hintShadow = document.getElementById('hintShadow');

		/**
		 * The control hint container
		 * @type {HTMLElement}
		 */
		this.hintControls = document.getElementById('hintControls');

		/**
		 * The control hint graphic
		 * @type {HTMLElement}
		 */
		this.hintControlsInner = document.getElementById('hintControlsInner');

		/**
		 * The bomb/fuse animation container
		 * @type {HTMLElement}
		 */
		this.gameTimer = document.getElementById('gameTimer');

		/**
		 * The bomb/fuse animation container
		 * @type {HTMLElement}
		 */
		this.gameTimeOver = document.getElementById('gameTimeOver');

		/**
		 * Pre-calculated radians to degrees
		 * @type {number}
		 * @constant
		 */
		this.rad2deg = 180 / Math.PI;

		/**
		 * Direction values (adding any combination of these will give a unique value)
		 * @type {object}
		 * @constant
		 * @property {number} up - 1
		 * @property {number} down - 2
		 * @property {number} left - 4
		 * @property {number} right - 8
		 */
		this.dirval = {
			up: 1,
			down: 2,
			left: 4,
			right: 8
		};

		/**
		 * UI states
		 * @type {object}
		 * @constant
		 * @property {boolean} up - true if the up button is pressed
		 * @property {boolean} right - true if the right button is pressed
		 * @property {boolean} down - true if the down button is pressed
		 * @property {boolean} left - true if the left button is pressed
		 * @property {boolean} A - true if the A button is pressed
		 * @property {boolean} B - true if the B button is pressed
		 * @property {boolean} select - true if the select button is pressed
		 * @property {boolean} start - true if the start button is pressed
		 * @property {boolean} action - true if A or B is pressed
		 * @property {boolean} pause - true if the start button is pressed
		 */
		this.ui = {
			up: false,
			right: false,
			down: false,
			left: false,
			A: false,
			B: false,
			select: false,
			start: false,

			action: false,
			pause: false
		};

		/**
		 * Input element config data
		 * @type {object}
		 * @constant
		 * @property {object} dpad - state of the on-screen d-pad
		 * @property {object} A - state of the on-screen A button
		 * @property {object} B - state of the on-screen B button
		 * @property {object} select - state of the on-screen select button
		 * @property {object} start - state of the on-screen start button
		 */
		this.inputs = {
			dpad: { x: 0, y: 0, size: 0, touch: false, deadzone: 0 },
			A: { x: 0, y: 0, size: 0, touch: false },
			B: { x: 0, y: 0, size: 0, touch: false },
			select: { x: 0, y: 0, size: 0, touch: false },
			start: { x: 0, y: 0, size: 0, touch: false },
			action: { x: 0, y: 0, size: 0, touch: false },
			pause: { x: 0, y: 0, size: 0, touch: false }
		};

		// handle screen size changes and orientation updates
		window.addEventListener("resize", () => {
			// gotta wait for the rotate animation to happen on IOS, because triggering this event when the resize is actually complete would make too much sense. Fuck Safari...
			setTimeout(() => {
				GameWrapper.updateGameScreenOrientation();
			}, 500);
		});

		/** 
		 * Handle the start of touch events on our UI elements
		 * @param {string} key - The input key (dpad, A, B, start, etc...)
		 * @param {Touch} touch - the touch object that triggered this call
		 * @return {boolean} - true if there was a state change
		 */
		function startTouch(key, touch) {

			// If the update is on the d-pad, we have to check for changes on every event
			if (key == 'dpad') {

				// record the touch that's on the d-pad so we can track it as it moves or releases
				_this.inputs[key].touch = touch.identifier;

				// calculate what state the d-pad was in before this update
				let oldval = 0;
				for (const [dir, val] of Object.entries(_this.dirval)) {
					if (_this.ui[dir]) oldval += val;
				}

				// clear input states on the d-pad for now
				_this.ui.up = false;
				_this.ui.down = false;
				_this.ui.left = false;
				_this.ui.right = false;

				// array to hold any directions the user is touching
				let down = [];

				// calculate the angle the touch is at from the center of the d-pad
				let angle = Math.atan2(touch.clientY - _this.inputs.dpad.y, touch.clientX - _this.inputs.dpad.x) * _this.rad2deg;

				// using the angle, determine what directions are being hit
				if (angle >= -150 && angle <= -30) down.push('up');
				else if (angle <= 150 && angle >= 30) down.push('down');

				if (angle >= -60 && angle <= 60) down.push('right');
				else if (angle >= 120 || angle <= -120) down.push('left');

				// calculate what state the d-pad is in now, and update individual direction states
				let newval = 0;
				down.forEach((dir) => {
					_this.ui[dir] = true;
					newval += _this.dirval[dir];
				});

				// if the state didn't change, we can leave without firing any new events
				if (newval === oldval) return false;

				// show and move the d-pad highlight to inicate what the player is pressing
				_this.dPadHighlight.style.display = "block";
				_this.dPadHighlight.setAttribute('class', down.join("-"));

				// If we have a linked touch already, the player has another touch already on this button. We'll ignore this new one
			} else if (_this.inputs[key].touch === touch.identifier) {
				return false;

				// This is a new button press. Update the state and show the button highlight
			} else {
				_this.inputs[key].touch = touch.identifier;
				let elem = key.toLowerCase() + "Button";
				_this[elem].style.display = "block";
				_this.ui[key] = true;

				if (['A', 'B'].includes(key)) _this.ui.action = true;
				if (key === 'start') _this.ui.pause = true;
			}

			// fire any callback functions with the current UI states and return true.
			_this.onInputChanged.call(_this.onInputChangedThisArg, _this.ui);
			return true;
		}

		/** 
		 * Handle end of touches
		 * @param {string} key - The input key (dpad, A, B, start, etc...)
		 * @param {Touch} touch - the touch object that triggered this call
		 * @return {boolean} - true if there was a state change
		 */
		function endTouch(key, touch) {
			// this touch event wasn't already attached to this input, we can leave now
			if (_this.inputs[key].touch !== touch.identifier) return false;

			// clear the linked touch
			_this.inputs[key].touch = false;

			// on d-pad release, clear all the input directions and hide the d-pad highlight
			if (key == 'dpad') {
				_this.ui.up = false;
				_this.ui.down = false;
				_this.ui.left = false;
				_this.ui.right = false;
				_this.dPadHighlight.style.display = "none";

				// on button release, clear the input state and hide the button highlight
			} else {
				let elem = key.toLowerCase() + "Button";
				_this[elem].style.display = "none";
				_this.ui[key] = false;

				if (['A', 'B'].includes(key)) _this.ui.action = false;
				if (key === 'start') _this.ui.pause = false;
			}

			// fire any callback functions with the current UI states and return true.
			_this.onInputChanged.call(_this.onInputChangedThisArg, _this.ui);
			return true;
		}

		/** 
		 * Check if a touch event is hitting or leaving any of our UI elements
		 * @param {TouchEvent} e - The touch event we need to check
		 */
		function checkTouch(e) {
			// Check for any changed touches in the event
			for (var i = 0; i < e.changedTouches.length; i++) {

				let touch = e.changedTouches[i];

				// touch is ended
				if (e.type == 'touchcancel' || e.type == 'touchend') {

					// cycle through all of our inputs
					for (const [key, state] of Object.entries(_this.inputs)) {

						// check if this touch is releasing this input key
						if (endTouch(key, touch)) e.preventDefault();
					}

					// this is either a new touch, or one that moved
				} else {

					// cycle through all of our inputs
					for (const [key, state] of Object.entries(_this.inputs)) {

						// check the general bounds (from the center)
						var xdst = Math.abs(touch.clientX - state.x);
						var ydst = Math.abs(touch.clientY - state.y);
						var span = state.size / 2;

						// use this distance if we're not in the bounding box at all
						var dst = 9999;

						// if we're in the general bounding box, find the actual distance from center
						if (xdst <= span && ydst <= span) dst = Math.sqrt((xdst * xdst) + (ydst * ydst));

						// The d-pad element has a deadzone at the center where no directions get triggered. If we're there, clear all directions
						if ((key === 'dpad' && dst < state.deadzone) || dst > span) {
							if (endTouch(key, touch)) e.preventDefault;

							// We are on a button, or touchable part of the d-pad
						} else {
							if (startTouch(key, touch)) e.preventDefault;
						}
					}
				}
			};

		}

		// cancel click events on the main page pody to prevent accidentally zooming on double click
		document.body.onclick = function (e) {
			e.preventDefault();
		}

		// set up touch listeners for the overall document
		document.ontouchstart = checkTouch;
		document.ontouchmove = checkTouch;
		document.ontouchend = checkTouch;
		document.ontouchcancel = checkTouch;

		// save any screen update callbacks from the config, or use an empty function
		this.onScreenUpdated = typeof (config.onScreenUpdated) !== 'undefined' ? config.onScreenUpdated : function (screen) { };
		this.onScreenUpdatedThisArg = typeof (config.onScreenUpdatedThisArg) !== 'undefined' ? config.onScreenUpdatedThisArg : this;

		// save any input change callbacks from the config, or use an empty function
		this.onInputChanged = typeof (config.onInputChanged) !== 'undefined' ? config.onInputChanged : function (input, state) { };
		this.onInputChangedThisArg = typeof (config.onInputChangedThisArg) !== 'undefined' ? config.onInputChangedThisArg : this;

		// check the current screen orientation
		this.updateGameScreenOrientation();
	},

	/**
	 * Resets all the visual input elements (hide highlights, clear skins, etc)
	 */
	resetGameElements: function () {
		document.body.setAttribute('class', "");
		this.uiElements.setAttribute('style', "");
		this.screenframe.setAttribute('style', "");
		//this.screenTransition.setAttribute('style', "");
		this.gameplaySkin.setAttribute('class', "gameplay-skin");
		this.screen.setAttribute('style', "");
		this.led.setAttribute('style', "");
		this.dPadFrame.setAttribute('style', "");
		this.dPad.setAttribute('style', "");
		this.dPadHighlight.setAttribute('style', "display:none");
		this.AbButtonsFrame.setAttribute('style', "");
		this.AbButtons.setAttribute('style', "");
		this.aButton.setAttribute('style', "display:none");
		this.bButton.setAttribute('style', "display:none");
		this.startSelectButtonsFrame.setAttribute('style', "");
		this.startSelectButtons.setAttribute('style', "");
		this.startButton.setAttribute('style', "display:none");
		this.selectButton.setAttribute('style', "display:none");
		this.speakerFrame.setAttribute('style', "");
		this.speaker.setAttribute('style', "");

	},

	/**
	 * Updates the page for landscape view on mobile (Gameboy Advance)
	 * @param {object} size - an object containing information about the screen/document size
	 * @param {number} size.ew - the width of the screen
	 * @param {number} size.eh - the height of the screen
	 * @returns {void}
	 */
	viewGameMobileLandscape: function (size) {
		// reset all our elements
		this.resetGameElements(size);

		// reference the layout rules
		var lo = this.layoutGBA;

		// figure out the best scale to use for the game screen
		let scaleX = size.ew / lo.baseWidth;
		let scaleY = size.eh / lo.baseHeight;
		let scale = scaleX < scaleY ? scaleX : scaleY;

		// set the page class based on the scale (will set frame elements to diffenet sizes)
		if (scale >= 1.3) document.body.setAttribute('class', 'zoom-1-3');
		else if (scale <= 0.7) document.body.setAttribute('class', 'zoom-0-5');
		else if (scale <= 0.9) document.body.setAttribute('class', 'zoom-0-8');

		// resize the game skin to lock aspect ratio
		let skinWidth = Math.round((lo.baseWidth * scale) / 2) * 2;
		let skinHeight = Math.round((lo.baseHeight * scale) / 2) * 2;

		// calculate any gutter space
		let skinMarginX = (size.ew - skinWidth) / 2;
		let skinMarginY = (size.eh - skinHeight) / 2;

		// resize and position the skin
		this.gameplaySkin.style.width = skinWidth + "px";
		this.gameplaySkin.style.height = skinHeight + "px";
		this.gameplaySkin.style.top = skinMarginY + "px";
		this.gameplaySkin.style.left = skinMarginX + "px";

		// update the frame around the game screen
		let fWidth = Math.ceil(lo.screenFrameWidth * scale);
		let fHeight = Math.ceil(lo.screenFrameHeight * scale);
		let fLeft = Math.round(((skinWidth - fWidth) / 2));
		let fTop = Math.round(((skinHeight - fHeight) * (lo.screenFrameTop / (lo.baseHeight - lo.screenFrameHeight))));
		this.screenframe.style.width = fWidth + "px";
		this.screenframe.style.height = fHeight + "px";
		this.screenframe.style.top = fTop + "px";
		this.screenframe.style.left = fLeft + "px";


		// record the game screen size and position
		let screen = {
			// make sure the size is a factor of 2 to avoid blurring the canvas when centering
			size: Math.round((this.screenSize * scale) / 2) * 2
		};
		screen.top = skinMarginY + Math.round(lo.screenTop * scale);
		screen.left = Math.round(((size.ew - screen.size) / 2));

		// size and position the gam screen element
		this.screen.style.width = this.screen.style.height = screen.size + "px";
		this.screen.style.top = screen.top + "px";
		this.screen.style.left = screen.left + "px";

		// get sizes for our input containers
		let inputTop = Math.round(lo.inputTop * scale);
		let topInputHeight = Math.round(lo.topInputHeight * scale);
		let bottomInputHeight = Math.round(lo.bottomInputHeight * scale);
		let uiFrameWidth = Math.round(lo.inputWidth * scale);
		let dPadSize = Math.round(lo.dPadSize * scale);
		let inputMarginX = Math.round(lo.inputMarginX * scale);
		let smallButtonWidth = Math.round(lo.smallButtonWidth * scale);
		let smallButtonHeight = Math.round(lo.smallButtonHeight * scale);
		let smallButtonSize = Math.round(lo.smallButtonSize * scale);
		let smallButtonLeft = Math.round(lo.smallButtonLeft * scale);
		let mainButtonSize = Math.round(lo.mainButtonSize * scale);
		let mainButtonMargin = Math.round(lo.mainButtonMargin * scale);
		let startButtonTop = Math.round(lo.startButtonTop * scale);
		let selectButtonTop = Math.round(lo.selectButtonTop * scale);
		let AbButtonWidth = Math.round(lo.AbButtonWidth * scale);
		let AbButtonHeight = Math.round(lo.AbButtonHeight * scale);
		let ledTop = Math.round(lo.ledTop * scale);
		let ledSize = Math.round(lo.ledSize * scale);

		// set sizes of input containers
		this.dPadFrame.style.width = this.AbButtonsFrame.style.width = this.startSelectButtonsFrame.style.width = this.speakerFrame.style.width = uiFrameWidth + "px";
		this.dPadFrame.style.height = this.AbButtonsFrame.style.height = topInputHeight + "px";
		this.startSelectButtonsFrame.style.height = this.speakerFrame.style.height = bottomInputHeight + "px";

		// position containers
		this.dPadFrame.style.top = this.AbButtonsFrame.style.top = inputTop + "px";
		this.startSelectButtonsFrame.style.top = this.speakerFrame.style.top = (inputTop + topInputHeight) + "px";
		this.dPadFrame.style.left = this.startSelectButtonsFrame.style.left = inputMarginX + "px";
		this.AbButtonsFrame.style.right = this.speakerFrame.style.right = inputMarginX + "px";

		// set size of d-pad
		this.dPad.style.width = this.dPad.style.height = dPadSize + "px";

		// size annd position the LED
		this.led.style.width = this.led.style.height = ledSize + "px";
		this.led.style.left = (fLeft + fWidth) + "px";
		this.led.style.top = ledTop + "px"

		// set size of A/B buttons
		this.AbButtons.style.width = AbButtonWidth + "px";
		this.AbButtons.style.height = AbButtonHeight + "px";

		// set size of the A/B button press zones
		this.aButton.style.width = this.aButton.style.height = this.bButton.style.width = this.bButton.style.height = mainButtonSize + "px";
		this.aButton.style.top = this.aButton.style.right = this.bButton.style.bottom = this.bButton.style.left = mainButtonMargin + "px";

		// set the size of the start/select buttons
		this.startSelectButtons.style.width = smallButtonWidth + "px";
		this.startSelectButtons.style.height = smallButtonHeight + "px";

		this.startButton.style.width = this.startButton.style.height = this.selectButton.style.width = this.selectButton.style.height = smallButtonSize + "px";

		this.startButton.style.left = this.selectButton.style.left = smallButtonLeft + "px";
		this.startButton.style.top = startButtonTop + "px";
		this.selectButton.style.top = selectButtonTop + "px";

		// set the size of the speaker
		this.speaker.style.width = Math.round(lo.speakerWidth * scale) + "px";
		this.speaker.style.height = Math.round(lo.speakerHeight * scale) + "px";

		// update positions and sizes in our input objects (used for touch detection)
		this.inputs.dpad.x = inputMarginX + (uiFrameWidth / 2) + skinMarginX;
		this.inputs.dpad.y = inputTop + (topInputHeight / 2) + skinMarginY;
		this.inputs.dpad.size = dPadSize;
		this.inputs.dpad.deadzone = Math.floor(lo.dPadDeadzone * scale);

		this.inputs.start.x = inputMarginX + smallButtonLeft + ((smallButtonSize + uiFrameWidth - smallButtonWidth) / 2) + skinMarginX;
		this.inputs.start.y = inputTop + topInputHeight + startButtonTop + ((smallButtonSize + bottomInputHeight - smallButtonHeight) / 2) + skinMarginY;
		this.inputs.start.size = smallButtonSize;

		this.inputs.select.x = inputMarginX + smallButtonLeft + ((smallButtonSize + uiFrameWidth - smallButtonWidth) / 2) + skinMarginX;
		this.inputs.select.y = inputTop + topInputHeight + selectButtonTop + ((smallButtonSize + bottomInputHeight - smallButtonHeight) / 2) + skinMarginY;
		this.inputs.select.size = smallButtonSize;

		this.inputs.A.x = size.ew - inputMarginX - ((mainButtonSize + uiFrameWidth - AbButtonWidth) / 2) - skinMarginX;
		this.inputs.A.y = inputTop + ((mainButtonSize + topInputHeight - AbButtonHeight) / 2) + skinMarginY;
		this.inputs.A.size = mainButtonSize;

		this.inputs.B.x = size.ew - inputMarginX - uiFrameWidth + ((mainButtonSize + uiFrameWidth - AbButtonWidth) / 2) - skinMarginX;
		this.inputs.B.y = inputTop + topInputHeight - ((mainButtonSize + topInputHeight - AbButtonHeight) / 2) + skinMarginY;
		this.inputs.B.size = mainButtonSize;

		// let the core game engine know the screen changed so it can update itself as needed.
		this.onScreenUpdated.call(this.onScreenUpdatedThisArg, screen);
		this.updateGameTimerElement(screen.size);
	},

	/**
	 * Updates the page for portrait view on mobile (Gameboy Color)
	 * @param {object} size - an object containing information about the screen/document size
	 * @param {number} size.ew - the width of the screen
	 * @param {number} size.eh - the height of the screen
	 * @returns {void}
	 */
	viewGameMobilePortrait: function (size) {
		// reset all the elements
		this.resetGameElements(size);

		// reference the layout rules
		var lo = this.layoutGBC;

		// figure out the best scale to use for the game screen
		let scaleX = size.ew / lo.baseWidth;
		let scaleY = size.eh / lo.baseHeight;
		let scale = scaleX < scaleY ? scaleX : scaleY;

		// set the page class based on scale (will adjust element sizes)
		if (scale >= 1.3) document.body.setAttribute('class', 'zoom-1-3');
		else if (scale <= 0.7) document.body.setAttribute('class', 'zoom-0-5');
		else if (scale <= 0.9) document.body.setAttribute('class', 'zoom-0-8');

		// resize the game skin to lock aspect ratio
		let skinWidth = Math.round((lo.baseWidth * scale) / 2) * 2;
		let skinHeight = Math.round((lo.baseHeight * scale) / 2) * 2;

		// calculate any gutter space
		let skinMarginX = (size.ew - skinWidth) / 2;
		let skinMarginY = (size.eh - skinHeight) / 2;

		// size and position the skin
		this.gameplaySkin.style.width = skinWidth + "px";
		this.gameplaySkin.style.height = skinHeight + "px";
		this.gameplaySkin.style.top = skinMarginY + "px";
		this.gameplaySkin.style.left = skinMarginX + "px";

		// update the frame around the game screen
		let fWidth = Math.ceil(lo.screenFrameWidth * scale);
		let fHeight = Math.ceil(lo.screenFrameHeight * scale);
		let fLeft = Math.round(((skinWidth - fWidth) / 2));
		let fTop = Math.round(((skinHeight - fHeight) * (lo.screenFrameTop / (lo.baseHeight - lo.screenFrameHeight))));

		this.screenframe.style.width = fWidth + "px";
		this.screenframe.style.height = fHeight + "px";
		this.screenframe.style.top = fTop + "px";
		this.screenframe.style.left = fLeft + "px";


		// update the game screen 
		let screen = {
			// make sure the size is a factor of 2 to avoid blurring the canvas when centering
			size: Math.round((this.screenSize * scale) / 2) * 2
		};
		screen.top = skinMarginY + Math.round(lo.screenTop * scale);
		screen.left = Math.round(((size.ew - screen.size) / 2));
		this.screen.style.width = this.screen.style.height = screen.size + "px";
		this.screen.style.top = screen.top + "px";
		this.screen.style.left = screen.left + "px";

		// get sizes for our input containers
		let mainButtonFrameTop = Math.round(lo.mainButtonFrameTop * scale);
		let mainButtonFrameHeight = Math.round(lo.mainButtonFrameHeight * scale);
		let mainButtonMargin = Math.round(lo.mainButtonMargin * scale);
		let mainButtonSize = Math.round(lo.mainButtonSize * scale);
		let smallButtonTop = Math.round(lo.smallButtonTop * scale);
		let inputMarginX = Math.round(lo.inputMarginX * scale);
		let dPadSize = Math.round(lo.dPadSize * scale);
		let dPadDeadzone = Math.round(lo.dPadDeadzone * scale);
		let AbButtonWidth = Math.round(lo.AbButtonWidth * scale);
		let AbButtonHeight = Math.round(lo.AbButtonHeight * scale);
		let smallButtonFrameTop = Math.round(lo.smallButtonFrameTop * scale);
		let smallButtonWidth = Math.round(lo.smallButtonWidth * scale);
		let smallButtonHeight = Math.round(lo.smallButtonHeight * scale);
		let smallButtonSize = Math.round(lo.smallButtonSize * scale);
		let speakerWidth = Math.round(lo.speakerWidth * scale);
		let speakerHeight = Math.round(lo.speakerHeight * scale);

		// position and size the d-pad and a/b button containers
		this.dPadFrame.style.top = this.AbButtonsFrame.style.top = mainButtonFrameTop + "px";
		this.dPadFrame.style.height = this.AbButtonsFrame.style.height = mainButtonFrameHeight + "px";
		this.dPadFrame.style.left = inputMarginX + "px";
		this.AbButtonsFrame.style.right = inputMarginX + "px";


		// resize dpad and a/b button images
		this.dPad.style.width = this.dPad.style.height = dPadSize + "px";
		this.AbButtons.style.width = AbButtonWidth + "px";
		this.AbButtons.style.height = AbButtonHeight + "px";

		// position and size the start/select and speaker containers
		this.startSelectButtonsFrame.style.top = this.speakerFrame.style.top = smallButtonFrameTop + "px";

		// resize start/select button image
		this.startSelectButtons.style.width = smallButtonWidth + "px";
		this.startSelectButtons.style.height = smallButtonHeight + "px";

		// position youch effect for start and selcet buttons
		this.startButton.style.top = this.selectButton.style.top = ((smallButtonHeight - smallButtonSize) / 2) + "px";
		this.startButton.style.width = this.startButton.style.height = this.selectButton.style.width = this.selectButton.style.height = smallButtonSize + "px";
		this.startButton.style.right = this.selectButton.style.left = "0px";

		// resize speaker
		this.speaker.style.width = speakerWidth + "px";
		this.speaker.style.height = speakerHeight + "px";
		this.speaker.style.right = inputMarginX + "px";

		// update positions and sizes in our input object (used for touch detection)
		this.inputs.dpad.x = inputMarginX + (dPadSize / 2) + skinMarginX;
		this.inputs.dpad.y = mainButtonFrameTop + (mainButtonFrameHeight / 2) + skinMarginY;
		this.inputs.dpad.size = dPadSize;
		this.inputs.dpad.deadzone = Math.floor(lo.dPadDeadzone * scale);

		this.inputs.select.x = ((size.ew - smallButtonWidth + smallButtonSize) / 2);
		this.inputs.select.y = smallButtonFrameTop + (smallButtonHeight / 2) + skinMarginY;
		this.inputs.select.size = smallButtonSize;

		this.inputs.start.x = ((size.ew + smallButtonWidth - smallButtonSize) / 2);
		this.inputs.start.y = smallButtonFrameTop + (smallButtonHeight / 2) + skinMarginY;
		this.inputs.start.size = smallButtonSize;

		this.inputs.A.x = size.ew - inputMarginX - mainButtonMargin - (mainButtonSize / 2) - skinMarginX;
		this.inputs.A.y = mainButtonFrameTop + mainButtonMargin + ((mainButtonFrameHeight - AbButtonHeight + mainButtonSize) / 2) + skinMarginY;
		this.inputs.A.size = mainButtonSize;

		this.inputs.B.x = size.ew - inputMarginX - AbButtonWidth + mainButtonMargin + (mainButtonSize / 2) - skinMarginX;
		this.inputs.B.y = mainButtonFrameTop + mainButtonFrameHeight - mainButtonMargin - ((mainButtonFrameHeight - AbButtonHeight + mainButtonSize) / 2) + skinMarginY;
		this.inputs.B.size = mainButtonSize;

		// set size of the A/B button press zones
		this.aButton.style.width = this.aButton.style.height = this.bButton.style.width = this.bButton.style.height = mainButtonSize + "px";
		this.aButton.style.top = this.aButton.style.right = this.bButton.style.bottom = this.bButton.style.left = mainButtonMargin + "px";

		// let the core game engine know the screen changed so it can update itself as needed.
		this.onScreenUpdated.call(this.onScreenUpdatedThisArg, screen);
		this.updateGameTimerElement(screen.size);
	},

	/**
	 * Updates the page for desktop view (fame with skin)
	 * @param {object} size - an object containing information about the screen/document size
	 * @param {number} size.ew - the width of the screen
	 * @param {number} size.eh - the height of the screen
	 * @returns {void}
	 */
	viewGameDesktop: function (size) {
		// reset all the input elements
		this.resetGameElements(size);

		// reference the layout rules
		var lo = this.layoutDesktop;

		// figure out the best scale to use for the game screen
		let scaleX = size.ew / lo.baseWidth;
		let scaleY = size.eh / lo.baseHeight;
		let scale = scaleX < scaleY ? scaleX : scaleY;

		// resize the game skin to lock aspect ratio
		let skinWidth = Math.round((lo.baseWidth * scale) / 2) * 2;
		let skinHeight = Math.round((lo.baseHeight * scale) / 2) * 2;

		// calculate any gutter space
		let skinMarginX = (size.ew - skinWidth) / 2;
		let skinMarginY = (size.eh - skinHeight) / 2;

		// size and position the skin
		this.gameplaySkin.style.width = skinWidth + "px";
		this.gameplaySkin.style.height = skinHeight + "px";
		this.gameplaySkin.style.top = skinMarginY + "px";
		this.gameplaySkin.style.left = skinMarginX + "px";

		// update the game screen 
		let screen = {
			// make sure the size is a factor of 2 to avoid blurring the canvas when centering
			size: Math.round((this.screenSize * scale) / 2) * 2
		};
		screen.top = skinMarginY + Math.round(lo.screenTop * scale);
		screen.left = Math.round(((size.ew - screen.size) / 2));
		this.screen.style.width = this.screen.style.height = screen.size + "px";
		this.screen.style.top = screen.top + "px";
		this.screen.style.left = screen.left + "px";

		// get sizes for our input containers
		let characterWidth = Math.round(lo.characterWidth * scale);
		let characterHeight = Math.round(lo.characterHeight * scale);
		let imgScale = characterWidth / lo.characterFrameWidth;

		// set the size of the character
		this.character.style.width = characterWidth + "px";
		this.character.style.height = characterHeight + "px";
		this.character.style.position = "absolute";
		this.character.style.bottom = Math.round(32 * scale) + "px";
		this.character.style.right = Math.round(32 * scale) + "px";

		let logoWidth = Math.round(lo.logoWidth * imgScale);
		let logoHeight = Math.round(lo.logoHeight * imgScale);
		this.logo.style.width = logoWidth + "px";
		this.logo.style.height = logoHeight + "px";
		this.logo.style.position = "absolute";
		this.logo.style.top = Math.round(32 * scale) + "px";
		this.logo.style.left = Math.round(32 * scale) + "px";

		// let the core game engine know the screen changed so it can update itself as needed.
		this.onScreenUpdated.call(this.onScreenUpdatedThisArg, screen);
		this.updateGameTimerElement(screen.size);
		this.setCharacterScale(imgScale);
		this.setLogoScale(imgScale);
	},

	/**
	 * updates the size/scale of the bomb/fuse animation element
	 * @param {number} width - the width of the game screen
	 * @returns {void}
	 */
	updateGameTimerElement(width = 0) {

		let _this = this;

		// this is the size the bomb image would be at 100% scale
		let timerSize = { width: 1048, height: 160 };
		let timeOverSize = { width: 240, height: 240 };

		// calculate the scale to use
		let scale = width / timerSize.width;

		this.gameTimerWidth = Math.floor(timerSize.width * scale);
		this.gameTimerHeight = Math.floor(timerSize.height * scale);

		// set the new size of the gameTimer element
		this.gameTimer.style.width = this.gameTimerWidth + "px";
		this.gameTimer.style.height = this.gameTimerHeight + "px";

		this.gameTimeOver.style.width = Math.floor(timeOverSize.width * scale) + "px";
		this.gameTimeOver.style.height = Math.floor(timeOverSize.height * scale) + "px";

		// set background size of gameTimer to the new width, and the new height * 16 (since there are 16 frames in the sprite sheet)
		this.gameTimer.style.backgroundSize = this.gameTimerWidth + "px " + (this.gameTimerHeight * this.gameTimerFrames) + "px";

		// update the size of teh bomb/fuse animation
		this.updateGameTimerFrame();
	},

	/**
	 * Start the interval that controls the flame flicker effect on the bomb timer
	 * @returns {void}
	 */
	startGameTimerFlicker() {
		let _this = this;
		if (!this.gameTimerInterval) {
			this.gameTimerInterval = setInterval(() => {
				_this.gameTimerFlickerFrame++;
				if (_this.gameTimerFlickerFrame >= _this.gameTimerFlickerFrames) _this.gameTimerFlickerFrame = 0;
				_this.updateGameTimerFrame();
			}, 100);
		}
	},

	/**
	 * Start the bomb timer animation
	 * @returns {void}
	 */
	startGameTimer() {
		this.startGameTimerFlicker();
		this.gameTimerStep = 0;
		this.gameTimer.style.display = "";
		this.gameTimeOver.style.display = "none";
	},

	/**
	 * Stop the bomb timer animation
	 * @returns {void}
	 */
	stopGameTimer() {
		let _this = this;
		this.stopGameTimerFlicker();
		this.gameTimer.style.display = "none";
		this.gameTimeOver.style.display = "";
		setTimeout(() => {
			_this.gameTimeOver.style.display = "none";
		}, 500);

	},

	/**
	 * Stop the interval that controls the flame flicker effect on the bomb timer
	 * @returns {void}
	 */
	stopGameTimerFlicker() {
		if (this.gameTimerInterval) {
			clearInterval(this.gameTimerInterval);
		}
		this.gameTimerInterval = null;
	},

	/**
	 * Updates the current frame of the bomb/fuse animation based on the step and the flicker frame
	 * @returns {void}
	 */
	updateGameTimerFrame() {

		// calculate the current frame based on the step and the flicker frame
		frame = (this.gameTimerStep * this.gameTimerFlickerFrames) + this.gameTimerFlickerFrame;

		// set the background position of the gameTimer to the new height * the frame number
		this.gameTimer.style.backgroundPosition = "0px -" + (this.gameTimerHeight * frame) + "px";
	},

	/** 
	 * Show the generic loading view 
	 * @returns {void}
	 */
	showLoadScreen() {
		this.loadingSkin.style.display = "";
	},

	/** 
	 * Updates the loading bar
	 * @param {number} loaded - A number between 0 and 1 (1 = 100%)
	 * @returns {void}
	 */
	setLoadedValue(loaded) {
		this.loaderBar.style.width = Math.round(loaded * 100) + "%";
	},

	/** 
	 * Hide the generic loading view 
	 * @returns {void}
	 */
	hideLoadScreen() {
		this.loadingSkin.style.display = "none";
	},

	/** 
	 * Does a fade from black effect 
	 * @returns {void}
	 */
	fadeIn() {
		this.fader.style.opacity = "0";
	},

	/** 
	 * Does a fade to black effect 
	 * @returns {void}
	 */
	fadeOut() {
		this.fader.style.opacity = "1";
	},

	/**
	 * A wrapper for fading out, switching views, and fading back in
	 * @param {function} onFadeOut - A function to call when the fade out is complete
	 * @param {function} onFadeIn - A function to call when the fade in is complete
	 * @returns {void}
	 */
	crossFade(onFadeOut, onFadeIn) {
		let _this = this;

		this.fadeOut();
		setTimeout(() => {
			this.fadeIn();

			if (onFadeOut) {
				onFadeOut();
			}

			if (onFadeIn) {
				setTimeout(() => {
					onFadeIn()
				}, 500);
			}
		}, 500);
	},

	/**
	 * Sets the text of the hint element and animates it
	 * @param {string} hintText - The text to display
	 * @param {string} controls - The control type to display
	 * @param {function} hintDisplayedCallback - A function to call when the hint is in the middle of the screen
	 * @param {function} hintCompleteCallback - A function to call when the animation is complete
	 * @returns {void}
	 */
	setHintText: function (hintText, controls, hintDisplayedCallback, hintCompleteCallback) {

		controls = PWGame.input.getControlHint(controls);

		let controlHints = [
			'wasd',
			'arrows',
			'gamepad',
			'mouse',
			'touch'
		];

		let controlIndex = controlHints.indexOf(controls);

		let _this = this;

		// get the screen scale
		let scale = parseInt(this.screen.style.width.replace("px", "")) / this.screenSize;

		// update hint control graphic size
		let hintControlSize = { width: Math.round(210 * scale), height: Math.round(100 * scale) };

		this.hintControlsInner.style.width = hintControlSize.width + "px";
		this.hintControlsInner.style.height = hintControlSize.height + "px";
		this.hintControlsInner.style.backgroundSize = hintControlSize.width + "px " + (hintControlSize.height * 5) + "px";
		this.hintControlsInner.style.backgroundPosition = "0px -" + (hintControlSize.height * controlIndex) + "px";

		// space between hint elements
		let margin = Math.round(30 * scale);

		// approximate text height
		let size = Math.floor(36 * scale);

		// set the hint text
		this.screenHint.style.fontSize = size + "px";
		this.hintText.innerHTML = this.hintShadow.innerHTML = "";
		this.hintText.textContent = this.hintShadow.textContent = hintText;

		// get the starting position of the hint elements
		let hintControlsTop = -(hintControlSize.height + margin);
		let hintTextTop = hintControlsTop - margin - hintControlSize.height;

		// reset the element positions and transitions
		this.screenHint.style.display = "";
		this.screenHint.style.transition = "";
		this.screenHint.style.transitionTimingFunction = "";
		this.screenHint.style.top = hintTextTop + "px";

		this.hintControls.style.display = "";
		this.hintControls.style.transition = "";
		this.hintControls.style.transitionTimingFunction = "";
		this.hintControls.style.top = hintControlsTop + "px";

		// ms of ease animation
		let ease_time = 260;
		let display_time = 1000;
		let ease_css = (ease_time / 1000) + "s";

		// TODO - apply the gamespeed to these animations

		// start reasing in the hint elements right away
		setTimeout(() => {
			_this.screenHint.style.transition = ease_css;
			_this.screenHint.style.transitionTimingFunction = "ease-out";
			_this.screenHint.style.top = "calc(46% - " + size + "px)";

			_this.hintControls.style.transition = ease_css;
			_this.hintControls.style.transitionTimingFunction = "ease-out";
			_this.hintControls.style.top = "calc(46% + " + margin + "px)";
		}, 1);

		// after we've eased in and passed our display time, ease out
		setTimeout(() => {
			_this.screenHint.style.transition = ease_css;
			_this.screenHint.style.transitionTimingFunction = "ease-in";
			_this.screenHint.style.top = hintTextTop + "px";

			_this.hintControls.style.transition = ease_css;
			_this.hintControls.style.transitionTimingFunction = "ease-in";
			_this.hintControls.style.top = hintControlsTop + "px";

			// reset the character animation
			GameWrapper.characterAnimation = 1;

			// we can call the displayed callback
			if (typeof (hintDisplayedCallback) === 'function') hintDisplayedCallback();

		}, ease_time + display_time);

		// whan all of this is done, we can call the complete callback
		setTimeout(() => {
			if (typeof (hintCompleteCallback) === 'function') hintCompleteCallback();
		}, (ease_time * 2) + display_time);
	},

	/**
	 * The current character image
	 * @type {Image}
	 */
	characterImage: new Image(),

	/**
	 * The current animation to use for the character (1-3)
	 * @type {number}
	 */
	characterAnimation: 1,

	/**
	 * The current frame of the character animation
	 * @type {number}
	 */
	characterFrame: 0,

	/**
	 * Used to time out the character animation
	 * @type {number}
	 */
	characterInterval: null,

	/**
	 * The scale of the character sprite
	 * @type {number}
	 */
	characterScale: 1,

	/**
	 * The number of steps per frame of the character animation
	 * @type {number}
	 */
	characterSteps: 12,

	/**
	 * The size of each frame of the character sprite, when scaled
	 * @type {object}
	 * @property {number} x - The width of the frame
	 * @property {number} y - The height of the frame
	 */
	characterSize: { x: 160, y: 290 },

	/** 
	 * Set the Image file that will be used for transition animations
	 * @param {HTMLImageElement} image - A preloaded Image element
	 * @returns {void}
	 */
	setCharacterImage: function (image) {
		if (BrowserHelper.isMobile()) return;
		if (!image.src || !image.naturalHeight) throw ("Image not loaded!");
		this.characterImage = image;
		this.character.style.backgroundImage = 'url("' + this.characterImage.src + '")';
		this.startCharacterAnimation();
	},

	startCharacterAnimation: function () {

		if (BrowserHelper.isMobile()) return;

		let _this = this;

		this.stopCharacterAnimation();

		this.characterInterval = setInterval(function () {
			_this.characterFrame++;
			if (_this.characterFrame > 2) _this.characterFrame = 1;
			_this.updateCharacterAnimation();
		}, Math.round(PWGame.msPerTargetFrame * this.characterSteps));

		this.updateCharacterAnimation();
	},

	stopCharacterAnimation: function () {

		if (BrowserHelper.isMobile()) return;
		if (this.characterInterval) clearInterval(this.characterInterval);
	},

	/**
	 * Scales the character sprite 
	 * @param {number} scale - The scale to use (0-1)
	 * @returns {void}
	 */
	setCharacterScale: function (scale) {
		if (BrowserHelper.isMobile()) return;
		let lo = this.layoutDesktop;
		this.characterSize.x = Math.round(lo.characterFrameWidth * scale);
		this.characterSize.y = Math.round(lo.characterFrameHeight * scale);
		this.character.style.backgroundSize = (this.characterSize.x * 3) + "px " + (this.characterSize.y * 2) + "px";
		this.characterScale = scale;
	},

	updateCharacterAnimation: function () {
		let y = (this.characterFrame - 1) * this.characterSize.y;
		let x = (this.characterAnimation - 1) * this.characterSize.x;

		this.character.style.backgroundPosition = "-" + x + "px -" + y + "px";
	},

	logoImage: new Image(),
	logoScale: 1,
	logoSize: { x: 320, y: 180 },
	/** 
	 * Set the Image file that will be used for transition animations
	 * @param {HTMLImageElement} image - A preloaded Image element
	 * @returns {void}
	 */
	setLogoImage: function (image) {
		if (BrowserHelper.isMobile()) return;
		if (!image.src || !image.naturalHeight) throw ("Image not loaded!");
		this.logoImage = image;
		this.logo.style.backgroundImage = 'url("' + this.logoImage.src + '")';
	},

	/**
	 * Scales the logo sprite 
	 * @param {number} scale - The scale to use (0-1)
	 * @returns {void}
	 */
	setLogoScale: function (scale) {
		if (BrowserHelper.isMobile()) return;
		let lo = this.layoutDesktop;
		this.logoSize.x = Math.round(lo.logoWidth * scale);
		this.logoSize.y = Math.round(lo.logoHeight * scale);
		this.logo.style.backgroundSize = this.logoSize.x + "px " + this.logoSize.y + "px";
		this.logoScale = scale;
	},

	/**
	 * Uses a 100%x100% div to figure out the browser space we have available (seems to work better on Safari then built in screen size methods)
	 * @returns {object} - An object containing information about the screen/document size
	 */
	getWindowSize: function () {
		// default
		var size = { orientation: 'desktop' };

		// add the full-screen div
		let elem = document.createElement('div');
		elem.style.cssText = 'position:fixed;width:100%;height:100%;top:0px;left:0px';
		document.body.appendChild(elem);

		// check if the browser is mobile.  If it is, figure out the orientation based on width vs height
		if (BrowserHelper.isMobile()) {
			size.orientation = elem.clientWidth > elem.clientHeight ? 'landscape' : 'portrait';
		}

		// some browsers treat screen width/height as portrait size, no matter what orientation you are in. This records the actual width/height for current orientation
		if ((window.screen.width > window.screen.height && size.orientation == 'portrait') || (window.screen.width < window.screen.height && size.orientation == 'landscape')) {
			size.width = window.screen.height;
			size.height = window.screen.width;
		} else {
			size.width = window.screen.width;
			size.height = window.screen.height;
		}

		// record the width and height of our div to get an accurate number of how much space our screen has
		size.ew = elem.clientWidth;
		size.eh = elem.clientHeight;

		// remove the full-screen div and return our new size info
		elem.parentNode.removeChild(elem);
		return size;
	},

	/** 
	 * This is fires when a window is resized or a mobile device changes orientation
	 * @returns {void}
	 */
	updateGameScreenOrientation: function () {
		// get our size info
		let size = GameWrapper.getWindowSize();

		// if we're in game mode, display the appropriate view
		if (this.view === 'game') {

			if (size.orientation === 'landscape') {
				GameWrapper.viewGameMobileLandscape(size);
			} else if (size.orientation === 'portrait') {
				GameWrapper.viewGameMobilePortrait(size);
			} else {
				GameWrapper.viewGameDesktop(size);
			}

			this.gameplaySkin.setAttribute('class', "gameplay-skin " + size.orientation);
		}

	}
};