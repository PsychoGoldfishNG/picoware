// global vars

/** Top-level namespace for all microgames */
const microgames = {};

/** Top-level namespace for all bossgames */
const bossgames = {};

/** Config constants **/
const PWConfig = {
	SPEED_NORMAL: 1,
	SPEED_FASTER: 1.25,
	SPEED_FASTEST: 1.5,
	FRAMES_PER_STEP: 20
};

/** 
 * Global reference to main PWFramework instance (see framework.js) 
 * 
 * @type {PWFramework}
 */
const PWGame = new PWFramework();