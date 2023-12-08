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