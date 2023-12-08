var _Manifests = {
     "microgames": {
          "psychogoldfish_tests": {
               "push_the_button": {
                    "name": "Push the Button",
                    "sceneClass": "microgames.psychogoldfish_tests.push_the_button",
                    "input": "gamepad",
                    "hint": "Push Da Button!",
                    "jsFiles": [
                         "push-the-button.js"
                    ],
                    "images": [
                         {
                              "key": "button_up",
                              "image": "button_up.png"
                         },
                         {
                              "key": "button_down",
                              "image": "button_down.png"
                         },
                         {
                              "key": "finger",
                              "image": "finger.png"
                         }
                    ],
                    "credits": [
                         {
                              "credit": "designer",
                              "name": "PsychoGoldfish"
                         }
                    ]
               }
          }
     }
};

// This script contains helful functions used by other files

/**
 * Uses a promise to create a script tag and handle things after it has loaded or errored out
 * @param {string} scriptUrl - The location of the scriot we are loading
 * @return Promise
 */
function loaderScript(scriptUrl){
   return new Promise(function (res, rej) {
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.addEventListener('error',rej);
    script.addEventListener('load',res);
    script.src = scriptUrl;
    document.head.appendChild(script);
 });
}

/**
 * Checks a string to see if it contains any substrings in an array. 
 * Returns null if no substrings were found, or index of first substring found.
 * (Always check result for null as you may get a 0 for a valid substring!)
 * @param {string} str - our haystack
 * @param {Array.<string>} substrings - an array of needles
 * @return {(number|null)}
 */
function containsAny(str, substrings) {
    for (var i = 0; i != substrings.length; i++) {
       var substring = substrings[i];
       if (str.indexOf(substring) != - 1) {
         return substring;
       }
    }
    return null; 
}

/**
 * Creates an audio element with a blank sound and plays it.  Used to enable sound input on any input event, mostly to get sound working in Safari
 * @param {function} callback - Function to call when sound has been enabled.
 * @param {object} thisarg - The object to use as 'this' context in the callback function.
 */
var __safariSoundHack = (()=>{

  let __safariAudiotag = document.createElement('audio');
  document.body.appendChild(__safariAudiotag);
  __safariAudiotag.src = 'data:audio/x-wav;base64,UklGRooWAABXQVZFZm10IBAAAAABAAEAIlYAAESsAAACABAAZGF0YWYWAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';

  /**
   * @param {function} callback - Function to call when sound has been enabled.
   * @param {object} thisarg - The object to use as 'this' context in the callback function.
   */
  return (callback,thisarg)=>{

    __safariAudiotag.onended = ()=>{
      thisarg ? callback.call(thisarg) : callback();
    };
    __safariAudiotag.play();
  };

})();
/**
 * a few methods for browser detection
 */
const BrowserHelper = {

	/**
	 * @returns {boolean} true if this is detected as a mobile device
	 */
	isMobile: function() {
		return (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) || (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.platform)))
	},

	/**
	 * @returns {boolean} true if this is detected as an iOS device
	 */
	isIOS: function() {
		return this.isMobile() && this.isSafari();
	},

	/**
	 * @returns {boolean} true if this is detected as a Safari browser 
	 */
	isSafari: function() {
		return navigator.userAgent.indexOf("Safari") > -1;
	}

}
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
/** 
 * A class for managing user input 
 * 
 * this is globally accessible as 'PWGame.input'
 */
class PWInput {
	
	constructor() 
	{	
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
			for(const [input, key] of Object.entries(_this.keyMap)) {
				if (e.code == key) {
					_this.setInputState(input,true,e);
					break;
				}
			};
		}

