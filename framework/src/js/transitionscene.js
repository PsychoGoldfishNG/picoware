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
}