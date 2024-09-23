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