		// handle key release
		function onKeyUp(e) {
			for(const [input, key] of Object.entries(_this.keyMap)) {
				if (e.code == key) {
					_this.setInputState(input,false,e);
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
	setKeyMap(map)
	{
		this.keyMap = {};
		for(const [input, key] of Object.entries(this['keyMap_'+map])) {
			this.mapKey(key, input);
		}
	}

	/**
	 * maps a key to an input
	 * @param {string} key - The keyboard key name
	 * @param {string} input - The input to map the key to
	 */
	mapKey(key, input) 
	{
		this.keyMap[input] = key;
	}

	/**
	 * resets input states and callback events
	 */
	reset()
	{
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
	setAlias(alias, inputs)
	{
		if (typeof(inputs) == 'string') inputs = [inputs];
		let _this = this;

		inputs.forEach((input)=>{
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
	isDown(input)
	{
		if (this._alias_map[input]) {
			
			for(var i in this._alias_map[input]) {
				if (this.inputs[this._alias_map[input][i]]) return true;
			}
			return false;
		}
		return typeof(this.inputs[input]) !== 'undefined' ? this.inputs[input] : false;
	}

	/**
	 * triggers a callback function when an input is pressed
	 * @param {string} input - The input to check
	 * @param {function} callback - The callback function to trigger
	 * @param {object} thisarg - The object that will have the 'this' context in your callback
	 */
	onPress(input,callback,thisarg)
	{
		this._onPressThisArg[input] = typeof(thisarg) !== 'undefined' ? thisarg : this;
		this._onPress[input] = callback;
	}

	/**
	 * triggers a callback function when an input is released
	 * @param {string} input - The input to check
	 * @param {function} callback - The callback function to trigger
	 * @param {object} thisarg - The object that will have the 'this' context in your callback
	 */
	onRelease(input,callback,thisarg)
	{
		this._onReleaseThisArg[input] = typeof(thisarg) !== 'undefined' ? thisarg : this;
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
			this._aliases[input].forEach(function(k) {
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
	onLayoutInputChanged(states)
	{
		let _this = this;

		// go through each input state from the touch controls and update the state data in this class
		for(const [key, state] of Object.entries(states)) {
			if (state !== _this.inputs[key]) {
				_this.setInputState(key,state,null);
			}
		};
	}

}

PWInput.PLAYMODE_GAMEPAD = 'gamepad';
PWInput.PLAYMODE_TOUCH = 'touch';
/** 
 * Picoware Framework Controller 
 * 
 * An instance of this will be globally accessible as 'PWGame'
 */
class PWFramework {
	
	/**
	 * Create instance of the framework
	 * @param {string} usermode - The mode the current user is running in. Can be 'dev','debug' or 'prod'
	 */
	constructor(usermode) 
	{	
		// set our usermode
		this.usermode = usermode;

		// properties
		this.screensize = 524;					// width and height of the microgame screen
		this.screen = null;						// will be used to contain screen size information
		this.paused = false;					// pause state of the game
		this.in_transition = false;				// used to note when the game is transitioning between scenes/microgames
		this.targetFPS = 60;					// the FPS we are basing all of our timing on.
		this.gameSpeed = PWConfig.SPEED_NORMAL	// the current speed modifier, used when increasing level difficulty.
		this.msPerTargetFrame = null;			// The number of ms we expect to happen during a single frame. this will be set when setGameSpeed is called
		
		/**
		 * Handles input from on-screen gamepad and keyboard
		 * @type PWInput
		 */
		this.input = new PWInput();
		
		// handler for when manifest files are loaded
		this.onManifestsLoaded = ()=>{};

		// set the default BPM for our microgames/music
		this.setGameSpeed(this.gameSpeed);
	}

	/**
	 * Starts the framework (This is called in our index.html file)
	 */
	start() {

		// reference for use in functions/closures
		let _this = this;

		// initialize the game wrapper (see wrapper.js).  This wrapper handles the game frames (like the GBA and GBC skins), 
		// fade effects, screen resizes, and on-screen input events.
		GameWrapper.init({
			onScreenUpdated: this.onScreenUpdated,
			onScreenUpdatedThisArg: this,
			onInputChanged:this.input.onLayoutInputChanged,
			onInputChangedThisArg:this.input
		});

		// Executes when Phaser is ready to use
		function PhaserReady() {

			// register the generic preloader scene with Phaser(see sceneloader.js)
			_this.phaser.scene.add('PWGameSceneloader', new PWGameSceneloader());

			// start the game in dev mode
			if (_this.usermode === 'dev') {
				_this.startDevScreen();
			}
		}

		// start our Phaser instance
		this.phaser = new Phaser.Game({
			parent: "screen",
			type: Phaser.AUTO,
			width: this.screensize,
			height: this.screensize,
			id: "PhaserCanvas",
			backgroundColor: '#8ba05b',
			scene:{
				create: PhaserReady
			}
		});
	}

	/**
	 * Handles resizing the Phaser canvas on size and orientation changes
	 * @param {object} screen - An object containing information about the user's current screen size
	 */
	onScreenUpdated(screen) 
	{
		this.screen = screen;
		if (this.phaser && this.phaser.canvas) {
			this.phaser.canvas.style.width = screen.size+"px";
			this.phaser.canvas.style.height = screen.size+"px";
		}
	}

	/**
	 * Starts the developer mode option screen
	 */
	startDevScreen()
	{
		// reference for use in functions/closures
		let _this = this;

		// used to prevent double-click issues
		let loading = false;

		// reference our html elements
		let devFrame = document.getElementById("dev-interface");		// loading forms for Dev Mode
		let levelInput = document.getElementById("level-path");			// input for level path to load
		let levelButton = document.getElementById("load-level-path");	// button to load a level
		let gameInput = document.getElementById("game-path");			// input for microgame path to load
		let gameButton = document.getElementById("load-game-path");		// button to load a microgame

		// show the developer options
		devFrame.style.display = "";

		// hide the Phaser canvas and game overlay until they are needed
		this.phaser.canvas.style.display = "none";
		GameWrapper.gameplaySkin.style.display = "none";

		// so our fade in effect
		GameWrapper.fadeIn();

		/**
		 * Validates load paths. 
		 * Returns path as an array, or false if path is invalid.
		 * @param {string} path - The {devteam}/{item_name} path for games, levels, etc
		 * @return {(Array|boolean)}
		 */
		function validatePath(path) {
			path = path.split("/");
			if (path.length !== 2) {
				console.error("Invalid path!",path);
				alert("Invalid path!");
				return false;
			}
			return path;
		}

		// handle the Load Microgame button
		gameButton.onclick = function(click_event) 
		{
			if (loading) return; // ignore clicks if we're already loading the game
			
			// cancel out the click event so nothing else can get triggered
			click_event.preventDefault();
			click_event.stopPropagation();

			// check if user inputed a valid path. Return if it's invalid
			let path = validatePath(gameInput.value);
			if (!path) return;

			// create a fake level manifest that only uses the level we want to test
			let manifest = {
				logo: "img/devmode_icon.webp",
				microgames: [
					path
				],
				gamesPerRound: 1,
				devMode: true
			};

			// disable pointer events to loack the developer forms for now
			devFrame.style.pointerEvents = "none";

			// do our fade out/fade in effect
			GameWrapper.crossFade(function() {

				// hide the developer menu while we're playing.
				devFrame.style.display = "none";

				// turn pointer events back on so the dev menu will work when we go back to it later
				devFrame.style.pointerEvents = "";

				// start our fake level
				_this.startLevel(manifest);
			});
		}
	}

	/**
	 * Starts a level
	 * @param {object} manifest - The manifest assciated with the level
	 */
	startLevel(manifest) {

		// Levels will always start with either a cutscene or a transition animation
		this.in_transition = true;

		// referenece to self for use in closures and functions
		let _this = this;

		// get our actual level instance (see level.js)
		this.level = new PWLevel(manifest);

		// show the appropriate game layout (a frame on desktop, GBC for mobile in portrait mode, GBA for mobile in landscape)
		this.showGameLayout();

		// show our generic loading screen and set our initial 'loaded' value to zero
		GameWrapper.showLoadScreen();
		GameWrapper.setLoadedValue(0);

		// run this function as our level is preloading all of its required files and assets
		this.level.preload(function(complete) {

			// update the progress bar
			GameWrapper.setLoadedValue(complete);

			// if complete equals 1, we've loaded everything
			if (complete === 1) {

				// do our fade out/fade in effect
				GameWrapper.crossFade(()=>{

					// hide the preloader screen
					GameWrapper.hideLoadScreen();

					// tell the wrapper what sprite sheet to use for the between-game transitions
					GameWrapper.setTransitionImage(_this.level.imgs.transsheet);

					// if the level has an intro movie, play it, then start the next phase
					if (_this.level.hasIntro()) {
						_this.level.playIntro(function() {
							_this.nextPhase();
						});

					// if there is no intro movie, start the next phase now
					} else {
						_this.nextPhase();
					}
				});
			}
		},true);

		// tell the level what to do when a game is completed
		this.level.onGameComplete(function() {

			// and that would be... go to the next phase, and start our transition animation
			_this.nextPhase(true);
		});
	}

	/** Switches to the main game layout */
	showGameLayout()
	{
		// check screen size/orientation and display all the game elements
		GameWrapper.updateGameScreenOrientation();
		GameWrapper.gameplaySkin.style.display = "";
		this.phaser.canvas.style.display = "";
	}

	/**
	 * Move to the next phase of the current level
	 * @param {boolean} transition_in - if True, play our transition animation before starting the next phase
	 */
	nextPhase(transition_in)
	{
		let _this = this;

		// figure out what the next phase in the level is, and handle it
		let next = this.level.getNext(function(phase, data) {

			// if we're starting a game, we'll reference its manifest with this
			let game_manifest = null;

			// if we're starting a new round (faster games or boss levels), we'll note that with this
			let new_round = null;

			// set that we are starting a new transition
			_this.in_transition = true;

			// check the current phase
			switch(phase) {

				// TODO - add a case for ned of level

				// we are still in the same round, and starting another microgame, so we need to record the manifest
				case 'microgame':
					game_manifest = data;
					break;

				// this is a new round
				case 'newround':

					// we are at the boss level 
					if (data === 'bossgame') {
						new_round =  "Boss Level!";

					// We need to speed up the game now!
					} else {
						new_round =  "Faster!";
						var speeds = [null,PWConfig.SPEED_NORMAL,PWConfig.SPEED_FASTER,PWConfig.SPEED_FASTEST];
						_this.setGameSpeed(speeds[_this.level.round]);
					}
					break;
			}

			// we are starting a new micro or boss game
			if (game_manifest) {

				// start the transition animation if it's not already running, then start the game
				if (transition_in) {
					GameWrapper.enterTransition(function() {
						GameWrapper.playTransitionClose(function() {
							_this.nextGame(game_manifest);
						});
					});

				// or, just start the game
				} else {
					_this.nextGame(game_manifest);
				}

			// we are starting a new round and need to show some text (faster, boss level, etc)
			} else if (new_round) {

				// start the transition (zooms the transition frame out)
				GameWrapper.enterTransition(function() {

					// show the new round text
					GameWrapper.setHintText(new_round);

					// continue the transition (covers the hole in the frame) and move to the next phase (which should be a game)
					GameWrapper.playTransitionClose(function() {
						_this.nextPhase(false);
					});
				});
			}

		});
	}

	/**
	 * Prepares the next micro or boss game to start
	 * @param {object} manifest - The manifest for the game we want to start
	 */
	nextGame(game_manifest)
	{
		let _this = this;

		// We should always be in the middle of the transition animation here. 
		// This tells the game to play the 'idle' part for a while before we start the actual game
		GameWrapper.playTransitionIdle(function() 
		{
			// start the actual game, and show it's hint text
			_this.startActualGame(game_manifest);
			GameWrapper.setHintText(game_manifest.hint);

			// play the animation to open the hole in our transition frame
			GameWrapper.playTransitionOpen(function() {

				// zoom the frame in so we can see the full game
				GameWrapper.exitTransition(function() {

					// we are no longer in the transition animation!
					_this.in_transition = false;
					GameWrapper.endTransition();
				});
			});
		});
	}

	/**
	 * Starts a micro or bass game
	 * @param {object} manifest - The manifest assciated with the micro or boss game
	 */
	startActualGame(manifest)
	{
		// clear out any existing input handlers so they don't break the new game
		this.input.reset();

		// start the actual game with Phaser
		this.phaser.scene.start(manifest.sceneClass);
	}

	//============================================ game hooks ================================================//

	/**
	 * Loads a microgame and all of it's assets before starting it.
	 * @param {string} path - The path/key of the micrograme.
	 * @param {function} callback - A callback function to run when the microgame has loaded.
	 * @param {function} error_callback - A callback function to run if there are any problems loading the microgame.
	 * @param {boolean} force - set to true to load all files instead of using cached/compiled data.
	 */
	loadMicroGame(path, callback, error_callback, force) 
	{
		// reference for functions/closures
		let _this = this;

		// if error callback is set to true, treat it as the 'force' parameter
		if (error_callback === true) {
			force = true;
			error_callback = function(){};
		}

		// if we don't have an error callback, have it do a generic alert
		error_callback = typeof(error_callback) !== 'undefined' ? error_callback : function(error){ alert(error); };

		// start by loading the manifest for this game
		this.loadMicroGameManifest(		
			
			path, 

			/**
			 * Handles when the manifest is loaded
			 * @param {object} manifest - The manifest we just loaded. 
			 * @param {string} dir - The directory we'll be loading any assets from.
			 */
			function(manifest, dir) {

				// make sure all the required manifest prperties have been set
				let required = ['name','jsFiles','sceneClass','input','hint'];
				let errors = [];
				required.forEach(function(val) {
					if (typeof(manifest[val]) == 'undefined') {
						errors.push("Missing required property in manifest.json: '"+val+"'");
					}
				});

				// if anything is missing, call the error handler and exit
				if (errors.length > 0) {
					error_callback(errors.join("\n"));
					return;
				}

				// get a reference to the scene class for this microgame if it's already been loaded.
				let _sceneClass;
				try {
					_sceneClass = _this.getSceneClass(manifest.sceneClass);
				}
				catch(e) {
					_sceneClass = null;
				}

				// Looks like we'll need to load the js file for this game scene
				if (!_sceneClass) {

					// make a note of how many JS files we need to load
					let scripts_remaining = manifest.jsFiles.length;

					// start loading each js file asynchronously
					manifest.jsFiles.forEach(url=>{

						// load the js file in a <script> tag
						loaderScript(dir+url) // see utils.js

						// and after it's loaded...
						.then(()=>{

							// knock one off our scripts remaining count
							scripts_remaining--;

							// all the scripts have loaded!!!
							if (scripts_remaining <= 0) {

								// attempt to get a reference to the class and register it
								try {
									
									// get a reference to the newly loaded scene
									_sceneClass = _this.getSceneClass(manifest.sceneClass);

									// add this to the list of scenes Phaser can currently load
									_this.registerScene(_sceneClass, manifest);
									
									// get the manifest for the scene, then start it up
									_this.preloadManifests([manifest], ()=>{
										callback(manifest);
									});
								}
								catch(e) {

									// oh no, something didn't work! (probably a bad js file, invalid class name or path)
									// fire the error callback
									error_callback(e);
								}
							}
						})

						// script failed to load, fire the error callback
						.catch((e)=>{
							console.error(e);
							error_callback(e);
						});
					});

				// This game scene was already loaded once, so we can go ahead with registering it and preloading any assets!
				} else {	
					_this.registerScene(_sceneClass, manifest);
					_this.preloadManifests([manifest], ()=>{
						callback(manifest);
					});
				}

			},

			error_callback,
			force
		);
	}

	/**
	 * preloads a list of manifest.json files so their data can be read before attempting to start a game.
	 * @param {Array.<object>} manifests - An array of manifest paths to load.
	 * @param {function} callback - A callback function to run when manifests have finished loading.
	 */
	preloadManifests(manifests, callback) 
	{
		// sets our callback in a property that PWGameSceneloader can call
		this.onManifestsLoaded = typeof(callback) !== 'undefined' ? callback : function(){};

		// add all the manifests to the PWGameSceneloader.manifests queue
		manifests.forEach(manifest=>{
			PWGameSceneloader.manifests.push(manifest);
		});

		// run the PWGameSceneloader scene.  When it's done, it'll trigger our callback
		this.phaser.scene.start('PWGameSceneloader');
	}

	/**
	 * Loads the manifest.json data for a microgame
	 * @param {Array.<string>} path - An arry of path data pointing to the microgame, ie ['microgames','user_or_team','game_name'].
	 * @param {function} callback - A callback function to run when the microgame has loaded.
	 * @param {function} error_callback - A callback function to run if there are any problems loading the microgame.
	 * @param {boolean} force - set to true to load all files instead of using cached/compiled data.
	 */
	loadMicroGameManifest(path, callback, error_callback, force) 
	{
		// make sure we have a container for the microgame's parent path
		_Manifests.microgames[path[0]] = typeof(_Manifests.microgames[path[0]]) !== 'undefined' ? _Manifests.microgames[path[0]] : {};

		// if error_callback is true, use that as the force property
		if (error_callback === true) {
			force = true;
			error_callback = function(){};
		}

		// if no error callback is defined, have it use a generic alert
		error_callback = typeof(error_callback) !== 'undefined' ? error_callback : function(error){ alert(error); };

		// this is the directory that the manifest file should be in
		let dir = 'microgames/'+path[0]+'/'+path[1]+'/';

		// if the manifest hasn't been loaded yet, or we're forcing a fresh load....
		if (force || !_Manifests.microgames[path[0]][path[1]]) {

			// load the manifest file into a javascript object
			this.getJSON(dir+'manifest.json', function(data) {

				// update the manifest so it has a reference to our directory.
				data.path = dir;

				// cache the manifest so we don't have to reload it again later, and fire the callback
				_Manifests.microgames[path[0]][path[1]] = data;
				callback(_Manifests.microgames[path[0]][path[1]], dir);

			// error handling
			}, function(e) {

				// manifest failed to load or decode
				console.error(e);
				console.error("Couldn't find file: "+'microgames/'+path[0]+'/'+path[1]+'/manifest.json');
				error_callback("Could not load game at "+path[0]+'/'+path[1]);
			});

		// The manifest has already been loaded and cached
		} else {

			// set a reference to our directory just in case the manifest hasn't actually been used yet (may have been compiled)
			_Manifests.microgames[path[0]][path[1]].path = dir;

			// fire the callback
			callback(_Manifests.microgames[path[0]][path[1]], 'microgames/'+path[0]+'/'+path[1]+'/');
		}
	}

	/**
	 * Load a JSON document by url or relative path and pass the de-coded result to a callback function. Used for loading manifests.
	 * @param {string} url - The url (or relative path) of the file you want to load.
	 * @param {(object|string)} params - An object of key/value pairs, or pre-formatted query string to send to the server (optional)
	 * @param {function} callback - A function to call when the url/file has loaded.
	 * @param {function} error - A function to call if the url/file fails to load.
	 */
	getJSON(url, params, callback, error) {

		// if the 2nd param is a function, assume it's the callback, and param 3 is the error handler
		if (typeof(params) === 'function') {
			error = callback;
			callback = params;
			params = null;
		}

		// make sure callback is an actual function
		callback = typeof(callback) !== 'undefined' ? callback : function(){};

		// if error isn't defined, have it do a generic alert
		error = typeof(error) !== 'undefined' ? error : function(e) { console.error(e); alert(e); };

		// load the URL
		this.get(url, params, 
			
			// url loaded okay, try decoding it
			function(json) {
				try {
					let obj = JSON.parse(json);

					// success...
					callback(obj);
				}
				catch(e) {

					// failed to decode
					error(e);
				}
			},

			// failed to load
			error
		);
	}

	/**
	 * Loads a url via XHR, and passes the result to a callback function (primarily used by getJSON())
	 * @param {string} url - The url (or relative path) of the file you want to load.
	 * @param {(object|string)} params - An object of key/value pairs, or pre-formatted query string to send to the server (optional)
	 * @param {function} callback - A function to call when the url/file has loaded.
	 * @param {function} error - A function to call if the url/file fails to load.
	 */
	get(url,params,callback,error) {

		// if the 2nd param is a function, assume it's the callback, and param 3 is the error handler
		if (typeof(params) == 'function') {
			error = callback;
			callback = params;
			params = null
		}

		// make sure callback is an actual function
		callback = typeof(callback) === 'function' ? callback : function(){};

		// if the error handler isn't defined, have it do a generic alert
		error = typeof(error) !== 'undefined' ? error : function(e) { console.error(e); alert(e); };
		
		// format our params into a query string
		if (params && typeof(params) === 'object') {
			let p = [];
			for(const [key, val] of Object.entries(params)) {
				p.push(encodeURIComponent(key)+"="+encodeURIComponent(val));
			};
			params = "?"+p.join("&");
		} else {
			params = "";
		}

		// load the URL
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() 
		{
			// we have a result...
			if (this.readyState == 4) {

				// success...
				if (this.status == 200) {
					callback(this.responseText);

				// failed...
				} else {
					error(this.responseText, this.status);
				}
			}
		};
		xhr.open("GET", url+params, true);
		xhr.send();
	}

	/**
	 * Registers a scene class using a manifest.
	 * @param {Function.<Phaser.scene>} sceneClass - Reference to the class we're registering
	 * @param {object} manifest - The decoded manifest object associated with the class 
	 */
	registerScene(sceneClass, manifest)
	{
		// scene is already registered...
		if (PWGameSceneloader.loaded[manifest.sceneClass]) return;

		// record the class as loaded, and register it with Phaser
		PWGameSceneloader.loaded[manifest.sceneClass] = sceneClass;
		this.phaser.scene.add(manifest.sceneClass, new sceneClass());
	}

	/**
	 * Returns reference to a Phaser.Scene class for a boss or micro game. Class must be loaded already!
	 * @param {string} classname - The name of the class, including the namespace path, eg microgames.bacun.ButtPlugGame
	 * @return {Function.<Phaser.scene>}
	 */
	getSceneClass(classname)
	{
		let current_object = null;
		let at = []; // keeps track of what namespace object we are in when looking for classes for error reporting

		// convert the class path to an array, and grab the top-level so we know what type of game it is.
		let path = classname.split(".");
		let top = path.shift();

		// figure out which cache object to pull from
		if (top === 'microgames') {
			current_object = microgames;
		} else if (top === 'bossgames') {
			current_object = bossgames;
		} else {
			throw("Scene class must be namespaced to microgames or bossgames!");
		}

		// record the top level path
		at.push(top);

		// check the rest of the namespace path
		while(path.length > 0) {

			// get the next object name in the path and add it to the 'at' array
			let top = path.shift();
			at.push(top);

			// check if this object exists
			current_object = typeof(current_object[top]) !== 'undefined' ? current_object[top] : null;

			// it does not, throw an error!
			if (!current_object) {
				throw(at.join(".")+" is undefined.");
			}
		}

		// check if the final object in the path is a Phaser.Scene subclass..
		if (current_object.prototype instanceof Phaser.Scene) {

			// yep, we can return the reference now!
			return current_object;
		}

		// looks like the path is bad, or the object isn't a proper Phaser.scene subclass
		throw(classname+" is either not an extension of Phaser.Scene, or there are errors in the class file.");

	}

	//============================================ public methods ================================================//

	/**
	 * Returns false if the game is paused or any transition animations are going on
	 * @return {boolean}
	 */
	isReady()
	{
		return !this.in_transition && !this.paused;
	}

	/**
	 * Set the current speed modifier for microgames (happens in nextPhase() during new rounds).
	 * @param {number} speed - Our speed modifier, where 1 = normal speed, 2 = 2x speed, etc.
	 */
	setGameSpeed(speed)
	{
		this.gameSpeed = speed;
		this.msPerTargetFrame = 1000/(this.targetFPS * speed);
	}

	/**
	 * Call this in your game loop to get a number you can multiply any movement by so it runs with the correct timing
	 * regardless of the end user's actual on-screen FPS.
	 * @param {number} delta - The number of ms that have lapsed since the last update (comes from Phaser.Scene update function)
	 * @return {number}
	 */
	getDeltaMultiplier(delta)
	{
		return delta/this.msPerTargetFrame;
	}
	
	/**
	 * Game scenes can call this if the player loses the game so they don't have to wait for the time to expire
	 */
	lostGame() {
		this.level.gameCompleted(false);
	}

	/**
	 * Game scenes can call this when the player wins the game
	 */
	wonGame() {
		this.level.gameCompleted(true);
	}
}
// global vars

/** Top-level namespace for all microgames */
const microgames = {};

/** Top-level namespace for all bossgames */
const bossgames = {};

/** Config constants **/
const PWConfig = {
	SPEED_NORMAL: 1,
	SPEED_FASTER: 1.25,
	SPEED_FASTEST: 1.5
};

/** 
 * Global reference to main PWFramework instance (see framework.js) 
 * Set constructor parameter to one of the following:
 * 
 * 		'dev'	- Run in developer mode.
 * 		'debug'	- Run in game mode with debugging enabled
 * 		'prod'	- Run in game mode with no debugging
 * 
 * @type {PWFramework}
 */
const PWGame = new PWFramework('dev');
class PWCharacter {
    // TODO - create this class, should handle character presentation and animation
}
/** 
 * class for managing levels 
 */
class PWLevel {

	/**
	 * @param {object} manifest - the manifest object containing the level configuration
	 * @param {string} manifest.character - the character animation sheet to use
	 * @param {string} manifest.transition - the transition animation sheet to use
	 * @param {string} manifest.logo - the logo image to use
	 * @param {number} manifest.gamesPerRound - the number of microgames to play in each round
	 * @param {array} manifest.microgames - an array of microgame paths to use
	 * @param {object} manifest.bossgame - the bossgame manifest to use
	 * @param {boolean} manifest.devMode - if true, level is running in developer mode
	 */
	constructor(manifest)
	{
		console.log("NEW MANIFEST",manifest);

		if (!manifest) throw("Missing required manifest!");
		
		/** 
		 * @type {boolean} if true, level is running in developer mode
		 */
		this.devMode = false;

		if (manifest.devMode) {
			
			this.devMode = true;

			for(const [key, val] of Object.entries(PWLevel.default_manifest)) {
				if (typeof(manifest[key]) === 'undefined') manifest[key] = val;
			}
		}

		if (!manifest.character) throw("Missing required character!");
		if (!manifest.transition) throw("Missing required transition!");
		if (!manifest.microgames) throw("Missing required microgame array!");

		/** 
		 * current round (1 = normal speed, 2 & 3 = faster speeds, 4 = boss) 
		 * @type {number}
		 */
		this.round = 1;

		/** 
		 * The number of microgames to play in each non-boss round 
		 * @type {number}
		 */
		this.gamesPerRound = typeof(manifest.gamesPerRound) !== 'undefined' ? manifest.gamesPerRound : 5;

		/** The current number of games played  */
		this.currentGame = 0;

		/** The number of games remaining in the curren round */
		this.gamesRemaining = this.gamesPerRound;

		/** container for manifests that haven't been used yet */
		this.microgame_manifests = [];

		/** container for manifests that have been used (may be recycled) */
		this.microgame_manifests_used = [];

		/** The level manifest */
		this.manifest = manifest;

		/** Container for wrapper images */
		this.imgs = {
			
			/** level logo image*/
			logo: new Image(),

			/** character animation sheet */
			character: new Image(),

			/** transition animation sheet */
			transition: new Image()
		};
	}

	/**
	 * Gets the next phase of the level
	 * @param {function} callback - A handler function that will recieve 2 params: mode and data.
	 */
	getNext(callback)
	{
		console.log("round:",this.round);
		console.log('gamesRemaining:',this.gamesRemaining+"/"+this.gamesPerRound);

		if (this.round < 4) {

			if (!this.manifest.microgames || this.manifest.microgames.length === 0) {
				console.log('skip microgames');
				this.round = 4;
			} else if (this.gamesRemaining > 0) {
				console.log(this.gamesRemaining+" games left (--)");
				this.gamesRemaining--;
			} else {
				this.round++;
				this.gamesRemaining = this.gamesPerRound;
				console.log("newround!!!");
				callback("newround", this.round < 4 ? "microgame":"bossgame");
				return;
			}
		}

		if (this.round < 4) {
			console.log("start micro!");
			callback('microgame', this.getRandomMicrogameManifest());
		} else if (this.round === 4 && this.manifest.bossgame) {
			console.log("start boss!");
			callback('bossgame',this.getBossgameManifest());
		} else {
			console.log("winner?");
			callback('finish',null);
		}
	}

	/**
	 * Sets a callback handler for when the current micro/boss game is completed
	 * @param {function} callback
	 */
	onGameComplete(callback) {
		this.game_complete_callback = callback;
	}

	/**
	 * call this when a microgame or boss game is completed
	 * @param {boolean} success - set to true if the player won
	 */
	gameCompleted(success)
	{
		if (this.game_complete_callback) this.game_complete_callback(success);
	}

	/**
	 * Loads any assets this level will use
	 * @param {Function} callback - callback to execute when items are preloaded. Will pass a value between 0 and 1.
	 * @param {boolean} force - set to true to ignore cached items
	 */
	preload(callback, force)
	{
		let _this = this;

		// logo, transition, character (TODO add skin)
		var promises = 3; 

		// add one for each microgame
		this.manifest.microgames.forEach(function(path) {
			promises++;
		});

		var total_promises = promises;

		// run this when every promise completes to see if we're done
		function checkPromises() {
			promises--;
			callback((total_promises-promises)/total_promises);
		}

		// run this if something fucks up
		function handleError(err) {
			console.error(err);
			promises--;
			if (promises < 1) alert("Loaded with errors!");
		}

		// preload all the microgames asynchronously
		this.manifest.microgames.forEach(function(path) {

			let loadMicrogame = new Promise((resolve,reject) => {

				PWGame.loadMicroGame(
					path, 
					function(manifest) {
						_this.microgame_manifests.push(manifest);
						resolve();
					}, 
					reject,
					typeof(force) !== 'undefined' ? force : false
				);

			});

			loadMicrogame.then(checkPromises, handleError);

		});

		// preload and remember all the images we need for the skin stuff
		this.imgs.logo = new Image();
		this.imgs.logo.src = typeof(this.manifest.logo) !== 'undefined' ? this.manifest.logo : "FIXME!!!";
		this.imgs.logo.onload = checkPromises;

		this.imgs.charsheet = new Image();
		this.imgs.charsheet.src = "characters/"+this.manifest.character;
		this.imgs.charsheet.onload = checkPromises;
		
		this.imgs.transsheet = new Image();
		this.imgs.transsheet.src = "transitions/"+this.manifest.transition;
		this.imgs.transsheet.onload = checkPromises;
	}

	/**
	 * Returns true if level has an into movie
	 * @return {boolean}
	 */
	hasIntro()
	{
		return false;
	}

	/**
	 * Returns a random microgame manifest, or false if no microgames exist in the level set 
	 * (Will go through every game before returning a duplicate)
	 * @return {(object|boolean)}
	 */
	getRandomMicrogameManifest()
	{
		if (!this.manifest.microgames || this.manifest.microgames.length === 0) return false;

		var i;

		if (this.microgame_manifests.length < 1) {
			this.microgame_manifests = this.microgame_manifests_used;
			this.microgame_manifests_used = [];
		}
		if (this.microgame_manifests.length < 1) throw("Level has no microgame manifests loaded");
		
		let used = this.microgame_manifests.splice(Math.floor(Math.random()*this.microgame_manifests.length), 1)[0];

		this.microgame_manifests_used.push(used);
		return used;
	}

	/**
	 * Returns the boss game manifest for this level, or false if none exists
	 * @return {(object|boolen)}
	 */
	getBossgameManifest()
	{
		return this.manifest.bossgame ? this.manifest.bossgame : false;
	}
}

/** Default Manifest, used when testing */
PWLevel.default_manifest = {
	character: "angry_face/psychogoldfish_stickman.webp",
	transition: "angry_face/psychogoldfish_bricks.webp",
	gamesPerRound: 1,
	microgames: null,
	bossgame: null
};
/** A scene that preloads other scenes using data from manifests */ 
class PWGameSceneloader extends Phaser.Scene {
	
	/**
	 * registers PWGameSceneloader scene key via parent constructor
	 */
	constructor() {
		super({key: 'PWGameSceneloader'});
	}

	/**
	 * Uses Phaser to preload items from pending manifests
	 */
	preload() {
		let _this = this;

		// cycle through any manifests for the scene we are preloading
		PWGameSceneloader.manifests.forEach(manifest=>{

			// add any images we need to load
			if (manifest.images) {
				manifest.images.forEach(image=>{
					_this.load.image(manifest.sceneClass + '.' + image.key, manifest.path + image.image);
				});
			}

			// add any spritesheets

			// add any textures/atlases

			// add any sounds

		});
	}

	/**
	 * Once this scene is fully loaded, tell the framework to move on.
	 */
	create() {
		PWGame.onManifestsLoaded(this);
	}
}

// container for loaded scene classes
PWGameSceneloader.loaded = {};

// queue manifests that need to have assets loaded in here
PWGameSceneloader.manifests = [];
class PWTransition {
	
}