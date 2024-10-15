var _Manifests = {
     "levels": {
          "psychogoldfish": {
               "emojiman": {
                    "difficulty": 0,
                    "logo": {
                         "team": "psychogoldfish",
                         "image": "sir_reginald_emojiman.png"
                    },
                    "character": {
                         "team": "psychogoldfish",
                         "sheet": "sir_reginald_emojiman_sheet.webp"
                    },
                    "transition": {
                         "team": "psychogoldfish",
                         "name": "emojis"
                    },
                    "intro": {
                         "team": "psychogoldfish",
                         "video": "intro.mp4"
                    },
                    "outro": {
                         "team": "psychogoldfish",
                         "video": "outro.mp4"
                    },
                    "microgames": {
                         "rounds": [
                              1
                         ],
                         "games": [
                              {
                                   "team": "psychogoldfish",
                                   "game": "push_the_button"
                              },
                              {
                                   "team": "psychogoldfish",
                                   "game": "thwomp-stomp"
                              }
                         ]
                    },
                    "bossgame": {
                         "team": "psychogoldfish",
                         "game": "space_face"
                    },
                    "team": "psychogoldfish"
               }
          }
     },
     "microgames": {
          "psychogoldfish": {
               "push_the_button": {
                    "name": "Push the Button",
                    "sceneClass": "microgames.psychogoldfish.push_the_button",
                    "jsFiles": [
                         "push-the-button.js"
                    ],
                    "atlases": [
                         {
                              "key": "gameSprites",
                              "texture": "gameSprites.png",
                              "atlas": "gameSprites.json"
                         }
                    ],
                    "credits": [
                         {
                              "credit": "designer",
                              "name": "PsychoGoldfish"
                         }
                    ],
                    "team": "psychogoldfish"
               },
               "thwomp-stomp": {
                    "name": "Thwomp Stomp",
                    "sceneClass": "microgames.psychogoldfish.thwomp_stomp",
                    "parent": {
                         "team": "psychogoldfish",
                         "name": "push_the_button"
                    },
                    "jsFiles": [
                         "thwomp-stomp.js"
                    ],
                    "atlases": [
                         {
                              "key": "gameSprites",
                              "texture": "gameSprites.png",
                              "atlas": "gameSprites.json"
                         }
                    ],
                    "credits": [
                         {
                              "credit": "designer",
                              "name": "PsychoGoldfish"
                         }
                    ],
                    "team": "psychogoldfish"
               }
          }
     },
     "bossgames": {
          "psychogoldfish": {
               "space_face": {
                    "name": "Space Face",
                    "sceneClass": "bossgames.psychogoldfish.space_face",
                    "jsFiles": [
                         "space-face.js"
                    ],
                    "atlases": [
                         {
                              "key": "gameSprites",
                              "texture": "gameSprites.png",
                              "atlas": "gameSprites.json"
                         }
                    ],
                    "credits": [
                         {
                              "credit": "designer",
                              "name": "PsychoGoldfish"
                         }
                    ],
                    "team": "psychogoldfish"
               }
          }
     },
     "transitions": {
          "psychogoldfish": {
               "emojis": {
                    "name": "Emojis",
                    "sceneClass": "transitions.psychogoldfish.emojis",
                    "jsFiles": [
                         "emojis.js"
                    ],
                    "spritesheets": [
                         {
                              "key": "numberStrip",
                              "image": "numberStrip.png",
                              "frameWidth": 90,
                              "frameHeight": 140
                         }
                    ],
                    "atlases": [
                         {
                              "key": "emojiSprites",
                              "texture": "emojiSprites.png",
                              "atlas": "emojiSprites.json"
                         }
                    ],
                    "credits": [
                         {
                              "credit": "designer",
                              "name": "PsychoGoldfish"
                         }
                    ],
                    "team": "psychogoldfish"
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
function loaderScript(scriptUrl) {
  "use strict";

  return new Promise(function (res, rej) {

    /** @var {HTMLScriptElement} script */
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.addEventListener('error', rej);
    script.addEventListener('load', res);
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
  "use strict";

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
var __safariSoundHack = (() => {
  "use strict";

  let __safariAudiotag = document.createElement('audio');
  document.body.appendChild(__safariAudiotag);
  __safariAudiotag.src = 'data:audio/x-wav;base64,UklGRooWAABXQVZFZm10IBAAAAABAAEAIlYAAESsAAACABAAZGF0YWYWAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';

  /**
   * @param {function} callback - Function to call when sound has been enabled.
   * @param {object} thisarg - The object to use as 'this' context in the callback function.
   */
  return (callback, thisarg) => {

    __safariAudiotag.onended = () => {
      thisarg ? callback.call(thisarg) : callback();
    };
    __safariAudiotag.play();
  };

})();
"use strict";

/**
 * a few methods for browser detection
 */
const BrowserHelper = {

	/**
	 * @returns {boolean} true if this is detected as a mobile device
	 */
	isMobile: function () {
		return (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) || (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.platform)))
	},

	/**
	 * @returns {boolean} true if this is detected as an iOS device
	 */
	isIOS: function () {
		return this.isMobile() && this.isSafari();
	},

	/**
	 * @returns {boolean} true if this is detected as a Safari browser 
	 */
	isSafari: function () {
		return navigator.userAgent.indexOf("Safari") > -1;
	}

}
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

			// if gameplaySkin is hidden, we're not in the game view, so we can leave now
			if (_this.gameplaySkin.style.display === "none") return;

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

		let dPadMargin = 60 * scale;

		// set sizes of input containers
		this.dPadFrame.style.width = (uiFrameWidth + (dPadMargin * 2)) + "px";
		this.dPadFrame.style.height = (topInputHeight + (dPadMargin * 2)) + "px";
		this.AbButtonsFrame.style.width = this.startSelectButtonsFrame.style.width = this.speakerFrame.style.width = uiFrameWidth + "px";
		this.AbButtonsFrame.style.height = topInputHeight + "px";
		this.startSelectButtonsFrame.style.height = this.speakerFrame.style.height = bottomInputHeight + "px";

		// position containers
		this.dPadFrame.style.top = (inputTop - dPadMargin) + "px";
		this.dPadFrame.style.left = (inputMarginX - dPadMargin) + "px";

		this.AbButtonsFrame.style.top = inputTop + "px";
		this.startSelectButtonsFrame.style.top = this.speakerFrame.style.top = (inputTop + topInputHeight) + "px";
		this.startSelectButtonsFrame.style.left = inputMarginX + "px";
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
		this.inputs.dpad.size = dPadSize + (dPadMargin * 2);
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

		let dPadMargin = 40 * scale;

		// position and size the d-pad and a/b button containers

		let frame = {
			top: Math.round(mainButtonFrameTop - dPadDeadzone),
			left: Math.round(inputMarginX - dPadDeadzone),
			height: Math.round(mainButtonFrameHeight + (dPadDeadzone * 2)),
			width: Math.round(mainButtonFrameHeight + (dPadDeadzone * 2))
		}

		this.dPadFrame.style.top = frame.top + "px";
		this.dPadFrame.style.left = frame.left + "px";
		this.dPadFrame.style.height = frame.height + "px";
		this.dPadFrame.style.width = frame.width + "px";

		this.AbButtonsFrame.style.top = mainButtonFrameTop + "px";
		this.AbButtonsFrame.style.height = mainButtonFrameHeight + "px";
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
		this.inputs.dpad.x = inputMarginX + ((dPadSize + (dPadMargin / 2)) / 2) + skinMarginX;
		this.inputs.dpad.y = mainButtonFrameTop + (mainButtonFrameHeight / 2) + skinMarginY;
		this.inputs.dpad.size = dPadSize + (dPadMargin * 2);
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
/** 
 * class for managing levels 
 */
class PWLevel {

	// ============================== STATIC PROPERTIES ============================== \\

	// the different game modes:

	// game plays normally with rounds of microgames and a boss level
	static MODE_NORMAL = 'normal';

	// game plays a single microgame over and over, incementing difficulty each playthrough, then incrementing speed and resetting difficulty
	static MODE_ENDLESS = 'endless';

	// same as endless, but uses bossgames in place of microgames
	static MODE_BOSSRUSH = 'bossrush';

	// ============================== INSTANCE PROPERTIES ============================== \\

	/** 
	 * @type {boolean} if true, level is running in developer mode
	 * @default false
	 */
	#devMode = false;

	/**
	 * @type {string} the mode of the game (one of the following: 'normal', 'endless', 'bossrush')
	 * @default 'normal'
	 * @readonly
	 * @private
	 */
	get devMode() { return this.#devMode; }

	/**
	 * @type {object} the level manifest
	 * @private
	 */
	#manifest = {};

	/**
	 * @type {object} the level manifest
	 * @readonly
	 */
	get manifest() { return this.#manifest; }

	/**
	 * @type {string} the mode of the game (one of the PWLevel.MODE_XXXXX values)
	 * @private
	 * @default PWLevel.MODE_NORMAL
	 */
	#mode = PWLevel.MODE_NORMAL;

	/**
	 * @type {string} the mode of the game (one of the PWLevel.MODE_XXXXX values)
	 * @readonly
	 * @default PWLevel.MODE_NORMAL
	 */
	get mode() { return this.#mode; }

	/**
	 * @type {number} The current round of the level (a round is a typically clump of microgames or a boss game that are played between 'faster' messages)
	 * @private
	 * @default 1
	 */
	#round = 1;

	/**
	 * @type {number} The current round of the level (a round is a typically clump of microgames or a boss game that are played between 'faster' messages)
	 * @readonly
	 * @default 1
	 */
	get round() { return this.#round; }

	/**
	 * @type {number} The round value at the start of the last game.  Useful to show round changes in transition scenes
	 * @private
	 * @default 1
	 */
	#lastRound = 1;

	/**
	 * @type {number} The round value at the start of the last game.  Useful to show round changes in transition scenes
	 * @readonly
	 * @default 1
	 */
	get lastRound() { return this.#lastRound; }

	/**
	 * @type {boolean} if true, the current round is a boss game
	 * @private
	 * @default 0
	 */
	#bossRound = false;

	/**
	 * @type {boolean} if true, the current round is a boss game
	 * @readonly
	 * @default 0
	 */
	get bossRound() { return this.#bossRound; }

	/**
	 * @type {boolean} if true, the current level has been completed
	 * @private
	 * @default false
	 */
	#complete = false;

	/**
	 * @type {boolean} if true, the current level has been completed
	 * @readonly
	 * @default false
	 */
	get complete() { return this.#complete; }

	/**
	 * @type {number} The difficulty level of the level (0 = easy, 1 = normal, 2 = hard)
	 * @private
	 * @default 0
	 */
	#difficulty = 0;

	/**
	 * @type {number} The difficulty level of the level (0 = easy, 1 = normal, 2 = hard)
	 * @readonly
	 * @default 0
	 */
	get difficulty() { return this.#difficulty; }

	/**
	 * @type {number} The difficulty level at the start of the last game.  Useful to show difficulty changes in transition scenes
	 * @private
	 * @default 0
	 */
	#lastDifficulty = 0;

	/**
	 * @type {number} The difficulty level at the start of the last game.  Useful to show difficulty changes in transition scenes
	 * @readonly
	 * @default 0
	 */
	get lastDifficulty() { return this.#lastDifficulty; }

	/**
	 * @param {number} difficulty - the difficulty level of the level (0 = easy, 1 = normal, 2 = hard)
	 * @param {boolean} setLast - set to true to set the lastDifficulty value to the current difficulty
	 * @private
	 */
	__setDifficulty(difficulty, setLast = false) {

		// setLast is false, so we'll record the previous difficulty
		if (!setLast) this.#lastDifficulty = this.#difficulty;

		// make sure the difficulty is within bounds
		if (difficulty < 0) difficulty = 0;
		if (difficulty > 2) difficulty = 2;

		this.#difficulty = difficulty;

		// setLast is true so we'll set it the same as the current difficulty
		if (setLast) this.#lastDifficulty = this.#difficulty;
	}

	/**
	 * @type {number} The number of microgames to play in a non-endless level before moving on to the boss game
	 * @private
	 * @default 0
	 */
	#microgameRounds = 0;

	/**
	 * @type {number} The number of microgames to play in a non-endless level before moving on to the boss game
	 * @readonly
	 * @default 0
	 */
	get microgameRounds() { return this.#microgameRounds; }

	/**
	 * @type {number} The total number of microgames left to play in the current round
	 * @private
	 * @default 0
	 */
	#gamesRemaining = 0;

	/**
	 * @type {number} The total number of microgames left to play in the current round
	 * @readonly
	 * @default 0
	 */
	get gamesRemaining() { return this.#gamesRemaining; }

	/**
	 * @type {number} The total number of microgames to play in the current round
	 * @private
	 * @default 0
	 */
	#gamesTotal = 0;

	/**
	 * @type {array} A list of microgames that haven't been used yet (may be recycled when the list is empty)
	 * @private
	 * @default []
	 */
	#microgameManifests = [];

	/**
	 * @type {array} A list of microgames that haven't been used yet (may be recycled when the list is empty)
	 * @readonly
	 * @default []
	 */
	get microgameManifests() { return this.#microgameManifests; }

	/**
	 * @type {array} A list of microgames that have been used (gets copied to microgameManifests when it's empty)
	 * @private
	 * @default []
	 */
	#microgameManifestsUsed = [];

	/**
	 * @type {array} A list of microgames that have been used (gets copied to microgameManifests when it's empty)
	 * @readonly
	 * @default []
	 */
	get microgameManifestsUsed() { return this.#microgameManifestsUsed; }

	/**
	/**
	 * @type {array} A list of bossgames that haven't been used yet (may be recycled when the list is empty)
	 * @private
	 * @default []
	 */
	#bossgameManifests = [];

	/**
	 * @type {array} A list of bossgames that haven't been used yet (may be recycled when the list is empty)
	 * @readonly
	 * @default []
	 */
	get bossgameManifests() { return this.#bossgameManifests; }

	/**
	 * @type {array} A list of bossgames that have been used (gets copied to bossgameManifests when it's empty)
	 * @private
	 * @default []
	 */
	#bossgameManifestsUsed = [];

	/**
	 * @type {array} A list of bossgames that have been used (gets copied to bossgameManifests when it's empty)
	 * @readonly
	 * @default []
	 */
	get bossgameManifestsUsed() { return this.#bossgameManifestsUsed; }

	/**
	 * @type {number} The number of games completed by the player
	 * @private
	 * @default 0
	 */
	#score = 0;

	/**
	 * @type {number} The number of games completed by the player
	 * @readonly
	 * @default 0
	 */
	get score() { return this.#score; }

	/**
	 * @type {number} The score value at the start of the last game.  Compare this to the current score to see if the player won a game
	 * @readonly
	 * @default 0
	 */
	#lastScore = 0;

	/**
	 * @type {number} The score value at the start of the last game.  Useful to show score changes in transition scenes
	 * @readonly
	 * @default 0
	 */
	get lastScore() { return this.#lastScore; }

	/**
	 * @type {number} The number of times the player can fail before losing the level
	 * @private
	 * @default 4
	 */
	#health = 4;

	/**
	 * @type {number} The number of times the player can fail before losing the level
	 * @readonly
	 * @default 4
	 */
	get health() { return this.#health; }

	/**
	 * @type {number} The health value at the start of the last game.  Compare this to the current health to see if the player lost a game
	 * @private
	 * @default 4
	 */
	#lastHealth = 4;

	/**
	 * @type {number} The health value at the start of the last game.  Compare this to the current health to see if the player lost a game
	 * @readonly
	 * @default 4
	 */
	get lastHealth() { return this.#lastHealth; }

	/**
	 * @type {object} A container for images used in the game wrapper, such as the logo and character sheet
	 * @private
	 * @property {Image} logo - level logo image
	 * @property {Image} character - character animation sheet
	 */
	#imgs = { logo: null, character: null };

	/**
	 * @type {object} A container for images used in the game wrapper, such as the logo and character sheet
	 * @readonly
	 * @property {Image} logo - level logo image
	 * @property {Image} character - character animation sheet
	 */
	get imgs() { return this.#imgs; }

	/**
	 * @param {object} manifest - the manifest object containing the level configuration
	 * @param {number} manifest.difficulty - the difficulty level of the level
	 * @param {string} manifest.character - the character animation sheet to use
	 * @param {string} manifest.transition - the transition Scene to use
	 * @param {string} manifest.logo - the logo image to use
	 * @param {array} manifest.microgames - an array of microgame rules
	 * @param {object} manifest.bossgame - the bossgame manifest
	 * @param {boolean} manifest.mode - the mode of the game (one of the following: 'normal', 'endless', 'bossrush')
	 * @param {boolean|string} manifest.devMode - can be false, 'game', 'bossgame' or 'level'. Either string will enable developer mode, but 'game' will allow testing a microgame with no boss level, and 'bossgame' will allow testing a boss level with no microgames.
	 * 
	 * @param {object} overrides - optional object to override any values in the manifest
	 */
	constructor(manifest, overrides) {

		// By default, all levels will start at difficulty 1.
		// This can be changed in the level manifest for games running in normal mode
		this.__setDifficulty(0, true);

		// make sure we have a proper manifest object
		if (!manifest) {
			alert("Missing required manifest!");
			throw ("Missing required manifest!");
		}
		if (typeof (manifest) !== 'object') {
			alert("Manifest must be an object!");
			throw ("Manifest must be an object!");
		}

		// if we have an overrides object, merge it with the manifest (without changing the original)
		if (typeof (overrides) === 'object') {
			let new_manifest = {};
			Object.assign(new_manifest, manifest, overrides);
			manifest = new_manifest;
		}

		// if we're in dev mode, this is probably a test level, so we'll need to fill in some defaults
		if (manifest.devMode) {

			// not what devmode we are in (game, bossgame, or level)
			this.#devMode = manifest.devMode;

			// while developing, the manifest can be incomplete. But we still need to pull all the defaults
			for (const [key, val] of Object.entries(PWLevel.default_manifest)) {
				if (typeof (manifest[key]) === 'undefined') manifest[key] = val;
			}
		}

		// now we can make sure all the required properties are set
		if (!manifest.character) {
			alert("Missing required character!");
			throw ("Missing required character!");
		}
		if (!manifest.logo) {
			alert("Missing required logo!");
			throw ("Missing required logo!");
		}
		if (!manifest.transition) {
			alert("Missing required transition!");
			throw ("Missing required transition!");
		}

		// set the game mode
		if (manifest.mode === PWLevel.MODE_ENDLESS || manifest.mode === PWLevel.MODE_BOSSRUSH) {
			this.#mode = manifest.mode;
		}
		// always fall back to normal mode
		else {
			this.#mode = PWLevel.MODE_NORMAL;

			// we might have a non-default difficulty set in the manifest, check for that
			if (manifest.difficulty && manifest.difficulty > 0 && manifest.difficulty <= 3) this.__setDifficulty(manifest.difficulty, true);
		}

		// If we have a microgame config, validate it (these will never be used in a boss rush game)
		if (this.mode !== PWLevel.MODE_BOSSRUSH) {

			// make sure we have a microgame array
			if (!manifest.microgames) {
				alert("Missing required microgame array!");
				throw ("Missing required microgame array!");
			}

			// if this is normal mode, we need to make sure we have a bossgame defined
			if (!manifest.bossgame && manifest.mode === PWLevel.MODE_NORMAL) {
				alert("Missing required bossgame!");
				throw ("Missing required bossgame!");
			}

			if (manifest.microgames) {

				if (typeof (manifest.microgames) !== 'object') {
					alert("Microgames must be an object!");
					throw ("Microgames must be an object!");
				}

				if (!manifest.microgames.rounds || !Array.isArray(manifest.microgames.rounds)) {
					alert("Microgames missing or empty rounds array!");
					throw ("Microgames missing or empty rounds array!");
				}

				manifest.microgames.rounds.forEach(function (round) {
					if (typeof (round) !== 'number') {
						alert("Microgame round is not a number!");
						throw ("Microgame round is not a number!", round);
					}
				});

				if (!manifest.microgames.games || !Array.isArray(manifest.microgames.games)) {
					alert("Microgames missing or empty games array!");
					throw ("Microgames missing or empty games array!");
				}

				manifest.microgames.games.forEach(function (game, mi) {

					if (!game.team) {
						alert("Microgame at index " + mi + " missing team property!");
						throw ("Microgame at index " + mi + " missing team property!");
					}
					if (!game.game) {
						alert("Microgame at index " + mi + " missing game property!");
						throw ("Microgame at index " + mi + " missing game property!");
					}
				});
			}

			// Get the number of microgame rounds in this level
			this.#microgameRounds = manifest.microgames.rounds.length;

			// Get the number of games in the first round
			this.#gamesTotal = this.#gamesRemaining = manifest.microgames.rounds[0];

		}

		// set our initial game data arrays

		// The available microgames for this round wil be added here
		this.#microgameManifests = [];

		// when a game is pulled from ther above list, it will be moved here to avoid too much repetition
		this.#microgameManifestsUsed = [];


		this.#bossgameManifests = [];
		this.#bossgameManifestsUsed = [];

		// set the score counterw to zero
		this.#score = 0;
		this.#lastScore = 0;

		// assign full health
		this.#health = 4;
		this.#lastHealth = this.#health;

		// add a reference to the manifest the rest of this class can use
		this.#manifest = manifest;

		// set up out skin images for desktop mode
		this.#imgs = {
			logo: new Image(),
			character: new Image()
		};
	}

	/**
	 * Gets the next phase of the level
	 * @param {function} callback - A handler function that will recieve 2 params: mode and data.
	 * @returns {void}
	 */
	getNext(callback) {

		// If we're at a stage where we're laying a boss game we'll update this
		let bossgame = null;

		// Handle whatever round we're in, assuming we're not playing boss rush mode
		if (this.#mode !== PWLevel.MODE_BOSSRUSH) {

			// if we're in the boss round, just use the boss game
			if (this.#bossRound) {
				bossgame = this.#bossgameManifests[0];

				// otherwise, figure out what to do next
			} else {

				// record what the last round was for comparisons in our scenes
				this.#lastRound = this.#round;

				// reference the microgame games list
				let microgames = this.#manifest.microgames.games;
				let rounds = this.#manifest.microgames.rounds;

				// we got here while in a microgame round...
				if (this.#round <= this.#microgameRounds) {

					// we haven't played the full number of games for this round yet
					if (this.#gamesRemaining > 0) {

						// if we're in endless mode, we'll increase the difficulty each time we play all the games, but not on the first game
						if (this.mode === PWLevel.MODE_ENDLESS && this.#gamesTotal !== this.#gamesRemaining) {
							this.__setDifficulty(this.difficulty + 1, false);
						}

						// count down the games remaining
						this.#gamesRemaining--;
					}

					// we've played all the games for this round, start a new round
					else {

						this.#round++;

						// in endless mode, we have to reset things when they hit any sort of limit
						if (this.#mode === PWLevel.MODE_ENDLESS) {

							// The new round will play faster, so we'll reset the difficulty back to zero
							this.__setDifficulty(0, true);

							// we've played all teh defined rounds, so start back at the beginning
							if (this.#round > this.#microgameRounds) {

								// reset the round counter
								this.#round = 1;

								// We're setting this to zero so round comparisons will work in the transition scenes
								this.#lastRound = 0;
							}
						}

						// We still have at least one microgame round to play
						if (this.#round <= this.#microgameRounds) {

							// update the number of games this round wants us to play
							this.#gamesTotal = rounds[this.#round - 1];

							// we're starting a game now, so we'll subtract one from the total
							this.#gamesRemaining = this.#gamesTotal - 1;

							callback("newround", "microgame");

							// we're done here
							return;

							// we are out of microgames, switch to boss mode
						} else {
							this.#bossRound = true;
							this.#lastRound = this.#round;
							bossgame = this.#bossgameManifests[0];
						}
					}
				}
			}
		}

		// this is a buss rush game, we'll have to figure out what boss game to play
		else {

			// note what round we came from
			this.#lastRound = this.#round;

			// We have played every game, so we'll need to mix things up to increase the challenge
			if (this.#bossgameManifests.length < 1) {

				// put all the boss games back into the list
				this.#bossgameManifests = this.#bossgameManifestsUsed;
				this.#bossgameManifestsUsed = [];

				// If the last round was at the highest difficulty, we'll start a new round
				// at difficulty 0, but increase the game speed
				if (this.difficulty === 2) {

					// reset the difficulty level
					this.__setDifficulty(0, true);

					// update the round (will trigger faster game speed)
					this.#round++;

					// fire the callback in newround mode
					callback("newround", "bossgame");

					// We don't need to do anything else until the next time this method is called
					return;
				}
				// otherwise, we'll just increase the difficulty and stay in the same round
				else {
					// increase the difficulty
					this.__setDifficulty(this.difficulty + 1, false);
				}
			}

			// Pull a random game from the bossgame list
			bossgame = this.#bossgameManifests.splice(Math.floor(Math.random() * this.#bossgameManifests.length), 1)[0];

			// Store the game in the used list so we can recycle it later
			this.#bossgameManifestsUsed.push(bossgame);
		}

		// when we get here we'll either have a bossgame, or we'll need to pull a microgame from the list

		// We have a boss game, play that
		if (bossgame) {
			this.#bossRound = true;
			callback('bossgame', bossgame);
		}

		// Grab a random microgame and play that
		else {
			callback('microgame', this.getRandomMicrogameManifest());
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
	gameCompleted(success) {
		GameWrapper.characterAnimation = success ? 2 : 3;

		this.#lastScore = this.#score;
		this.#lastHealth = this.#health;

		this.#score++;
		if (!success) this.#health--;

		if (this.bossRound && this.#mode !== PWLevel.MODE_BOSSRUSH && success) {
			this.#complete = true;
		}

		if (this.game_complete_callback) this.game_complete_callback(success, this.complete);
	}

	/**
	 * Loads any assets this level will use
	 * @param {Function} callback - callback to execute when items are preloaded. Will pass a value between 0 and 1.
	 * @param {boolean} force - set to true to ignore cached items
	 */
	preload(callback, force) {
		let _this = this;

		// this will count the number of promises we need to wait for
		// we start with 1 so everything below can run without one item falsely completing
		var promises = 1;

		// run this when all the manifest data has been pulled
		function startPhaserPreload() {
			PWGame.preloadManifests(callback);
		}

		// run this when every promise completes to see if we're done
		function checkPromises() {
			promises--;

			if (promises < 1) {
				startPhaserPreload();
			}
		}

		// run this if something fucks up
		function handleError(err) {
			console.error(err);
			promises--;
			if (promises < 1) {
				console.error("Loaded with errors!");
				alert("Loaded with errors!");
			}
		}

		let loaded = [];

		promises++;
		let loadTransition = new Promise((resolve, reject) => {
			PWGame.loadTransition(
				_this.#manifest.transition,
				function () {
					resolve();
				},
				function (err) {
					console.error(err);
					alert("Transition Scene Failed:\n" + err + "\n\nCheck dev console for more information");
					reject();
				},
				typeof (force) !== 'undefined' ? force : false
			);
		});
		loadTransition.then(checkPromises, handleError);

		// preload all the microgames asynchronously
		if (this.#manifest.microgames) {
			this.#manifest.microgames.games.forEach(function (gameInfo) {

				let path = gameInfo.team + "/microgames/" + gameInfo.game;

				// check if we've started loading this already
				if (loaded.indexOf(path) >= 0) return;

				// if we haven't, make a note that we are now
				loaded.push(path);
				promises++;

				// wrap the microgame loading in a new promise
				let loadMicrogame = new Promise((resolve, reject) => {

					PWGame.loadMicroGame(
						gameInfo,
						function (manifest) {
							_this.#microgameManifests.push(manifest);
							resolve();
						},
						function (err) {
							console.error(err);
							alert("Microgame Failed:\n" + err + "\n\nCheck dev console for more info.");
							reject();
						},
						typeof (force) !== 'undefined' ? force : false
					);

				});

				loadMicrogame.then(checkPromises, handleError);
			});
		}

		// put any boss games in here
		let bossgames = [];

		// normal mode games have one bossgame
		if (this.#manifest.bossgame) bossgames.push(this.#manifest.bossgame);

		// bsoss rush games have a list of bossgames
		else if (this.#manifest.bossgames) bossgames = this.#manifest.bossgames;

		// preload all the bossgames asynchronously
		if (bossgames) {
			bossgames.forEach(function (gameInfo) {

				let path = gameInfo.team + "/bossgames/" + gameInfo.game;

				// check if we've started loading this already
				if (loaded.indexOf(path) >= 0) return;

				// if we haven't, make a note that we are now
				loaded.push(path);
				promises++;

				// wrap the bossgame loading in a new promise
				let loadBossgame = new Promise((resolve, reject) => {

					PWGame.loadBossGame(
						gameInfo,
						function (manifest) {
							_this.#bossgameManifests.push(manifest);
							resolve();
						},
						function (err) {
							console.error(err);
							alert("Boss Game Failed:\n" + err + "\n\nCheck dev console for more info.");
							reject();
						},
						typeof (force) !== 'undefined' ? force : false
					);

				});

				loadBossgame.then(checkPromises, handleError);
			});
		}

		// preload and remember all the images we need for the skin stuff
		promises++;
		this.#imgs.logo = new Image();
		this.#imgs.logo.src = "teams/" + this.#manifest.logo.team + "/logos/" + this.#manifest.logo.image;
		this.#imgs.logo.onload = checkPromises;

		promises++;
		this.#imgs.charsheet = new Image();
		this.#imgs.charsheet.src = "teams/" + this.#manifest.character.team + "/characters/" + this.#manifest.character.sheet;
		this.#imgs.charsheet.onload = checkPromises;

		// we call this here to remove that default promise we started with now that everything else is registered
		checkPromises();
	}

	/**
	 * Returns true if level has an into movie
	 * @return {boolean}
	 */
	hasIntro() {
		return false;
	}

	/**
	 * Returns a random microgame manifest, or false if no microgames exist in the level set 
	 * (Will go through every game before returning a duplicate)
	 * @return {(object|boolean)}
	 */
	getRandomMicrogameManifest() {
		if (!this.#manifest.microgames || this.#manifest.microgames.length === 0) return false;

		var i;

		if (this.#microgameManifests.length < 1) {
			this.#microgameManifests = this.#microgameManifestsUsed;
			this.#microgameManifestsUsed = [];
		}
		if (this.#microgameManifests.length < 1) {
			alert("Level has no microgame manifests loaded");
			throw ("Level has no microgame manifests loaded");
		}

		let used = this.#microgameManifests.splice(Math.floor(Math.random() * this.#microgameManifests.length), 1)[0];

		this.#microgameManifestsUsed.push(used);
		return used;
	}

	/**
	 * Returns the boss game manifest for this level, or false if none exists
	 * @return {(object|boolen)}
	 */
	getBossgameManifest() {
		return this.#manifest.bossgame ? this.#manifest.bossgame : false;
	}
}

/** Default Level Manifest (used when testing) */
PWLevel.default_manifest = {
	difficulty: 0,
	mode: PWLevel.MODE_NORMAL,
	logo: {
		team: "psychogoldfish",
		image: "sir_reginald_emojiman.png"
	},
	character: {
		team: "psychogoldfish",
		sheet: "sir_reginald_emojiman_sheet.webp"
	},
	transition: {
		team: "psychogoldfish",
		name: "emojis"
	},
	microgames: null,
	bossgame: null
};
/** A scene that preloads other scenes using data from manifests */
class PWTransitionScene extends Phaser.Scene {

	/** The level has just started */
	static PHASE_START = 'start';

	/** showing the current health/score info and calling hint text */
	static PHASE_INFO = 'info';

	/** We are exiting the transition */
	static PHASE_EXIT = 'exit';

	/** We are entering the transition */
	static PHASE_ENTER = 'enter';

	/** We're speeding up */
	static PHASE_FASTER = 'faster';

	/** We're increaing difficulty */
	static PHASE_LEVEL_UP = 'level-up';

	/** We're starting a boss level */
	static PHASE_BOSS_LEVEL = 'boss-game';

	/** We lost the game :( */
	static PHASE_GAME_OVER = 'game-over';

	/** We won the game :) */
	static PHASE_WINNER = 'winner';

	/**
	 * registers PWGameSceneloader scene key via parent constructor
	 */
	constructor(config) {

		// needs to be called before we can reference 'this' anywhere in the constructor
		super(config);

		// make sure we have all our required methods built in
		let err = false;

		if (typeof (this.enter) !== 'function') {
			err = 'You must add an enter(transition_name) method to your transition scene. The framework will call this to show the enter-in transition.';
		}

		if (err) {
			alert("ERROR: " + err);
			throw err;
		}
	}

	/**
	 * Returns true if the player still has health
	 * @returns {boolean}
	 */
	playerAlive() {
		return PWGame.level.health > 0;
	}

	/**
	 * Returns true if we're starting a new round at a faster speed
	 * @returns {boolean}
	 */
	isFaster() {
		return PWGame.level.round !== PWGame.level.lastRound;
	}

	/**
	 * Returns true if the difficulty has increased
	 * @returns {boolean}
	 */
	isHarder() {
		return PWGame.level.difficulty > PWGame.level.lastDifficulty;
	}

	/**
	 * Returns true if we're starting a new boss level
	 * @returns {boolean}
	 */
	isBossLevel() {
		return PWGame.level.bossRound;
	}

	/**
	 * Returns true if the player has won the whole level
	 * @returns {boolean}
	 */
	levelCompleted() {
		return PWGame.level.complete;
	}
}
/** A scene that preloads other scenes using data from manifests */
class PWGameSceneloader extends Phaser.Scene {

	/**
	 * registers PWGameSceneloader scene key via parent constructor
	 */
	constructor(key) {
		super({ key: key ? key : 'PWGameSceneloader' });
	}

	/**
	 * Uses Phaser to preload items from pending manifests
	 */
	preload() {
		let _this = this;

		// pass the preload progress to the framework
		this.load.on('progress', function (value) {
			PWGame.onManifestsLoaded(value);
		});

		function getPath(item, default_path) {
			let path = default_path;

			if (item.team) {
				path = 'teams/' + item.team + '/';

				if (item.microgame) {
					path += 'microgames/' + item.microgame + '/';
				}
				else if (item.bossgame) {
					path += 'bossgames/' + item.bossgame + '/';
				}
				else if (item.transition) {
					path += 'transitions/' + item.transition + '/';
				}
			}

			return path;
		}

		// cycle through any manifests for the scene we are preloading
		PWGameSceneloader.manifests.forEach(manifest => {

			let prefix = manifest.prefix ? manifest.prefix : manifest.sceneClass + '.';

			// add any images we need to load
			if (manifest.images) {

				// note: we are prefixing all the assets with the scene class path
				manifest.images.forEach(image => {

					// if no key is provided, use the image name
					let key = image.key ? image.key : image.image;

					// extract the appropriate prefix and path for the image
					let path = getPath(image, manifest.path);

					// required config info
					let config = {
						key: prefix + key,
						url: path + image.image
					};

					// optional attributes for images
					if (typeof (image.normalMap) !== 'undefined') {
						image.normalMap = path + image.normalMap;
					}

					// load the image
					_this.load.image(config);
					PWGame.textureTypes[prefix + key] = 'image';
				});
			}

			if (manifest.spritesheets) {
				manifest.spritesheets.forEach(spritesheet => {
					let key = spritesheet.key ? spritesheet.key : spritesheet.image;

					// extract the appropriate prefix and path for the image
					let path = getPath(spritesheet, manifest.path);

					// required config info
					let config = {
						key: prefix + key,
						url: path + spritesheet.image,
						frameConfig: {
							frameWidth: spritesheet.frameWidth,
							frameHeight: spritesheet.frameHeight
						}
					};

					// optional attributes for spritesheet

					if (typeof (spritesheet.startFrame) !== 'undefined') config.frameConfig.startFrame = spritesheet.startFrame;
					if (typeof (spritesheet.endFrame) !== 'undefined') config.frameConfig.endFrame = spritesheet.endFrame;
					if (typeof (spritesheet.margin) !== 'undefined') config.frameConfig.margin = spritesheet.margin;
					if (typeof (spritesheet.spacing) !== 'undefined') config.frameConfig.spacing = spritesheet.spacing;

					if (typeof (spritesheet.normalMap) !== 'undefined') {
						spritesheet.normalMap = path + spritesheet.normalMap;
					}

					// load the sheet
					_this.load.spritesheet(config);
					PWGame.textureTypes[prefix + key] = 'spritesheet';
				});
			}

			if (manifest.atlases) {
				manifest.atlases.forEach(atlas => {
					let key = atlas.key ? atlas.key : atlas.texture;

					// extract the appropriate prefix and path for the image
					let path = getPath(atlas, manifest.path);

					// required config info
					let config = {
						key: prefix + key,
						textureURL: path + atlas.texture,
						atlasURL: path + atlas.atlas
					};

					// optional attributes for atlas
					if (typeof (atlas.normalMap) !== 'undefined') {
						atlas.normalMap = path + atlas.normalMap;
					}

					// load the atlas
					_this.load.atlas(config);
					PWGame.textureTypes[prefix + key] = 'atlas';
				});
			}

			// add any sounds

		});
	}

}

// container for loaded scene classes
PWGameSceneloader.loaded = {};

// queue manifests that need to have assets loaded in here
PWGameSceneloader.manifests = [];
/** 
 * Picoware Framework Controller 
 * 
 * An instance of this will be globally accessible as 'PWGame'
 */
class PWFramework {

	//============================================ static properties ================================================//

	/**
	 * Production mode, the game will run normally without any extra console logging or debugging features
	 * @type string
	 * @readonly
	 */
	static USERMODE_PROD = 'prod';

	/**
	 * Debug mode, the game will run with extra console logging and debugging features
	 * @type string
	 * @readonly
	 */
	static USERMODE_DEBUG = 'debug';

	/**
	 * Developer mode, the game will run using the developer interface and allow for loading of custom levels and microgames for quick testing
	 * @type string
	 * @readonly
	 */
	static USERMODE_DEV = 'dev';


	//============================================ instance properties ================================================//

	/**
	 * Reference to the Phaser game instance
	 * @type Phaser.Game
	 * @default null
	 * @private
	 */
	#phaser = null;

	/**
	 * Reference to the Phaser game instance
	 * @type Phaser.Game
	 * @default null
	 * @readonly
	 */
	get phaser() { return this.#phaser; }

	/**
	 * stores what type of texture each key is attached to
	 * @type object
	 * @default {}
	 * @public
	 */
	textureTypes = {};

	/** 
	 * The mode the game is running in. Should be one of the USERMODE_ constants
	 * @type {string} 
	 * @default 'prod'
	 * @private
	 */
	#usermode = PWFramework.USERMODE_PROD;

	get usermode() { return this.#usermode; }

	/**
	 * The width and height of the microgame screen
	 * @type {number}
	 * @default 524
	 * @private
	 */
	#screenSize = 524;					// width and height of the microgame screen

	/**
	 * The width and height of the microgame screen
	 * @type {number}
	 * @default 524
	 * @readonly
	 */
	get screenSize() { return this.#screenSize; }

	/**
	 * Will be used to contain screen size information
	 * @type {object}
	 * @default null
	 * @private
	 */
	#screen = null;

	/**
	 * The screen size object
	 * @type {object}
	 * @default null
	 * @readonly
	 */
	get screen() { return this.#screen; }

	/**
	 * Pause state of the game
	 * @type {boolean}
	 * @default false
	 * @private
	 */
	#paused = false;

	/**
	 * Pause state of the game
	 * @type {boolean}
	 * @default false
	 * @readonly
	 */
	get paused() { return this.#paused; }

	/**
	 * Used to note when the game is transitioning between scenes/microgames
	 * @type {boolean}
	 * @default false
	 */
	#inTransition = false;

	/**
	 * Used to note when the game is transitioning between scenes/microgames
	 * @type {boolean}
	 * @default false
	 * @readonly
	 */
	get inTransition() { return this.#inTransition; }

	/**
	 * The FPS we are basing all of our timing on (actual fps may be different).
	 * @type {number}
	 * @default 60
	 * @private
	 */
	#targetFPS = 60;

	/**
	 * The FPS we are basing all of our timing on (actual fps may be different).
	 * @type {number}
	 * @default 60
	 * @readonly
	 */
	get targetFPS() { return this.#targetFPS; }

	/**
	 * The current speed modifier, used when increasing level difficulty.
	 * @type {number}
	 * @default 1 - normal speed
	 * @private
	 */
	#gameSpeed = 1;

	/**
	 * The current speed modifier, used when increasing level difficulty.
	 * @type {number}
	 * @default 1 - normal speed
	 * @readonly
	 */
	get gameSpeed() { return this.#gameSpeed; }

	/**
	 * If true, this game has just started
	 * @type boolean
	 * @default true
	 * @private
	 */
	#newGame = true;

	/**
	 * If true, this game has just started
	 * @type {boolean}
	 * @default true
	 * @readonly
	 */
	get newGame() { return this.#newGame; }

	/**
	 * If true, this is a new level
	 * @type {boolean}
	 * @default true
	 * @private
	 */
	#newLevel = true;

	/**
	 * If true, this is a new level
	 * @type {boolean}
	 * @default true
	 * @readonly
	 */
	get newLevel() { return this.#newLevel; }

	/**
	 * The number of ms we expect to happen during a single frame. this will be set when increaseGameSpeed is called
	 * @type {number}
	 * @default 0
	 * @private
	 */
	#msPerTargetFrame = 0;

	/**
	 * The number of ms we expect to happen during a single frame. this will be set when increaseGameSpeed is called
	 * @type {number}
	 * @default 0
	 * @readonly
	 */
	get msPerTargetFrame() { return this.#msPerTargetFrame; }

	/**
	 * The number of ms we expect to happen during a single step.
	 * @type {number}
	 * @default 0
	 * @private
	 */
	#msPerStep = 0;

	/**
	 * The number of ms we expect to happen during a single step.
	 * @type {number}
	 * @default 0
	 * @readonly
	 */
	get msPerStep() { return this.#msPerStep; }

	/**
	 * tracks the number of ms that have passed since the last step started
	 * @type {number}
	 * @default 0
	 * @private
	 */
	#stepTracker = 0;

	/**
	 * tracks the number of ms that have passed since the last step started
	 * @type {number}
	 * @default 0
	 * @readonly
	 */
	get stepTracker() { return this.#stepTracker; }

	/**
	 * Handles input from on-screen gamepad and keyboard
	 * @type {PWInput}
	 * @private
	 */
	#input = new PWInput();

	/**
	 * Handles input from on-screen gamepad and keyboard
	 * @type {PWInput}
	 * @readonly
	 */
	get input() { return this.#input; }

	/**
	 * The key name of the active micro/boss game scene
	 * @type {string}
	 * @private
	 * @default null
	 */
	#activeGameScene = null;

	/**
	 * The key name of the active micro/boss game scene
	 * @type {string}
	 * @default null
	 * @readonly
	 */
	get activeGameScene() { return this.#activeGameScene; }

	/**
	 * the key name of the active transition scene
	 * @type {string}
	 * @default null
	 * @private
	 */
	#activeTransition = null;

	/**
	 * the key name of the active transition scene
	 * @type {string}
	 * @default null
	 * @readonly
	 */
	get activeTransition() { return this.#activeTransition; }

	/**
	 * If true, the player wil win the game when the timer runs out
	 * @type {boolean}
	 * @default false
	 * @private
	 */
	#winOnTimeUp = false;

	/**
	 * If true, the player wil win the game when the timer runs out
	 * @type {boolean}
	 * @default false
	 * @readonly
	 */
	get winOnTimeUp() { return this.#winOnTimeUp; }


	//============================================ instance methods ================================================//

	/**
	 * Create instance of the framework
	 */
	constructor() {

		/** 
		 * Handler for when manifest files are loaded
		 * @type function
		 * @default function(){}
		 */
		this.onManifestsLoaded = () => { };

		// set the default speed for our microgames/music (1=normal speed, 2=double speed, etc)
		this.setGameSpeed(this.gameSpeed);
	}

	/**
	 * Starts the framework (This is called in our index.html file)
	 * @param {string} usermode - The mode the game should start in.  Should be one of the USERMODE_ constants.
	 * @throws {string} - If an invalid usermode is passed
	 * @returns {void}
	 */
	start(usermode = PWFramework.USERMODE_PROD) {

		if ([PWFramework.USERMODE_PROD, PWFramework.USERMODE_DEBUG, PWFramework.USERMODE_DEV].indexOf(usermode) === -1) {
			alert("Invalid usermode: " + usermode);
			throw ("Invalid usermode: " + usermode);
		}

		this.#usermode = usermode;

		/**
		 * @type PWFramework
		 * Reference for use in functions/closures
		 */
		let _this = this;

		// initialize the game wrapper (see wrapper.js).  This wrapper handles the game layouts (like the GBA and GBC skins), 
		// fade effects, screen resizes, and on-screen input events.
		GameWrapper.init({
			onScreenUpdated: this.onScreenUpdated,
			onScreenUpdatedThisArg: this,
			onInputChanged: this.#input.onLayoutInputChanged,
			onInputChangedThisArg: this.#input
		});

		/**
		 * Executes when Phaser is ready to use
		 * @callback
		 * @name PhaserReady
		 * @returns {void}
		 */
		function PhaserReady() {

			// add the generic preloading scene
			_this.phaser.scene.add('___loaderScene___', _this.loaderScene);

			// start the game in the appropriate mode
			if (_this.#usermode === PWFramework.USERMODE_DEV) {
				_this.startDevScreen();
			} else {
				// TODO: start the game in normal mode
				console.error("This mode isn't supported yet!");
				alert("This mode isn't supported yet!");
			}
		}

		// create a base scene to start the game with
		this.baseScene = new Phaser.Scene('___baseScene___');
		this.baseScene.create = function () {
			PhaserReady();
		};

		this.loaderScene = new PWGameSceneloader('___loaderScene___');

		/**
		 * @type Phaser.Game
		 * Reference to the Phaser game instance
		 */
		this.#phaser = new Phaser.Game({
			parent: "screen",
			type: Phaser.AUTO,
			width: this.#screenSize,
			height: this.#screenSize,
			id: "PhaserCanvas",
			backgroundColor: '#000000',
			scene: [this.baseScene], // we're only adding the baseScene right now so Phaser is ready without preloading anything
			physics: {
				default: 'arcade',
				arcade: {
					gravity: { y: 0 },
					debug: localStorage.getItem("debug-physics") ? true : false
				}
			},
		});
	}

	/**
	 * Handles resizing the Phaser canvas on size and orientation changes
	 * @param {object} screen - An object containing information about the user's current screen size
	 * @returns {void}
	 */
	onScreenUpdated(screen) {
		this.#screen = screen;
		if (this.phaser && this.phaser.canvas) {
			this.phaser.canvas.style.width = screen.size + "px";
			this.phaser.canvas.style.height = screen.size + "px";
		}
	}

	/**
	 * Starts the developer mode option screen
	 * @returns {void}
	 */
	startDevScreen() {
		/**
		 * @type PWFramework
		 * Reference for use in functions/closures
		 */
		let _this = this;

		// we'll use this for localStorage values
		let lsVal;

		/**
		 * @type boolean
		 * Used to prevent multiple clicks from triggering the same action
		 */
		let loading = false;

		// reference our html elements

		/**
		 * @type HTMLElement
		 * The developer interface frame
		 */
		let devFrame = document.getElementById("dev-interface");

		// stop mouse clicks from rickling to the body, where they get cancelled
		devFrame.onclick = function (e) {
			e.stopPropagation();
		}

		// form segments
		let microgameForm = document.getElementById("microgame-form");
		let bossgameForm = document.getElementById("bossgame-form");
		let levelForm = document.getElementById("level-form");
		let transitionSettings = document.getElementById("transition-settings");

		let testSelect = document.getElementById("test-select");
		lsVal = localStorage.getItem("test-select");
		if (lsVal) testSelect.value = lsVal;

		function testSelectChange(e) {
			if (e) e.stopPropagation();

			microgameForm.style.display = "none";
			bossgameForm.style.display = "none";
			levelForm.style.display = "none";
			transitionSettings.style.display = "none";

			switch (testSelect.value) {
				case "microgame":
					microgameForm.style.display = "";
					transitionSettings.style.display = "";
					break;
				case "bossgame":
					bossgameForm.style.display = "";
					transitionSettings.style.display = "";
					break;
				case "level":
					levelForm.style.display = "";
					break;
				default:
					localStorage.removeItem("test-select");
					return;
			}

			localStorage.setItem("test-select", testSelect.value);
		}

		testSelect.onchange = testSelectChange;
		testSelectChange();

		let debugPhysics = document.getElementById("debug-physics");
		lsVal = localStorage.getItem("debug-physics");
		if (lsVal) debugPhysics.checked = true;

		debugPhysics.onchange = function () {
			if (debugPhysics.checked) {
				localStorage.setItem("debug-physics", "true");
			} else {
				localStorage.removeItem("debug-physics");
			}

			// refresh page
			location.reload();
		}

		/**
		 * @type HTMLElement
		 * The input for team dir to use when loading a level
		 */
		let levelTeam = document.getElementById("level-team");

		// check if there is a team in local storage and set it as the default value
		lsVal = localStorage.getItem("level-team");
		if (lsVal) levelTeam.value = lsVal;

		/**
		 * @type HTMLElement
		 * The input for team dir to use when loading a level
		 */
		let levelName = document.getElementById("level-name");

		// check if there is a name in local storage and set it as the default value
		lsVal = localStorage.getItem("level-name");
		if (lsVal) levelName.value = lsVal;

		/**
		 * @type HTMLElement
		 * The input for team dir to use when loading a microgame
		 */
		let microgameTeam = document.getElementById("microgame-team");

		// check if there is a team in local storage and set it as the default value
		lsVal = localStorage.getItem("microgame-team");
		if (lsVal) microgameTeam.value = lsVal;

		/**
		 * @type HTMLElement
		 * The input for microgame dir to use
		 */
		let microgameDir = document.getElementById("microgame-dir");

		// check if there is a dir in local storage and set it as the default value
		lsVal = localStorage.getItem("microgame-dir");
		if (lsVal) microgameDir.value = lsVal;


		/**
		 * @type HTMLElement
		 * The button to load a microgame
		 */
		let testGameBtn = document.getElementById("test-game-btn");

		/**
		 * @type HTMLElement
		 * The input for team dir to use when loading a boss game
		 */
		let bossgameTeam = document.getElementById("bossgame-team");


		// check if there is a team in local storage and set it as the default value
		lsVal = localStorage.getItem("bossgame-team");
		if (lsVal) bossgameTeam.value = lsVal;

		/**
		 * @type HTMLElement
		 * The input for boss game dir to use
		 */
		let bossgameDir = document.getElementById("bossgame-dir");

		// check if there is a dir in local storage and set it as the default value
		lsVal = localStorage.getItem("bossgame-dir");
		if (lsVal) bossgameDir.value = lsVal;

		/**
		 * @type HTMLElement
		 * The input for team dir to use when loading a transition
		 */
		let transitionTeam = document.getElementById("transition-team");

		// check if there is a team in local storage and set it as the default value
		lsVal = localStorage.getItem("transition-team");
		if (lsVal) transitionTeam.value = lsVal;

		/**
		 * @type HTMLElement
		 * The input for transition name to use
		 */
		let transitionName = document.getElementById("transition-name");

		// check if there is a dir in local storage and set it as the default value
		lsVal = localStorage.getItem("transition-name");
		if (lsVal) transitionName.value = lsVal;

		/**
		 * @type HTMLElement
		 * The input for team dir to use when loading a logo
		 */
		let logoTeam = document.getElementById("logo-team");

		// check if there is a team in local storage and set it as the default value
		lsVal = localStorage.getItem("logo-team");
		if (lsVal) logoTeam.value = lsVal;

		/**
		 * @type HTMLElement
		 * The input for logo image to use
		 */
		let logoImage = document.getElementById("logo-image");

		// check if there is a dir in local storage and set it as the default value
		lsVal = localStorage.getItem("logo-image");
		if (lsVal) logoImage.value = lsVal;

		/**
		 * @type HTMLElement
		 * The input for team dir to use when loading a character
		 */
		let characterTeam = document.getElementById("character-team");

		// check if there is a team in local storage and set it as the default value
		lsVal = localStorage.getItem("character-team");
		if (lsVal) characterTeam.value = lsVal;

		/**
		 * @type HTMLElement
		 * The input for character spritesheet to use
		 */
		let characterSpritesheet = document.getElementById("character-spritesheet");

		// check if there is a dir in local storage and set it as the default value
		lsVal = localStorage.getItem("character-spritesheet");
		if (lsVal) characterSpritesheet.value = lsVal;

		function injectManifestOptions(manifest) {

			let transition_team = transitionTeam.value;
			let transition_name = transitionName.value;

			if (transition_team && transition_name) {
				manifest.transition = { team: transition_team, name: transition_name };
				localStorage.setItem("transition-team", transition_team);
				localStorage.setItem("transition-name", transition_name);
			} else {
				localStorage.removeItem("transition-team");
				localStorage.removeItem("transition-name");
			}

			let logo_team = logoTeam.value;
			let logo_image = logoImage.value;

			if (logo_team && logo_image) {
				manifest.logo = { team: logo_team, image: logo_image };
				localStorage.setItem("logo-team", logo_team);
				localStorage.setItem("logo-image", logo_image);
			} else {
				localStorage.removeItem("logo-team");
				localStorage.removeItem("logo-image");
			}

			let character_team = characterTeam.value;
			let character_spritesheet = characterSpritesheet.value;

			if (character_team && character_spritesheet) {
				manifest.character = { team: character_team, sheet: character_spritesheet };
				localStorage.setItem("character-team", character_team);
				localStorage.setItem("character-spritesheet", character_spritesheet);
			} else {
				localStorage.removeItem("character-team");
				localStorage.removeItem("character-spritesheet");
			}

			return manifest;
		}

		// show the developer options
		devFrame.style.display = "";

		// hide the Phaser canvas and game overlay until they are needed
		this.phaser.canvas.style.display = "none";
		GameWrapper.gameplaySkin.style.display = "none";

		// start our fade in effect because we are fancy
		GameWrapper.fadeIn();

		/**
		 * Validates load paths. 
		 * Returns path as an array, or false if path is invalid.
		 * @param {string} path - The {devteam}/{item_name} path for games, levels, etc
		 * @return {(Array|boolean)} - The path as an array, or false if the path is invalid
		 */
		function validatePath(path) {
			path = path.split("/");
			if (path.length !== 4) {
				console.error("Invalid path!", path);
				return false;
			}
			return [path[1], path[3]];
		}

		function testLevel() {

			localStorage.setItem("level-team", levelTeam.value);
			localStorage.setItem("level-name", levelName.value);

			// disable pointer events to lock the developer forms for now
			devFrame.style.pointerEvents = "none";


			_this.loadLevel(
				{ team: levelTeam.value, name: levelName.value },
				function (manifest) {
					// do our fade out/fade in effect, and then...
					GameWrapper.crossFade(function () {

						// hide the developer menu while we're playing.
						devFrame.style.display = "none";

						// turn pointer events back on so the dev menu will work when we go back to it later
						devFrame.style.pointerEvents = "";

						// start our fake level
						_this.startLevel(manifest, true);
					});
				},
				function (err) {
					alert("Error loading level manifest: " + err);
				},
				true
			);

		}

		function testMicrogame() {

			// save the team and microgame so we can quickly use them next time
			localStorage.setItem("microgame-team", microgameTeam.value);
			localStorage.setItem("microgame-dir", microgameDir.value);

			// check if user inputed a valid path. Return if it's invalid
			let path = "teams/" + microgameTeam.value + "/microgames/" + microgameDir.value;
			path = validatePath(path);
			if (!path) return;

			// create a fake level manifest that only uses the level we want to test
			// Note: missing properties will be filled in by the PWLevel.default_manifest object
			let manifest = {
				mode: PWLevel.MODE_ENDLESS,
				microgames: {
					rounds: [2, 3, 4],
					games: [
						{ team: microgameTeam.value, game: microgameDir.value }
					]
				},
				devMode: 'game'
			};

			manifest = injectManifestOptions(manifest);

			// disable pointer events to lock the developer forms for now
			devFrame.style.pointerEvents = "none";

			// do our fade out/fade in effect, and then...
			GameWrapper.crossFade(function () {

				// hide the developer menu while we're playing.
				devFrame.style.display = "none";

				// turn pointer events back on so the dev menu will work when we go back to it later
				devFrame.style.pointerEvents = "";

				// start our fake level
				_this.startLevel(manifest, true);
			});
		}

		function testBossgame(click_event) {

			// save the team and bossgame so we can quickly use them next time
			localStorage.setItem("bossgame-team", bossgameTeam.value);
			localStorage.setItem("bossgame-dir", bossgameDir.value);

			// cancel out the click event so nothing else can get triggered
			click_event.preventDefault();
			click_event.stopPropagation();

			// check if user inputed a valid path. Return if it's invalid
			let path = "teams/" + bossgameTeam.value + "/bossgames/" + bossgameDir.value;
			path = validatePath(path);
			if (!path) return;
			// create a fake level manifest that only uses the level we want to test
			// Note: missing properties will be filled in by the PWLevel.default_manifest object
			let manifest = {
				mode: PWLevel.MODE_BOSSRUSH,
				bossgames: [
					{ team: bossgameTeam.value, game: bossgameDir.value }
				],
				devMode: 'bossgame'
			};

			manifest = injectManifestOptions(manifest);

			// disable pointer events to lock the developer forms for now
			devFrame.style.pointerEvents = "none";

			// do our fade out/fade in effect, and then...
			GameWrapper.crossFade(function () {

				// hide the developer menu while we're playing.
				devFrame.style.display = "none";

				// turn pointer events back on so the dev menu will work when we go back to it later
				devFrame.style.pointerEvents = "";

				// start our fake level
				_this.startLevel(manifest, true);
			});
		}

		/**
		 * Handle the Load Microgame button
		 * @param {Event} click_event - The click event
		 * @callback
		 * @returns {void}
		 */
		testGameBtn.onclick = function (click_event) {

			PWFramework.enableMediaPlayback();

			// cancel out the click event so nothing else can get triggered
			click_event.preventDefault();
			click_event.stopPropagation();

			if (loading) return; // ignore clicks if we're already loading the game

			switch (testSelect.value) {
				case "microgame":
					testMicrogame();
					break;
				case "bossgame":
					testBossgame(click_event);
					break;
				case "level":
					testLevel();
					break;
				default:
					alert("Invalid test type: " + testSelect.value);
					break;
			}
		};
	}

	/**
	 * Starts a level
	 * @param {object} manifest - The manifest assciated with the level
	 * @param {boolean} force - If true, the level will be reloaded even if it's already loaded
	 * @returns {void}
	 */
	startLevel(manifest, force = false) {

		// Levels will always start with either a cutscene or a transition animation
		this.#inTransition = true;

		// referenece to self for use in closures and functions
		let _this = this;

		let _team = manifest.team;

		if (_team) {

			if (manifest.character && typeof (manifest.character.team) === 'undefined') {
				if (typeof (manifest.character) === 'string') {
					manifest.character = { sheet: manifest.character };
				}
				manifest.character.team = _team;
			}

			if (manifest.logo && typeof (manifest.logo.team) === 'undefined') {
				if (typeof (manifest.logo) === 'string') {
					manifest.logo = { image: manifest.logo };
				}
				manifest.logo.team = _team;
			}

			if (manifest.transition && typeof (manifest.transition.team) === 'undefined') {
				if (typeof (manifest.transition) === 'string') {
					manifest.transition = { name: manifest.transition };
				}
				manifest.transition.team = _team;
			}

			// make sure all the manifest areas have team data
			if (manifest.bossgame && typeof (manifest.bossgame.team) === 'undefined') {
				if (typeof (manifest.bossgame) === 'string') {
					manifest.bossgame = { game: manifest.bossgame };
				}
				manifest.bossgame.team = _team;
			} else if (Array.isArray(manifest.bossgames)) {

				for (let i = 0; i < manifest.bossgames.length; i++) {
					let bossgame = manifest.bossgames[i];
					if (typeof (bossgame.team) === 'undefined') {

						if (typeof (bossgame) === 'string') {
							manifest.bossgames[i] = bossgame = { game: bossgame };

						}
						bossgame.team = _team;
					}
				};
			}

			if (manifest.microgames && Array.isArray(manifest.microgames.games)) {
				for (let i = 0; i < manifest.microgames.games.length; i++) {
					let microgame = manifest.microgames.games[i];
					if (typeof (microgame.team) === 'undefined') {
						if (typeof (microgame) === 'string') {
							manifest.microgames.games[i] = microgame = { game: microgame };
						}
						microgame.team = _team;
					}
				}
			}
		}

		console.log(manifest);

		// get our actual level instance (see level.js)
		this.level = new PWLevel(manifest);

		this.#newLevel = true;

		// show the appropriate game layout (a frame on desktop, GBC for mobile in portrait mode, GBA for mobile in landscape)
		this.showGameLayout();

		// show our generic loading screen and set our initial 'loaded' value to zero
		GameWrapper.showLoadScreen();
		GameWrapper.setLoadedValue(0);

		// run this function as our level is preloading all of its required files and assets
		this.level.preload(function (complete) {

			// update the progress bar
			GameWrapper.setLoadedValue(complete);

			// if complete equals 1, we've loaded everything
			if (complete === 1) {

				function doStartLevel() {

					// do our fade out/fade in effect
					GameWrapper.crossFade(() => {

						// hide the preloader screen
						GameWrapper.hideLoadScreen();

						// tell the wrapper what character sheet to use
						GameWrapper.setCharacterImage(_this.level.imgs.charsheet);

						// tell the wrapper what character sheet to use
						GameWrapper.setLogoImage(_this.level.imgs.logo);

						_this.#activeTransition = 'transitions.' + manifest.transition.team + '.' + manifest.transition.name;

						// if the level has an intro movie, play it, then start the next phase
						if (_this.level.hasIntro()) {
							_this.level.playIntro(function () {
								_this.nextPhase();
							});

							// if there is no intro movie, start the next phase now
						} else {
							_this.nextPhase();
						}
					});
				}

				if (manifest.intro) {
					_this.startIntro(doStartLevel);
				} else {
					doStartLevel();
				}
			}
		}, force);

		// tell the level what to do when a game is completed
		this.level.onGameComplete(function () {

			// and that would be... go to the next phase, and start our transition animation
			_this.nextPhase(true);
		});
	}

	endLevel() {
		let _this = this;
		GameWrapper.crossFade(function () {
			_this.stopGame();
			_this.stopTransition();

			if (_this.usermode === PWFramework.USERMODE_DEV) {
				_this.startDevScreen();
			}
		});
	}

	startIntro(callback) {
		let _this = this;
		console.log("Starting intro movie:", this.level.manifest.intro);
		callback();
	}

	/** 
	 * Switches to the main game layout 
	 * @returns {void}
	 */
	showGameLayout() {
		// check screen size/orientation and display all the game elements
		GameWrapper.updateGameScreenOrientation();
		GameWrapper.gameplaySkin.style.display = "";
		this.phaser.canvas.style.display = "";
	}

	transitionIn(transition_in, callback) {
		if (transition_in) {
			setTimeout(callback, 3000);
		} else {
			callback();
		}
	}

	/**
	 * Move to the next phase of the current level
	 * @param {boolean} transition_in - if True, play our transition animation before starting the next phase
	 * @returns {void}
	 */
	nextPhase(transition_in) {
		let _this = this;

		// figure out what the next phase in the level is, and handle it
		let next = this.level.getNext(function (phase, data) {

			// if we're starting a game, we'll reference its manifest with this
			let game_manifest = null;

			// if we're starting a new round (faster games or boss levels), we'll note that with this
			let new_round = null;

			// set that we are transitioning between phases
			_this.#inTransition = true;

			// check the current phase
			switch (phase) {

				case 'bossgame':
					new_round = "Boss Level!";
					game_manifest = data;
					break;

				// we are still in the same round, and starting another microgame, so we need to record the manifest
				case 'microgame':
					game_manifest = data;
					break;

				// this is a new round
				case 'newround':

					_this.increaseGameSpeed();
					new_round = "Faster!";
					break;

				// we finished all the games!
				case 'finish':
					new_round = data === 'devmode' ? "Test Complete!" : "You Win!";
					break;
			}

			// If we have a manifest, we are starting a new microgame or bossgame
			if (game_manifest) {
				_this.nextGame(game_manifest, transition_in);
			}

			// we are starting a new round and need to show some text (faster, boss level, etc)
			else if (new_round) {

				// start the transition
				_this.showTransactionScene(PWTransitionScene.PHASE_ENTER);
			}

			_this.#newGame = false;
		});

		_this.#newLevel = false;
	}

	/**
	 * Prepares the next micro or boss game to start
	 * @param {object} manifest - The manifest for the game we want to start
	 * @param {boolean} transition_in - If true, play the transition-in animation before starting the game
	 * @returns {void}
	 */
	nextGame(game_manifest, transition_in) {
		let _this = this;
		this.activeManifest = game_manifest;
		this.showTransactionScene(transition_in ? PWTransitionScene.PHASE_ENTER : PWTransitionScene.PHASE_START);
	}

	stopGame() {

		let _this = this;

		if (this.#activeGameScene) {

			// pause execution if the scene is active
			if (this.phaser.scene.isActive(this.#activeGameScene)) {
				this.phaser.scene.pause(this.#activeGameScene);
			}

			// take a slight delay so any frame ticks the above pause didn't stop can finish running
			setTimeout(() => {
				// stop the scene
				_this.phaser.scene.stop(_this.#activeGameScene);
			}, 20);
		}
	}

	stopTransition() {

		let _this = this;

		this.#inTransition = false;

		if (this.#activeTransition) {
			if (this.phaser.scene.isActive(this.#activeTransition)) {
				this.phaser.scene.pause(this.#activeTransition);
			}
			setTimeout(() => {
				this.phaser.scene.stop(this.#activeTransition);
			}, 20);
		}
	}

	endTransition() {

		// stop the transition scene
		this.stopTransition();

		// start the game timer if we're playing microgames
		if (!this.level.bossRound) GameWrapper.startGameTimer();
	}

	showHints(hintDisplayedCallback, hintCompleteCallback) {

		let hint = "Get Ready!";
		let controls = "gamepad";

		let scene = this.phaser.scene.getScene(this.#activeGameScene);

		if (scene) {
			if (scene.getHintText) {
				hint = scene.getHintText();
			}
			if (scene.getControls) {
				controls = scene.getControls();
			}
		}

		GameWrapper.setHintText(hint, controls, hintDisplayedCallback, hintCompleteCallback);
	}

	startGame() {

		let _this = this;

		// start the actual game, and show it's hint text
		this.startActualGame(this.activeManifest);

		// reset the step tracker
		this.#msPerStep = this.msPerTargetFrame * PWConfig.FRAMES_PER_STEP;

		_this.#stepTracker = 0;
		GameWrapper.startCharacterAnimation();
	}

	showTransactionScene(transition_name) {

		if (!this.phaser.scene.isActive(this.#activeTransition)) {
			this.phaser.scene.start(this.#activeTransition);
		}
		this.phaser.scene.bringToTop(this.#activeTransition);

		let scene = this.phaser.scene.getScene(this.#activeTransition);
		scene.enter(transition_name);
	}

	/**
	 * Starts a micro or boss game
	 * @param {object} manifest - The manifest assciated with the micro or boss game
	 * @returns {void}
	 */
	startActualGame(manifest) {

		let _this = this;

		this.#newGame = true;

		// clear out any existing input handlers so they don't break the new game
		this.#input.reset();

		this.#activeGameScene = manifest.sceneClass;
		this.phaser.scene.start(this.#activeGameScene);
	}

	//============================================ game hooks ================================================//

	/**
	 * Queues an array of manifests for preloading
	 * @param {Array.<object>} manifests - An array of manifest objects to preload
	 * @returns {void}
	 */
	queuePreloadManifests(manifests, prepend = false) {
		let _this = this;
		manifests.forEach(manifest => {
			PWGameSceneloader.manifests.push(manifest);
		});
	}

	/**
	 * loads a manifest and registeres any scenes withhin
	 * @param array required_properties - An array of properties that must be present in the manifest
	 * @param object manifest - The manifest object to load
	 * @param string dir - The directory the manifest is in
	 * @param function callback - A callback function to run when the manifest has loaded
	 * @param function error_callback - A callback function to run if there are any problems loading the manifest
	 * @returns {void}
	 */
	doLoadManifest(required_properties, manifest, dir, callback, error_callback) {

		var _this = this;

		let finishLoad = function () {

			// make sure all the required manifest properties have been set
			let errors = [];
			required_properties.forEach(function (val) {
				if (typeof (manifest[val]) == 'undefined') {
					errors.push("Missing required property in manifest.json: '" + val + "'");
				}
			});

			// if anything is missing, call the error handler and exit
			if (errors.length > 0) {
				error_callback(errors.join("\n"));
				return;
			}

			/** 
			 * This manifest is associated with a Phaser Scene
			 * We'll need to get the JS files for the scene loaded before we can start the game
			 */
			if (manifest.sceneClass) {
				// get a reference to the scene class for this microgame if it's already been loaded.
				let _sceneClass;

				try {
					_sceneClass = _this.getSceneClass(manifest.sceneClass);
				}
				catch (e) {
					_sceneClass = null;
				}

				// Looks like we'll need to load the js file for this game scene
				if (!_sceneClass) {

					// make a note of how many JS files we need to load
					let scripts_remaining = manifest.jsFiles.length;

					// start loading each js file asynchronously
					manifest.jsFiles.forEach(url => {

						// load the js file in a <script> tag
						loaderScript(dir + url) // see utils.js

							// and after it's loaded...
							.then(() => {

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

										// get the manifest for the scene
										_this.queuePreloadManifests([manifest]);

										callback(manifest);
									}
									catch (e) {

										// oh no, something didn't work! (probably a bad js file, invalid class name or path)
										// fire the error callback
										error_callback(e);
									}
								}
							})

							// script failed to load, fire the error callback
							.catch((e) => {
								console.error(e);
								error_callback(e);
							});
					});

				}
				// This game scene was already loaded once, so we can go ahead with registering it and preloading any assets!
				else {
					_this.registerScene(_sceneClass, manifest);
					_this.queuePreloadManifests([manifest]);
					callback(manifest);
				}
			}
			/**
			 * This is a non-Phaser manifest, likely a level
			 */
			else {
				callback(manifest);
			}
		};

		if (manifest.parent) {
			let parent = _Manifests[manifest.type][manifest.parent.team][manifest.parent.name];
			this.doLoadManifest(required_properties, parent, parent.path, finishLoad, error_callback);
		} else {
			finishLoad();
		}

	}

	loadLevel(info, callback, error_callback, force) {

		let _this = this;

		this.loadLevelManifest(
			info,
			function (manifest, dir) {
				_this.doLoadManifest(['logo', 'character', 'transition'], manifest, dir, callback, error_callback);
			},
			error_callback,
			force
		);
	}

	loadTransition(info, callback, error_callback, force) {
		let _this = this;

		this.loadTransitionManifest(
			info,
			function (manifest, dir) {
				_this.doLoadManifest(['name', 'jsFiles', 'sceneClass'], manifest, dir, callback, error_callback);
			},
			error_callback,
			force
		);
	}

	/**
	 * Loads a microgame and all of it's assets before starting it.
	 * @param {object} gameInfo - An object with a team and game key to identify the microgame..
	 * @param {function} callback - A callback function to run when the microgame has loaded.
	 * @param {function} error_callback - A callback function to run if there are any problems loading the microgame.
	 * @param {boolean} force - set to true to load all files instead of using cached/compiled data.
	 * @returns {void}
	 */
	loadMicroGame(gameInfo, callback, error_callback, force) {

		// reference for functions/closures
		let _this = this;

		// if error callback is set to true, treat it as the 'force' parameter
		if (error_callback === true) {
			force = true;
			error_callback = function () { };
		}

		// if we don't have an error callback, have it do a generic alert
		error_callback = typeof (error_callback) !== 'undefined' ? error_callback : function (error) {
			console.error(error);
			alert(error);
		};

		// start by loading the manifest for this game
		this.loadMicroGameManifest(

			gameInfo,

			/**
			 * Handles when the manifest is loaded
			 * @param {object} manifest - The manifest we just loaded. 
			 * @param {string} dir - The directory we'll be loading any assets from.
			 */
			function (manifest, dir) {
				_this.doLoadManifest(['name', 'jsFiles', 'sceneClass'], manifest, dir, callback, error_callback);
			},

			error_callback,
			force
		);
	}

	/**
	 * Loads a bossgame and all of it's assets before starting it.
	 * @param {object} gameInfo - An object with a team and game key to identify the bossgame..
	 * @param {function} callback - A callback function to run when the bossgame has loaded.
	 * @param {function} error_callback - A callback function to run if there are any problems loading the bossgame.
	 * @param {boolean} force - set to true to load all files instead of using cached/compiled data.
	 * @returns {void}
	 */
	loadBossGame(gameInfo, callback, error_callback, force) {

		// reference for functions/closures
		let _this = this;

		// if error callback is set to true, treat it as the 'force' parameter
		if (error_callback === true) {
			force = true;
			error_callback = function () { };
		}

		// if we don't have an error callback, have it do a generic alert
		error_callback = typeof (error_callback) !== 'undefined' ? error_callback : function (error) {
			console.error(error);
			alert(error);
		};

		// start by loading the manifest for this game
		this.loadBossGameManifest(

			gameInfo,

			/**
			 * Handles when the manifest is loaded
			 * @param {object} manifest - The manifest we just loaded. 
			 * @param {string} dir - The directory we'll be loading any assets from.
			 */
			function (manifest, dir) {
				_this.doLoadManifest(['name', 'jsFiles', 'sceneClass'], manifest, dir, callback, error_callback);
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
	preloadManifests(callback) {
		// sets our callback in a property that PWGameSceneloader can call
		this.onManifestsLoaded = typeof (callback) !== 'undefined' ? callback : function () { };

		this.manifestPreloadQueue = [];

		// run the PWGameSceneloader scene.  When it's done, it'll trigger our callback
		this.phaser.scene.start('___loaderScene___');
	}

	/**
	 * Loads the manifest for a level
	 * @param {object} info - The team and name of the level to load
	 * @param {function} callback - The callback function to run when the manifest has loaded
	 * @param {function} error_callback - The callback function to run if there are any problems loading the manifest
	 * @param {boolean} force - set to true to load all files instead of using cached/compiled data.
	 */
	loadLevelManifest(info, callback, error_callback, force) {
		let _this = this;

		// make sure we have a container for the transition's parent path
		_Manifests.levels[info.team] = typeof (_Manifests.levels[info.team]) !== 'undefined' ? _Manifests.levels[info.team] : {};

		// if error_callback is true, use that as the force property
		if (error_callback === true) {
			force = true;
			error_callback = function () { };
		}

		// if no error callback is defined, have it use a generic alert
		error_callback = typeof (error_callback) !== 'undefined' ? error_callback : function (error) {
			console.error(error);
			alert(error);
		};

		// this is the directory that the manifest file should be in
		let dir = 'teams/' + info.team + '/levels/' + info.name + '/';

		// if the manifest hasn't been loaded yet, or we're forcing a fresh load....
		if (force || !_Manifests.levels[info.team][info.name]) {

			// load the manifest file into a javascript object
			this.getJSON(dir + 'manifest.json', function (data) {

				// update the manifest so it has a reference to our directory.
				data.path = dir;
				data.type = "levels";

				if (typeof (data.team) === 'undefined') {
					data.team = info.team;
				}

				// cache the manifest so we don't have to reload it again later, and fire the callback
				_Manifests.levels[info.team][info.name] = data;
				callback(_Manifests.levels[info.team][info.name], dir);

				// error handling
			}, function (e) {

				// manifest failed to load or decode
				console.error(e);
				console.error("Couldn't find file: " + dir + 'manifest.json');
				error_callback("Could not load level at team: " + info.team + ', name: ' + info.name);
			});

		}
		// The manifest has already been loaded and cached
		else {

			_Manifests.levels[info.team][info.name].path = dir;
			_Manifests.levels[info.team][info.name].type = "levels";

			if (typeof (_Manifests.levels[info.team][info.name].team) === 'undefined') {
				_Manifests.levels[info.team][info.name].team = info.team;
			}
			callback(_Manifests.levels[info.team][info.name], dir);
		}
	}

	loadTransitionManifest(info, callback, error_callback, force) {

		let _this = this;

		// make sure we have a container for the transition's parent path
		_Manifests.transitions[info.team] = typeof (_Manifests.transitions[info.team]) !== 'undefined' ? _Manifests.transitions[info.team] : {};

		// if error_callback is true, use that as the force property
		if (error_callback === true) {
			force = true;
			error_callback = function () { };
		}

		// if no error callback is defined, have it use a generic alert
		error_callback = typeof (error_callback) !== 'undefined' ? error_callback : function (error) {
			console.error(error);
			alert(error);
		};

		// this is the directory that the manifest file should be in
		let dir = 'teams/' + info.team + '/transitions/' + info.name + '/';

		// if the manifest hasn't been loaded yet, or we're forcing a fresh load....
		if (force || !_Manifests.transitions[info.team][info.name]) {

			// load the manifest file into a javascript object
			this.getJSON(dir + 'manifest.json', function (data) {

				// update the manifest so it has a reference to our directory.
				data.path = dir;
				data.type = "transitions";

				let onLoaded = function () {
					// cache the manifest so we don't have to reload it again later, and fire the callback
					_Manifests.transitions[info.team][info.name] = data;
					callback(_Manifests.transitions[info.team][info.name], dir);
				}

				if (data.parent && data.parent.team && data.parent.name) {
					_this.loadTransitionManifest({ team: data.parent.team, name: data.parent.name }, onLoaded, error_callback, force);
				} else {
					onLoaded();
				}

				// error handling
			}, function (e) {

				// manifest failed to load or decode
				console.error(e);
				console.error("Couldn't find file: " + dir + '/manifest.json');
				error_callback("Could not load transition at team: " + info.team + ', name: ' + info.name);
			});

		}
		// The manifest has already been loaded and cached
		else {

			let onLoaded = function () {
				// cache the manifest so we don't have to reload it again later, and fire the callback
				_Manifests.transitions[info.team][info.name].path = dir;
				_Manifests.transitions[info.team][info.name].type = "transitions";
				callback(_Manifests.transitions[info.team][info.name], dir);
			}

			// there's a parent manifest here, lets get that loaded first
			if (data.parent && data.parent.team && data.parent.name) {
				_this.loadTransitionManifest({ team: data.parent.team, name: data.parent.name }, onLoaded, error_callback, force);
			} else {
				onLoaded();
			}
		}
	}

	/**
	 * Loads the manifest.json data for a microgame
	 * @param {object} gameInfo - An object with a team and game key to identify the microgame.
	 * @param {function} callback - A callback function to run when the microgame has loaded.
	 * @param {function} error_callback - A callback function to run if there are any problems loading the microgame.
	 * @param {boolean} force - set to true to load all files instead of using cached/compiled data.
	 */
	loadMicroGameManifest(gameInfo, callback, error_callback, force) {
		let _this = this;

		// make sure we have a container for the microgame's parent path
		_Manifests.microgames[gameInfo.team] = typeof (_Manifests.microgames[gameInfo.team]) !== 'undefined' ? _Manifests.microgames[gameInfo.team] : {};

		// if error_callback is true, use that as the force property
		if (error_callback === true) {
			force = true;
			error_callback = function () { };
		}

		// if no error callback is defined, have it use a generic alert
		error_callback = typeof (error_callback) !== 'undefined' ? error_callback : function (error) {
			console.error(error);
			alert(error);
		};

		// this is the directory that the manifest file should be in
		let dir = 'teams/' + gameInfo.team + '/microgames/' + gameInfo.game + '/';

		// if the manifest hasn't been loaded yet, or we're forcing a fresh load....
		if (force || !_Manifests.microgames[gameInfo.team][gameInfo.game]) {

			// load the manifest file into a javascript object
			this.getJSON(dir + 'manifest.json', function (data) {

				// update the manifest so it has a reference to our directory.
				data.path = dir;
				data.type = "microgames";

				let onLoaded = function () {

					// cache the manifest so we don't have to reload it again later, and fire the callback
					_Manifests.microgames[gameInfo.team][gameInfo.game] = data;
					callback(_Manifests.microgames[gameInfo.team][gameInfo.game], dir);
				}

				if (data.parent && data.parent.team && data.parent.name) {
					_this.loadMicroGameManifest({ team: data.parent.team, game: data.parent.name }, onLoaded, error_callback, force);
				} else {
					onLoaded();
				}

				// error handling
			}, function (e) {

				// manifest failed to load or decode
				console.error(e);
				console.error("Couldn't find file: " + dir + '/manifest.json');
				error_callback("Could not load game at team: " + gameInfo.team + ', game: ' + gameInfo.game);
			});

		}
		// The manifest has already been loaded and cached
		else {

			let onLoaded = function () {
				// set a reference to our directory just in case the manifest hasn't actually been used yet (may have been compiled)
				_Manifests.microgames[gameInfo.team][gameInfo.game].path = dir;
				_Manifests.microgames[gameInfo.team][gameInfo.game].type = "microgames";

				// fire the callback
				callback(_Manifests.microgames[gameInfo.team][gameInfo.game], dir);
			}

			if (data.parent && data.parent.team && data.parent.name) {
				_this.loadMicroGameManifest({ team: data.parent.team, game: data.parent.name }, onLoaded, error_callback, force);
			} else {
				onLoaded();
			}
		}
	}

	/**
	 * Loads the manifest.json data for a bossgame
	 * @param {object} gameInfo - An object with a team and game key to identify the bossgame.
	 * @param {function} callback - A callback function to run when the bossgame has loaded.
	 * @param {function} error_callback - A callback function to run if there are any problems loading the bossgame.
	 * @param {boolean} force - set to true to load all files instead of using cached/compiled data.
	 */
	loadBossGameManifest(gameInfo, callback, error_callback, force) {
		let _this = this;

		// make sure we have a container for the bossgame's parent path
		_Manifests.bossgames[gameInfo.team] = typeof (_Manifests.bossgames[gameInfo.team]) !== 'undefined' ? _Manifests.bossgames[gameInfo.team] : {};

		// if error_callback is true, use that as the force property
		if (error_callback === true) {
			force = true;
			error_callback = function () { };
		}

		// if no error callback is defined, have it use a generic alert
		error_callback = typeof (error_callback) !== 'undefined' ? error_callback : function (error) {
			console.error(error);
			alert(error);
		};

		// this is the directory that the manifest file should be in
		let dir = 'teams/' + gameInfo.team + '/bossgames/' + gameInfo.game + '/';

		// if the manifest hasn't been loaded yet, or we're forcing a fresh load....
		if (force || !_Manifests.bossgames[gameInfo.team][gameInfo.game]) {

			// load the manifest file into a javascript object
			this.getJSON(dir + 'manifest.json', function (data) {

				// update the manifest so it has a reference to our directory.
				data.path = dir;
				data.type = "bossgames";

				let onLoaded = function () {
					// cache the manifest so we don't have to reload it again later, and fire the callback
					_Manifests.bossgames[gameInfo.team][gameInfo.game] = data;
					callback(_Manifests.bossgames[gameInfo.team][gameInfo.game], dir);
				}

				if (data.parent && data.parent.team && data.parent.name) {
					_this.loadBossGameManifest({ team: data.parent.team, game: data.parent.name }, onLoaded, error_callback, force);
				} else {
					onLoaded();
				}

				// error handling
			}, function (e) {

				// manifest failed to load or decode
				console.error(e);
				console.error("Couldn't find file: " + dir + '/manifest.json');
				error_callback("Could not load game at team: " + gameInfo.team + ', game: ' + gameInfo.game);
			});

		}
		// The manifest has already been loaded and cached
		else {

			let onLoaded = function () {
				// set a reference to our directory just in case the manifest hasn't actually been used yet (may have been compiled)
				_Manifests.bossgames[gameInfo.team][gameInfo.game].path = dir;
				_Manifests.bossgames[gameInfo.team][gameInfo.game].type = "bossgames";

				// fire the callback
				callback(_Manifests.bossgames[gameInfo.team][gameInfo.game], dir);
			}

			if (data.parent && data.parent.team && data.parent.name) {
				_this.loadBossGameManifest({ team: data.parent.team, game: data.parent.name }, onLoaded, error_callback, force);
			} else {
				onLoaded();
			}
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
		if (typeof (params) === 'function') {
			error = callback;
			callback = params;
			params = null;
		}

		// make sure callback is an actual function
		callback = typeof (callback) !== 'undefined' ? callback : function () { };

		// if error isn't defined, have it do a generic alert
		error = typeof (error) !== 'undefined' ? error : function (e) { console.error(e); alert(e); };

		// load the URL
		this.get(url, params,

			// url loaded okay, try decoding it
			function (json) {
				var obj;
				try {
					obj = JSON.parse(json);
				}
				catch (e) {
					// failed to decode
					error(e);
				}

				callback(obj);
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
	get(url, params, callback, error) {

		// if the 2nd param is a function, assume it's the callback, and param 3 is the error handler
		if (typeof (params) == 'function') {
			error = callback;
			callback = params;
			params = null
		}

		// make sure callback is an actual function
		callback = typeof (callback) === 'function' ? callback : function () { };

		// if the error handler isn't defined, have it do a generic alert
		error = typeof (error) !== 'undefined' ? error : function (e) { console.error(e); alert(e); };

		// format our params into a query string
		if (params && typeof (params) === 'object') {
			let p = [];
			for (const [key, val] of Object.entries(params)) {
				p.push(encodeURIComponent(key) + "=" + encodeURIComponent(val));
			};
			params = "?" + p.join("&");
		} else {
			params = "";
		}

		// load the URL
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function () {
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
		xhr.open("GET", url + params, true);
		xhr.send();
	}

	/**
	 * Registers a scene class using a manifest.
	 * @param {Function.<Phaser.scene>} sceneClass - Reference to the class we're registering
	 * @param {object} manifest - The decoded manifest object associated with the class 
	 */
	registerScene(sceneClass, manifest) {
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
	getSceneClass(classname) {
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
		} else if (top === 'transitions') {
			current_object = transitions;
		} else {
			alert("Scene class must be namespaced to transitions, microgames or bossgames!");
			throw ("Scene class must be namespaced to transitions, microgames or bossgames!");
		}

		// record the top level path
		at.push(top);

		// check the rest of the namespace path
		while (path.length > 0) {

			// get the next object name in the path and add it to the 'at' array
			let top = path.shift();
			at.push(top);

			// check if this object exists
			current_object = typeof (current_object[top]) !== 'undefined' ? current_object[top] : null;

			// it does not, throw an error!
			if (!current_object) {
				throw (at.join(".") + " is undefined.");
			}
		}

		// check if the final object in the path is a Phaser.Scene subclass..
		if (current_object.prototype instanceof Phaser.Scene) {

			// yep, we can return the reference now!
			return current_object;
		}

		// looks like the path is bad, or the object isn't a proper Phaser.scene subclass
		alert(classname + " is either not an extension of Phaser.Scene, or there are errors in the class file.");
		throw (classname + " is either not an extension of Phaser.Scene, or there are errors in the class file.");

	}

	//============================================ public methods ================================================//

	/**
	 * Returns false if the game is paused or any transition animations are going on
	 * @return {boolean}
	 */
	isReady() {
		let activeScene = this.phaser.scene.getScene(this.#activeGameScene);
		return activeScene.scene.isActive() && !this.inTransition && !this.paused;
	}

	/**
	 * Toggle the pause state of the game
	 * @return {boolean} - True if paused.
	 */
	togglePause() {
		if (this.paused) {
			this.resume();
		} else {
			this.pause();
		}
		return this.paused;
	}

	/**
	 * Pauses the game
	 * @return {void}
	 */
	pause() {
		this.#paused = true;
		this.phaser.pause();
	}

	/**
	 * Resumes the game
	 * @return {void}
	 */
	resume() {
		this.#paused = false;
		this.phaser.resume();
	}

	/**
	 * Set the current speed modifier for microgames (happens in nextPhase() during new rounds).
	 * @param {number} speed - Our speed modifier, where 1 = normal speed, 2 = 2x speed, etc.
	 */
	setGameSpeed(speed) {
		this.#gameSpeed = speed;
		this.#msPerTargetFrame = 1000 / (this.targetFPS * speed);
		this.#msPerStep = this.msPerTargetFrame * PWConfig.FRAMES_PER_STEP;
	}

	/**
	 * Increases the game speed by the SPEED_MODIFIER constant
	 * @return {void}
	 * @see PWConfig.SPEED_MODIFIER
	 */
	increaseGameSpeed() {
		this.setGameSpeed(this.gameSpeed + PWConfig.SPEED_MODIFIER);
	}
	/**
	 * Call this in your game loop to get a number you can multiply any movement by so it runs with the correct timing
	 * regardless of the end user's actual on-screen FPS. This will trigger tge sendDelta() function to update the overall game timer.
	 * @param {number} delta - The number of ms that have lapsed since the last update (comes from Phaser.Scene update function)
	 * @return {number} - The multiplier you should use to adjust your game's timing
	 */
	getDeltaMultiplier(delta, updateGameTicker = true) {

		// bossrounds do not use the main game ticker
		if (updateGameTicker && !this.level.bossRound) this.sendDelta(delta);

		let modifier = delta / this.msPerTargetFrame;
		return modifier;
	}

	/**
	 * Updates the game timer and checks if the game is over
	 * @param {number} delta - The number of ms that have lapsed since the last update (comes from Phaser.Scene update function)
	 * @return {void}
	 */
	sendDelta(delta) {
		// check the game's delta time to see if we need to update the game timer
		if (GameWrapper.gameTimerStep < GameWrapper.gameTimerSteps + 1) {

			// see if we've hit the next step in the game timer
			this.#stepTracker += delta;
			if (this.#stepTracker >= this.#msPerStep) {

				// we hit the next step, but lets keep any overflow delta time for the next step
				this.#stepTracker -= this.#msPerStep;
				GameWrapper.gameTimerStep++;

				// the microgame ran out of time, but we want the visual of it running out to stay for a tick
				if (GameWrapper.gameTimerStep === GameWrapper.gameTimerSteps) {
					GameWrapper.stopGameTimer();
				}

				// now we can actually end the game
				else if (GameWrapper.gameTimerStep > GameWrapper.gameTimerSteps) {
					this.level.gameCompleted(this.#winOnTimeUp);
				}

				// otherwise, just tick down the timer graphic
				else {
					GameWrapper.updateGameTimerFrame();
				}
			}
		}
	}

	/**
	 * Call this if the player will lose the game when the timer runs out.
	 * This could be at the start of the game if they need to accomplish something to win, or at the end if they need to survive.
	 * 
	 * @param {boolean} play_lose_animation - If true, the character will play the lose animation instantly
	 * @return {void}
	 */
	lostGame(play_lose_animation = false) {
		if (play_lose_animation === true) GameWrapper.characterAnimation = 3;
		this.#winOnTimeUp = false;
	}

	/**
	 * Call this if the player will win the game when the timer runs out.
	 * This could be at the start of the game if they need to survive, or at the end if they need to accomplish something to win.
	 * 
	 * @param {boolean} play_win_animation - If true, the character will play the win animation instantly
	 * @return {void}
	 */
	wonGame(play_win_animation = false) {
		if (play_win_animation === true) GameWrapper.characterAnimation = 2;
		this.#winOnTimeUp = true;
	}
}

//============================================ static properties ================================================//

/**
 * if true, we have enabled medial playback already
 * @type {boolean}
 * @default false
 * @private
 */
PWFramework.mediaEnabled = false;

/**
 * Call this when the user clicks to start the game, it will play blank media elements to enable media playback
 * 
 * @returns void
 */
PWFramework.enableMediaPlayback = function () {

	if (PWFramework.mediaEnabled) return;

	let audio = document.getElementById('init-audio-elem');
	let video = document.getElementById('init-video-elem');

	if (audio) {
		audio.play();
	}

	if (video) {
		video.play();
	}

	PWFramework.mediaEnabled = true;
}
// global vars

/** Top-level namespace for all microgames */
const microgames = {};

/** Top-level namespace for all bossgames */
const bossgames = {};

/** Top-level namespace for all transitions */
const transitions = {};

/** Top-level namespace for all levels */
const levels = {};

/** Config constants **/
const PWConfig = {
	SPEED_MODIFIER: 0.25,
	FRAMES_PER_STEP: 20         // our base framertate is 60fps, so this is 1/3 of a second, or 180 beats per minute
};

/** 
 * Global reference to main PWFramework instance (see framework.js) 
 * 
 * @type {PWFramework}
 */
const PWGame = new PWFramework();