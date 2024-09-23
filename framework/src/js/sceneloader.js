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