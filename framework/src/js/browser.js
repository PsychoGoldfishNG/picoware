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