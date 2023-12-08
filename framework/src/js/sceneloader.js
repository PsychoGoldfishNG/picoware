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