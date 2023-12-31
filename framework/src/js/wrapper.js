/** Handles setting up the layout for different devices and orientations, and on-screen inputs **/
const GameWrapper = {

	/** Current layout view, default = game */
	view: 'game',

	/** config for desktop view */
	layoutDesktop: {

		/** width of layout at 100% */
		baseWidth: 960,

		/** height of layout at 100% */
		baseHeight: 540,

		/** size of inner game screen (it's a square) at 100% */
		screenSize: 524,

		/** distance of screen from top of page 100% */
		screenTop:8
	},

	/** config for mobile portrait view */
	layoutGBC: {

		/** width of the full GBC at 100% */
		baseWidth: 720,

		/** height of the full GBC at 100% */
		baseHeight: 1280,

		/** size of the game screen (it's a square) at 100% */
		screenSize: 524,

		/** distance of screen from top of the GBC at 100% */
		screenTop: 64,

		/** width of the frame around the screen at 100% */
		screenFrameWidth: 662,

		/** height of the frame around the screen at 100% */
		screenFrameHeight: 714,

		/** distance of frame from top of the GBC at 100% */
		screenFrameTop: 29, 

		/** distance of main controls from top of GBC at 100% */
		mainButtonFrameTop: 775,

		/** height of main control frame at 100% */
		mainButtonFrameHeight: 212,
		
		/** size of individual A/B buttons at 100% */
		mainButtonSize: 140,

		/** whitespace/shadow margin of the button image */
		mainButtonMargin: -7,

		/** distance of small controls and speaker from top of GBC at 100% */
		smallButtonFrameTop: 1058,
		
		/** width of the start/select button image at 100% */
		smallButtonWidth: 212,

		/** height of the start/select button image at 100% */
		smallButtonHeight: 55,

		/** touch area size of start/select buttons */
		smallButtonSize: 92,

		/** space around input containers at 100% */
		inputMarginX: 40,

		/** size of actual d-pad at 100% */
		dPadSize: 192,

		/** deadzone for dpad at 100% (touch distance from center before it does anything) */
		dPadDeadzone: 10,

		/** width of the a/b button image at 100% */
		AbButtonWidth: 239,

		/** height of the a/b button image at 100% */
		AbButtonHeight: 162,

		/** width of speaker image at 100% */
		speakerWidth: 154,

		/** height of speaker image at 100% */
		speakerHeight: 162
	},

	// config for mobile landscape view
	layoutGBA: {

		/** width of the full GBA at 100% */
		baseWidth: 1280,
		
		/** height of the full GBA at 100% */
		baseHeight: 720,

		/** size of the game screen (it's a square) at 100% */
		screenSize: 524,

		/** distance of screen from top of the GBA at 100% */
		screenTop: 52,

		/** width of the frame around the screen at 100% */
		screenFrameWidth: 654,
		
		/** height of the frame around the screen at 100% */
		screenFrameHeight: 666,

		/** distance of frame from top of the GBA at 100% */
		screenFrameTop: 18, 
		
		/** width of input (and speaker) containers at 100% */
		inputWidth: 261,

		/** space around input containers at 100% */
		inputMarginX: 46,

		/** to position of input containers at 100% */
		inputTop: 158,

		/** height of container for d-pad and a/b buttons at 100% */
		topInputHeight: 236,

		/** height of container for start/select buttons and speaker */
		bottomInputHeight: 243,

		/** size of actual d-pad at 100% */
		dPadSize: 192,

		/** deadzone for dpad at 100% (touch distance from center before it does anything) */
		dPadDeadzone: 10,

		/** width of the a/b button image at 100% */
		AbButtonWidth: 239,

		/** height of the a/b button image at 100% */
		AbButtonHeight: 162,

		/** size of individual A/B buttons at 100% */
		mainButtonSize: 140,

		/** whitespace/shadow margin of the button image */
		mainButtonMargin: -7,

		/** width of the start/select button image at 100% */
		smallButtonWidth: 193,
		
		/** height of the start/select button image at 100% */
		smallButtonHeight: 144,

		/** size of start/select buttons at 100% */
		smallButtonSize: 59,

		/** relative left postition of the buttons within the image, at 100% */
		smallButtonLeft: 129,
		
		/** relative top postition of the start button, at 100% */
		startButtonTop: 17,

		/** relative top postition of the select button, at 100% */
		selectButtonTop: 81,

		/** top position of led image */
		ledTop: 89,

		/** size of led image */
		ledSize: 56,

		/** width of speaker at 100% */
		speakerWidth: 167,

		/** width of speaker at 100% */
		speakerHeight: 134
	},

	/**
	 * Gets the offest of an element on the screen
	 * @param {HTMLElement} elem - The element to check
	 */
	getOffset: function( elem )
	{
		var offset = {top:0, left:0};
		do {
			if (!isNaN(elem.offsetLeft)) offset.left += elem.offsetLeft;
			if (!isNaN(elem.offsetTop)) offset.top += elem.offsetTop;
		} while( elem = elem.offsetParent );

		return offset;
	},

	/** 
	 * Initialize the layout controller
	 * @param {object} config - object of config values
	 */
	init: function(config)
	{
		var _this = this;

		// reference all the main screen elements
		this.viewport = document.getElementById('viewport');
		this.fader = document.getElementById('fader');
		this.loadingSkin = document.getElementById('loading-skin');
		this.loaderBar = document.getElementById('loader-bar');
		this.gameplaySkin = document.getElementById('gameplay-skin');
		this.uiElements = document.getElementById('ui-elements');
		this.screenframe = document.getElementById('screenframe');
		this.screenTransition = document.getElementById('screenTransition');
		this.screen = document.getElementById('screen');
		this.led = document.getElementById('led');
		this.dPadFrame = document.getElementById('dpad-frame');
		this.dPad = document.getElementById('dpad');
		this.dPadHighlight = document.getElementById('dpad-highlight');
		this.AbButtonsFrame = document.getElementById('ab-buttons-frame');
		this.AbButtons = document.getElementById('ab-buttons');
		this.aButton = document.getElementById('a-button');
		this.bButton = document.getElementById('b-button');
		this.startSelectButtonsFrame = document.getElementById('start-select-buttons-frame');
		this.startSelectButtons = document.getElementById('start-select-buttons');
		this.startButton = document.getElementById('start-button');
		this.selectButton = document.getElementById('select-button');
		this.speakerFrame = document.getElementById('speaker-frame');
		this.speaker = document.getElementById('speaker');
		this.character = document.getElementById('character');
		this.screenHint = document.getElementById('screenHint');
		this.hintText = document.getElementById('hintText');
		this.hintShadow = document.getElementById('hintShadow');

		// pre-calculate radians to degrees
		this.rad2deg = 180 / Math.PI;

		// direction values (adding any combination of these will give a unique value)
		this.dirval = {
			up: 1,
			down: 2,
			left: 4,
			right: 8
		};

		// UI states
		this.ui = {
			up: false,
			right: false,
			down: false,
			left: false,
			A: false,
			B: false,
			select: false,
			start: false
		};

		// input element config data
		this.inputs = {
			dpad: {x:0,y:0,size:0,touch:false,deadzone:0},
			A: {x:0,y:0,size:0,touch:false},
			B: {x:0,y:0,size:0,touch:false},
			select: {x:0,y:0,size:0,touch:false},
			start: {x:0,y:0,size:0,touch:false}
		};

		// handle screen size changes and orientation updates
		window.addEventListener("resize", ()=>{
			// gotta wait for the rotate animation to happen on IOS
			setTimeout(()=>{
				GameWrapper.updateGameScreenOrientation();
			}, 500);
		});

		/** 
		 * Handle the start of touch events on our UI elements
		 * @param {string} key - The input key (dpad, A, B, start, etc...)
		 * @param {Touch} touch - the touch object that triggered this call
		 */
		function startTouch(key, touch)
		{

			// If the update is on the d-pad, we have to check for changes on every event
			if (key == 'dpad') {

				// record the touch that's on the d-pad so we can track it as it moves or releases
				_this.inputs[key].touch = touch.identifier;

				// calculate what state the d-pad was in before this update
				let oldval = 0;
				for(const [dir, val] of Object.entries(_this.dirval)) {
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
				down.forEach((dir)=>{
					_this.ui[dir] = true;
					newval += _this.dirval[dir];
				});

				// if the state didn't change, we can leave without firing any new events
				if (newval === oldval) return;

				// show and move the d-pad highlight to inicate what the player is pressing
				_this.dPadHighlight.style.display = "block";
				_this.dPadHighlight.setAttribute('class',down.join("-"));
			
			// If we have a linked touch already, the player has another touch already on this button. We'll ignore this new one
			} else if (_this.inputs[key].touch === touch.identifier) {
				return;

			// This is a new button press. Update the state and show the button highlight
			} else {
				_this.inputs[key].touch = touch.identifier;
				let elem = key.toLowerCase() + "Button";
				_this[elem].style.display = "block";
				_this.ui[key] = true;
			}

			// fire any callback functions with the current UI states and return true.
			_this.onInputChanged.call(_this.onInputChangedThisArg, _this.ui);
			return true;
		}

		/** 
		 * Handle end of touches
		 * @param {string} key - The input key (dpad, A, B, start, etc...)
		 * @param {Touch} touch - the touch object that triggered this call
		 */
		function endTouch(key, touch)
		{
			// this touch event wasn't already attached to this input, we can leave now
			if (_this.inputs[key].touch !== touch.identifier) return;

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
			}

			// fire any callback functions with the current UI states and return true.
			_this.onInputChanged.call(_this.onInputChangedThisArg, _this.ui);
			return true;
		}
		
		/** 
		 * Check if a touch event is hitting or leaving any of our UI elements
		 * @param {TouchEvent} e - The touch event we need to check
		 */
		function checkTouch(e) 
		{
			// Check for any changed touches in the event
			for (var i=0; i < e.changedTouches.length; i++) {
				
				let touch = e.changedTouches[i];

				// touch is ended
				if (e.type == 'touchcancel' || e.type == 'touchend') {

					// cycle through all of our inputs
					for(const [key, state] of Object.entries(_this.inputs)) {

						// check if this touch is releasing this input key
						if (endTouch(key, touch)) e.preventDefault();
					}

				// this is either a new touch, or one that moved
				} else {

					// cycle through all of our inputs
					for(const [key, state] of Object.entries(_this.inputs)) {

						// check the general bounds (from the center)
						var xdst = Math.abs(touch.clientX - state.x);
						var ydst = Math.abs(touch.clientY - state.y);
						var span = state.size/2;

						// use this distance if we're not in the bounding box at all
						var dst = 9999; 

						// if we're in the general bounding box, find the actual distance from center
						if (xdst <= span && ydst <= span) dst = Math.sqrt((xdst*xdst)+(ydst*ydst));

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
		document.body.onclick = function(e) {
			e.preventDefault();
		}

		// set up touch listeners for the overall document
		document.ontouchstart = checkTouch;
		document.ontouchmove = checkTouch;
		document.ontouchend = checkTouch;
		document.ontouchcancel = checkTouch;

		// save any screen update callbacks from the config, or use an empty function
		this.onScreenUpdated = typeof(config.onScreenUpdated) !== 'undefined' ? config.onScreenUpdated : function(screen){};
		this.onScreenUpdatedThisArg = typeof(config.onScreenUpdatedThisArg) !== 'undefined' ? config.onScreenUpdatedThisArg : this;

		// save any input change callbacks from the config, or use an empty function
		this.onInputChanged = typeof(config.onInputChanged) !== 'undefined' ? config.onInputChanged : function(input,state){};
		this.onInputChangedThisArg = typeof(config.onInputChangedThisArg) !== 'undefined' ? config.onInputChangedThisArg : this;
		 
		// check the current screen orientation
		this.updateGameScreenOrientation();
	},

	/**
	 * Resets all the visual input elements (hide highlights, clear skins, etc)
	 */
	resetGameElements: function() 
	{
		document.body.setAttribute('class', "");
		this.uiElements.setAttribute('style', "");
		this.screenframe.setAttribute('style', "");
		this.screenTransition.setAttribute('style', "");
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
	 */
	viewGameMobileLandscape: function(size) 
	{
		// reset all our elements
		this.resetGameElements(size);

		// reference the layout rules
		var lo = this.layoutGBA;

		// figure out the best scale to use for the game screen
		let scaleX = size.ew / lo.baseWidth;
		let scaleY = size.eh / lo.baseHeight;
		let scale = scaleX < scaleY ? scaleX : scaleY;
		
		// set the page class based on the scale (will set frame elements to diffenet sizes)
		if (scale >= 1.3) document.body.setAttribute('class','zoom-1-3');
		else if (scale <= 0.7) document.body.setAttribute('class','zoom-0-5');
		else if (scale <= 0.9) document.body.setAttribute('class','zoom-0-8');

		// resize the game skin to lock aspect ratio
		let skinWidth = Math.round((lo.baseWidth * scale)/2)*2;
		let skinHeight = Math.round((lo.baseHeight * scale)/2)*2;

		// calculate any gutter space
		let skinMarginX = (size.ew - skinWidth)/2;
		let skinMarginY = (size.eh - skinHeight)/2;

		// size nd position the skin
		this.gameplaySkin.style.width = skinWidth + "px";
		this.gameplaySkin.style.height = skinHeight + "px";
		this.gameplaySkin.style.top = skinMarginY + "px";
		this.gameplaySkin.style.left = skinMarginX + "px";

		// update the frame around the game screen
		let fWidth = Math.ceil(lo.screenFrameWidth * scale);
		let fHeight = Math.ceil(lo.screenFrameHeight * scale);
		let fLeft = Math.round(((skinWidth - fWidth)/2));
		let fTop = Math.round(((skinHeight - fHeight) * (lo.screenFrameTop / (lo.baseHeight - lo.screenFrameHeight))));
		this.screenframe.style.width = fWidth+"px";
		this.screenframe.style.height = fHeight+"px";
		this.screenframe.style.top = fTop+"px";
		this.screenframe.style.left = fLeft+"px";


		// record the game screen size and position
		let screen = {
			// make sure the size is a factor of 2 to avoid blurring the canvas when centering
			size: Math.round((lo.screenSize * scale)/2) * 2
		};
		screen.top = skinMarginY + Math.round(lo.screenTop * scale);
		screen.left = Math.round(((size.ew - screen.size)/2));

		// size and position the gam screen element
		this.screen.style.width = this.screen.style.height = screen.size+"px";
		this.screen.style.top = screen.top+"px";
		this.screen.style.left = screen.left+"px";

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
		this.dPadFrame.style.width = this.AbButtonsFrame.style.width = this.startSelectButtonsFrame.style.width = this.speakerFrame.style.width = uiFrameWidth+"px";
		this.dPadFrame.style.height = this.AbButtonsFrame.style.height = topInputHeight+"px";
		this.startSelectButtonsFrame.style.height = this.speakerFrame.style.height = bottomInputHeight+"px";

		// position containers
		this.dPadFrame.style.top = this.AbButtonsFrame.style.top = inputTop+"px";
		this.startSelectButtonsFrame.style.top = this.speakerFrame.style.top = (inputTop+topInputHeight)+"px";
		this.dPadFrame.style.left = this.startSelectButtonsFrame.style.left = inputMarginX+"px";
		this.AbButtonsFrame.style.right = this.speakerFrame.style.right = inputMarginX+"px";

		// set size of d-pad
		this.dPad.style.width = this.dPad.style.height = dPadSize+"px";

		// size annd position the LED
		this.led.style.width = this.led.style.height = ledSize+"px";
		this.led.style.left = (fLeft + fWidth) + "px";
		this.led.style.top = ledTop+"px"

		// set size of A/B buttons
		this.AbButtons.style.width = AbButtonWidth+"px";
		this.AbButtons.style.height = AbButtonHeight+"px";

		// set size of the A/B button press zones
		this.aButton.style.width = this.aButton.style.height = this.bButton.style.width = this.bButton.style.height = mainButtonSize+"px";
		this.aButton.style.top = this.aButton.style.right = this.bButton.style.bottom = this.bButton.style.left = mainButtonMargin+"px";

		// set the size of the start/select buttons
		this.startSelectButtons.style.width = smallButtonWidth+"px";
		this.startSelectButtons.style.height = smallButtonHeight+"px";

		this.startButton.style.width = this.startButton.style.height = this.selectButton.style.width = this.selectButton.style.height = smallButtonSize+"px";

		this.startButton.style.left = this.selectButton.style.left = smallButtonLeft+"px";
		this.startButton.style.top = startButtonTop+"px";
		this.selectButton.style.top = selectButtonTop+"px";

		// set the size of the speaker
		this.speaker.style.width = Math.round(lo.speakerWidth * scale)+"px";
		this.speaker.style.height = Math.round(lo.speakerHeight * scale)+"px";

		// update positions and sizes in our input objects (used for touch detection)
		this.inputs.dpad.x = inputMarginX + (uiFrameWidth/2) + skinMarginX;
		this.inputs.dpad.y = inputTop + (topInputHeight/2) + skinMarginY;
		this.inputs.dpad.size = dPadSize;
		this.inputs.dpad.deadzone = Math.floor(lo.dPadDeadzone * scale);
		
		this.inputs.start.x = inputMarginX + smallButtonLeft + ((smallButtonSize + uiFrameWidth - smallButtonWidth)/2) + skinMarginX;
		this.inputs.start.y = inputTop + topInputHeight + startButtonTop + ((smallButtonSize + bottomInputHeight - smallButtonHeight)/2) + skinMarginY;
		this.inputs.start.size = smallButtonSize;

		this.inputs.select.x = inputMarginX + smallButtonLeft + ((smallButtonSize + uiFrameWidth - smallButtonWidth)/2) + skinMarginX;
		this.inputs.select.y = inputTop + topInputHeight + selectButtonTop + ((smallButtonSize + bottomInputHeight - smallButtonHeight)/2) + skinMarginY;
		this.inputs.select.size = smallButtonSize;

		this.inputs.A.x = size.ew - inputMarginX - ((mainButtonSize + uiFrameWidth - AbButtonWidth)/2) - skinMarginX;
		this.inputs.A.y = inputTop + ((mainButtonSize + topInputHeight - AbButtonHeight)/2) + skinMarginY;
		this.inputs.A.size = mainButtonSize;

		this.inputs.B.x = size.ew - inputMarginX - uiFrameWidth + ((mainButtonSize + uiFrameWidth - AbButtonWidth)/2) - skinMarginX;
		this.inputs.B.y = inputTop + topInputHeight - ((mainButtonSize + topInputHeight - AbButtonHeight)/2) + skinMarginY;
		this.inputs.B.size = mainButtonSize;

		// let the core game engine know the screen changed so it can update itself as needed.
		this.onScreenUpdated.call(this.onScreenUpdatedThisArg, screen);
	},

	/**
	 * Updates the page for portrait view on mobile (Gameboy Color)
	 * @param {object} size - an object containing information about the screen/document size
	 */
	viewGameMobilePortrait: function(size) 
	{
		// reset all the elements
		this.resetGameElements(size);

		// reference the layout rules
		var lo = this.layoutGBC;

		// figure out the best scale to use for the game screen
		let scaleX = size.ew / lo.baseWidth;
		let scaleY = size.eh / lo.baseHeight;
		let scale = scaleX < scaleY ? scaleX : scaleY;
		
		// set the page class based on scale (will adjust element sizes)
		if (scale >= 1.3) document.body.setAttribute('class','zoom-1-3');
		else if (scale <= 0.7) document.body.setAttribute('class','zoom-0-5');
		else if (scale <= 0.9) document.body.setAttribute('class','zoom-0-8');

		// resize the game skin to lock aspect ratio
		let skinWidth = Math.round((lo.baseWidth * scale)/2)*2;
		let skinHeight = Math.round((lo.baseHeight * scale)/2)*2;

		// calculate any gutter space
		let skinMarginX = (size.ew - skinWidth)/2;
		let skinMarginY = (size.eh - skinHeight)/2;

		// size and position the skin
		this.gameplaySkin.style.width = skinWidth + "px";
		this.gameplaySkin.style.height = skinHeight + "px";
		this.gameplaySkin.style.top = skinMarginY + "px";
		this.gameplaySkin.style.left = skinMarginX + "px";

		// update the frame around the game screen
		let fWidth = Math.ceil(lo.screenFrameWidth * scale);
		let fHeight = Math.ceil(lo.screenFrameHeight * scale);
		let fLeft = Math.round(((skinWidth - fWidth)/2));
		let fTop = Math.round(((skinHeight - fHeight) * (lo.screenFrameTop / (lo.baseHeight - lo.screenFrameHeight))));
		
		this.screenframe.style.width = fWidth+"px";
		this.screenframe.style.height = fHeight+"px";
		this.screenframe.style.top = fTop+"px";
		this.screenframe.style.left = fLeft+"px";


		// update the game screen 
		let screen = {
			// make sure the size is a factor of 2 to avoid blurring the canvas when centering
			size: Math.round((lo.screenSize * scale)/2) * 2
		};
		screen.top = skinMarginY + Math.round(lo.screenTop * scale);
		screen.left = Math.round(((size.ew - screen.size)/2));
		this.screen.style.width = this.screen.style.height = screen.size+"px";
		this.screen.style.top = screen.top+"px";
		this.screen.style.left = screen.left+"px";
		
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
		this.dPadFrame.style.top = this.AbButtonsFrame.style.top = mainButtonFrameTop+"px";
		this.dPadFrame.style.height = this.AbButtonsFrame.style.height = mainButtonFrameHeight+"px";
		this.dPadFrame.style.left = inputMarginX+"px";
		this.AbButtonsFrame.style.right = inputMarginX+"px";


		// resize dpad and a/b button images
		this.dPad.style.width = this.dPad.style.height = dPadSize+"px";
		this.AbButtons.style.width = AbButtonWidth+"px";
		this.AbButtons.style.height = AbButtonHeight+"px";

		// position and size the start/select and speaker containers
		this.startSelectButtonsFrame.style.top = this.speakerFrame.style.top = smallButtonFrameTop+"px";

		// resize start/select button image
		this.startSelectButtons.style.width = smallButtonWidth+"px";
		this.startSelectButtons.style.height = smallButtonHeight+"px";

		// position youch effect for start and selcet buttons
		this.startButton.style.top = this.selectButton.style.top = ((smallButtonHeight - smallButtonSize)/2)+"px";
		this.startButton.style.width = this.startButton.style.height = this.selectButton.style.width = this.selectButton.style.height = smallButtonSize+"px";
		this.startButton.style.right = this.selectButton.style.left = "0px";

		// resize speaker
		this.speaker.style.width = speakerWidth+"px";
		this.speaker.style.height = speakerHeight+"px";
		this.speaker.style.right = inputMarginX+"px";

		// update positions and sizes in our input object (used for touch detection)
		this.inputs.dpad.x = inputMarginX + (dPadSize/2) + skinMarginX;
		this.inputs.dpad.y = mainButtonFrameTop + (mainButtonFrameHeight/2) + skinMarginY;
		this.inputs.dpad.size = dPadSize;
		this.inputs.dpad.deadzone = Math.floor(lo.dPadDeadzone * scale);
		
		this.inputs.select.x = ((size.ew - smallButtonWidth + smallButtonSize)/2);
		this.inputs.select.y = smallButtonFrameTop + (smallButtonHeight/2) + skinMarginY;
		this.inputs.select.size = smallButtonSize;

		this.inputs.start.x = ((size.ew + smallButtonWidth - smallButtonSize)/2);
		this.inputs.start.y = smallButtonFrameTop + (smallButtonHeight/2) + skinMarginY;
		this.inputs.start.size = smallButtonSize;

		this.inputs.A.x = size.ew - inputMarginX - mainButtonMargin - (mainButtonSize/2) - skinMarginX;
		this.inputs.A.y = mainButtonFrameTop + mainButtonMargin + ((mainButtonFrameHeight - AbButtonHeight + mainButtonSize)/2) + skinMarginY;
		this.inputs.A.size = mainButtonSize;

		this.inputs.B.x = size.ew - inputMarginX - AbButtonWidth + mainButtonMargin + (mainButtonSize/2) - skinMarginX;
		this.inputs.B.y = mainButtonFrameTop + mainButtonFrameHeight - mainButtonMargin - ((mainButtonFrameHeight - AbButtonHeight + mainButtonSize)/2) + skinMarginY;
		this.inputs.B.size = mainButtonSize;

		// set size of the A/B button press zones
		this.aButton.style.width = this.aButton.style.height = this.bButton.style.width = this.bButton.style.height = mainButtonSize+"px";
		this.aButton.style.top = this.aButton.style.right = this.bButton.style.bottom = this.bButton.style.left = mainButtonMargin+"px";

		// let the core game engine know the screen changed so it can update itself as needed.
		this.onScreenUpdated.call(this.onScreenUpdatedThisArg, screen);
	},

	/**
	 * Updates the page for desktop view (fame with skin)
	 * @param {object} size - an object containing information about the screen/document size
	 */
	viewGameDesktop: function(size)
	{
		// reset all the input elements
		this.resetGameElements(size);

		// reference the layout rules
		var lo = this.layoutDesktop;

		// figure out the best scale to use for the game screen
		let scaleX = size.ew / lo.baseWidth;
		let scaleY = size.eh / lo.baseHeight;
		let scale = scaleX < scaleY ? scaleX : scaleY;

		// resize the game skin to lock aspect ratio
		let skinWidth = Math.round((lo.baseWidth * scale)/2)*2;
		let skinHeight = Math.round((lo.baseHeight * scale)/2)*2;

		// calculate any gutter space
		let skinMarginX = (size.ew - skinWidth)/2;
		let skinMarginY = (size.eh - skinHeight)/2;

		// size and position the skin
		this.gameplaySkin.style.width = skinWidth + "px";
		this.gameplaySkin.style.height = skinHeight + "px";
		this.gameplaySkin.style.top = skinMarginY + "px";
		this.gameplaySkin.style.left = skinMarginX + "px";
		
		// update the game screen 
		let screen = {
			// make sure the size is a factor of 2 to avoid blurring the canvas when centering
			size: Math.round((lo.screenSize * scale)/2) * 2
		};
		screen.top = skinMarginY + Math.round(lo.screenTop * scale);
		screen.left = Math.round(((size.ew - screen.size)/2));
		this.screen.style.width = this.screen.style.height = screen.size+"px";
		this.screen.style.top = screen.top+"px";
		this.screen.style.left = screen.left+"px";
		
		// get sizes for our input containers
		let characterWidth = Math.round(lo.characterWidth * scale);
		let characterHeight = Math.round(lo.characterHeight * scale);

		// let the core game engine know the screen changed so it can update itself as needed.
		this.onScreenUpdated.call(this.onScreenUpdatedThisArg, screen);
	},

	/** Show the generic loading view */
	showLoadScreen() 
	{
		this.loadingSkin.style.display = "";
	},

	/** 
	 * Updates the loading bar
	 * @param {numer} loaded - A number between 0 and 1 (1 = 100%)
	 */
	setLoadedValue(loaded) 
	{
		this.loaderBar.style.width = Math.round(loaded * 100)+"%";
	},

	/** Hide the generic loading view */
	hideLoadScreen() 
	{
		this.loadingSkin.style.display = "none";
	},

	/** Does a fade from black effect */
	fadeIn()
	{
		this.fader.style.opacity = "0";
	},

	/** Does a fade to black effect */
	fadeOut()
	{
		this.fader.style.opacity = "1";
	},

	/**
	 * A wrapper for fading out, switching views, and fading back in
	 */
	crossFade(onFadeOut,onFadeIn)
	{
		let _this = this;

		this.fadeOut();
		setTimeout(()=>{
			this.fadeIn();

			if (onFadeOut) {
				onFadeOut();
			}

			if (onFadeIn) {
				setTimeout(()=>{
					onFadeIn()
				},500);
			}
		},500);
	},

	/*
		this.screenHint = document.getElementById('screenHint');
		this.hintText = document.getElementById('hintText');
		this.hintShadow = document.getElementById('hintShadow');
	*/

	setHintText: function(hintText) 
	{
		this.hintText.innerHTML = this.hintShadow.innerHTML = "";
		this.screenHint.style.fontSize = "";
		this.screenHint.style.display = "";
		this.screenHint.style.transition = "";
		this.screenHint.style.transitionTimingFunction = "";

		let size = Math.floor(this.screenHint.offsetHeight);
		this.screenHint.style.fontSize = size + "px";
		this.hintText.textContent  = this.hintShadow.textContent  = hintText;

		this.screenHint.style.top = "-"+(size*2)+"px";
		let _this = this;

		setTimeout(()=>{
			_this.screenHint.style.transition = "0.2s";
			_this.screenHint.style.transitionTimingFunction = "ease-out";
			_this.screenHint.style.top = "";
		},1);

		setTimeout(()=>{
			_this.screenHint.style.transition = "0.2s";
			_this.screenHint.style.transitionTimingFunction = "ease-in";
			_this.screenHint.style.top = "-"+(size*2)+"px";
		},800);
	},

	/** The current transition image */
	transitionImage: new Image(),

	/** The base size of each transition frame */
	transitionSize: 524,

	/** The zoom level of the transition */
	transitionZoom: 1,

	/** The current animation frame of the transition */
	transitionFrame: 1,

	/** Used to manage the framerate of the 2 transition animations */
	transitionFramerates: {a:8, b:8},

	/**
	 * Exits a transition by setting it to frame 5, then zooming in
	 * @param {function} callback - A function to call when zooming in is complete
	 * @param {zoom} number - The zoom level to end at (default = 2)
	 * @param {time} number - The duration of the zoom animation in milliseconds
	 */
	exitTransition: function(callback, zoom, time)
	{
		if (!callback) throw("Missing required callback");

		this.screenTransition.style.display = "";

		if (!zoom) zoom = 2;
		if (!time) time = 250;

		let fps = 1000/60;
		let range = zoom-1;
		let frames = time/fps;
		let step = range/frames;

		let _this = this;

		_this.setTransitionZoom(1, 5);

		let zoomInterval = setInterval(

			function() 
			{
				if (_this.transitionZoom >= zoom) {
					clearInterval(zoomInterval);
					callback();
				} else {
					_this.setTransitionZoom(_this.transitionZoom + step, 5);
				}
			},

			fps
		)
	},

	/**
	 * Enters a transition by setting it to frame 5 zoomed in, then zooming out to 100%
	 * @param {function} callback - A function to call when zooming out is complete
	 * @param {zoom} number - The zoom level to start at (default = 2)
	 * @param {time} number - The duration of the zoom animation in milliseconds
	 */
	enterTransition: function(callback, zoom, time)
	{
		if (!callback) throw("Missing required callback");

		this.screenTransition.style.display = "";

		if (!zoom) zoom = 2;
		if (!time) time = 250;

		let fps = 1000/60;
		let range = zoom-1;
		let frames = time/fps;
		let step = range/frames;

		let _this = this;

		_this.setTransitionZoom(zoom, 5);

		let zoomInterval = setInterval(

			function() 
			{
				if (zoom === 1) {
					clearInterval(zoomInterval);
					callback();
				} else {
					zoom -= step;
					if (zoom < 1) zoom = 1;
					_this.setTransitionZoom(zoom, 5);
				}
			},

			fps
		)
	},

	/**
	 * Plays the idle animation for the transition 
	 * (frames 1 and 2 on a loop)
	 * @param {function} callback - A function to execute when the animation time expires
	 * @param {number} framerate - The framerate to animate at normal speed (default=8)
	 * @param {number} time - The number of milliseconds to play this animation for at normal speed (default=1500)
	 */
	playTransitionIdle: function(callback, framerate, time)
	{
		if (!callback) throw("Missing required callback");

		this.screenTransition.style.display = "";

		if (!time) time = 1500;
		if (!framerate) framerate = 8;
		let _this = this;

		let animationInterval = setInterval(

			function() 
			{
				_this.setTransitionFrame(_this.transitionFrame === 1 ? 2:1);
			},

			1000/framerate
		);

		let animationTimer = setTimeout(
			function() {
				clearInterval(animationInterval);
				callback();
			},

			time
		)
	},

	/**
	 * Plays the 'open' animation that exposes the next game
	 * (frames 2, 3 and 4)
	 * @param {function} callback - A function to execute when the animation time expires
	 * @param {number} framerate - The framerate to animate at normal speed (default=15)
	 * @param {number} time - The number of milliseconds to wait before running the callback (default = 500)
	 */
	playTransitionOpen: function(callback, framerate, time)
	{
		if (!callback) throw("Missing required callback");

		this.screenTransition.style.display = "";

		if (!time) time = 500;
		if (!framerate) framerate = 15;
		let _this = this;

		this.setTransitionFrame(3);

		let animationInterval = setInterval(

			function() 
			{
				_this.setTransitionFrame(_this.transitionFrame+1);
				if (_this.transitionFrame > 4) clearInterval(animationInterval);
			},

			1000/framerate
		);

		let animationTimer = setTimeout(
			function() {
				clearInterval(animationInterval);
				callback();
			},

			time
		)
	},

	/**
	 * Plays the 'close' animation that exposes the next game
	 * (frames 4, 3 and 2)
	 * @param {function} callback - A function to execute when the animation ends
	 * @param {number} framerate - The framerate to animate at normal speed (default=15)
	 */
	playTransitionClose: function(callback, framerate, time)
	{
		if (!callback) throw("Missing required callback");

		this.screenTransition.style.display = "";

		if (!time) time = 500;
		if (!framerate) framerate = 15;
		let _this = this;

		this.setTransitionFrame(5);

		let animationInterval = setInterval(

			function() 
			{
				_this.setTransitionFrame(_this.transitionFrame-1);
				if (_this.transitionFrame < 3) {
					clearInterval(animationInterval);
					callback();
				}
			},

			1000/framerate
		);
	},

	/** 
	 * Set the Image file that will be used for transition animations
	 * @param {HTMLImageElement} image - A preloaded Image element
	 */
	setTransitionImage: function(image)
	{
		if (!image.src || !image.naturalHeight) throw("Image not loaded!");
		this.transitionImage = image;
		this.screenTransition.style.background = 'url("'+this.transitionImage.src+'")';	
		this.screenTransition.style.backgroundColor = 'rgba(0,0,0,0.01)';	
		this.setTransitionZoom(1);
	},

	/**
	 * Set the zoom level of the transition
	 * @param {number} zoom - The zoom level (1 = 100%)
	 * @param {number} frame - A number between 1 and 5 (optional)
	 */
	setTransitionZoom(zoom, frame)
	{
		if (!this.transitionImage.src || !this.transitionImage.naturalHeight) throw("Image not loaded!");

		this.transitionZoom = zoom;

		this.transitionSize = Math.ceil(this.screenTransition.offsetHeight * zoom);

		let width = this.transitionSize * 5;
		let height = this.transitionSize;

		this.screenTransition.style.backgroundSize =  width+"px "+height+"px";

		this.setTransitionFrame(typeof(frame) !== 'undefined' ? frame : null);
	},

	/**
	 * Set the current animation frame of the transition Element
	 * @param {number} frame - A number between 1 and 5
	 */
	setTransitionFrame: function(frame)
	{
		if (!this.transitionImage.src || !this.transitionImage.naturalHeight) throw("Image not loaded!");

		if (frame === null) frame = 1;
		if (frame < 1 || frame > 5) throw("Frame must be a number between 1 and 5");
		this.transitionFrame = frame;

		let margin = (this.screenTransition.offsetHeight - this.transitionSize) / 2;

		let x = -(((this.transitionFrame-1) * this.transitionSize) - margin);
		let y = margin;

		this.screenTransition.style.backgroundPosition = "top "+y+"px left "+x+"px";
	},

	endTransition: function() {
		this.screenTransition.style.display = "none";
	},

	/**
	 * Uses a 100%x100% div to figure out the browser space we have available (seems to work better on Safari)
	 */
	getWindowSize: function() 
	{
		// default
		var size = {orientation:'desktop'};
		
		// add the full-screen div
		let elem = document.createElement('div');
		elem.style.cssText = 'position:fixed;width:100%;height:100%;top:0px;left:0px';
		document.body.appendChild(elem);

		// check if the browser is mobile.  If it is, figure out the orientation based on width vs height
		if (BrowserHelper.isMobile()) {
			size.orientation = elem.clientWidth > elem.clientHeight ? 'landscape':'portrait';
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
	 */
	updateGameScreenOrientation: function() 
	{
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
			
			this.gameplaySkin.setAttribute('class',"gameplay-skin "+size.orientation);
		}

	}
};